import { Gender } from '@/@core/data/repositories/Students/types/student.type';
import React, { useState } from 'react';
import {

  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';
import Animated, {
  SharedValue,
  runOnJS,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';

type SwitchAnimatedProps = {
  closeSheet: () => void;
  setFiltered: React.Dispatch<React.SetStateAction<Gender>>;
  filtered: Gender;
  isOpen: SharedValue<boolean>;
  onRefreshFlatList:() => void;
};

const options = ['Homem', 'Mulher', 'Ambos'];

function convertGender(gender: string): Gender {
  switch (gender) {
    case 'Homem':
      return 'male';
    case 'Mulher':
      return 'female';
    case 'Ambos':
      return "";
      
    default: return ""
      
  }
}

const SwitchAnimated: React.FC<SwitchAnimatedProps> = (
  ({ setFiltered, filtered, closeSheet, isOpen , onRefreshFlatList}) => {
    const { width: windowWidth } = useWindowDimensions();

    const [selectedOption, setSelectedOption] = useState(filtered || 'Ambos');

    const internalPadding = 20;
    const segmentedControlWidth = windowWidth - 40;

    const itemWidth =
      (segmentedControlWidth - internalPadding) / options.length;

    const combinedFunction = () => {
      const genderConverted = convertGender(selectedOption)
      if (filtered !== genderConverted && isOpen.value) {
        setFiltered(genderConverted)
        onRefreshFlatList()
      }
    };

    const rStyle = useAnimatedStyle(() => {
      const selectedIndex = options.indexOf(selectedOption);
      return {
        left: withTiming(
          itemWidth * selectedIndex + internalPadding / 2,
          { duration: 300 },
          () => {
            if ( closeSheet) {
              runOnJS(combinedFunction)();

              runOnJS(closeSheet)();
              
            }
          }
        ),
      };
    });


    return (

      <View
        style={[
          {
            width: segmentedControlWidth,
            paddingLeft: internalPadding / 2,
          },
        ]}
        className='flex-row h-10 bg-base-baseGray05 rounded-2xl'>


        <Animated.View
          className='absolute rounded-xl h-[80%] top-[10%] bg-base-background'
          style={[
            {
              width: itemWidth,
            },
            rStyle,
            {
              shadowColor: 'black',
              shadowOffset: {
                width: 0,
                height: 0,
              },
              shadowOpacity: 0.1,
              elevation: 3,
            }
          ]}
        />
        {options.map((option) => {
          return (
            <TouchableOpacity
              onPress={() => {
                setSelectedOption?.(option);
              }}
              key={option}
              style={[
                {
                  width: itemWidth,
                },
                {
                  justifyContent: 'center',
                  alignItems: 'center'
                }
              ]}
            >
              <Text
                className='text-neutral-800 font-karla400Regular text-base'
              >{option}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  }
);

export { SwitchAnimated }