import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { colors } from '../../theme/colors';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';
import { AppButton } from '../../components/AppButton';

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
  title: {
    fontSize: 32,
    marginBottom: 10,
    fontWeight: 'bold',
    color: colors.app_333333,
  },
});
