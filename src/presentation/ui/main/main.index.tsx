import { IMain } from "./types/main.type";
import { useMain } from "./hooks/main.hook";
import { FC } from 'react';
import { AllModelsContexts } from '@/presentation/contexts/AllModels/allModel.index';
import { ReactQuery } from '@/presentation/contexts/ReactQuery/reactQuery.index';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Routes } from '@/presentation/ui/routes/main.routes';
import { NavigationContainer } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import { ToastNotification } from '@/presentation/ui/components/ToastNotification/toastNotification.index';

const Main: FC<IMain.Input> = (props = {}) => {
    const { onLayoutRootView, initialRoute, isLoaded } = useMain(props);
    if (!isLoaded) {
        return null;
    }

    console.log('initialRoute -> >> ', initialRoute)

    return (
        <NavigationContainer>

            <SafeAreaProvider>
                <View className="flex-1" testID="main" onLayout={onLayoutRootView}>

                    <ReactQuery>
                        <AllModelsContexts  >
                            <Routes initialRoute={initialRoute} />
                            <Toast
                                position="top"
                                config={{
                                    success: (props) => <ToastNotification   {...props} type="success" />,
                                    error: (props) => <ToastNotification   {...props} type="error" />,
                                }}
                            />
                        </AllModelsContexts>
                    </ReactQuery>
                </View>
                <StatusBar style="auto" />
            </SafeAreaProvider>
        </NavigationContainer>

    );
};

export { Main }