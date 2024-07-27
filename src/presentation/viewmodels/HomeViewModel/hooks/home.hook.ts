import { useCallback, useState } from "react";
import { useHomeContext } from "../contexts/useHome.context";
import { InfiniteData } from "@tanstack/react-query";
import { StudentServerEntity } from "@/@core/domains/server-entities/student.server-entity";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Keyboard } from "react-native";

export const useHomeViewModel = ({ }) => {
  
  const insets = useSafeAreaInsets();
  
  const { students: studentsContext, storageDataStudents, isFetchingNextPage, fetchNextPage , dataStudentsInfinity, isFetching, refetch} = useHomeContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState<StudentServerEntity[]>([]);


  // -- estados acima

  //  todo [ ] - criar logica ao incializar o app, no contexto, verificar se existe valor no storage, se tiver irá popular o useState lá do context, e caso contrário irá fazer o fetch com o useQuery.

  // const handleSearch = useCallback(
  //   (value: string) => {

  //     setSearchTerm(value)

  //     if (dataStudentsInfinity && value) {
  //       // const allStudents = studentsContext((page: any) => page);
  //       const allStudents = dataStudentsInfinity?.pages.flatMap((page: any) => page);

  //       const filteredStudents = studentsContext.filter((student: StudentServerEntity) =>
  //         (student.name.first.toLowerCase().includes(value) || student.name.last.toLowerCase().includes(value))
  //       );

  //       return setFilteredData(filteredStudents);
  //     }

  //     if (storageDataStudents && !dataStudentsInfinity && value) {
  //       const allStudents = storageDataStudents

  //       const filteredStudents = allStudents.filter((student: StudentServerEntity) =>
  //         (student.name.first.toLowerCase().includes(value) || student.name.last.toLowerCase().includes(value))
  //       );
  //       return setFilteredData(filteredStudents);
  //     }
  //     else if (value === '' && !studentsContext) {
  //       setFilteredData(storageDataStudents)
  //     }
  //     else if (value === '' && studentsContext) {
  //       const allStudents = dataStudentsInfinity?.pages?.flatMap((page: any) => page);

  //       setFilteredData(allStudents)
  //     }

  //   },
  //   [searchTerm],
  // )


  const handleSearch = useCallback(
    (value: string) => {

      setSearchTerm(value)

      if (dataStudentsInfinity && value) {
        const allStudents = dataStudentsInfinity.pages.flatMap((page: any) => page);

        const filteredStudents = allStudents.filter((student: any) =>
          (student.name.first.toLowerCase().includes(value) || student.name.last.toLowerCase().includes(value))
        );

        return setFilteredData(filteredStudents);
      }

      if (storageDataStudents && !dataStudentsInfinity && value) {
        const allStudents = storageDataStudents

        const filteredStudents = allStudents.filter((student: any) =>
          (student.name.first.toLowerCase().includes(value) || student.name.last.toLowerCase().includes(value))
        );
        return setFilteredData(filteredStudents);
      }
      else if (value === '' && !dataStudentsInfinity) {
        setFilteredData(storageDataStudents)
      }
      else if (value === '' && dataStudentsInfinity) {
        const allStudents = dataStudentsInfinity.pages.flatMap((page: any) => page);

        setFilteredData(allStudents)
      }

    },
    [searchTerm],
  )



  // const callBackNotUsed = useCallback(async () => {

  // }, []);


  const onRefreshFlatList = useCallback(async () => {
    setSearchTerm('')
    await refetch();
    Keyboard.dismiss()
  }, []);

  return {
    students: studentsContext,
    searchTerm,
    handleSearch,
    filteredData,
    isFetchingNextPage,
    fetchNextPage,
    dataStudentsInfinity,
    insets,
    isFetching,
    onRefreshFlatList
  };
};
