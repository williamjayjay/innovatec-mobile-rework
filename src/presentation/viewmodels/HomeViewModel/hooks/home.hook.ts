import { useCallback } from "react";
import { useHomeContext } from "../contexts/useHome.context";

export const useHomeViewModel = ({ }) => {

  const homeContext = useHomeContext();

  // const callBackNotUsed = useCallback(async () => {
   
  // }, []);


  return {
   students: homeContext.students,
  };
};
