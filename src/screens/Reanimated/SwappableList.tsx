import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { colors } from '../../theme/colors';
import {
  FlatList,
  Gesture,
  GestureDetector,
} from 'react-native-gesture-handler';
import Animated, {
  Easing,
  LinearTransition,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { runOnJS } from 'react-native-worklets';
import { AppButton } from '../../components/AppButton';

type SwappableListProps = {
  navigation: DrawerNavigationProp<any>;
};

export const SwappableList: React.FC<SwappableListProps> = ({ navigation }) => {
  const { bottom } = useSafeAreaInsets();
  const [data, setData] = useState([
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
  ]);
  const flatListRef = useRef<FlatList<string> | null>(null);

  const removeItem = (item: string) => {
    setData(
      data.filter(dataItem => {
        return dataItem !== item;
      }),
    );
  };

  const startAnimation = () => {
    setData([...data, (Number(data.at(-1)!) + 1).toString()]);
  };

  const resetAnimation = () => {
    setData(['1', '2', '3', '4', '5', '6', '7', '8', '9']);
  };

  return (
    <View style={[styles.safeArea, { paddingBottom: bottom + 6 }]}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.description}>{'Drag element of flatList'}</Text>
        </View>

        <View style={styles.animationContainer}>
          <FlatList
            ref={flatListRef}
            data={data}
            keyExtractor={item => item}
            renderItem={({ item }) => (
              <ListComponent item={item} onRemoveSuccess={removeItem} />
            )}
            contentContainerStyle={styles.listContainer}
          />
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
  listContainer: {
    gap: 12,
    flex: 1,
    width: 380,
    alignItems: 'center',
    paddingVertical: 10,
  },
  listComponent: {
    width: 250,
    borderRadius: 5,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',

    elevation: 6,
    shadowOpacity: 0.3,
    shadowColor: colors.app_000000,
    backgroundColor: colors.app_FFFFFF,
    shadowOffset: { height: 2, width: 0 },
  },
});

const ListComponent = ({
  item,
  onRemoveSuccess,
}: {
  item: string;
  onRemoveSuccess: (item: string) => void;
}) => {
  const offset = useSharedValue(0);
  const opacity = useSharedValue(1);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      transform: [{ translateX: offset.value }],
    };
  });

  const drag = Gesture.Pan()
    .onUpdate(e => {
      offset.value = e.translationX;
    })
    .onEnd(e => {
      if (e.translationX > 100) {
        offset.value = withTiming(300, {
          duration: 2000,
          easing: Easing.linear,
        });
        opacity.value = withTiming(0, {
          duration: 500,
          easing: Easing.linear,
        });
        runOnJS(onRemoveSuccess)(item);
      } else if (e.translationX < -100) {
        offset.value = withTiming(-300, {
          duration: 2000,
          easing: Easing.linear,
        });
        opacity.value = withTiming(0, {
          duration: 500,
          easing: Easing.linear,
        });
        runOnJS(onRemoveSuccess)(item);
      } else {
        offset.value = withTiming(0, {
          duration: 500,
          easing: Easing.linear,
        });
      }
    });

  return (
    <GestureDetector gesture={drag}>
      <Animated.View
        layout={LinearTransition.springify()}
        style={[styles.listComponent, animatedStyles]}
      >
        <Text style={styles.description}>{item}</Text>
      </Animated.View>
    </GestureDetector>
  );
};
