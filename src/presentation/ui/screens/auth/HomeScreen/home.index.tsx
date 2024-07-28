import { FC, useEffect, useMemo, useState } from "react";
import { useHomeViewModel } from "@/presentation/viewmodels/auth/HomeViewModel/hooks/home.hook";
import { ActivityIndicator, FlatList, Keyboard, Text, TouchableOpacity, View } from "react-native";
import { IHome } from "@/presentation/ui/screens/auth/HomeScreen/types/home.type";
import { SafeAreaContainer } from "@/presentation/ui/components/SafeAreaContainer/safeAreaContainer.index";
import { Feather } from '@expo/vector-icons';
import { InputCustom } from "@/presentation/ui/components/InputCustom/inputCustom.index";
import { ListEmptyComponent } from "@/presentation/ui/components/ListEmptyComponent/listEmptyComponent.index";

import colors from '@/presentation/ui/styles/colors.json'
import { ListItemStudents } from "@/presentation/ui/components/ListItemStudents/listItemStudents.index";
import { Header } from "@/presentation/ui/components/Header/header.index";
import { MultipleSkeletonLoaders } from "@/presentation/ui/components/SkeletonLoader/SkeletonLoader";

const HomeScreen: FC<IHome.Input> = () => {

    const { isFetchingNextPage, fetchNextPageCustom, searchTerm, handleSearch, filteredData, dataStudentsInfinity, insets, isFetching, onRefreshFlatList: onRefreshFlatListCustom, refetchActivated } = useHomeViewModel({})

    const studentsDataQuery = dataStudentsInfinity

    const [stateRefresh, setStateRefresh] = useState(true);

    const contactsPlaceholderList = useMemo(() => {
        return Array.from({ length: 8 }).map(_ => null);
    }, []);

    async function onRefreshFlatList() {
        setStateRefresh(true)
        onRefreshFlatListCustom()
        await new Promise(resolve => setTimeout(resolve, 500));
        setStateRefresh(false)
    }

    async function settableRefreshFalse() {
        await new Promise(resolve => setTimeout(resolve, 500));
        setStateRefresh(false)
    }


    useEffect(() => {
        settableRefreshFalse()
    }, [])


    return (
        <>

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
                    !filteredData?.[0] && searchTerm.length > 0 &&
                    <ListEmptyComponent />
                }

                {stateRefresh &&
                    <MultipleSkeletonLoaders />
                }

                {
                    (filteredData?.[0] || studentsDataQuery?.[0]) && !stateRefresh &&

                    <FlatList
                        showsVerticalScrollIndicator={false}
                        data={searchTerm.length >0 ? filteredData : studentsDataQuery}
                        numColumns={1}
                        contentContainerStyle={{ paddingBottom: 30, paddingTop: 25 }}
                        renderItem={({ item }) => <ListItemStudents data={item}
                        //   toggleFn={toggleSheetStudentSelected}
                        //   setDataSelected={setDataSelected}

                        />}
                        keyExtractor={(item, index) => index.toString()}
                        onEndReached={() => searchTerm.length === 0 ? fetchNextPageCustom() : null}

                        ListFooterComponent={() => (
                            searchTerm.length === 0? (
                                <View className="py-6 w-full items-center gap-y-2" >
                                    <ActivityIndicator color={colors.neutral[300]} />
                                    <Text className=" font-karla700Bold text-lg text-neutral-300 leading-[20px] ">Carregando mais...</Text>
                                </View>
                            ) : null
                        )}

                        onEndReachedThreshold={0.1}
                        ItemSeparatorComponent={() => <View className='py-3' />}
                        refreshing={false}
                        onRefresh={() => onRefreshFlatList()}
                    />
                }

            </SafeAreaContainer>
        </>

    );
};

export { HomeScreen }