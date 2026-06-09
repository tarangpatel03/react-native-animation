import { useEffect, useReducer } from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import { AnimatePresence, MotiView } from 'moti';
import { colors } from '../../theme/colors';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AppButton } from '../../components/AppButton';

export const SkeletonComponent = ({ navigation }: { navigation: any }) => {
  const [loading, toggle] = useReducer(s => !s, true);
  const { bottom } = useSafeAreaInsets();

  const resetAnimation = () => {
    toggle();
    setTimeout(() => {
      toggle();
    }, 2000);
  };

  useEffect(() => {
    setTimeout(() => {
      toggle();
    }, 2000);
  }, []);

  return (
    <View style={[styles.safeArea, { paddingBottom: bottom + 6 }]}>
      <View style={styles.container}>
        <Pressable style={styles.animationContainer}>
          <AnimatePresence exitBeforeEnter>
            {loading && <Skeleton key="skeleton" />}

            {!loading && (
              <MotiView
                key="content"
                animate={{ opacity: 1 }}
                exit={{
                  opacity: 0,
                }}
                transition={{
                  type: 'timing',
                  duration: 300,
                }}
                style={styles.shape}
              />
            )}
          </AnimatePresence>
        </Pressable>
        <View style={styles.controlsContainer}>
          <AppButton title="Reset" onPress={resetAnimation} />
        </View>

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
  loadingContainer: {
    width: 100,
    height: 100,
    borderRadius: 12,
    backgroundColor: 'red',
  },
});

const Skeleton = () => (
  <MotiView
    animate={{ opacity: 1 }}
    exit={{
      opacity: 0,
    }}
    transition={{
      type: 'timing',
      duration: 300,
    }}
    style={styles.loadingContainer}
  />
);
