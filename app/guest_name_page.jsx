import {
    useState,
    useContext,
    useEffect,
    useCallback,
    useLayoutEffect,
} from 'react';
import { StyleSheet, Text } from 'react-native';
import { router, useFocusEffect } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import DropDownPicker from 'react-native-dropdown-picker';
import { Input, Divider, Button } from '@rneui/base';
import { ColorThemeContext } from './index';
import AlertDialog from '../Components/AlertDialog';
import useBarStore from '../state';
import useSessionStore from '../state/sessionStore';

const GuestNamePage = () => {
    const [username, setUsername] = useState('');

    const [alertText, setAlertText] = useState('');
    const [showAlert, setShowAlert] = useState(false);

    const [roomNames, setRoomNames] = useState([]);
    const [selectedRoomName, setSelectedRoomName] = useState('');

    const [pickerOpened, setPickerOpened] = useState(false);

    const ColorPalette = useContext(ColorThemeContext);

    const dividerWidth = 20;

    const { setGuest, rooms, areRoomsLoaded, fetchRooms, clearMenu } =
        useBarStore();

    const printAlert = (text) => {
        setAlertText(text);
        setShowAlert(true);
    };

    const {
        guestSessionActive,
        setGuestSession,
    } = useSessionStore();



    useEffect(() => {
        setRoomNames(
            rooms.map(({ id }) => {
                const newId = id.replace('@barapp.com', '');
                return { label: newId, value: newId };
            })
        );
    }, [rooms]);

    useEffect(() => {
        fetchRooms();
    }, [!areRoomsLoaded]);

    useLayoutEffect(() => {
        if (guestSessionActive) {
            router.push('/');
        }
    }, []);
    useFocusEffect(
        useCallback(() => {
            clearMenu();
        }, [])
    );

    const isValidName = (name) => {
        if (typeof name !== 'string') return false;

        name = name.trim();

        if (name.length === 0 || name.length > 20) return false;

        const nameRegex = /^[A-Za-zА-Яа-яІіЇїЄєҐґ]+$/u;

        return nameRegex.test(name);
    };

    return (
        <SafeAreaView
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
                Введіть Ваше ім'я для замовлень
            </Text>

            <Divider width={dividerWidth * 5} />

            <Input
                value={username}
                inputStyle={styles.inputStyle}
                containerStyle={styles.containerStyle}
                inputContainerStyle={styles.inputContainerStyle}
                renderErrorMessage={false}
                onChangeText={setUsername}
                placeholder="Ваше ім'я"
            />

            <Divider width={dividerWidth * 2} />

            <DropDownPicker
                listMode="FLATLIST"
                open={pickerOpened}
                value={selectedRoomName}
                items={roomNames}
                setOpen={setPickerOpened}
                setValue={setSelectedRoomName}
                setItems={setRoomNames}
                textStyle={{ fontSize: 18, fontFamily: 'KyivTypeSerif-Heavy' }}
                arrowIconStyle={{ width: 10 }}
                placeholder={'Оберіть кімнату'}
                style={[
                    styles.dropDownStyle,
                    {
                        backgroundColor: ColorPalette.main.grey,
                    },
                ]}
                dropDownContainerStyle={[
                    styles.dropDownStyle,
                    {
                        backgroundColor: ColorPalette.main.grey,
                        borderWidth: 1,
                    },
                ]}
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
                    if (isValidName(username) && selectedRoomName) {
                        setGuest(username, selectedRoomName);
                        setGuestSession(username, selectedRoomName);
                        router.push('/guest');
                    } else {
                        printAlert('Неправильний формат введення імені!');
                    }
                }}
            />

            {showAlert && (
                <AlertDialog
                    visible={showAlert}
                    setVisible={setShowAlert}
                    alertText={alertText}
                />
            )}
        </SafeAreaView>
    );
};

export default GuestNamePage;

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
        marginTop: '60%',
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
    dropDownStyle: {
        width: '80%',
        marginLeft: '10%',
    },
});
