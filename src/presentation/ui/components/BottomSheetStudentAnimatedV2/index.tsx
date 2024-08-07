import React from 'react';

import Animated, {
} from 'react-native-reanimated';
import colors from '@/presentation/ui/styles/colors.json'
import { format } from 'date-fns';
import { convertGender } from '@/@core/utils/convertGender';
import { BottomSheetStudentsV2Props } from './types';

const BottomSheetStudentAnimatedV2: React.FC<BottomSheetStudentsV2Props> = (
    ({ isOpen, toggleBottomSheet, duration = 700, data }) => {

        const genderVerb = data?.gender === 'male' ? 'Aluno:' : 'Aluna:'

        return (
                <Animated.View
                    className='h-full  bg-base-background pt-[130px] px-4'>
                        <>
                            <Animated.Image
                                style={{ borderWidth: 2, borderColor: colors.neutral[50], marginTop: -100 }}
                                className="rounded-full aspect-square h-[180px] w-[180px]  self-center mr-4 bg-neutral-50 "
                                source={data ? { uri: data?.picture?.medium } : require('@/presentation/ui/assets/images/no-user.png')}
                            />

                            <Animated.View className='gap-y-3 mt-3' >

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

                            </Animated.View>
                        </>
                </Animated.View>
        );
    }
);


export { BottomSheetStudentAnimatedV2 }
