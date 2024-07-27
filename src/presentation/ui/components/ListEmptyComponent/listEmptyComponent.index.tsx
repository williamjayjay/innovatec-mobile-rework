import { View , Text} from "react-native";

export const ListEmptyComponent = () => (
    <View className="py-6 w-full items-center gap-y-2 " >
      <Text className=" font-karla700Bold text-lg text-neutral-300 leading-[20px] ">Nenhum dado disponível</Text>
    </View>
  );