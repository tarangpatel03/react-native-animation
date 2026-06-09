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
  clamp,
  SharedValue,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { runOnJS } from 'react-native-worklets';
import { AppButton } from '../../components/AppButton';

type ReanimatedSwappableListProps = {
  navigation: DrawerNavigationProp<any>;
};

const ITEM_HEIGHT = 40;
const ITEM_GAP = 12;
const ITEM_SLOT = ITEM_HEIGHT + ITEM_GAP;

export const ReanimatedSwappableList: React.FC<
  ReanimatedSwappableListProps
> = ({ navigation }) => {
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
  const activeIndex = useSharedValue<number | null>(null);
  const hoverIndex = useSharedValue<number | null>(null);

  const startAnimation = () => {
    setData([...data, (Number(data.at(-1)!) + 1).toString()]);
  };

  const resetAnimation = () => {
    setData(['1', '2', '3', '4', '5', '6', '7', '8', '9']);
  };

  const reorderData = (from: number | null, to: number | null) => {
    if (from === null || to === null || from === to) return;
    setData(prev => {
      const newData = [...prev];
      const movedItem = newData.splice(from, 1)[0];
      newData.splice(to, 0, movedItem);
      return newData;
    });
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
            renderItem={({ item, index }) => (
              <ListComponent
                item={item}
                index={index}
                onReorder={reorderData}
                dataLength={data.length}
                activeIndex={activeIndex}
                hoverIndex={hoverIndex}
              />
            )}
            contentContainerStyle={styles.listContainer}
          />
        </View>

        <View style={styles.controlsContainer}>
          <AppButton title="Add" onPress={startAnimation} />
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
    height: 40,
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
  index,
  onReorder,
  hoverIndex,
  activeIndex,
  dataLength,
}: {
  item: string;
  index: number;
  dataLength: number;
  hoverIndex: SharedValue<number | null>;
  activeIndex: SharedValue<number | null>;
  onReorder: (from: number | null, to: number | null) => void;
}) => {
  const followY = useSharedValue(0);
  const zIndex = useSharedValue(0);
  const scale = useSharedValue(1);

  const animatedStyles = useAnimatedStyle(() => {
    if (index === activeIndex.value) {
      return {
        zIndex: zIndex.value,
        transform: [{ translateY: followY.value }, { scale: scale.value }],
      };
    } else if (activeIndex.value !== null && hoverIndex.value !== null) {
      if (index > activeIndex.value && index <= hoverIndex.value) {
        return {
          zIndex: zIndex.value,
          transform: [
            {
              translateY: withTiming(-ITEM_SLOT, {
                duration: 180,
              }),
            },
            { scale: scale.value },
          ],
        };
      } else if (index < activeIndex.value && index >= hoverIndex.value) {
        return {
          zIndex: zIndex.value,
          transform: [
            {
              translateY: withTiming(ITEM_SLOT, {
                duration: 180,
              }),
            },
            { scale: scale.value },
          ],
        };
      }
    }
    return {
      transform: [{ translateY: 0 }, { scale: scale.value }],
    };
  });

  const longPress = Gesture.LongPress()
    .onStart(() => {
      activeIndex.set(index);
      scale.value = withTiming(1.05);
    })
    .onEnd(() => {
      hoverIndex.set(null);
      scale.value = withTiming(1);
    });

  const drag = Gesture.Pan()
    .onStart(() => {
      hoverIndex.value = index;
      activeIndex.value = index;
      scale.value = withTiming(1.05);
      zIndex.value = 10;
    })
    .onUpdate(e => {
      if (activeIndex.value !== null) {
        hoverIndex.value = clamp(
          activeIndex.value + Math.round(e.translationY / ITEM_SLOT),
          0,
          dataLength - 1,
        );
      }
      followY.value = e.translationY;
    })
    .onEnd(() => {
      const from = activeIndex.value;
      const to = hoverIndex.value;

      if (from === null || to === null) return;

      const finalTranslateY = (to - from) * ITEM_SLOT;

      followY.value = withTiming(
        finalTranslateY,
        { duration: 300 },
        finished => {
          if (!finished) return;

          runOnJS(onReorder)(from, to);

          followY.value = 0;
          activeIndex.value = null;
          hoverIndex.value = null;

          scale.value = withTiming(1);
          zIndex.value = 0;
        },
      );
    });

  const compose = Gesture.Simultaneous(drag, longPress);

  return (
    <GestureDetector gesture={compose}>
      <Animated.View style={[styles.listComponent, animatedStyles]}>
        <Text style={styles.description}>{item}</Text>
      </Animated.View>
    </GestureDetector>
  );
};
