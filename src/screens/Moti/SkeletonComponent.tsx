import { useMemo, useReducer } from 'react';
import { StyleSheet, View } from 'react-native';
import { MotiText, MotiView, useDynamicAnimation } from 'moti';
// @ts-expect-error missing Moti subpath declaration
import { Skeleton } from 'moti/skeleton/react-native-linear-gradient';
import { colors } from '../../theme/colors';
import { MotiPressable } from 'moti/interactions';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AppButton } from '../../components/AppButton';

export const SkeletonComponent2 = ({ navigation }: { navigation: any }) => {
  const [dark, toggle] = useReducer(s => !s, true);
  const { bottom } = useSafeAreaInsets();

  const scaleIn = useDynamicAnimation(() => ({
    scale: 1,
  }));

  const onPress = () => {
    scaleIn.animateTo(prev => {
      if (prev.scale === 1) return { ...prev, scale: 1.5 };
      else return { ...prev, scale: 1 };
    });
    toggle();
  };

  const colorMode = dark ? 'dark' : 'light';

  return (
    <View style={[styles.safeArea, { paddingBottom: bottom + 6 }]}>
      <View style={styles.container}>
        <View style={styles.animationContainer}>
          <MotiView
            transition={{
              type: 'timing',
            }}
            style={styles.padded}
            animate={{
              backgroundColor: dark ? '#212121' : '#F1F1F1',
            }}
          >
            <Skeleton
              colorMode={colorMode}
              radius="round"
              height={75}
              width={75}
            />
            <Spacer />
            <Skeleton colorMode={colorMode} width={250} />
            <Spacer height={8} />
            <Skeleton colorMode={colorMode} width={'100%'} />
            <Spacer height={8} />
            <Skeleton colorMode={colorMode} width={'100%'} />
          </MotiView>
        </View>
        {/* <View style={styles.controlsContainer}> */}
        <MotiPressable
          style={styles.button}
          onPress={onPress}
          animate={useMemo(
            () =>
              ({ pressed }) => {
                'worklet';

                return {
                  scale: pressed ? 0.9 : 1,
                };
              },
            [],
          )}
        >
          <MotiText style={styles.buttonText}>{'Toggle'}</MotiText>
        </MotiPressable>
        {/* </View> */}
        <AppButton title="Back" onPress={() => navigation.goBack()} />
      </View>
    </View>
  );
};

const Spacer = ({ height = 16 }) => <View style={{ height }} />;

const styles = StyleSheet.create({
  shape: {
    justifyContent: 'center',
    height: 250,
    width: 250,
    borderRadius: 25,
    marginRight: 10,
    backgroundColor: 'white',
  },
  padded: {
    padding: 16,
    marginHorizontal: 12,
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
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
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
    backgroundColor: 'red',
    flexDirection: 'row',
  },
  button: {
    borderRadius: 8,
    marginBottom: 16,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.app_4CAF50,
  },
});
