import * as SplashScreen from 'expo-splash-screen'
import { IMain } from "./types/main.type";
import { useMain } from "./hooks/main.hook";
import { FC } from 'react';
import { AllModelsContexts } from '@/presentation/contexts/AllModels/allModel.index';
import { HomeScreen } from '../HomeScreen/home.index';

SplashScreen.preventAutoHideAsync().then()

 const Main: FC<IMain.Input> = (props = {}) => {
    const { fontsLoaded, fontError, onLayoutRootView } = useMain(props);

    if (!fontsLoaded && !fontError) {
        return null;
    }

    return (

        <AllModelsContexts  >
         <HomeScreen onLayoutRootView={onLayoutRootView}/>
        </AllModelsContexts>

    );
};

export {Main}