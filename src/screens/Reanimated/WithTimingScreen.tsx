import React, { useMemo, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { colors } from '../../theme/colors';
import DropdownComponent from '../../components/DropDown';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import Slider from '@react-native-community/slider';
import { AppButton } from '../../components/AppButton';

type WithTimingScreenProps = {
  navigation: DrawerNavigationProp<any>;
};

const data = [
  { label: 'Linear', value: 'linear' },
  { label: 'Bounce', value: 'bounce' },
  { label: 'Circle', value: 'circle' },
  { label: 'Back', value: 'back' },
  { label: 'Elastic', value: 'elastic' },
  { label: 'Poly', value: 'poly' },
  { label: 'Step', value: 'step' },
  { label: 'Cubic', value: 'cubic' },
  { label: 'Ease', value: 'ease' },
  { label: 'Exp', value: 'exp' },
  { label: 'Quad', value: 'quad' },
  { label: 'Sin', value: 'sin' },
];

export const WithTimingScreen: React.FC<WithTimingScreenProps> = ({
  navigation,
}) => {
  const { bottom } = useSafeAreaInsets();
  const translateX = useSharedValue(0);
  const [value, setValue] = useState('linear');
  const [position, setPosition] = useState<'start' | 'end'>('start');
  const [props, setProps] = useState(0);
  const [duration, setDuration] = useState(0);
  const minValue = useMemo(() => {
    if (
      value === 'back' ||
      value === 'elastic' ||
      value === 'poly' ||
      value === 'step'
    ) {
      return 1;
    }
    return 100;
  }, [value]);
  const maxValue = useMemo(() => {
    if (
      value === 'back' ||
      value === 'elastic' ||
      value === 'poly' ||
      value === 'step'
    ) {
      setProps(minValue);
      return 10;
    }
    return 1000;
  }, [minValue, value]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  const getEasing = (easing: string) => {
    switch (easing) {
      case 'linear':
        return Easing.linear;
      case 'bounce':
        return Easing.bounce;
      case 'circle':
        return Easing.circle;
      case 'back':
        return Easing.back(props);
      case 'elastic':
        return Easing.elastic(props);
      case 'poly':
        return Easing.poly(props);
      case 'step':
        return Easing.steps(props, false);
      case 'cubic':
        return Easing.cubic;
      case 'ease':
        return Easing.ease;
      case 'exp':
        return Easing.exp;
      case 'quad':
        return Easing.quad;
      case 'sin':
        return Easing.sin;
      default:
        return Easing.linear;
    }
  };

  const startAnimation = () => {
    if (position === 'start') {
      translateX.value = withTiming(translateX.value + 300, {
        duration: duration,
        easing: getEasing(value),
      });
      setPosition('end');
    } else {
      translateX.value = withTiming(translateX.value - 300, {
        duration: duration,
        easing: getEasing(value),
      });
      setPosition('start');
    }
  };

  const resetAnimation = () => {
    setPosition('start');
    translateX.value = 0;
  };

  return (
    <View style={[styles.safeArea, { paddingBottom: bottom + 6 }]}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.description}>
            {
              'withTiming will let you create animation that will perform in specific props'
            }
          </Text>
          <View>
            <DropdownComponent data={data} value={value} setValue={setValue} />
          </View>
          <View>
            <View style={styles.sliderHeader}>
              <Text style={styles.sliderValue}>{`Duration: ${duration.toFixed(
                0,
              )} ms`}</Text>
            </View>
            <Slider
              style={styles.slider}
              value={duration}
              minimumValue={100}
              maximumValue={5000}
              minimumTrackTintColor={colors.primary}
              maximumTrackTintColor={colors.app_E0E0E0}
              thumbTintColor={colors.primary}
              onValueChange={setDuration}
            />
          </View>
          {(value === 'back' ||
            value === 'elastic' ||
            value === 'poly' ||
            value === 'step') && (
            <View>
              <View style={styles.sliderHeader}>
                <Text style={styles.sliderValue}>{`${props.toFixed(0)}`}</Text>
              </View>
              <Slider
                style={styles.slider}
                value={props}
                minimumValue={minValue}
                maximumValue={maxValue}
                minimumTrackTintColor={colors.primary}
                maximumTrackTintColor={colors.app_E0E0E0}
                thumbTintColor={colors.primary}
                onValueChange={setProps}
              />
            </View>
          )}
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
  title: {
    fontSize: 28,
    marginBottom: 8,
    fontWeight: 'bold',
    color: colors.app_333333,
  },
  description: {
    fontSize: 14,
    color: colors.app_666666,
  },
  sliderHeader: {
    marginTop: 18,
    marginBottom: 6,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  sliderLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.app_333333,
  },
  sliderValue: {
    fontSize: 13,
    color: colors.app_666666,
  },
  slider: {
    width: '100%',
    height: 36,
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
