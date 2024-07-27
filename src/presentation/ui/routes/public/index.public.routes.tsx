import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { LoginScreen } from "@/presentation/ui/screens/public/LoginScreen/login.index";
import { IRoute } from "../types/route.type";

const PublicStackNavigator = createNativeStackNavigator<IRoute.PublicStackRoutes>();

export const PublicRoutes = (props:any) => {

  return (
    <PublicStackNavigator.Navigator initialRouteName={props.route.params || "login"} screenOptions={{ headerShown: false } } >
      <PublicStackNavigator.Screen name="login" component={LoginScreen}  /> 
    </PublicStackNavigator.Navigator>
  )
}