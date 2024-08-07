import { FC, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useHomeViewModel } from "@/presentation/viewmodels/auth/HomeViewModel/hooks/home.hook";
import { ActivityIndicator, Button, FlatList, Keyboard, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { IHome } from "@/presentation/ui/screens/auth/HomeScreen/types/home.type";
import { SafeAreaContainer } from "@/presentation/ui/components/SafeAreaContainer/safeAreaContainer.index";
import { Feather } from '@expo/vector-icons';
import { InputCustom } from "@/presentation/ui/components/InputCustom/inputCustom.index";
import { ListEmptyComponent } from "@/presentation/ui/components/ListEmptyComponent/listEmptyComponent.index";

import colors from '@/presentation/ui/styles/colors.json'
import { ListItemStudents } from "@/presentation/ui/components/ListItemStudents/listItemStudents.index";
import { Header } from "@/presentation/ui/components/Header/header.index";
import { MultipleSkeletonLoaders } from "@/presentation/ui/components/SkeletonLoader/SkeletonLoader";
import { BottomSheetStudentAnimated } from "@/presentation/ui/components/BottomSheetStudentAnimated";
import { BottomSheetAnimated } from "@/presentation/ui/components/BottomSheetAnimated";
import { SwitchAnimated } from "@/presentation/ui/components/SwitchAnimated";
import BottomSheet, { BottomSheetHandleProps, BottomSheetModal, BottomSheetScrollView, BottomSheetView } from "@gorhom/bottom-sheet";
import { BottomSheetStudentAnimatedV2 } from "@/presentation/ui/components/BottomSheetStudentAnimatedV2";
import { HandleBottomSheet } from "@/presentation/ui/components/HandleBottomSheet";
import { useSharedValue } from "react-native-reanimated";

const HomeScreen: FC<IHome.Input> = () => {

    const { fetchNextPageCustom, searchTerm, handleSearch, filteredData, dataStudentsInfinity, insets, onRefreshFlatList: onRefreshFlatListCustom, dataSelected, setDataSelected, isOpenStudentSelected, closeSheetStudentSelected, toggleSheetStudentSelected, isOpen,
        filterByGender, setFilterByGender, toggleSheet, closeSheet, convertGenderColor } = useHomeViewModel({})

    const studentsDataQuery = dataStudentsInfinity

    const [stateRefresh, setStateRefresh] = useState(false);
    const [positionAnimated, setPositionAnimated] = useState(-1);

    const animatedIndex = useSharedValue(0); // exemplo de uso com useSharedValue


    console.log('positionAnimated', positionAnimated)

    async function onRefreshFlatList() {
        setStateRefresh(true)
        await onRefreshFlatListCustom()
        await new Promise(resolve => setTimeout(resolve, 300));
        setStateRefresh(false)
    }


    // ref
    // const bottomSheetRef = useRef<BottomSheet>(null);

    // callbacks
    // const handleSheetChanges = useCallback((index: number) => {
    //     console.log('handleSheetChanges', index);
    // }, []);

    // const snapPoints = useMemo(() => ["0%", "50%"], []);

    // ref
    const bottomSheetModalRef = useRef<BottomSheetModal>(null);

    // variables
    const snapPoints = useMemo(() => ["25%", "50%", "80%"], []);


    const handleSheetChanges = useCallback((index: number) => {
        console.log('handleSheetChanges', index);
        animatedIndex.value = index
        setPositionAnimated(index)


    }, []);

    // callbacks
    const handlePresentModalPress = useCallback(() => {
        bottomSheetModalRef.current?.present();

    }, []);


    console.log('studentsDataQuerystudentsDataQuery',studentsDataQuery)


    return (

        <SafeAreaContainer disableScroll containerClassName="bg-base-light px-4" >


            <TouchableOpacity
                activeOpacity={1}
                onPress={() => Keyboard.dismiss()}
                className="flex bg-main-25 flex-col items-end justify-end"

                style={{
                    paddingTop: insets.top / 2, paddingBottom: insets.top / 2,
                    // pointerEvents: animatedIndex.value !== 0 ? "none" : "auto"
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
                    onChangeText={(value: string) => handleSearch(value)} />

                <TouchableOpacity onPress={() => toggleSheet()} >
                    <Feather name="filter" size={32} color={convertGenderColor(filterByGender)} />
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
                    data={searchTerm.length > 0 ? filteredData : studentsDataQuery}
                    numColumns={1}
                    contentContainerStyle={{ paddingBottom: 30, paddingTop: 25 }}
                    renderItem={({ item }) =>
                        <ListItemStudents
                            data={item}
                            toggleFn={handlePresentModalPress}
                            setDataSelected={setDataSelected} />}
                    keyExtractor={(item, index) => index.toString()}
                    onEndReached={() => searchTerm.length === 0 ? fetchNextPageCustom() : null}

                    ListFooterComponent={() => (
                        searchTerm.length === 0 ? (
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


            {/* {
                positionAnimated >= 0 &&
                <BottomSheetModal
                    ref={bottomSheetModalRef}
                    index={1}
                    snapPoints={snapPoints}
                    onChange={handleSheetChanges}
                    style={{ marginHorizontal: 16 }}

                    handleComponent={(props: BottomSheetHandleProps) => {
                        return (
                            <HandleBottomSheet {...props} style={{
                                backgroundColor: colors.base.background,
                            }} animatedIndex={animatedIndex} />
                        )
                    }}

                >
                    <BottomSheetScrollView style={{
                        height: "100%",
                        flex: 1
                    }}>
                        <BottomSheetStudentAnimatedV2 data={dataSelected} />
                    </BottomSheetScrollView>
                </BottomSheetModal>
            } */}
            
            <BottomSheetAnimated
                title="Filtro por gênero"
                isOpen={isOpen}
                toggleBottomSheet={() => closeSheet()}>

                <SwitchAnimated
                    isOpen={isOpen || false}
                    closeSheet={() => closeSheet()}
                    setFiltered={setFilterByGender}
                    filtered={filterByGender}
                    onRefreshFlatList={onRefreshFlatList}
                />
            </BottomSheetAnimated>

        </SafeAreaContainer>

    );
};

export { HomeScreen }