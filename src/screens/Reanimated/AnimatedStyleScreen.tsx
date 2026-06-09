import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { colors } from '../../theme/colors';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { AppButton } from '../../components/AppButton';

type AnimatedStyleScreenProps = {
  navigation: DrawerNavigationProp<any>;
};

export const AnimatedStyleScreen: React.FC<AnimatedStyleScreenProps> = ({
  navigation,
}) => {
  const { bottom } = useSafeAreaInsets();
  const widthVal = useSharedValue(100);

  const viewStyle = useAnimatedStyle(() => ({
    width: withSpring(widthVal.value * 2),
  }));

  const startAnimation = () => {
    widthVal.value = Math.random() * 100 + 1;
  };

  const resetAnimation = () => {
    widthVal.value = 50;
  };

  return (
    <View style={[styles.safeArea, { paddingBottom: bottom + 6 }]}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.description}>
            {'It adds additional control and flexibility over your animation'}
          </Text>
        </View>

        <View style={styles.animationContainer}>
          <Animated.View style={[styles.animatedBox, viewStyle]} />
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
    marginBottom: 20,
  },
  animatedBox: {
    height: 100,
    borderRadius: 12,
    backgroundColor: colors.primary,
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
});
