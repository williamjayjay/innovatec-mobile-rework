import { FC } from "react";
import { useHomeViewModel } from "@/presentation/viewmodels/auth/HomeViewModel/hooks/home.hook";
import { ActivityIndicator, Keyboard, Text, TouchableOpacity, View } from "react-native";
import { IHome } from "@/presentation/ui/screens/auth/HomeScreen/types/home.type";
import { SafeAreaContainer } from "@/presentation/ui/components/SafeAreaContainer/safeAreaContainer.index";
import { Feather } from '@expo/vector-icons';
import { InputCustom } from "@/presentation/ui/components/InputCustom/inputCustom.index";
import { ListEmptyComponent } from "@/presentation/ui/components/ListEmptyComponent/listEmptyComponent.index";

import colors from '@/presentation/ui/styles/colors.json'
import { FlashList } from "@shopify/flash-list";
import { ListItemStudents } from "@/presentation/ui/components/ListItemStudents/listItemStudents.index";
import { Header } from "@/presentation/ui/components/Header/header.index";

const HomeScreen: FC<IHome.Input> = () => {

    const { isFetchingNextPage, fetchNextPageCustom, searchTerm, handleSearch, filteredData, dataStudentsInfinity, insets, isFetching, onRefreshFlatList, refetchActivated } = useHomeViewModel({})

    const studentsDataQuery = dataStudentsInfinity

    return (
        <>
         {refetchActivated && <ActivityIndicator size='large' color={colors.neutral[800]} className=" self-center z-[99] top-[50%] absolute" />}
        <SafeAreaContainer disableScroll containerClassName="bg-base-light px-4" >

            <TouchableOpacity
                activeOpacity={1}
                onPress={() => Keyboard.dismiss()}
                className="flex bg-main-25 flex-col items-end justify-end"
                style={{
                    paddingTop: insets.top / 2, paddingBottom: insets.top / 2,
                    //   pointerEvents: dataSelected ? 'none' : 'auto'
                }}
            >
                <Header title="InnovaTech" />

            </TouchableOpacity>

            <View className="flex-row items-center mb-1" >
                <InputCustom
                    placeholder="nome ou sobrenome..."
                    containerClassName="w-[90%] text-[30px] pr-[4px]"
                    inputClassName='h-[50px]'
                    inputInternalClassName='text-[18px]'
                    value={searchTerm}
                    onChangeText={(value: string) => handleSearch(value)}
                />

                <TouchableOpacity
                    onPress={() => Keyboard.dismiss()}
                >
                    {/* add funcao para alterar cor do filtro */}
                    <Feather name="filter" size={30} color='#000' />
                </TouchableOpacity>
            </View>


            {
                !filteredData?.[0] && searchTerm.length > 1 &&
                <ListEmptyComponent />
            }

            {
                (filteredData?.[0] || studentsDataQuery?.[0]) &&

                <FlashList
                    showsVerticalScrollIndicator={false}
                    data={searchTerm.length > 1 ? filteredData : studentsDataQuery}
                    estimatedItemSize={100}
                    numColumns={1}
                    contentContainerStyle={{ paddingBottom: 30, paddingTop: 25 }}
                    renderItem={({ item }) => <ListItemStudents data={item}
                    //   toggleFn={toggleSheetStudentSelected}
                    //   setDataSelected={setDataSelected}

                    />}
                    keyExtractor={(item, index) => index.toString()}
                    onEndReached={() => fetchNextPageCustom()}
                    ListFooterComponent={() => (
                        isFetchingNextPage ? (
                            <View className="py-6 w-full items-center gap-y-2" >
                                <ActivityIndicator color={colors.neutral[300]} />
                                <Text className=" font-karla700Bold text-lg text-neutral-300 leading-[20px] ">Carregando mais...</Text>
                            </View>
                        ) : null
                    )}
                    onEndReachedThreshold={0.1}
                    ItemSeparatorComponent={() => <View className='py-3' />}
                    refreshing={isFetching}
                    onRefresh={() => onRefreshFlatList()}
                />
            }

        </SafeAreaContainer>
        </>

    );
};

export { HomeScreen }