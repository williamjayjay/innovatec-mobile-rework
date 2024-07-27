import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { IRoute } from "../types/route.type";
import { HomeScreen } from "../../screens/auth/HomeScreen/home.index";

const AuthStackRoutes = createNativeStackNavigator<IRoute.AuthStackRoutes>();

export const AuthRoutes = () => {

  return (
    <AuthStackRoutes.Navigator screenOptions={{ headerShown: false }}>
      <AuthStackRoutes.Screen name="home" component={HomeScreen} />
    </AuthStackRoutes.Navigator>
  )
}
