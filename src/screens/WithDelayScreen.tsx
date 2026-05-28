import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { colors } from '../theme/colors';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';

type WithDelayScreenProps = {
  navigation: DrawerNavigationProp<any>;
};

export const WithDelayScreen: React.FC<WithDelayScreenProps> = ({
  navigation,
}) => {
  const { bottom } = useSafeAreaInsets();
  const opacity = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  const startAnimation = () => {
    opacity.value = withDelay(1000, withTiming(1));
  };

  const resetAnimation = () => {
    opacity.value = withDelay(1000, withTiming(0));
  };

  return (
    <View style={[styles.safeArea, { paddingBottom: bottom + 6 }]}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.description}>
            {
              'withDelay is an animation modifier that lets you start an animation with a delay.'
            }
          </Text>
        </View>

        <View style={styles.animationContainer}>
          <Animated.Text style={[styles.title, animatedStyle]}>
            {'Value is updated'}
          </Animated.Text>
        </View>

        <View style={styles.controlsContainer}>
          <TouchableOpacity
            style={[styles.button, styles.startButton]}
            onPress={startAnimation}
          >
            <Text style={styles.buttonText}>{'Show'}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.resetButton]}
            onPress={resetAnimation}
          >
            <Text style={styles.buttonText}>{'Hide'}</Text>
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
  title: {
    fontSize: 32,
    marginBottom: 10,
    fontWeight: 'bold',
    color: colors.app_333333,
  },
  backButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.app_333333,
  },
});
