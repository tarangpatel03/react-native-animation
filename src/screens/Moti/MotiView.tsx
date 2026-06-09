import { useReducer } from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import { MotiView } from 'moti';
import { colors } from '../../theme/colors';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AppButton } from '../../components/AppButton';

export const MotiViewComponent = ({ navigation }: { navigation: any }) => {
  const [visible, toggle] = useReducer(s => !s, true);
  const { bottom } = useSafeAreaInsets();

  return (
    <View style={[styles.safeArea, { paddingBottom: bottom + 6 }]}>
      <View style={styles.container}>
        <Pressable style={styles.animationContainer} onPress={toggle}>
          <MotiView
            from={
              visible ? { opacity: 0, scale: 0.1 } : { opacity: 1, scale: 1 }
            }
            animate={
              visible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.1 }
            }
            exit={{
              opacity: 0,
              scale: 0.1,
            }}
            transition={{
              type: 'timing',
              duration: 300,
            }}
            style={styles.shape}
          />
        </Pressable>

        <AppButton title="Back" onPress={() => navigation.goBack()} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  shape: {
    justifyContent: 'center',
    height: 250,
    width: 250,
    borderRadius: 25,
    marginRight: 10,
    backgroundColor: colors.primary,
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
