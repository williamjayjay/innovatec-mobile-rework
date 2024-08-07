import { StudentServerEntity } from "@/@core/domains/server-entities/student.server-entity";
import { SharedValue } from "react-native-reanimated";

type BottomSheetStudentsV2Props = {
    isOpen?: SharedValue<boolean>
    toggleBottomSheet?: () => void
    duration?: number
    data: StudentServerEntity | null;
};

export {BottomSheetStudentsV2Props}