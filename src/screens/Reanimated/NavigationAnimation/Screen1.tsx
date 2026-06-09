import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  useWindowDimensions,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from '../../../theme/colors';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { AppButton } from '../../../components/AppButton';

const grapesImage = require('../../../assets/download.jpeg');
const TRANSITION_DURATION = 700;

export const Screen1 = ({ navigation }: { navigation: any }) => {
  const rootRef = React.useRef<View>(null);
  const imageRef = React.useRef<View>(null);
  const { bottom } = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const [isAnimating, setIsAnimating] = React.useState(false);
  const [showOverlay, setShowOverlay] = React.useState(false);

  const overlayX = useSharedValue(0);
  const overlayY = useSharedValue(0);
  const overlayWidth = useSharedValue(200);
  const overlayHeight = useSharedValue(200);
  const overlayRadius = useSharedValue(12);

  const overlayStyle = useAnimatedStyle(() => ({
    left: overlayX.value,
    top: overlayY.value,
    width: overlayWidth.value,
    height: overlayHeight.value,
    borderRadius: overlayRadius.value,
  }));

  const navigateToDetails = React.useCallback(() => {
    if (isAnimating) {
      return;
    }

    rootRef.current?.measureInWindow((rootX, rootY, rootWidth, rootHeight) => {
      imageRef.current?.measureInWindow(
        (imageX, imageY, imageWidth, imageHeight) => {
          const targetX = 20;
          const targetY = 77;
          const targetWidth = width - 40;
          const targetHeight = Math.max(
            rootHeight - targetY - 30 - 48 - bottom - 6,
            240,
          );

          overlayX.value = imageX - rootX;
          overlayY.value = imageY - rootY;
          overlayWidth.value = imageWidth;
          overlayHeight.value = imageHeight;
          overlayRadius.value = 12;

          setShowOverlay(true);
          setIsAnimating(true);

          requestAnimationFrame(() => {
            overlayX.value = withTiming(targetX, {
              duration: TRANSITION_DURATION,
            });
            overlayY.value = withTiming(targetY, {
              duration: TRANSITION_DURATION,
            });
            overlayWidth.value = withTiming(targetWidth, {
              duration: TRANSITION_DURATION,
            });
            overlayHeight.value = withTiming(targetHeight, {
              duration: TRANSITION_DURATION,
            });
            overlayRadius.value = withTiming(12, {
              duration: TRANSITION_DURATION,
            });
          });

          setTimeout(() => {
            setShowOverlay(false);
            setIsAnimating(false);
            navigation.navigate('Screen2', {
              tagName: 'sharedTag1',
            });
          }, TRANSITION_DURATION);
        },
      );
    });
  }, [
    bottom,
    isAnimating,
    navigation,
    overlayHeight,
    overlayRadius,
    overlayWidth,
    overlayX,
    overlayY,
    width,
  ]);

  return (
    <View
      ref={rootRef}
      style={[styles.safeArea, { paddingBottom: bottom + 6 }]}
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.description}>{'Tap anywhere on white box.'}</Text>
        </View>

        <View style={styles.animationContainer}>
          <Pressable
            ref={imageRef}
            disabled={isAnimating}
            onPress={navigateToDetails}
          >
            <Animated.Image
              resizeMode="cover"
              style={[styles.animatedBox, isAnimating && styles.hiddenImage]}
              source={grapesImage}
            />
          </Pressable>
        </View>

        <AppButton title="Back" onPress={() => navigation.goBack()} />
      </View>

      {showOverlay && (
        <Animated.View
          pointerEvents="none"
          style={[styles.transitionImage, overlayStyle]}
        >
          <Animated.Image
            resizeMode="cover"
            source={grapesImage}
            style={styles.transitionImageContent}
          />
        </Animated.View>
      )}
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
    overflow: 'hidden',
    flexDirection: 'row',
  },
  animatedBox: {
    width: 200,
    height: 200,
    borderRadius: 12,
  },
  hiddenImage: {
    opacity: 0,
  },
  transitionImage: {
    position: 'absolute',
    zIndex: 10,
    overflow: 'hidden',
  },
  transitionImageContent: {
    width: '100%',
    height: '100%',
  },
});
