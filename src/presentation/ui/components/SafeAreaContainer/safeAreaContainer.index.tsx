import { useMemo, type FC, type ReactNode } from 'react';
import classNames from 'classnames';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import {
    KeyboardAvoidingView,
    ScrollView,
    View,
} from 'react-native';

export const SafeAreaContainer: FC<{
    children: ReactNode;
    haveKeyboard?: boolean;
    viewKeyboardClassName?: string;
    containerClassName?: string;
    disableScroll?: boolean;
    testID?: string;
}> = ({
    viewKeyboardClassName = '',
    containerClassName = '',
    haveKeyboard = false,
    children,
    testID,
    disableScroll = false,
}) => {
        const insets = useSafeAreaInsets();

        const renderChildren = useMemo(() => {
            const stylContainer = classNames('flex flex-1 z-10', containerClassName);

            return (
                <View
                    className={stylContainer}
                    style={{ paddingTop: insets.top , paddingBottom: insets.bottom  , paddingHorizontal:8}}
                    testID={testID}>
                    {children}
                </View>
            );
        }, [
            children,
            containerClassName,
            insets.bottom,
            insets.top
        ]);

        if (disableScroll) return renderChildren;
        
        if (haveKeyboard) {
            return (
                <KeyboardAvoidingView
                    className={classNames('flex-1', viewKeyboardClassName)}
                    behavior="padding"
                    enabled>
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        className={classNames('flex flex-1', containerClassName)}>
                        {renderChildren}
                    </ScrollView>
                </KeyboardAvoidingView>
            );
        }

        return (
            <ScrollView
                showsVerticalScrollIndicator={false}
                className={classNames('flex flex-1', containerClassName)}>
                {renderChildren}
            </ScrollView>
        );
    };
