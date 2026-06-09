import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, { useSharedValue, withSpring } from 'react-native-reanimated';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { colors } from '../../theme/colors';
import { AppButton } from '../../components/AppButton';

type SharedValueScreenProps = {
  navigation: DrawerNavigationProp<any>;
};

export const SharedValueScreen: React.FC<SharedValueScreenProps> = ({
  navigation,
}) => {
  const { bottom } = useSafeAreaInsets();
  const width = useSharedValue(100);

  const startAnimation = () => {
    width.value = withSpring(Math.random() * 100 + 50);
  };

  const resetAnimation = () => {
    width.value = withSpring(100);
  };

  return (
    <View style={[styles.safeArea, { paddingBottom: bottom + 6 }]}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.description}>
            {
              'A shared value is a driving factor of all your animations. You can think of it as a React state which is automatically kept in sync between the “JavaScript” and the “native” side of your app.'
            }
          </Text>
        </View>

        <View style={styles.animationContainer}>
          <Animated.View style={[styles.animatedBox, { width: width }]} />
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
  animatedBox: {
    height: 100,
    borderRadius: 12,
    backgroundColor: colors.primary,
  },
  controlsContainer: {
    gap: 12,
    marginBottom: 16,
    flexDirection: 'row',
  },
});
