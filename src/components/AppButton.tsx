import { PressableProps, StyleSheet } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { colors } from '../theme/colors';
import { runOnJS } from 'react-native-worklets';

type ButtonProps = PressableProps & {
  title: 'Start' | 'Reset' | 'Back' | 'Add';
  onPress: () => void;
};

export const AppButton = (props: ButtonProps) => {
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

  const getStyle = () => {
    if (props.title === 'Back') return styles.backButton;
    if (props.title === 'Start') return styles.startButton;
    if (props.title === 'Reset') return styles.resetButton;
    if (props.title === 'Add') return styles.startButton;
  };

  const composed = Gesture.Simultaneous(tap, hold, press);

  return (
    <GestureDetector gesture={composed}>
      <Animated.View
        style={[
          props.title !== 'Back' && styles.button,
          getStyle(),
          animatedStyles,
        ]}
      >
        <Animated.Text
          style={
            props.title === 'Back' ? styles.backButtonText : styles.buttonText
          }
        >
          {props.title}
        </Animated.Text>
      </Animated.View>
    </GestureDetector>
  );
};

const styles = StyleSheet.create({
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
