import { MaterialIcons } from '@expo/vector-icons';
import { View, Text } from 'react-native';
import { type FC } from 'react';
import { type ToastConfigParams } from 'react-native-toast-message';
import classNames from 'classnames';

namespace IToastMessage {
    export interface Input extends ToastConfigParams<any> {
        type: 'success' | 'error';
    }
}

export const ToastNotification: FC<IToastMessage.Input> = (props) => {
    const { type, text1 } = props;
    const isSuccess = type === 'success';

    return (

        <View
            className={classNames(
                'w-[90%] rounded-lg p-2 h-4"',
                {
                    'bg-green-500': isSuccess,
                    'bg-red-500': !isSuccess,
                })}>


            <View className="flex-row items-center">
                <MaterialIcons
                    name={isSuccess ? "check-circle-outline" : "error-outline"}
                    size={24}
                    color="white"
                />
                <Text
                    className="flex-shrink text-white font-medium text-md ml-1.5"
                    numberOfLines={2}>
                    {text1}
                </Text>
            </View>
        </View>
    );
};
