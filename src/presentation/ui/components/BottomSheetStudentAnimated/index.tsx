import React from 'react';
import {
    TouchableOpacity,
    StyleSheet
} from 'react-native';

import Animated, {
    useSharedValue,
    useAnimatedStyle,
    useDerivedValue,
    withDelay,
    withTiming,
} from 'react-native-reanimated';
import colors from '@/presentation/ui/styles/colors.json'
import { format } from 'date-fns';
import { convertGender } from '@/@core/utils/convertGender';
import { BottomSheetStudentsProps } from './types';

const BottomSheetStudentAnimated: React.FC<BottomSheetStudentsProps> = (
    ({ isOpen, toggleBottomSheet, duration = 700, data }) => {

        const height = useSharedValue(0);

        const progress = useDerivedValue(() =>
            withTiming(isOpen.value ? 0 : 1, { duration })
        );

        const sheetStyle = useAnimatedStyle(() => ({
            transform: [{ translateY: progress.value * 2 * height.value }],
        }));

        const backdropStyle = useAnimatedStyle(() => ({
            opacity: 1 - progress.value,
            zIndex: isOpen.value
                ? 1
                : withDelay(duration, withTiming(-1, { duration: 0 }

                )),
        }));

        const genderVerb = data?.gender === 'male' ? 'Aluno:' : 'Aluna:'

        return (
            <>
                <Animated.View style={[sheetStyles.backdrop, backdropStyle ]}>
                    <TouchableOpacity className='flex-1'

                        onPress={() => {
                            toggleBottomSheet();
                        }}
                    />
                </Animated.View>

                <Animated.View
                    className='bg-base-background absolute bottom-0 p-4 h-[80%] w-full self-center rounded-tl-[20px] rounded-tr-[20px] z-[2]  '
                    onLayout={(e) => {
                        height.value = e.nativeEvent.layout.height;
                    }}
                    style={sheetStyle}>

                    {
                        <>
                            <Animated.Image
                                style={{ borderWidth: 2, borderColor: colors.neutral[50], marginTop: -100 }}
                                className="rounded-full aspect-square h-[180px] w-[180px]  self-center mr-4 bg-neutral-50 "
                                source={data ? { uri: data?.picture?.medium } : require('@/presentation/ui/assets/images/no-user.png')}
                            />

                            <Animated.ScrollView showsVerticalScrollIndicator={false} className='gap-y-3 mt-3' >

                                <Animated.Text numberOfLines={2}
                                    className="font-karla500Medium text-sm text-neutral-300  capitalize" >
                                    Id: {data?.login?.uuid}</Animated.Text>

                                <Animated.Text numberOfLines={2}
                                    className="font-karla500Medium text-lg text-neutral-300  capitalize" >
                                    {genderVerb} {data?.name?.first} {data?.name?.last}</Animated.Text>

                                <Animated.Text numberOfLines={2}
                                    className="font-karla500Medium text-sm text-neutral-300  capitalize" >
                                    Email: {data?.email}</Animated.Text>

                                <Animated.Text numberOfLines={2}
                                    className="font-karla500Medium text-sm text-neutral-300  capitalize" >
                                    Gênero: {data?.gender ? convertGender(data?.gender) : '-'}</Animated.Text>

                                <Animated.Text numberOfLines={2}
                                    className="font-karla500Medium text-sm text-neutral-300  capitalize" >
                                    Data de nascimento: {data?.dob ? format(data?.dob?.date, 'dd/MM/yyyy') : '-'}</Animated.Text>

                                <Animated.Text numberOfLines={2}
                                    className="font-karla500Medium text-sm text-neutral-300  capitalize" >
                                    Telefone: {data?.phone}</Animated.Text>

                                <Animated.Text numberOfLines={2}
                                    className="font-karla500Medium text-sm text-neutral-300  capitalize" >
                                    Nacionalidade: {data?.nat}</Animated.Text>

                                <Animated.Text numberOfLines={4}
                                    className="font-karla500Medium text-sm text-neutral-300  capitalize" >
                                    Endereço: {data?.location?.street?.name}, Nº {data?.location?.street?.number}, {data?.location?.city} {data?.location?.state} {data?.location?.country}, {data?.location?.postcode} </Animated.Text>

                                <Animated.View className='h-[150px] ' />

                            </Animated.ScrollView>
                        </>

                    }

                </Animated.View>
            </>

        );
    }
);

const sheetStyles = StyleSheet.create({

    backdrop: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        zIndex: 3
    },
});

export { BottomSheetStudentAnimated }
