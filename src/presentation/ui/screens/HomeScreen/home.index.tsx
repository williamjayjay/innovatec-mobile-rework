import { useHomeViewModel } from "@/presentation/viewmodels/HomeViewModel/hooks/home.hook";
import { FC } from "react";
import { Text } from "react-native";
import { IHome } from "./types/home.type";
import { SafeAreaContainer } from "@/presentation/ui/components/SafeAreaContainer/safeAreaContainer.index";

const HomeScreen: FC<IHome.Input> = () => {

    const { students } = useHomeViewModel({})

    console.log('students', students.length)

    return (
        <SafeAreaContainer haveKeyboard >
                <Text className="font-karla600SemiBold" >Ola mundo</Text>
                <Text className="font-karla200ExtraLight" >Ola mundo</Text>
        </SafeAreaContainer>
    );
};

export { HomeScreen }