import { StackActions, useNavigation } from "@react-navigation/native";
import { useCallback } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Toast from 'react-native-toast-message';

export const useLoginViewModel = () => {

  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  const navigateToHome = useCallback(async () => {

    navigation.dispatch(
      StackActions.push("auth", {
        screen: "home",
      }));

    Toast.show({
      type: 'success',
      text1: 'Usuario logado com sucesso!',
  });
  }, []);

  return {
    insets,
    navigateToHome
  };
};
