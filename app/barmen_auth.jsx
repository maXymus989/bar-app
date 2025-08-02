import { useState, useContext, useEffect } from 'react';
import { StyleSheet, View, Text, ActivityIndicator } from 'react-native';
import { router } from 'expo-router';
import { Input, Divider, Button } from '@rneui/base';
import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    onAuthStateChanged,
} from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, firestore } from '../Firebase/firebaseConfig';
import { ColorThemeContext } from './index';
import ConfirmDialog from '../Components/ConfirmDialog';
import AlertDialog from '../Components/AlertDialog';
import useBarStore from '../state';
import useSessionStore from '../state/sessionStore';

const BarmenAuth = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [isLoadingAuth, setIsLoadingAuth] = useState(true);

    const [alertText, setAlertText] = useState('');
    const [showAlert, setShowAlert] = useState(false);

    const [confirmDialogVisible, setConfirmDialogVisible] = useState(false);

    const ColorPalette = useContext(ColorThemeContext);

    const { barmanSessionActive, setBarmanSession, clearBarmanSession } =
        useSessionStore();

    const dividerWidth = 20;

    useEffect(() => {
        setEmail(`${username}@barapp.com`);
    }, [username]);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setBarmanSession(user.email);

                router.replace('/(barman-tabs)/orders');
            } else {
                // clearBarmanSession();
                setIsLoadingAuth(false);
            }
        });

        return () => unsubscribe();
    }, []);

    const printAlert = (text) => {
        setAlertText(text);
        setShowAlert(true);
    };

    const isValidAuth = (username, password) => {
        const checkString = (str, minLength = 3) => {
            if (typeof str !== 'string') return false;

            str = str.trim();

            if (str.length < minLength || str.length > 20) return false;

            const nameRegex = /^[A-Za-z0-9]+$/u;

            return nameRegex.test(str);
        };

        if (checkString(username) && checkString(password, 6)) return true;
        else return false;
    };

    const handleRegister = async () => {
        try {
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );

            await setDoc(doc(firestore, 'bars', email.toLowerCase()), {
                createdAt: Date.now(),
            });
            printAlert('Обліковий запис успішно створено!');
        } catch (error) {
            if (error.code === 'auth/email-already-in-use')
                printAlert('Цей користувач вже існує!');
            else printAlert('Помилка при створенні акаунта' + error);
        }
    };

    const handleLogin = async () => {
        try {
            const userCredential = await signInWithEmailAndPassword(
                auth,
                email,
                password
            );

            router.push('/(barman-tabs)/orders');
        } catch (error) {
            if (error.code === 'auth/invalid-credential') {
                setConfirmDialogVisible(true);
            } else {
                printAlert('Інша помилка входу:' + error);
            }
        }
    };

    if (isLoadingAuth) {
        return (
            <View style={styles.loaderContainer}>
                <ActivityIndicator size="large" color="#ffffff" />
            </View>
        );
    }

    if (barmanSessionActive) {
        return (
            <View style={styles.loaderContainer}>
                <ActivityIndicator size="large" color="#ffffff" />
                <Text style={{ color: 'white', marginTop: 10 }}>
                    Перенаправлення...
                </Text>
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
                    },
                ]}>
                Будь ласка, авторизуйтесь
            </Text>

            <Divider width={dividerWidth * 5} />

            <Input
                value={username}
                inputStyle={styles.inputStyle}
                containerStyle={styles.containerStyle}
                inputContainerStyle={styles.inputContainerStyle}
                renderErrorMessage={false}
                onChangeText={setUsername}
                placeholder="Назва бару"
            />

            <Divider width={dividerWidth} />

            <Input
                value={password}
                inputStyle={styles.inputStyle}
                containerStyle={styles.containerStyle}
                inputContainerStyle={styles.inputContainerStyle}
                renderErrorMessage={false}
                onChangeText={setPassword}
                placeholder="Пароль"
                secureTextEntry={true}
            />

            <Divider width={dividerWidth * 4} />

            <Button
                title={'Увійти'}
                buttonStyle={{
                    backgroundColor: ColorPalette.main.buttons_modalBackground,
                }}
                titleStyle={{
                    color: ColorPalette.main.darkText,
                    fontFamily: 'KyivTypeSerif-Heavy',
                    fontSize: 24,
                }}
                containerStyle={styles.buttonContainer}
                onPress={() => {
                    if (isValidAuth(username, password)) handleLogin();
                    else {
                        printAlert('Дані авторизації вказані неправильно!');
                    }
                }}
            />

            {confirmDialogVisible && (
                <ConfirmDialog
                    visible={confirmDialogVisible}
                    setVisible={setConfirmDialogVisible}
                    confirmationText={
                        'Невірні логін та/або пароль.\nСпробувати створити новий обліковий запис?'
                    }
                    trueOptionText={'Так'}
                    falseOptionText={'Ні'}
                    callback={handleRegister}
                />
            )}

            {showAlert && (
                <AlertDialog
                    visible={showAlert}
                    setVisible={setShowAlert}
                    alertText={alertText}
                />
            )}
        </View>
    );
};

export default BarmenAuth;

const styles = StyleSheet.create({
    window: {
        flex: 1,
        alignItems: 'center',
    },
    flex2: {
        flex: 2,
    },
    containerStyle: {
        justifyContent: 'center',
        paddingHorizontal: 0,
    },
    inputContainerStyle: {
        marginHorizontal: 50,
        borderBottomWidth: 0,
    },
    inputStyle: {
        backgroundColor: 'white',
        fontFamily: 'KyivTypeSerif-Heavy',
        fontSize: 18,
        color: 'black',
        textAlign: 'center',
    },
    headerText: {
        textAlign: 'center',
        fontSize: 30,
        marginTop: '30%',
        width: '90%',
        fontFamily: 'KyivTypeTitling-Bold',
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
    loaderContainer: {
        height: 100,
    },
});
