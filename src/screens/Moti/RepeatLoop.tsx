import {
  View,
  Pressable,
  StyleSheet,
  Text,
  PressableProps,
} from 'react-native';
import { AnimatePresence, MotiView } from 'moti';
import { colors } from '../../theme/colors';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AppButton } from '../../components/AppButton';
import Slider from '@react-native-community/slider';
import { useState } from 'react';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { runOnJS } from 'react-native-worklets';

export const RepeatLoop = ({ navigation }: { navigation: any }) => {
  const { bottom } = useSafeAreaInsets();
  const [animationType, setType] = useState<'Loop' | 'Repeat' | null>(null);
  const [repeatCount, setRepeatCount] = useState(1);
  const [playKey, setPlayKey] = useState(0);

  const startLoop = () => {
    setType('Loop');
    setPlayKey(prev => prev + 1);
  };

  const startRepeat = () => {
    setType('Repeat');
    setPlayKey(prev => prev + 1);
  };

  return (
    <View style={[styles.safeArea, { paddingBottom: bottom + 6 }]}>
      <View style={styles.container}>
        {animationType === 'Repeat' && (
          <View>
            <View style={styles.sliderHeader}>
              <Text style={styles.sliderValue}>{`Repeat: ${repeatCount}`}</Text>
            </View>
            <Slider
              style={styles.slider}
              value={repeatCount}
              minimumValue={1}
              maximumValue={20}
              step={1}
              minimumTrackTintColor={colors.primary}
              maximumTrackTintColor={colors.app_E0E0E0}
              thumbTintColor={colors.primary}
              onValueChange={setRepeatCount}
              onSlidingComplete={() => {
                setPlayKey(prev => prev + 1);
              }}
            />
          </View>
        )}
        <Pressable style={styles.animationContainer}>
          <AnimatePresence exitBeforeEnter>
            {animationType && (
              <MotiView
                key={`${animationType}-${playKey}`}
                from={{ scale: 1 }}
                animate={{
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 300,
                  type: 'timing',
                  loop: animationType === 'Loop',
                  repeat: animationType === 'Repeat' ? repeatCount : 0,
                }}
                style={styles.shape}
              />
            )}
          </AnimatePresence>
        </Pressable>

        <View style={styles.controlsContainer}>
          <Button onPress={startLoop} title="Loop" />
          <Button onPress={startRepeat} title="Repeat" />
        </View>

        <AppButton title="Back" onPress={() => navigation.goBack()} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  shape: {
    justifyContent: 'center',
    height: 250,
    width: 250,
    borderRadius: 25,
    marginRight: 10,
    backgroundColor: colors.primary,
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.app_F5F5F5,
  },
  safeArea: {
    flex: 1,
    backgroundColor: colors.app_F5F5F5,
  },
  animationContainer: {
    flex: 1,
    elevation: 3,
    shadowRadius: 4,
    borderRadius: 12,
    marginBottom: 30,
    shadowOpacity: 0.1,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.app_000000,
    backgroundColor: colors.app_FFFFFF,
    shadowOffset: { width: 0, height: 2 },
  },
  controlsContainer: {
    gap: 12,
    marginBottom: 16,
    flexDirection: 'row',
  },
  sliderHeader: {
    marginTop: 18,
    marginBottom: 6,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  sliderValue: {
    fontSize: 13,
    color: colors.app_666666,
  },
  slider: {
    width: '100%',
    height: 36,
  },

  button: {
    flex: 1,
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  startButton: {
    backgroundColor: colors.app_4CAF50,
  },
  resetButton: {
    backgroundColor: colors.app_FF9800,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.app_FFFFFF,
  },
  backButton: {
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    paddingHorizontal: 16,
    backgroundColor: colors.app_E0E0E0,
  },
  backButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.app_333333,
  },
});

type ButtonProps = PressableProps & {
  title: 'Loop' | 'Repeat';
  onPress: () => void;
};

const Button = (props: ButtonProps) => {
  const scale = useSharedValue(1);

  const press = Gesture.Tap().onStart(() => {
    scale.value = withTiming(1);
    runOnJS(props.onPress)();
  });

  const hold = Gesture.LongPress().onEnd(() => {
    scale.value = withTiming(1);
    runOnJS(props.onPress)();
  });

  const tap = Gesture.Tap()
    .onBegin(() => {
      scale.value = withTiming(0.9);
    })
    .onEnd(() => {
      scale.value = withTiming(1);
    });

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  const composed = Gesture.Race(tap, hold, press);

  return (
    <GestureDetector gesture={composed}>
      <Animated.View
        style={[
          styles.button,
          props.title === 'Repeat' ? styles.resetButton : styles.startButton,
          animatedStyles,
        ]}
      >
        <Animated.Text style={styles.buttonText}>{props.title}</Animated.Text>
      </Animated.View>
    </GestureDetector>
  );
};
