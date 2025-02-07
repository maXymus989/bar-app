import { Tabs } from "expo-router";
import { ColorThemeContext } from "../index";
import { useContext } from "react";

export default function TabLayout() {
  const ColorPalette = useContext(ColorThemeContext);
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarLabelPosition: "beside-icon",
        tabBarIconStyle: { display: "none" },
        tabBarPosition: "top",
        tabBarStyle: {
          height: "8%",
          backgroundColor: ColorPalette.main.buttons_modalBackground,
        },
        tabBarItemStyle: {
          borderWidth: 1,
          borderRightWidth: 0,
        },
        tabBarLabelStyle: {
          color: ColorPalette.main.darkText,
          fontFamily: "KyivTypeSerif-Heavy",
          fontSize: 15,
        },
        tabBarActiveBackgroundColor: "rgb(207, 185, 151)",
      }}
    >
      <Tabs.Screen
        name="storage"
        options={{
          title: "Сховище",
        }}
      />
      <Tabs.Screen
        name="orders"
        options={{
          title: "Замовлення",
        }}
      />
      <Tabs.Screen
        name="menu"
        options={{
          title: "Меню",
        }}
      />
    </Tabs>
  );
}
