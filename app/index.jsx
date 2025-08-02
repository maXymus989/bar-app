import { createContext, useCallback } from 'react';
import { Text, View, StyleSheet, ActivityIndicator } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { Button } from '@rneui/base';
import { useFonts } from 'expo-font';
import { useRouter } from 'expo-router';
import 'expo-router/entry';
import useBarStore from '../state';

const ColorPalette = require('../assets/color_palette.json');
const ColorThemeContext = createContext(ColorPalette);

const Index = () => {
    const [loaded, error] = useFonts({
        'KyivTypeTitling-Bold': require('../assets/fonts/KyivTypeTitling-Bold.ttf'),
        'KyivTypeSerif-Heavy': require('../assets/fonts/KyivTypeSerif-Heavy.ttf'),
        'KyivTypeSerif-Medium': require('../assets/fonts/KyivTypeSerif-Medium.ttf'),
    });

    const router = useRouter();
    const { clearAll, guestSessionActive } = useBarStore();

    // useFocusEffect(
    //   useCallback(() => {
    //     clearAll();
    //   }, [])
    // );

    if (!loaded) {
        return (
            <View style={styles.loaderContainer}>
                <ActivityIndicator size="large" color="#ffffff" />
            </View>
        );
    }

    return (
        <View
            style={[
                styles.window,
                { backgroundColor: ColorPalette.main.background_modalButtons },
            ]}>
            <Text
                style={[
                    styles.headerText,
                    {
                        color: ColorPalette.main.lightText_listItemsBackground,
                        fontFamily: 'KyivTypeTitling-Bold',
                    },
                ]}>
                Вітаємо в закладі, оберіть Вашу роль
            </Text>
            <View style={styles.buttonsContainer}>
                <Button
                    title={'Бармен'}
                    buttonStyle={{
                        backgroundColor:
                            ColorPalette.main.buttons_modalBackground,
                    }}
                    titleStyle={{
                        color: ColorPalette.main.darkText,
                        fontFamily: 'KyivTypeSerif-Heavy',
                        fontSize: 30,
                    }}
                    containerStyle={styles.buttonContainer}
                    onPress={() => {
                        router.push('/barmen_auth');
                    }}
                />
                <Button
                    title={'Клієнт'}
                    buttonStyle={{
                        backgroundColor:
                            ColorPalette.main.buttons_modalBackground,
                    }}
                    titleStyle={{
                        color: ColorPalette.main.darkText,
                        fontFamily: 'KyivTypeSerif-Heavy',
                        fontSize: 30,
                    }}
                    containerStyle={styles.buttonContainer}
                    onPress={() => {
                        if (guestSessionActive) {
                            router.push('/guest');
                        } else router.push('/guest_name_page');
                    }}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    window: {
        flex: 1,
        alignItems: 'center',
    },
    headerText: {
        textAlign: 'center',
        fontSize: 36,
        marginTop: '40%',
        width: '90%',
    },
    buttonsContainer: {
        width: '80%',
        marginTop: '40%',
    },
    buttonContainer: {
        marginVertical: '2%',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.0,
        elevation: 24,
    },
});

export default Index;
export { ColorThemeContext };
