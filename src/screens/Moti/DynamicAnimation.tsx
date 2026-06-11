import { View, StyleSheet } from 'react-native';
import { MotiView, useDynamicAnimation } from 'moti';
import { colors } from '../../theme/colors';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AppButton } from '../../components/AppButton';

export const DynamicAnimation = ({ navigation }: { navigation: any }) => {
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
          <MotiView
            transition={{
              type: 'spring',
            }}
            state={scaleIn}
            style={styles.shape}
          />
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
  shape: {
    justifyContent: 'center',
    height: 200,
    width: 200,
    borderRadius: 25,
    marginRight: 10,
    backgroundColor: 'hotpink',
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.app_F5F5F5,
  },
  safeArea: {
    flex: 1,
    backgroundColor: colors.app_F5F5F5,
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
