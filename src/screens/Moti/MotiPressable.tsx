import { View, StyleSheet } from 'react-native';
import { MotiText, useDynamicAnimation } from 'moti';
import { colors } from '../../theme/colors';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AppButton } from '../../components/AppButton';
import { MotiPressable } from 'moti/interactions';
import { useMemo } from 'react';

export const MotiPressableComponent = ({ navigation }: { navigation: any }) => {
  const { bottom } = useSafeAreaInsets();

  const scaleIn = useDynamicAnimation(() => ({
    scale: 1,
  }));

  const onPress = () => {
    scaleIn.animateTo(prev => {
      if (prev.scale === 1) return { ...prev, scale: 1.5 };
      else return { ...prev, scale: 1 };
    });
  };

  return (
    <View style={[styles.safeArea, { paddingBottom: bottom + 6 }]}>
      <View style={styles.container}>
        <View style={styles.animationContainer}>
          <MotiPressable
            style={styles.button}
            animate={useMemo(
              () =>
                ({ pressed }) => {
                  'worklet';

                  return {
                    scale: pressed ? 0.8 : 1,
                  };
                },
              [],
            )}
          >
            <MotiText style={styles.buttonText}>{'Press Button'}</MotiText>
          </MotiPressable>
        </View>
        <View style={styles.controlsContainer}>
          <AppButton title="Start" onPress={onPress} />
        </View>
        <AppButton title="Back" onPress={() => navigation.goBack()} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.app_F5F5F5,
  },
  safeArea: {
    flex: 1,
    backgroundColor: colors.app_F5F5F5,
  },
  button: {
    width: 200,
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.app_333333,
  },
  buttonText: {
    color: colors.app_FFFFFF,
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
