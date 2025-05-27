import { useState, useContext, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { Image } from "expo-image";
import { useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "@rneui/base";
import { ColorThemeContext } from "./index";
import useBarStore from "../state";
import ConfirmDialog from "../Components/ConfirmDialog";

const GuestOrder = () => {
  const ColorPalette = useContext(ColorThemeContext);
  const textColor = { color: ColorPalette.main.darkText };

  const [data, setData] = useState({
    minPrice: 0,
    maxPrice: 0,
    volume: 0,
    ingredientsText: "",
  });
  const [textPrice, setTextPrice] = useState("");
  const [missingIngredients, setMissingIngredients] = useState([]);

  const [confirmationText, setConfirmationText] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);

  const {
    menu,
    storage,
    isStorageLoaded,
    isMenuLoaded,
    fetchStorageData,
    fetchMenuData,
    addOrder,
    guestUsername,
  } = useBarStore();
  const params = useLocalSearchParams();
  const index = parseInt(params.index);

  const addMissingIngredient = (ingredient) => {
    setMissingIngredients((prev) =>
      prev.includes(ingredient) ? prev : [...prev, ingredient]
    );
  };

  const onAddOrder = () => {
    const now = new Date();
    addOrder({
      id: Date.now(),
      orderName: menu[index].name,
      date: now.toISOString().split("T")[0],
      time: now.toTimeString().split(" ")[0],
      price: textPrice,
      clientName: guestUsername,
    });
  };

  useEffect(() => {
    setTextPrice(
      data.minPrice === data.maxPrice
        ? parseFloat(data.minPrice) + " грн"
        : data.minPrice + " - " + data.maxPrice + " грн"
    );
  }, [data.minPrice]);

  useEffect(() => {
    if (!isStorageLoaded) {
      try {
        fetchStorageData(true);
      } catch (e) {
        console.error(e);
      }
    }
  }, [isStorageLoaded]);

  useEffect(() => {
    if (!isMenuLoaded) {
      try {
        fetchMenuData(true);
      } catch (e) {
        console.error(e);
      }
    }
  }, [isMenuLoaded]);

  useEffect(() => {
    if (isStorageLoaded && isMenuLoaded) {
      let totalMinPrice = 0;
      let totalMaxPrice = 0;

      menu[index].ingredients.forEach((ingredient) => {
        if (ingredient.isRequired && ingredient.units === "мл") {
          const matchingOptions = storage.filter(
            (option) =>
              option.inStock === true &&
              option.type
                .split(",")
                .map((s) => s.trim().toLowerCase())
                .includes(ingredient.name.toLowerCase())
          );

          if (matchingOptions.length === 0) {
            addMissingIngredient(ingredient.name.toLowerCase());
          } else {
            const minPrice = Math.min(
              ...matchingOptions.map(
                (option) =>
                  (parseFloat(option.price) * parseFloat(ingredient.quantity)) /
                  (parseFloat(option.volume) * 1000)
              )
            );
            totalMinPrice += minPrice;
            const maxPrice = Math.max(
              ...matchingOptions.map(
                (option) =>
                  (parseFloat(option.price) * parseFloat(ingredient.quantity)) /
                  (parseFloat(option.volume) * 1000)
              )
            );
            totalMaxPrice += maxPrice;
          }
        }
      });

      setData({
        volume: menu[index].ingredients.reduce((acc, ingredient) => {
          if (ingredient.units === "мл")
            return acc + parseInt(ingredient.quantity);
          else return acc;
        }, 0),
        ingredientsText: menu[index].ingredients
          .map(
            (ingredient) =>
              `${ingredient.name} (${ingredient.quantity} ${ingredient.units})`
          )
          .join(", "),
        minPrice: totalMinPrice.toFixed(2),
        maxPrice: totalMaxPrice.toFixed(2),
      });
    }
  }, [isStorageLoaded]);

  return (
    <SafeAreaView
      style={[
        styles.window,
        { backgroundColor: ColorPalette.main.background_modalButtons },
      ]}
    >
      {!isStorageLoaded && !isMenuLoaded ? (
        <ActivityIndicator size="large" color={"white"} />
      ) : (
        <>
          {menu[index].image ? (
            <Image
              style={styles.photoContainer}
              source={menu[index].image}
              contentFit="cover"
              transition={1000}
            />
          ) : (
            <View style={[{ backgroundColor: "white" }, styles.photoContainer]}>
              <Text style={[styles.text, textColor]}>Німа фото</Text>
            </View>
          )}
          <Text
            style={[
              styles.text,
              styles.beverageName,
              {
                color: ColorPalette.main.lightText_listItemsBackground,
              },
            ]}
          >
            {menu[index].name}
          </Text>

          <View
            style={{ flexDirection: "row", marginTop: "10%", width: "60%" }}
          >
            <View style={{ flex: 1 }}>
              <Text
                style={[
                  styles.text,
                  {
                    color: ColorPalette.main.lightText_listItemsBackground,
                  },
                ]}
              >
                Об'єм:
              </Text>
              <Text
                style={[
                  styles.text,
                  {
                    color: ColorPalette.main.lightText_listItemsBackground,
                  },
                ]}
              >
                Вартість:
              </Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text
                style={[
                  styles.text,
                  {
                    color: ColorPalette.main.lightText_listItemsBackground,
                  },
                ]}
              >
                {data.volume} мл
              </Text>
              <Text
                style={[
                  styles.text,
                  {
                    color: ColorPalette.main.lightText_listItemsBackground,
                  },
                ]}
              >
                {textPrice}
              </Text>
            </View>
          </View>

          <View style={{ height: 150, width: "70%", marginTop: "5%" }}>
            <ScrollView>
              <Text
                style={[
                  styles.text,
                  {
                    color: ColorPalette.main.lightText_listItemsBackground,
                  },
                ]}
              >
                {data.ingredientsText}
              </Text>
            </ScrollView>
          </View>

          <Button
            title={"Замовити"}
            buttonStyle={{
              backgroundColor: ColorPalette.main.buttons_modalBackground,
            }}
            titleStyle={{
              color: ColorPalette.main.darkText,
              fontFamily: "KyivTypeSerif-Heavy",
              fontSize: 24,
            }}
            containerStyle={styles.buttonContainer}
            onPress={() => {
              let text =
                'Упевнені, що хочете замовити "' + menu[index].name + '"?';
              missingIngredients.length !== 0 &&
                (text +=
                  "\nБракує таких інгредієнтів:\n" +
                  missingIngredients.join(", "));
              setConfirmationText(text);
              setShowConfirmation(true);
            }}
          />

          {showConfirmation && (
            <ConfirmDialog
              visible={showConfirmation}
              setVisible={setShowConfirmation}
              confirmationText={confirmationText}
              trueOptionText={"Так"}
              falseOptionText={"Ні"}
              callback={onAddOrder}
            />
          )}
        </>
      )}
    </SafeAreaView>
  );
};

export default GuestOrder;

const styles = StyleSheet.create({
  window: {
    flex: 1,
    alignItems: "center",
  },
  text: {
    fontSize: 18,
    fontFamily: "KyivTypeSerif-Heavy",
  },
  beverageName: {
    textAlign: "center",
    fontSize: 30,
    marginTop: "10%",
    width: "90%",
    fontFamily: "KyivTypeSerif-Medium",
  },
  buttonContainer: {
    marginTop: "10%",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,
    elevation: 24,
  },
  photoContainer: {
    marginTop: "20%",
    width: 200,
    height: 200,
    alignItems: "center",
    justifyContent: "center",
  },
});
