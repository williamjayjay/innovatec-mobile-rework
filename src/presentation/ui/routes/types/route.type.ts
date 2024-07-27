
export namespace IRoute {

    export interface Input {
        initialRoute: {
            rootStack: 'auth' | 'public';
            rootStackScreen: 'login' | 'home';
        };
    }

    export type RootStackParamList = {
        auth: {
            screen: 'home'
        }

        public: {
            screen: 'login' 
        }

    }

    export type AuthStackRoutes = {
        home: undefined;
    };

    export type PublicStackRoutes = {
        login: undefined;
    };
}




