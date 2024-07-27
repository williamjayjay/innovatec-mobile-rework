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
import { IRoute } from "@/presentation/ui/routes/types/route.type";

import { useCallback, useEffect, useMemo, useState } from 'react';
import { IMain } from '../types/main.type';

export const useMain = ({ awaitSplashTimer = 100 }: IMain.Input): IMain.Output => {

  const [fontsLoaded, fontError] = useFonts({
    Karla_200ExtraLight,
    Karla_300Light,
    Karla_400Regular,
    Karla_500Medium,
    Karla_600SemiBold,
    Karla_700Bold
  });

  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    let cleartimer: NodeJS.Timeout;

    if (fontsLoaded) {

      cleartimer = setTimeout(() => {
        setAppIsReady(true);
      }, awaitSplashTimer);

    }
    return () => {

      if (cleartimer) clearTimeout(cleartimer);

    };
  }, [awaitSplashTimer, fontsLoaded]);


  const isLoaded = appIsReady 

  console.log('appIsReady --->',appIsReady)

  const onLayoutRootView = useCallback(async () => {
    if (isLoaded) {

      await SplashScreen.hideAsync();
    }
  }, [isLoaded,]);

  const initialRoute = useMemo(() => {

    return {
      rootStack: "public",
      rootStackScreen: "home",
    };

  }, []) as IRoute.Input['initialRoute']

  return {
    onLayoutRootView,
    initialRoute,
    isLoaded
  };
};
