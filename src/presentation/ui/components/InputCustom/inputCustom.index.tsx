import classNames from 'classnames';
import { useCallback, useState, type FC } from 'react';
import {
    TextInput as RNTextInput,
    Text,
    View,
    type NativeSyntheticEvent,
    type TextInputFocusEventData,
} from 'react-native';

import { type IInput } from './types/input.type';

import colors from '@/presentation/ui/styles/colors.json';

export const InputCustom: FC<IInput.Input> = ({
    onFocus,
    onBlur,
    inputInternalClassName,
    inputClassName,
    containerClassName,
    ...textInputProps
}) => {

    const [isFocus, setIsFocus] = useState(false);

    const handleFocus = useCallback(
        (_e: NativeSyntheticEvent<TextInputFocusEventData>) => {
            onBlur?.(_e);
            setIsFocus(true);
        },
        [onBlur],
    );
    const handleBlur = useCallback(
        (_e: NativeSyntheticEvent<TextInputFocusEventData>) => {
            onFocus?.(_e);
            setIsFocus(false);
        },
        [onFocus],
    );
    const testID = textInputProps.testID ?? 'input';

    return (
        <View
            testID={`${testID}-warp`}
            className={classNames(containerClassName ? containerClassName : 'w-full pb-4')}>

            <View
                className={classNames(
                    ' border border-neutral-300 rounded-md flex-row items-center',
                    inputClassName ? inputClassName : 'h-11',
                    {
                        'border-neutral-50 ': !isFocus,
                        'border-main-300': isFocus,
                        'opacity-50': textInputProps.editable === false,
                    },
                )}>
                <RNTextInput
                    className={classNames(
                        'flex flex-1 h-full  rounded-md px-3 bg-transparent text-neutral-300  ',
                        inputInternalClassName ? inputInternalClassName : '',
                        {
                            'bg-light': textInputProps.standardTitleAndBgDisabled,
                        },
                    )}
                    autoCorrect={false}
                    placeholderTextColor={colors.neutral[100]}
                    onBlur={handleBlur}
                    onFocus={handleFocus}
                    autoCapitalize="none"
                    {...textInputProps}
                    testID={testID}
                />
            </View>

        </View>
    );
};