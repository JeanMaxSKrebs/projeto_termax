import React from 'react';
import { View, Text, StyleSheet, Linking } from 'react-native';
import { useLanguage } from '../../context/LanguageProvider';

const handleEmailPress = () => {
    Linking.openURL('mailto:maxsk.ltda@gmail.com');
};

const Info = () => {
    const { t } = useLanguage(); // Usa o contexto de idioma

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{t("Informações do App")}</Text>
            <Text style={styles.text}>{t("Este aplicativo utiliza imagens geradas por IA através do Stable Diffusion.")}</Text>
            <Text style={styles.text}>{t("Para quaisquer questões ou problemas, entre em contato com o desenvolvedor.")}</Text>
            <Text style={[styles.text, styles.link]} onPress={handleEmailPress}>
                {t("Email: maxsk.ltda@gmail.com")}
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    text: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 10,
    },
    link: {
        color: 'blue',
        textDecorationLine: 'underline',
    },
});

export default Info;
