import { SafeAreaContainer } from "@/presentation/ui/components/SafeAreaContainer/safeAreaContainer.index";
import { Header } from "@/presentation/ui/components/Header/header.index";
import { ButtonCustom } from "@/presentation/ui/components/ButtonCustom/buttonCustom.index";
import { useLoginViewModel } from "@/presentation/viewmodels/public/LoginViewModel/hooks/login.hook";
import { View } from "react-native";

const LoginScreen = () => {
    const { insets, navigateToHome } = useLoginViewModel()

    return (
        <SafeAreaContainer disableScroll containerClassName="bg-base-light px-4" >

            <View
                className="flex bg-main-25 flex-col items-end justify-end"
                style={{
                    paddingTop: insets.top / 2, paddingBottom: insets.top / 2,
                    //   pointerEvents: dataSelected ? 'none' : 'auto'
                }}>
                <Header title="InnovaTech" />

            </View>

            <View className="h-full items-center justify-center" >

                <ButtonCustom onPress={() => navigateToHome()} title="Entrar" />

            </View>


        </SafeAreaContainer>
    );
};

export { LoginScreen }