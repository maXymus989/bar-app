import { useContext, useEffect, useState } from "react";
import { Text, Pressable, StyleSheet, View, ScrollView } from "react-native";
import { Button, Dialog, Divider, Input } from "@rneui/base";
import { ColorThemeContext } from "../app/index";
import * as ImagePicker from "expo-image-picker";
import { Image } from "expo-image";
import Ingredient from "./Ingredient";
import AlertDialog from "./AlertDialog";

const MenuItemDialog = ({
  isVisible,
  setIsVisible,
  isNew = true,
  menuItem = {},
  onAddMenuItem,
  onUpdateMenuItem,
  onRemoveMenuItem,
}) => {
  const ColorPalette = useContext(ColorThemeContext);
  const dividerWidth = 10;
  const textColor = { color: ColorPalette.main.darkText };

  const [name, setName] = useState(menuItem.name || "");
  const [image, setImage] = useState(menuItem.image || null);
  const [ingredients, setIngredient] = useState([]);

  const [alertVisible, setAlertVisible] = useState(false);

  const arrayOfUnits = ["г", "шт", "мл"];

  useEffect(() => {
    setIngredient(menuItem.ingredients || []);
  }, [menuItem.ingredients]);

  const addIngredient = () => {
    const newIngredient = {
      id: Date.now(),
      name: "",
      quantity: 0,
      units: "-",
      checkAvailability: false,
    };

    setIngredient([...ingredients, newIngredient]);
  };

  const updateIngredient = (id, field, value) => {
    setIngredient((prevIngredients) =>
      prevIngredients.map((ingredient) =>
        ingredient.id === id ? { ...ingredient, [field]: value } : ingredient
      )
    );
  };

  const removeIngredient = (id) => {
    setIngredient((prevIngredients) =>
      prevIngredients.filter((ingredient) => ingredient.id !== id)
    );
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.6,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const isValid = () => {
    const maxCharactersLength = 40;

    if (name.length === 0 || name.length > maxCharactersLength) return false;

    return !ingredients.some(
      (ingredient) =>
        ingredient.name.length === 0 ||
        ingredient.name.length > maxCharactersLength ||
        isNaN(ingredient.quantity) ||
        ingredient.quantity === 0 ||
        ingredient.quantity > 1000 ||
        !arrayOfUnits.includes(ingredient.units)
    );
  };

  return (
    <>
      <AlertDialog
        visible={alertVisible}
        setVisible={setAlertVisible}
        alertText={
          "Вимоги до форми:\n1. Назва напою і інгридієнтів (до 40 символів)\n2. Числове значення для кількості.\n3. Обрані одиниці виміру."
        }
        alertTitle={"Неправильно заповнено форму!"}
      ></AlertDialog>
      <Dialog
        isVisible={isVisible}
        overlayStyle={[
          styles.dialogWindow,
          {
            backgroundColor: ColorPalette.main.buttons_modalBackground,
          },
        ]}
        {...(isNew && { onBackdropPress: () => setIsVisible(false) })}
        animationType="fade"
      >
        {image ? (
          <Image
            style={styles.addPhotoContainer}
            source={image}
            contentFit="cover"
            transition={1000}
          />
        ) : (
          <Pressable
            style={({ pressed }) => [
              { backgroundColor: pressed ? "grey" : "white" },
              styles.addPhotoContainer,
            ]}
            onPress={() => {
              pickImage();
            }}
          >
            <Text style={[styles.text, textColor]}>Додати фото</Text>
          </Pressable>
        )}

        <Divider width={dividerWidth} />
        <Input
          placeholder="Назва напою"
          value={name}
          onChangeText={setName}
          inputStyle={{
            backgroundColor: "white",
            fontFamily: "KyivTypeSerif-Heavy",
            fontSize: 14,
            color: "black",
          }}
        />

        <Text style={[styles.text, textColor]}>Інгридієнти</Text>
        <View style={styles.textRow}>
          <Text style={[styles.text, styles.flex2, textColor, { fontSize: 8 }]}>
            Назва
          </Text>
          <Text style={[styles.text, styles.flex1, textColor, { fontSize: 8 }]}>
            Кількість
          </Text>
          <Text style={[styles.text, styles.flex1, textColor, { fontSize: 8 }]}>
            Одиниці
          </Text>
          <Text style={[styles.text, styles.flex1, textColor, { fontSize: 8 }]}>
            Перевіряти наявність
          </Text>
        </View>
        <View style={[styles.ingredientContainer]}>
          <ScrollView>
            {ingredients.map((ingredient) => (
              <Ingredient
                key={ingredient.id}
                item={ingredient}
                onDelete={removeIngredient}
                onUpdateIngredient={updateIngredient}
              />
            ))}
          </ScrollView>
        </View>
        <Button
          title={"+"}
          containerStyle={styles.addButtonContainer}
          buttonStyle={styles.addButton}
          titleStyle={textColor}
          type="outline"
          onPress={() => {
            addIngredient();
          }}
        />
        <Divider width={dividerWidth} />
        {isNew ? (
          <Button
            title={"Додати"}
            buttonStyle={{
              backgroundColor: ColorPalette.main.background_modalButtons,
            }}
            titleStyle={[
              {
                color: ColorPalette.main.lightText_listItemsBackground,
              },
              styles.text,
            ]}
            containerStyle={[styles.buttonContainer, { width: "50%" }]}
            onPressOut={() => {
              if (isValid()) {
                onAddMenuItem({
                  id: Date.now(),
                  name: name,
                  image,
                  ingredients,
                });
                setIsVisible(false);
              } else {
                setAlertVisible(true);
              }
            }}
          />
        ) : (
          <View style={{ flexDirection: "row" }}>
            <Button
              title={"Зберегти"}
              buttonStyle={{
                backgroundColor: ColorPalette.main.background_modalButtons,
              }}
              titleStyle={[
                {
                  color: ColorPalette.main.lightText_listItemsBackground,
                },
                styles.text,
              ]}
              containerStyle={[styles.buttonContainer, styles.buttonMargin]}
              onPress={() => {
                if (isValid()) {
                  onUpdateMenuItem(menuItem.id, {
                    name,
                    image,
                    ingredients,
                  });
                  setIsVisible(false);
                } else {
                  setAlertVisible(true);
                }
              }}
            />
            <Button
              title={"Видалити"}
              buttonStyle={{
                backgroundColor: ColorPalette.main.notButtons,
              }}
              titleStyle={[
                {
                  color: "black",
                },
                styles.text,
              ]}
              containerStyle={[styles.buttonContainer, styles.buttonMargin]}
              onPress={() => {
                onRemoveMenuItem(menuItem.id);
                setIsVisible(false);
              }}
            />
          </View>
        )}
      </Dialog>
    </>
  );
};

export default MenuItemDialog;

const styles = StyleSheet.create({
  dialogWindow: {
    alignItems: "center",
  },
  addPhotoContainer: {
    width: 150,
    height: 150,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontFamily: "KyivTypeSerif-Heavy",
    textAlign: "center",
    fontSize: 14,
  },
  textRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  flex1: {
    flex: 1,
  },
  flex2: {
    flex: 2,
  },
  ingredientContainer: {
    height: 200,
    width: "100%",
    backgroundColor: "white",
  },
  addButtonContainer: {
    width: "100%",
    height: 30,
  },
  addButton: {
    margin: 0,
    padding: 0,
    backgroundColor: "white",
  },
  buttonContainer: {
    marginVertical: "2%",
    borderRadius: 5,
    shadowColor: "#000",

    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,
    elevation: 24,
  },
  buttonMargin: {
    marginHorizontal: "5%",
  },
});
