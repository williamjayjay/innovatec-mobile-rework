import * as SplashScreen from 'expo-splash-screen'
import { IMain } from "./types/main.type";
import { useMain } from "./hooks/main.hook";
import { FC } from 'react';
import { AllModelsContexts } from '@/presentation/contexts/AllModels/allModel.index';
import { HomeScreen } from '../HomeScreen/home.index';
import { ReactQuery } from '@/presentation/contexts/ReactQuery/reactQuery.index';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';

SplashScreen.preventAutoHideAsync().then()

const Main: FC<IMain.Input> = (props = {}) => {
    const { fontsLoaded, fontError, onLayoutRootView } = useMain(props);

    if (!fontsLoaded && !fontError) {
        return null;
    }

    return (
        <>
            <View className="flex-1" testID="main" onLayout={onLayoutRootView}>
                <ReactQuery>
                    <AllModelsContexts  >
                        <HomeScreen  />
                    </AllModelsContexts>
                </ReactQuery>
            </View>
            <StatusBar style="auto" />
        </>


    );
};

export { Main }