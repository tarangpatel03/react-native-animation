import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
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

type ImagePreviewProps = {
  navigation: DrawerNavigationProp<any>;
};

export const ImagePreview: React.FC<ImagePreviewProps> = ({ navigation }) => {
  const { bottom } = useSafeAreaInsets();
  const startScale = useSharedValue(1);
  const scale = useSharedValue(1);
  const rotate = useSharedValue(0);
  const startRotate = useSharedValue(0);
  const transform = useSharedValue({ x: 0, y: 0 });
  const startTransform = useSharedValue({ x: 0, y: 0 });

  const pinch = Gesture.Pinch()
    .onUpdate(e => {
      scale.value = startScale.value * e.scale;
    })
    .onEnd(() => {
      startScale.value = scale.value;
    });

  const rotation = Gesture.Rotation()
    .onStart(() => {
      startRotate.value = rotate.value;
    })
    .onUpdate(event => {
      rotate.value = startRotate.value + event.rotation;
    });

  const drag = Gesture.Pan()
    .onStart(() => {
      startTransform.value = transform.value;
    })
    .onUpdate(e => {
      transform.value = {
        x: startTransform.value.x + e.translationX,
        y: startTransform.value.y + e.translationY,
      };
    })
    .onEnd(() => {
      transform.value = startTransform.value;
    });

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }, { rotate: `${rotate.value}rad` }],
  }));

  const resetAnimation = () => {
    scale.value = withTiming(1);
    rotate.value = withTiming(0);
    startScale.value = withTiming(1);
    startRotate.value = withTiming(0);
    transform.value = withTiming({ x: 0, y: 0 });
    startTransform.value = withTiming({ x: 0, y: 0 });
  };

  const composed = Gesture.Simultaneous(pinch, rotation, drag);

  return (
    <View style={[styles.safeArea, { paddingBottom: bottom + 6 }]}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.description}>{'Try image preview.'}</Text>
        </View>

        <GestureDetector gesture={composed}>
          <View style={styles.animationContainer}>
            <Animated.View style={[styles.animatedBox, animatedStyles]}>
              <Image
                resizeMode="stretch"
                style={styles.animatedBox}
                source={require('../../assets/download.jpeg')}
              />
            </Animated.View>
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
    width: 300,
    height: 300,
    borderRadius: 16,
  },
});
