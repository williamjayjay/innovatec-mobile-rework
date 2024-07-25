/* eslint-disable @typescript-eslint/no-explicit-any */
import { type TextInputProps } from 'react-native';

export namespace IInput {
    
    export enum InputTypeDefault {
        TEXT = 'text',
        PASSWORD = 'password',
    }

    export interface Input extends TextInputProps {
        errorMessage?: string;
        label?: string;
        options?: any;
        typeProps?: any;
        leftChild?: any;
        rightChild?: any;
        containerClassName?: string;
        inputInternalClassName?: string;
        inputClassName?: string;
        textAddExists?: string;
        standardTitleAndBgDisabled?: boolean;
        textAddExistsOnPress?: () => void;
    }
}