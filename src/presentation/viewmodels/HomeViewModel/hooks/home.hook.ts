import { useCallback, useEffect } from "react";
import { useHomeContext } from "../contexts/useHome.context";

export const useHomeViewModel = ({ }) => {

  const homeContext = useHomeContext();

  // const callBackNotUsed = useCallback(async () => {
   
  // }, []);

  useEffect(() => {
    homeContext.getValuesFromRepository()
    }, [])

  return {
   students: homeContext.students,
  };
};
