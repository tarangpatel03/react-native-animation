import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { colors } from '../theme/colors';
import Animated, {
  clamp,
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';

type DragGestureProps = {
  navigation: DrawerNavigationProp<any>;
};

export const DragGesture: React.FC<DragGestureProps> = ({ navigation }) => {
  const { bottom } = useSafeAreaInsets();
  const offset = useSharedValue({ x: 0, y: 0 });
  const scale = useSharedValue(1);
  const start = useSharedValue({ x: 0, y: 0 });

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [
        { scale: scale.value },
        { translateX: offset.value.x },
        { translateY: offset.value.y },
      ],
    };
  });

  const drag = Gesture.Pan()

    .onBegin(() => {
      scale.value = withTiming(1.1, {
        duration: 100,
        easing: Easing.ease,
      });
    })
    .onStart(e => {
      offset.value = {
        x: e.translationX + offset.value.x,
        y: e.translationY + offset.value.y,
      };
    })
    .onUpdate(e => {
      const x = e.translationX + start.value.x;
      const y = e.translationY + start.value.y;

      offset.value = {
        x: clamp(x, -150, 150),
        y: clamp(y, -240, 240),
      };
    })
    .onEnd(() => {
      scale.value = withTiming(1, {
        duration: 100,
        easing: Easing.ease,
      });
      start.value = {
        x: offset.value.x,
        y: offset.value.y,
      };
    });

  const resetAnimation = () => {
    offset.value = {
      x: 0,
      y: 0,
    };
    start.value = {
      x: 0,
      y: 0,
    };
  };

  return (
    <View style={[styles.safeArea, { paddingBottom: bottom + 6 }]}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.description}>{'Drag the purple box.'}</Text>
        </View>

        <View style={styles.animationContainer}>
          <GestureDetector gesture={drag}>
            <Animated.View style={[styles.animatedBox, animatedStyles]} />
          </GestureDetector>
        </View>

        <View style={styles.controlsContainer}>
          <TouchableOpacity
            style={[styles.button, styles.resetButton]}
            onPress={resetAnimation}
          >
            <Text style={styles.buttonText}>{'Reset'}</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>{'Back'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.app_F5F5F5,
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.app_F5F5F5,
  },
  header: {
    marginBottom: 40,
  },
  description: {
    fontSize: 14,
    color: colors.app_666666,
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
  animatedBox: {
    width: 100,
    height: 100,
    borderRadius: 12,
    backgroundColor: colors.primary,
  },
  controlsContainer: {
    gap: 12,
    marginBottom: 16,
    flexDirection: 'row',
  },
  button: {
    flex: 1,
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
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
