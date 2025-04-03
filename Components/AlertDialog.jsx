import { Text } from "react-native";
import { Dialog } from "@rneui/base";

const AlertDialog = ({ visible, setVisible, alertTitle, alertText }) => {
  return (
    <Dialog
      isVisible={visible}
      onBackdropPress={setVisible}
      overlayStyle={{ backgroundColor: "white" }}
    >
      <Dialog.Title title={alertTitle} />
      <Text>{alertText}</Text>
    </Dialog>
  );
};

export default AlertDialog;
