import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from '../../../theme/colors';
import Animated from 'react-native-reanimated';
import { AppButton } from '../../../components/AppButton';

const grapesImage = require('../../../assets/download.jpeg');

export const Screen2 = ({ navigation }: { navigation: any }) => {
  const { bottom } = useSafeAreaInsets();

  return (
    <View style={[styles.safeArea, { paddingBottom: bottom + 6 }]}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.description}>{'Tap anywhere on white box.'}</Text>
        </View>

        <View style={styles.animationContainer}>
          <Animated.Image
            resizeMode="cover"
            style={styles.animatedBox}
            source={grapesImage}
          />
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
    overflow: 'hidden',
    shadowColor: colors.app_000000,
    backgroundColor: colors.app_FFFFFF,
    shadowOffset: { width: 0, height: 2 },
  },
  animatedBox: {
    width: '100%',
    height: '100%',
    borderRadius: 12,
  },
});
