import { useCallback, useContext, useEffect, useLayoutEffect } from 'react';
import { StyleSheet, View, Text, ActivityIndicator } from 'react-native';
import { Image } from 'expo-image';
import { router, useFocusEffect } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from '@rneui/base';
import { ColorThemeContext } from './index';
import useBoundedIndex from '../hooks/useBoundedIndex';
import useBarStore from '../state';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import useSessionStore from '../state/sessionStore';

const Guest = () => {
    const ColorPalette = useContext(ColorThemeContext);
    const textColor = { color: ColorPalette.main.darkText };
    const { menu, setGuest, isMenuLoaded, fetchMenuData } = useBarStore();

    const { guestSessionActive, clearGuest } = useSessionStore();

    const { index, next, prev, setMax } = useBoundedIndex(0, menu.length - 1);

    useEffect(() => {
        setMax(menu.length - 1);
    }, [menu]);

    useLayoutEffect(() => {
        if (!guestSessionActive) {
            router.replace('/');
        }
    }, []);

    useEffect(() => {
        if (!isMenuLoaded) {
            const fetchData = async () => {
                try {
                    await fetchMenuData(true);
                } catch (e) {
                    console.error(e);
                }
            };

            fetchData();
            console.log('Fetching');
        }
    }, [isMenuLoaded]);

    return (
        <SafeAreaView
            style={[
                styles.window,
                { backgroundColor: ColorPalette.main.background_modalButtons },
            ]}>
            {!isMenuLoaded ? (
                <ActivityIndicator size="large" color={'white'} />
            ) : (
                <>
                    <Text
                        style={[
                            styles.headerText,
                            {
                                color: ColorPalette.main
                                    .lightText_listItemsBackground,
                            },
                        ]}>
                        Оберіть напій
                    </Text>
                    <View style={styles.buttonsAndIconContainer}>
                        <Button
                            icon={
                                <Image
                                    source={require('../assets/left-arrow.svg')}
                                    style={{ width: 50, height: 50 }}
                                />
                            }
                            iconContainerStyle={{ marginRight: 10 }}
                            buttonStyle={{
                                backgroundColor: 'transparent',
                                borderColor: 'transparent',
                                borderWidth: 0,
                            }}
                            onPress={prev}
                        />
                        {menu[index].image ? (
                            <Image
                                style={styles.photoContainer}
                                source={menu[index].image}
                                contentFit="cover"
                                transition={1000}
                            />
                        ) : (
                            <View
                                style={[
                                    { backgroundColor: 'white' },
                                    styles.photoContainer,
                                ]}>
                                <Text style={[styles.text, textColor]}>
                                    Німа фото
                                </Text>
                            </View>
                        )}
                        <Button
                            icon={
                                <Image
                                    source={require('../assets/right-arrow.svg')}
                                    style={{ width: 50, height: 50 }}
                                />
                            }
                            iconContainerStyle={{ marginRight: 10 }}
                            buttonStyle={{
                                backgroundColor: 'transparent',
                                borderColor: 'transparent',
                                borderWidth: 0,
                            }}
                            onPress={next}
                        />
                    </View>
                    <Text
                        style={[
                            styles.beverageName,
                            {
                                color: ColorPalette.main
                                    .lightText_listItemsBackground,
                            },
                        ]}>
                        {menu[index].name}
                    </Text>
                    <Button
                        title={'Обрати'}
                        buttonStyle={{
                            backgroundColor:
                                ColorPalette.main.buttons_modalBackground,
                        }}
                        titleStyle={{
                            color: ColorPalette.main.darkText,
                            fontFamily: 'KyivTypeSerif-Heavy',
                            fontSize: 24,
                        }}
                        containerStyle={styles.buttonContainer}
                        onPress={() =>
                            router.push({
                                pathname: '/guest_order',
                                params: { index },
                            })
                        }
                    />
                </>
            )}
            <Button
                title={
                    <MaterialCommunityIcons
                        name="exit-run"
                        size={24}
                        color="black"
                    />
                }
                buttonStyle={{
                    backgroundColor: ColorPalette.main.notButtons,
                }}
                titleStyle={{
                    color: ColorPalette.main.darkText,
                    fontFamily: 'KyivTypeSerif-Heavy',
                    fontSize: 18,
                }}
                containerStyle={styles.exitButton}
                onPress={async () => {
                    await clearGuest();
                    router.push('/guest_name_page');
                }}
            />
        </SafeAreaView>
    );
};

export default Guest;

const styles = StyleSheet.create({
    window: {
        flex: 1,
        alignItems: 'center',
    },
    flex2: {
        flex: 2,
    },
    headerText: {
        textAlign: 'center',
        fontSize: 30,
        marginTop: '30%',
        width: '90%',
        fontFamily: 'KyivTypeTitling-Bold',
    },
    beverageName: {
        textAlign: 'center',
        fontSize: 24,
        marginTop: '10%',
        width: '90%',
        fontFamily: 'KyivTypeSerif-Medium',
    },
    buttonContainer: {
        marginTop: '10%',
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
    photoContainer: {
        width: 250,
        height: 250,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonsAndIconContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        marginTop: '30%',
    },
    exitButton: {
        position: 'absolute',
        top: 60,
        left: 30,
        color: 'white',
    },
});
