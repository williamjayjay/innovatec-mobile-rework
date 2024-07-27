import { FC } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { PublicRoutes } from "./public/index.public.routes";
import { AuthRoutes } from "./auth/index.auth.routes";
import { IRoute } from "./types/route.type";

const RootNavigator = createNativeStackNavigator<IRoute.RootStackParamList>();

type RoutesProps = Pick<IRoute.Input, 'initialRoute'>;

export const Routes: FC<RoutesProps> = ({ initialRoute }) => {

    return (
        <RootNavigator.Navigator
            screenOptions={{
                headerShown: false,
            }}
            initialRouteName={initialRoute.rootStack}
        >
            <RootNavigator.Screen
                name="auth"
                component={AuthRoutes}
                initialParams={{
                    screen: initialRoute.rootStackScreen || 'home',
                } as IRoute.RootStackParamList['auth']}
            />

            <RootNavigator.Screen
                name="public"
                component={PublicRoutes}
                initialParams={{
                    screen: initialRoute.rootStackScreen || 'login',
                } as IRoute.RootStackParamList['public']}
            />
        </RootNavigator.Navigator>
    );
}
