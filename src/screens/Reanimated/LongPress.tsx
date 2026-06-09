import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { colors } from '../../theme/colors';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { AppButton } from '../../components/AppButton';

type LongPressProps = {
  navigation: DrawerNavigationProp<any>;
};

export const LongPress: React.FC<LongPressProps> = ({ navigation }) => {
  const { bottom } = useSafeAreaInsets();
  const scale = useSharedValue(1);

  const hold = Gesture.LongPress().onEnd(() => {
    scale.value = withTiming(1);
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

  const composed = Gesture.Race(tap, hold);

  return (
    <View style={[styles.safeArea, { paddingBottom: bottom + 6 }]}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.description}>{'Press Button'}</Text>
        </View>

        <View style={styles.animationContainer}>
          <GestureDetector gesture={composed}>
            <Animated.View style={[styles.backButton, animatedStyles]}>
              <Animated.Text style={styles.backButtonText}>
                {'Press Button'}
              </Animated.Text>
            </Animated.View>
          </GestureDetector>
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
