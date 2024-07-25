import { useHomeViewModel } from "@/presentation/viewmodels/HomeViewModel/hooks/home.hook";
import { FC } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { IHome } from "@/presentation/ui/screens/HomeScreen/types/home.type";
import { SafeAreaContainer } from "@/presentation/ui/components/SafeAreaContainer/safeAreaContainer.index";
import { Feather } from '@expo/vector-icons';
import { InputCustom } from "@/presentation/ui/components/InputCustom/inputCustom.index";
import { ListEmptyComponent } from "@/presentation/ui/components/ListEmptyComponent/listEmptyComponent.index";

const HomeScreen: FC<IHome.Input> = () => {

    const { students, searchTerm, handleSearch, filteredData } = useHomeViewModel({})

    console.log('students', students.length)

    return (
        <SafeAreaContainer haveKeyboard >
            <Text className="font-karla600SemiBold" >Ola mundo</Text>
            <Text className="font-karla200ExtraLight" >Ola mundo</Text>

            <View className="flex-row items-center mb-1" >
                <InputCustom
                    placeholder="nome ou sobrenome..."
                    containerClassName="w-[90%] text-[30px] pr-[4px]"
                    inputClassName='h-[50px]'
                    // inputInternalClassName='text-[18px]'
                    // value={searchTerm}
                    value={'teste'}
                    // onChangeText={(value: string) => handleSearch(data, value)}
                    onChangeText={(value: string) => { }}
                />


                <TouchableOpacity onPress={() => { }} >
                    {/* add funcao para alterar cor do filtro */}
                    <Feather name="filter" size={30} color='#000' />
                </TouchableOpacity>
            </View>

            {
                !filteredData?.[0] && searchTerm.length > 1 &&
                <ListEmptyComponent />
            }



        </SafeAreaContainer>
    );
};

export { HomeScreen }