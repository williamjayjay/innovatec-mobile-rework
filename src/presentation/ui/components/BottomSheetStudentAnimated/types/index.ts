import { StudentServerEntity } from "@/@core/domains/server-entities/student.server-entity";
import { SharedValue } from "react-native-reanimated";

type BottomSheetStudentsProps = {
    isOpen: SharedValue<boolean>
    toggleBottomSheet: () => void
    duration?: number
    data: StudentServerEntity | null;
};

export {BottomSheetStudentsProps}