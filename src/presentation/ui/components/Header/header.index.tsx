import { Text, View } from "react-native";

interface HeaderProps {
  title: string;
}

export const Header = ({title}:HeaderProps) => {

  return (
    <View
      className="w-full items-center justify-center">

        <Text numberOfLines={2} className="font-karla700Bold text-3xl text-neutral-800" >{title}</Text>
      
    </View>
  )
}
