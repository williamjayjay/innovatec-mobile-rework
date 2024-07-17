import React, { FC } from "react";
import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import * as SplashScreen from 'expo-splash-screen'
import { IMain } from "./types/main.type";
import { useMain } from "./hooks/main.hook";
import { StudentsRepository } from "@/data/repositories/Students/StudentsRepository";

SplashScreen.preventAutoHideAsync().then()

export const Main: FC<IMain.Input> = (props = {}) => {
    const { fontsLoaded, fontError, onLayoutRootView } = useMain(props);

    if (!fontsLoaded && !fontError) {
        return null;
    }

    const instanceStudentsRepository = new StudentsRepository('/api');

    const teste = async () => {
        const resultSturentRepository = await instanceStudentsRepository.getStudents({
            page:0,
            results:10,
            include:'gender,name,location,email,login,dob,phone,picture,nat',
            gender:'male'
        })
        console.log('resultSturentRep2ository', resultSturentRepository)
    }

    teste()

    return (

        <View onLayout={onLayoutRootView} className="flex-1 items-center justify-center bg-blue-300">
            <Text className="font-karla600SemiBold" >Ola mundo</Text>
            <Text className="font-karla200ExtraLight" >Ola mundo</Text>
            <Text className="font-karla700Bold" >Ola mundo</Text>
            <StatusBar style="light" />
        </View>


    );
};
