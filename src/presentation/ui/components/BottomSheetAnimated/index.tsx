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
import { BottomSheetProps } from './types';

const BottomSheetAnimated: React.FC<BottomSheetProps> = (
  ({ isOpen, title, toggleBottomSheet, duration = 500, children }) => {

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
        : withDelay(duration, withTiming(-1, { duration: 0 })),
    }));

    return (
      <>
        <Animated.View style={[sheetStyles.backdrop, backdropStyle]}>
          <TouchableOpacity className='flex-1' onPress={() => toggleBottomSheet()} />
        </Animated.View>

        <Animated.View
          className='bg-base-background absolute bottom-0 p-4 h-32 w-full self-center rounded-tl-[20px] rounded-tr-[20px] z-[2] items-center '
          onLayout={(e) => {
            height.value = e.nativeEvent.layout.height;
          }}
          style={sheetStyle}
        >
          {title && <Animated.Text className='pb-2 font-karla700Bold text-lg text-neutral-300 leading-[20px]' >
            {title}
          </Animated.Text>}
          {children}

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

export { BottomSheetAnimated }
