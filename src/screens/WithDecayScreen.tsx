import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { colors } from '../theme/colors';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDecay,
} from 'react-native-reanimated';

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
          <TouchableOpacity
            style={[styles.button, styles.startButton]}
            onPress={startAnimation}
          >
            <Text style={styles.buttonText}>{'Start'}</Text>
          </TouchableOpacity>

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
