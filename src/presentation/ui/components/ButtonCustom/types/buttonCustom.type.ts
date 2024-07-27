import { type TouchableOpacityProps } from 'react-native';

export namespace IButton {
    export interface Input extends TouchableOpacityProps {
        title: string;
        isLoading?: boolean;
        disabled?: boolean;
        buttonTestID?: string;
        warpClassName?: string;
        warpDeactivedClassName?: string;
        textclassName?: string;
        textDeactivedclassName?: string;
        type?: 'big' | 'small';
    }
}
