import React, { useState } from 'react';
import { TouchableOpacity, Image, StyleSheet, View, Text, Modal } from 'react-native';
import { COLORS } from '../../assets/colors';
import { useLanguage } from '../../context/LanguageProvider';

const ChestOption = ({ onPress, disabled, type }) => {
    const [showInfo, setShowInfo] = useState(false);
    const { t } = useLanguage();

    const chestImages = {
        freeChest: require('../../assets/images/resources/chest/chest.png'),
        normalChest: require('../../assets/images/resources/chest/chest.png'),
        specialChest: require('../../assets/images/resources/chest/specialChest.png'),
    };

    const handleInfoPress = () => {
        setShowInfo(true);
    };

    const closeInfoModal = () => {
        setShowInfo(false);
    };

    const rewardsTable = (
        <View style={styles.tableContainer}>
            <Text style={styles.tableHeader}>Recompensas do Baú</Text>
            <View style={styles.tableRow}>
                <Text style={styles.tableRowText}>Baú Normal:</Text>
                <Text style={styles.tableRowValue}>100 - 1000 Coins</Text>
            </View>
            <View style={styles.tableRow}>
                <Text style={styles.tableRowText}>Baú Especial:</Text>
                <Text style={styles.tableRowValue}>1000 - 10000 Coins</Text>
            </View>
            <View style={styles.tableRow}>
                <Text style={styles.tableRowText}>Ambos podem conter:</Text>
                <Text style={styles.tableRowValue}>Wordpoints</Text>
            </View>
        </View>
    );


    return (
        <>
            <TouchableOpacity onPress={onPress} disabled={disabled} style={styles.chestContainer}>
                <View style={styles.chestWrapper}>
                    <Text style={styles.buttonText}>
                        {type === 'freeChest' ? t('Open Free Chest') :
                            type === 'normalChest' ? t('Open Normal Chest') :
                                type === 'specialChest' ? t('Open Special Chest') : ''}
                    </Text>

                    <Image source={chestImages[type]} style={styles.chestImage} />
                    <TouchableOpacity onPress={handleInfoPress} style={styles.infoButton}>
                        <Text style={styles.infoText}>?</Text>
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>

            <Modal visible={showInfo} transparent={true} animationType="slide">
                <View style={styles.modalBackground}>
                    <View style={styles.modalContainer}>
                        {rewardsTable}
                        <TouchableOpacity onPress={closeInfoModal} style={styles.closeButton}>
                            <Text style={styles.closeButtonText}>{t('Fechar')}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </>
    );
};

const styles = StyleSheet.create({
    chestContainer: {
        marginBottom: 20,
        alignItems: 'center',
    },
    chestWrapper: {
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#000',
        borderRadius: 5,
        padding: 10,
        position: 'relative',
        backgroundColor: COLORS.accentSecondary
    },
    chestImage: {
        width: 100,
        height: 100,
        borderRadius: 5,
    },
    infoButton: {
        position: 'absolute',
        bottom: 1,
        right: 1,
        backgroundColor: COLORS.gray,
        borderRadius: 10,
        paddingHorizontal: 10,
        padding: 2,
    },
    infoText: {
        color: COLORS.accentSecondary,
        fontWeight: 'bold',
    },
    modalBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContainer: {
        width: 300,
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
    },
    tableContainer: {
        marginBottom: 20,
    },
    tableHeader: {
        fontWeight: 'bold',
        fontSize: 18,
        marginBottom: 10,
        color: COLORS.primary,
        borderBottomWidth: 2,
        borderBottomColor: COLORS.accentSecondary,
        paddingBottom: 5,
    },
    tableRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
        paddingHorizontal: 10,
    },
    tableRowText: {
        fontSize: 16,
        color: COLORS.textPrimary,
    },
    tableRowValue: {
        fontSize: 16,
        color: COLORS.textSecondary,
        fontWeight: 'bold',
    },
    closeButton: {
        alignSelf: 'center',
        padding: 10,
        backgroundColor: '#000',
        borderRadius: 5,
    },
    closeButtonText: {
        color: '#fff',
    },
    buttonText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10
    },
});

export default ChestOption;
