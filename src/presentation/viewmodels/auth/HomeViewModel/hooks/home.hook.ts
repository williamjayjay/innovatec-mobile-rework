import { useCallback, useState } from "react";
import { useHomeContext } from "../contexts/useHome.context";
import { StudentServerEntity } from "@/@core/domains/server-entities/student.server-entity";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Keyboard } from "react-native";
import { useSharedValue } from "react-native-reanimated";
import { Gender, SearchParams } from "@/@core/data/repositories/Students/types/student.type";

import colors from '@/presentation/ui/styles/colors.json'


export const useHomeViewModel = ({ }) => {

  const insets = useSafeAreaInsets();

  const { storageDataStudents, isFetchingNextPage, fetchNextPageCustom, dataStudentsInfinityRoot, isFetching, refetchCustom, filterByGender, setFilterByGender } = useHomeContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState<StudentServerEntity[] | null>();

  const [dataSelected, setDataSelected] = useState<StudentServerEntity | null>(null);

  const isOpenStudentSelected = useSharedValue(false);
  const isOpen = useSharedValue(false);

  const dataStudentsInfinity = dataStudentsInfinityRoot?.pages ? dataStudentsInfinityRoot?.pages?.flat?.() as StudentServerEntity[] : storageDataStudents


  const toggleSheet = useCallback(() => {
    isOpen.value = !isOpen.value;
  }, []);

  const closeSheet = useCallback(() => {
    isOpen.value = false
  }, []);


  const closeSheetStudentSelected = useCallback(() => {
    isOpenStudentSelected.value = false
    // setIsLoadingBottomSheet(true)

    setTimeout(() => {

      setDataSelected(null)
      // setIsLoadingBottomSheet(false)

    }, 300);


  }, []);

  const toggleSheetStudentSelected = useCallback(() => {
    isOpenStudentSelected.value = !isOpenStudentSelected.value;
  }, []);


  const handleSearch = useCallback(
    (value: string) => {

      setSearchTerm(value)

      if (dataStudentsInfinity && value) {
        const allStudents = dataStudentsInfinity.map((page: any) => page);

        const filteredStudents = allStudents.filter((student: any) =>
          (student.name.first.toLowerCase().includes(value) || student.name.last.toLowerCase().includes(value))
        );

        return setFilteredData(filteredStudents);
      }

      if (storageDataStudents && !dataStudentsInfinity && value) {
        const allStudents = storageDataStudents

        const filteredStudents = allStudents?.filter((student: any) =>
          (student.name.first.toLowerCase().includes(value) || student.name.last.toLowerCase().includes(value))
        );
        return setFilteredData(filteredStudents);
      }
      else if (value === '' && !dataStudentsInfinity) {
        setFilteredData(storageDataStudents)
      }
      else if (value === '' && dataStudentsInfinity) {
        const allStudents = dataStudentsInfinity.map((page: any) => page);

        setFilteredData(allStudents)
      }

    },
    [searchTerm],
  )

  const onRefreshFlatList = useCallback(async () => {
    setSearchTerm('')
    await refetchCustom();
    Keyboard.dismiss()
  }, []);

  const convertGenderColor = useCallback((gender?: Gender): string => {
    switch (gender) {
      case "male":
        return colors.primary.maleColor;

      case "female":
        return colors.primary.femaleColor;

      case "":
        return colors.neutral[100]

      default: return colors.neutral[100]

    }
  }, []);

  return {
    searchTerm,
    handleSearch,
    filteredData,
    isFetchingNextPage,
    fetchNextPageCustom,
    dataStudentsInfinity,
    insets,
    isFetching,
    onRefreshFlatList,
    dataSelected,
    setDataSelected,
    isOpenStudentSelected,
    closeSheetStudentSelected,
    toggleSheetStudentSelected,
    isOpen,
    filterByGender, setFilterByGender,
    toggleSheet, closeSheet,
    convertGenderColor

  };
};
