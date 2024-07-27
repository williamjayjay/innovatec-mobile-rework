import classNames from 'classnames';
import React, { type FC } from 'react';
import { ActivityIndicator, Text, TouchableOpacity } from 'react-native';

import colors from '@/presentation/ui/styles/colors.json';
import { IButton } from './types/buttonCustom.type';

export const ButtonCustom: FC<IButton.Input> = ({
    title,
    isLoading = false,
    disabled = false,
    buttonTestID = 'button',
    type = 'big',
    ...rest
}) => {
    return (
        <TouchableOpacity
            activeOpacity={0.8}
            testID={buttonTestID}
            className={classNames(
                'bg-primary-500 h-11 w-full rounded-lg justify-center items-center',
                { 'opacity-50': isLoading === true },
            )}
            disabled={isLoading || disabled}
            {...rest}>
            {isLoading ? (
                <ActivityIndicator testID="button-loading" color={colors.primary[500]} />
            ) : (
                <Text className="font-bold text-base text-base-light" testID="button-title">
                    {title}
                </Text>
            )}
        </TouchableOpacity>
    );
};
