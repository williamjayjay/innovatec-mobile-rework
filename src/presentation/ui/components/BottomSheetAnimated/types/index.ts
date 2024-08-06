import { ReactNode } from "react";
import { SharedValue } from "react-native-reanimated";

type BottomSheetProps = {
    isOpen: SharedValue<boolean>
    toggleBottomSheet: () => void
    duration?: number
    children?: ReactNode
    title?: string
  };
  
  export {BottomSheetProps}