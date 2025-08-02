import { useContext } from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { Dialog, Button } from '@rneui/base';
import { ColorThemeContext } from '../app/index';

const ConfirmDialog = ({
    visible,
    setVisible,
    confirmationText,
    trueOptionText = null,
    falseOptionText = null,
    callback = null,
}) => {
    const ColorPalette = useContext(ColorThemeContext);
    return (
        <Dialog
            isVisible={visible}
            overlayStyle={[
                styles.window,
                { backgroundColor: ColorPalette.main.buttons_modalBackground },
            ]}
            onBackdropPress={() => {
                setVisible(false);
            }}>
            <Text
                style={[
                    styles.headerText,
                    {
                        color: ColorPalette.main.darkText,
                    },
                ]}>
                {confirmationText}
            </Text>
            <View style={{ flexDirection: 'row' }}>
                {trueOptionText && (
                    <Button
                        title={trueOptionText}
                        buttonStyle={{
                            backgroundColor:
                                ColorPalette.main.background_modalButtons,
                        }}
                        titleStyle={{
                            color: ColorPalette.main
                                .lightText_listItemsBackground,
                            fontFamily: 'KyivTypeSerif-Heavy',
                            fontSize: 18,
                        }}
                        containerStyle={styles.buttonContainer}
                        onPress={async () => {
                            if (callback) {
                                await callback();
                            }
                            setVisible(false);
                        }}
                    />
                )}
                {falseOptionText && (
                    <Button
                        title={falseOptionText}
                        buttonStyle={{
                            backgroundColor: ColorPalette.main.notButtons,
                        }}
                        titleStyle={{
                            color: ColorPalette.main.darkText,
                            fontFamily: 'KyivTypeSerif-Heavy',
                            fontSize: 18,
                        }}
                        containerStyle={styles.buttonContainer}
                        onPress={() => {
                            setVisible(false);
                        }}
                    />
                )}
            </View>
        </Dialog>
    );
};

export default ConfirmDialog;

const styles = StyleSheet.create({
    window: {
        alignItems: 'center',
    },
    headerText: {
        textAlign: 'center',
        fontSize: 18,
        width: '90%',
        marginVertical: 20,
        fontFamily: 'KyivTypeSerif-Heavy',
    },
    buttonContainer: {
        marginVertical: '2%',
        marginHorizontal: 20,
        width: 80,
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
