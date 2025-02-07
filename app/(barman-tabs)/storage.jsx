import { Button } from "@rneui/base";
import { useRouter } from "expo-router";

const Storage = () => {
  const router = useRouter();

  return (
    <Button
      title={"Go home"}
      onPress={() => {
        router.push("..", { relativeToDirectory: true });
      }}
    />
  );
};

export default Storage;
