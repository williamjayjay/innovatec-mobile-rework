import { useHomeViewModel } from "@/presentation/viewmodels/HomeViewModel/hooks/home.hook";
import { StatusBar } from "expo-status-bar";
import { FC } from "react";
import { View , Text} from "react-native";
import { IHome } from "./types/home.type";

 const HomeScreen: FC<IHome.Input> = () => {

    const { students} = useHomeViewModel({})

    console.log('students',students.length)

    return (
            <View  className="flex-1 items-center justify-center bg-blue-300">
                <Text className="font-karla600SemiBold" >Ola mundo</Text>
                <Text className="font-karla200ExtraLight" >Ola mundo</Text>
                <Text className="font-karla700Bold" >Ola mundo</Text>
                <StatusBar style="light" />
            </View>

    );
};

export {HomeScreen}