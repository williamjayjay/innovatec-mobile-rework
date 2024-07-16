import {
  useFonts,
  Karla_200ExtraLight,
  Karla_300Light,
  Karla_400Regular,
  Karla_500Medium,
  Karla_600SemiBold,
  Karla_700Bold
} from '@expo-google-fonts/karla';
import * as SplashScreen from 'expo-splash-screen'

import { useCallback } from 'react';
import { IMain } from '../types/main.type';

export const useMain = ({ }: IMain.Input): IMain.Output => {

  const [fontsLoaded, fontError] = useFonts({
    Karla_200ExtraLight,
    Karla_300Light,
    Karla_400Regular,
    Karla_500Medium,
    Karla_600SemiBold,
    Karla_700Bold
  });

  const onLayoutRootView = useCallback(async () => {
    console.log('step 1 - onLayoutRootView')
    if (fontsLoaded || fontError) {
      console.log('step 2 - onLayoutRootView')

      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);


  return {
    fontsLoaded,
    fontError,
    onLayoutRootView,

  };
};
