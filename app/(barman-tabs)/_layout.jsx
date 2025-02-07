import { Tabs } from "expo-router";

export default function TabLayout() {
  const commonTabsOptions = {
    headerShown: false,
    tabBarLabelPosition: "beside-icon",
    tabBarIconStyle: { display: "none" },
    tabBarPosition: "top",
  };

  return (
    <Tabs>
      <Tabs.Screen
        name="storage"
        options={{
          title: "Сховище",
          ...commonTabsOptions,
        }}
      />
      <Tabs.Screen
        name="orders"
        options={{
          title: "Замовлення",
          ...commonTabsOptions,
        }}
      />
      <Tabs.Screen
        name="menu"
        options={{
          title: "Меню",
          ...commonTabsOptions,
        }}
      />
    </Tabs>
  );
}
