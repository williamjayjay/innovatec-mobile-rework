import { useCallback, useState } from "react";
import { useHomeContext } from "../contexts/useHome.context";
import { InfiniteData } from "@tanstack/react-query";
import { StudentServerEntity } from "@/@core/domains/server-entities/student.server-entity";

export const useHomeViewModel = ({ }) => {

  const { students } = useHomeContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState<any[]>([]);


  // -- estados acima

  //  todo [ ] - criar logica ao incializar o app, no contexto, verificar se existe valor no storage, se tiver irá popular o useState lá do context, e caso contrário irá fazer o fetch com o useQuery.

  const handleSearch = useCallback(
    (data: InfiniteData<StudentServerEntity[] | [], unknown> | undefined, value: string) => {

      setSearchTerm(value)

      if (data && value) {
        const allStudents = data.pages.flatMap((page: any) => page);

        const filteredStudents = allStudents.filter((student: any) =>
          (student.firstName.toLowerCase().includes(value) || student.lastName.toLowerCase().includes(value))
        );

        return setFilteredData(filteredStudents);
      }

      if (students && !data && value) {
        const allStudents = students

        const filteredStudents = allStudents.filter((student: any) =>
          (student.firstName.toLowerCase().includes(value) || student.lastName.toLowerCase().includes(value))
        );
        return setFilteredData(filteredStudents);
      }
      else if (value === '' && !data) {
        setFilteredData(students)
      }
      else if (value === '' && data) {
        const allStudents = data.pages.flatMap((page: any) => page);

        setFilteredData(allStudents)
      }

    },
    [searchTerm],
  )


  // const callBackNotUsed = useCallback(async () => {

  // }, []);


  return {
    students: students,
    searchTerm,
    handleSearch,
    filteredData
  };
};
