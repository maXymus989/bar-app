import { Button } from "@rneui/base";
import { useRouter } from "expo-router";

const Orders = () => {
  const router = useRouter();

  return (
    <Button
      title={"Go home"}
      onPress={() => {
        router.push("../..");
      }}
    />
  );
};

export default Orders;
