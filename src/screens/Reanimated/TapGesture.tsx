import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { colors } from '../../theme/colors';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import { AppButton } from '../../components/AppButton';

type TapGestureProps = {
  navigation: DrawerNavigationProp<any>;
};

export const TapGesture: React.FC<TapGestureProps> = ({ navigation }) => {
  const { bottom } = useSafeAreaInsets();
  const offset = useSharedValue({ x: 0, y: 0 });

  const tap = Gesture.Tap().onEnd(e => {
    offset.value = {
      x: e.x - 10,
      y: e.y - 10,
    };
  });

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: offset.value.x },
        { translateY: offset.value.y },
      ],
    };
  });

  const resetAnimation = () => {
    offset.value = {
      x: 0,
      y: 0,
    };
  };

  return (
    <View style={[styles.safeArea, { paddingBottom: bottom + 6 }]}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.description}>{'Tap anywhere on white box.'}</Text>
        </View>

        <GestureDetector gesture={tap}>
          <View style={styles.animationContainer}>
            <Animated.View style={[styles.animatedBox, animatedStyles]} />
          </View>
        </GestureDetector>

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
    width: 20,
    height: 20,
    borderRadius: 12,
    backgroundColor: colors.primary,
  },
});
