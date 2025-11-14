import { Link, Stack } from "expo-router";
import { Text, View } from "react-native";

export default function Home() {
  return (
    <>
      <Stack.Screen options={{ title: "Tela de Login" }} />
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor:"#FFF" }}>
        <Text>Faça seu login</Text>
        <Link href="/">Voltar</Link>
      </View>
    </>
  );
}
