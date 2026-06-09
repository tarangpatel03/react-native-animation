import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { colors } from '../../theme/colors';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { AppButton } from '../../components/AppButton';

type PinchGestureProps = {
  navigation: DrawerNavigationProp<any>;
};

export const PinchGesture: React.FC<PinchGestureProps> = ({ navigation }) => {
  const { bottom } = useSafeAreaInsets();
  const scale = useSharedValue(1);
  const startScale = useSharedValue(1);

  const pinch = Gesture.Pinch()
    .onUpdate(e => {
      scale.value = startScale.value * e.scale;
    })
    .onEnd(() => {
      scale.value = withTiming(startScale.value);
    });

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const resetAnimation = () => {
    scale.value = 0;
    startScale.value = 0;
  };

  return (
    <View style={[styles.safeArea, { paddingBottom: bottom + 6 }]}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.description}>{'You can zoom box.'}</Text>
        </View>

        <View style={styles.animationContainer}>
          <GestureDetector gesture={pinch}>
            <Animated.View style={[styles.animatedBox, animatedStyles]} />
          </GestureDetector>
        </View>

        <View style={styles.controlsContainer}>
          <AppButton title="Reset" onPress={resetAnimation} />
        </View>

        <AppButton title="Back" onPress={() => navigation.goBack()} />
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
  controlsContainer: {
    gap: 12,
    marginBottom: 16,
    flexDirection: 'row',
  },
  animatedBox: {
    width: 100,
    height: 100,
    borderRadius: 16,
    backgroundColor: colors.primary,
  },
});
