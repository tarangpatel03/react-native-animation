import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { colors } from '../../theme/colors';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDecay,
} from 'react-native-reanimated';
import { AppButton } from '../../components/AppButton';

type WithDecayScreenProps = {
  navigation: DrawerNavigationProp<any>;
};

export const WithDecayScreen: React.FC<WithDecayScreenProps> = ({
  navigation,
}) => {
  const { bottom } = useSafeAreaInsets();
  const velocityX = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: velocityX.value }],
  }));

  const startAnimation = () => {
    velocityX.value = withDecay({
      velocity: 800,
      deceleration: 0.998,
      clamp: [-300, 300],
    });
  };

  const resetAnimation = () => {
    velocityX.value = 0;
  };

  return (
    <View style={[styles.safeArea, { paddingBottom: bottom + 6 }]}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.description}>
            {
              'withDecay lets you create animations that mimic objects in motion with friction. The animation will start with the provided velocity and slow down over time according to the given deceleration rate until it stops.'
            }
          </Text>
        </View>

        <View style={styles.animationContainer}>
          <Animated.View style={[styles.animatedBox, animatedStyle]} />
        </View>

        <View style={styles.controlsContainer}>
          <AppButton title="Start" onPress={startAnimation} />
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
  animatedBox: {
    width: 100,
    height: 100,
    borderRadius: 12,
    backgroundColor: colors.primary,
  },
  animationContainer: {
    flex: 1,
    elevation: 3,
    shadowRadius: 4,
    borderRadius: 12,
    marginBottom: 30,
    shadowOpacity: 0.1,
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
});
