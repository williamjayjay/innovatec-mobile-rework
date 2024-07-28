import { useCallback, useState } from "react";
import { useHomeContext } from "../contexts/useHome.context";
import { StudentServerEntity } from "@/@core/domains/server-entities/student.server-entity";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Keyboard } from "react-native";

export const useHomeViewModel = ({ }) => {
  
  const insets = useSafeAreaInsets();
  
  const { storageDataStudents, isFetchingNextPage, fetchNextPageCustom , dataStudentsInfinityRoot, isFetching, refetchCustom, refetchActivated} = useHomeContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState<StudentServerEntity[] | null>();
  
  console.log('storageDataStudents 000000', storageDataStudents?.[0]?.name)
  console.log('dataStudentsInfinityRoot 11111', dataStudentsInfinityRoot?.pages?.flat?.()?.[0]?.name)

  const dataStudentsInfinity = storageDataStudents ? storageDataStudents : dataStudentsInfinityRoot?.pages?.flat?.() as StudentServerEntity[]

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

  const onRefreshFlatList = useCallback( () => {
    console.log('ZZZZZZ->')
    setSearchTerm('')
     refetchCustom();
    Keyboard.dismiss()
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
    refetchActivated
  
  };
};
