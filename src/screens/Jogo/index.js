import React, { useState, useEffect, useCallback, useContext } from 'react';
import { View, Text, ActivityIndicator, FlatList, StyleSheet } from 'react-native';
import { COLORS } from '../../assets/colors';
import Fireworks from '../../components/Jogo/Fireworks';
import Input from '../../components/Jogo/Input';
import LetterContainer from '../../components/Jogo/LetterContainer';
import WordDisplay from '../../components/Jogo/WordDisplay';
import { CollectionsContext } from '../../context/CollectionsProvider';
import CollectionEarnedModal from '../../components/Jogo/CollectionEarnedModal';
import Loading from '../../components/Jogo/Loading';
import { validateWord } from '../../utils/wordValidation';
import { useLanguage } from '../../context/LanguageProvider';
import DangerAlert from '../../components/Jogo/DangerAlert';
import { useCoinsExp } from '../../context/CoinsExpProvider'; // Ajuste o caminho conforme necessário

const MaxAttempts = 5;

const TermaxGame = ({ route }) => {
    const { addCoins, addExp } = useCoinsExp();
    const { t } = useLanguage();
    const [guess, setGuess] = useState('');
    const [gameState, setGameState] = useState({
        attempts: [],
        attemptsLeft: MaxAttempts,
        gameResult: '',
        correctGuesses: [],
        showFireworks: false,
        showCollectionEarned: false,
        gameWin: false,
        gameOver: false,
    });
    const { collectionsBase, updateCollection, collectionEarned } = useContext(CollectionsContext);
    const [loading, setLoading] = useState(false);
    const { wordLength, words } = route.params;
    const [validWords, setValidWords] = useState([]);
    const [SecretWord, setSecretWord] = useState(
        route.params.palavraSelecionada || words[Math.floor(Math.random() * words.length)]
    );
    console.log("SecretWord");
    console.log(SecretWord);

    useEffect(() => {
        if (words) {
            setValidWords(words);
        }
    }, [words]);

    const submitWord = useCallback(async (word) => {
        const normalizedWord = word.toLowerCase();
        if (await validateWord(normalizedWord)) {
            await checkGuess(normalizedWord);
        } else {
            setGameState(prevState => ({ ...prevState, gameResult: t('Palavra inválida. Tente novamente.') }));
        }
    }, [checkGuess, t]);

    const handleCloseModal = () => {
        setGameState(prevState => ({ ...prevState, showCollectionEarned: false }));
    };

    const handleGuess = async () => {
        setLoading(true);
        try {
            const updateSuccess = await updateCollection();
            if (updateSuccess) {
                setGameState(prevState => ({ ...prevState, showCollectionEarned: true }));
            }
        } catch (error) {
            console.error('Erro ao atualizar a coleção:', error);
        }
        setLoading(false);
    };

    const checkGuess = async (normalizedGuess) => {
        const normalizedSecretWord = normalizeWord(SecretWord.toLowerCase());
        if (normalizedGuess.length === normalizedSecretWord.length && /^[a-z]+$/.test(normalizedGuess)) {
            const newCorrectGuesses = [...gameState.correctGuesses];
            const guessResult = evaluateGuess(normalizedSecretWord, normalizedGuess);

            // Atualizar as letras corretas com base na tentativa
            normalizedSecretWord.split('').forEach((letter, index) => {
                if (normalizedGuess[index] === letter) {
                    newCorrectGuesses[index] = letter;
                }
            });

            // Verifica se a palavra foi totalmente adivinhada
            if (newCorrectGuesses.join('') === normalizedSecretWord) {
                for (let index = 0; index < 1; index++) {//mudança para eventos
                    handleGuess(); // Atualiza coleção se necessário

                }
                for (let index = 0; index < 1; index++) {//mudança para eventos
                    // Adicionar coins e exp baseado no comprimento da palavra
                    const rewardAmount = Math.min(wordLength * 5, 50); // Por exemplo, 10 coins/exp por letra, até um máximo de 50
                    addCoins(rewardAmount);
                }
                for (let index = 0; index < 1; index++) {//mudança para eventos
                    // Adicionar coins e exp baseado no comprimento da palavra
                    const rewardAmount = Math.min(wordLength * 5, 50); // Por exemplo, 10 coins/exp por letra, até um máximo de 50
                    addExp(rewardAmount);
                }
                setGameState(prevState => ({
                    ...prevState,
                    correctGuesses: newCorrectGuesses,
                    showFireworks: true,
                    gameResult: t('Parabéns! Você adivinhou a palavra!'),
                    gameWin: true,
                }));
            } else {
                const remainingAttempts = gameState.attemptsLeft - 1;
                const isLastAttempt = remainingAttempts === 0;
                const isPenultimateAttempt = remainingAttempts === 1;

                setGameState(prevState => ({
                    ...prevState,
                    attempts: [...prevState.attempts, guessResult],
                    attemptsLeft: remainingAttempts,
                    gameResult: isLastAttempt
                        ? t('Última tentativa! Tente adivinhar a palavra.')
                        : isPenultimateAttempt
                            ? t('Penúltima tentativa! Preste atenção.')
                            : t('Tentativa incorreta! Continue tentando.'),
                }));
            }
        } else {
            setGameState(prevState => ({
                ...prevState,
                gameResult: `${t("Por favor, insira uma palavra válida com")} ${wordLength} ${t("letras.")}`
            }));
        }
    };

    const normalizeWord = (word) => word.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Termax</Text>
            <Text style={styles.subtitle}>{t('Comprimento da Palavra: ') + wordLength}</Text>
            <WordDisplay letters={gameState.correctGuesses} colorMixed={true} attemptsLeft={gameState.attemptsLeft} />
            <Text style={styles.result}>{gameState.gameResult}</Text>
            {loading ? (
                <ActivityIndicator size="large" color={COLORS.primary} />
            ) : (
                <FlatList
                    style={styles.attemptsList}
                    data={gameState.attempts}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item, index }) => (
                        <>
                            {console.log("item")}
                            {console.log(item)}
                            <AttemptItem item={item} index={index} />
                        </>
                    )}
                />
            )}
            <Input value={guess} onChangeText={setGuess} wordLength={wordLength} onPressEnter={() => submitWord(guess)} />
            {gameState.showFireworks && (
                <Fireworks x={14} y={14} color={'green'} onAnimationComplete={() => { }} />
            )}
            {console.log("collectionEarned")}
            {console.log(collectionEarned)}
            {console.log("collectionEarned.collectionName")}
            {console.log(collectionEarned.collectionName)}
            {/* {} */}
            {gameState.showCollectionEarned && (
                <CollectionEarnedModal
                    collectionName={collectionEarned.collectionName}
                    itemImage={collectionEarned.itemImage}
                    onClose={handleCloseModal}
                />
            )}
        </View>
    );
};

const AttemptItem = React.memo(({ item, index }) => (
    <DangerAlert level={index} maxLevel={MaxAttempts}>
        <View style={styles.attemptRow}>
            {item.map((guess, index) => (
                <View key={index} style={styles.letterContainer}>
                    {console.log("guess")}
                    {console.log(guess)}
                    <LetterContainer letter={guess.letter} status={guess.status} />
                    {(guess.status === 'correct' || guess.status === 'misplaced') && (
                        <Fireworks color={guess.status === 'correct' ? 'green' : 'yellow'} />
                    )}
                </View>
            ))}
        </View>
    </DangerAlert>
));

const evaluateGuess = (secretWord, guess) => {
    const guessResult = [];
    const secretLetterCounts = {}; // Contagem de letras na palavra secreta
    const guessLetterCounts = {}; // Contagem de letras na tentativa

    // Inicializar contadores
    for (let i = 0; i < secretWord.length; i++) {
        const secretLetter = secretWord[i];
        secretLetterCounts[secretLetter] = (secretLetterCounts[secretLetter] || 0) + 1;

        const guessLetter = guess[i];
        guessLetterCounts[guessLetter] = (guessLetterCounts[guessLetter] || 0) + 1;
    }

    // Primeiro pass: Identifica letras corretas
    for (let i = 0; i < secretWord.length; i++) {
        if (secretWord[i] === guess[i]) {
            guessResult[i] = { letter: guess[i], status: 'correct' };
            secretLetterCounts[guess[i]]--;
        } else {
            guessResult[i] = { letter: guess[i], status: 'wrong' };
        }
    }

    // Segundo pass: Identifica letras mal colocadas
    for (let i = 0; i < secretWord.length; i++) {
        if (guessResult[i].status === 'wrong') {
            const letter = guess[i];
            if (secretLetterCounts[letter] > 0) {
                guessResult[i].status = 'misplaced';
                secretLetterCounts[letter]--;
            }
        }
    }

    return guessResult;
};





const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.background,
        padding: 10,
    },
    texto: {
        fontSize: 24,
        color: COLORS.primary,
        marginBottom: 10,
    },
    wordDisplay: {
        fontSize: 20,
        fontWeight: 'bold',
        marginVertical: 10,
    },
    input: {
        height: 40,
        width: 100,
        borderColor: 'gray',
        borderWidth: 1,
        textAlign: 'center',
        marginBottom: 10,
    },
    result: {
        fontWeight: 'bold',
    },
    attemptRow: {
        flexDirection: 'row',
        // marginTop: 10,
        textAlign: 'center', // Centraliza horizontalmente
        alignSelf: 'center', //
    },
    letterContainer: {
        textAlign: 'center', // Centraliza horizontalmente
        position: 'relative',
        justifyContent: 'center',
    },
    letterCircle: {
        backgroundColor: 'gray',
        width: 40,
        height: 40,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    letterText: {
        fontSize: 18,
        fontWeight: 'bold',

    },
    correct: {
        backgroundColor: 'green',
    },
    misplaced: {
        backgroundColor: 'yellow',
    },
    wrong: {
        backgroundColor: 'gray',
    },
    fireworksContainer: {
        position: 'absolute',
        top: -10,
        left: -10,
        width: 60,
        height: 60,
        zIndex: -1,
    },
    particle: {
        position: 'absolute',
        width: 4,
        height: 4,
        borderRadius: 2,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: COLORS.primary,
        marginBottom: 10,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 18,
        color: COLORS.primary,
        marginBottom: 20,
        textAlign: 'center',
    },
    wordContainer: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.primaryLight,
        width: '100%',
        alignItems: 'center',
    },
    word: {
        fontSize: 18,
        color: COLORS.primary,
    },
    emptyText: {
        fontSize: 16,
        color: COLORS.primary,
        textAlign: 'center',
    },
});

export default TermaxGame;
