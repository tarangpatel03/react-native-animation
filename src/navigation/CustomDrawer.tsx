import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import {
  DrawerContentScrollView,
  DrawerContentComponentProps,
} from '@react-navigation/drawer';

type DrawerItem = {
  label: string;
  route: string;
};

type DrawerSection = {
  title: string;
  items: DrawerItem[];
};

const sections: DrawerSection[] = [
  {
    title: 'Reanimated',
    items: [
      { label: 'Home', route: 'Home' },
      { label: 'Shared Value', route: 'SharedValue' },
      { label: 'Animated Style', route: 'AnimatedStyle' },
      { label: 'With Timing', route: 'WithTiming' },
      { label: 'With Decay', route: 'WithDecay' },
      { label: 'With Delay', route: 'WithDelay' },
      { label: 'Tap Gesture', route: 'TapGesture' },
      { label: 'Drag Gesture', route: 'DragGesture' },
      { label: 'Swappable List', route: 'SwappableList' },
      { label: 'Long Press', route: 'LongPress' },
      { label: 'Rotate Gesture', route: 'RotateGesture' },
      { label: 'Pinch Gesture', route: 'PinchGesture' },
      { label: 'Image Preview', route: 'ImagePreview' },
      { label: 'Reanimated Swappable List', route: 'ReanimatedSwappableList' },
      { label: 'Shared Element', route: 'SharedElementExample' },
    ],
  },
  {
    title: 'Moti',
    items: [
      { label: 'Moti View', route: 'MotiView' },
      { label: 'Moti Skeleton', route: 'Skeleton' },
      { label: 'Sequence Animation', route: 'SequenceAnimation' },
      { label: 'Repeat and Loop', route: 'RepeatLoop' },
      { label: 'Transition Animation', route: 'TransitionAnimation' },
      { label: 'Dynamic Animation', route: 'DynamicAnimation' },
      { label: 'Moti Pressable', route: 'MotiPressableComponent' },
      { label: 'Skeleton Component', route: 'SkeletonComponent2' },
    ],
  },
];

export function CustomDrawerContent(props: DrawerContentComponentProps) {
  const [openSection, setOpenSection] = useState<string | null>('Reanimated');

  const toggleSection = (title: string) => {
    setOpenSection(prev => (prev === title ? null : title));
  };

  const navigateTo = (route: string) => {
    props.navigation.navigate(route as never);
  };

  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.container}>
        <Text style={styles.heading}>Animations</Text>

        {sections.map(section => {
          const isOpen = openSection === section.title;

          return (
            <View key={section.title} style={styles.section}>
              <Pressable
                style={styles.sectionHeader}
                onPress={() => toggleSection(section.title)}
              >
                <Text style={styles.sectionTitle}>{section.title}</Text>
                <Text style={styles.arrow}>{isOpen ? '▲' : '▼'}</Text>
              </Pressable>

              {isOpen &&
                section.items.map(item => (
                  <Pressable
                    key={item.route}
                    style={styles.item}
                    onPress={() => navigateTo(item.route)}
                  >
                    <Text style={styles.itemText}>{item.label}</Text>
                  </Pressable>
                ))}
            </View>
          );
        })}
      </View>
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  heading: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 20,
  },
  section: {
    marginBottom: 12,
  },
  sectionHeader: {
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderRadius: 10,
    backgroundColor: '#F1F1F1',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
  },
  arrow: {
    fontSize: 14,
  },
  item: {
    paddingVertical: 12,
    paddingLeft: 24,
  },
  itemText: {
    fontSize: 15,
    color: '#444',
  },
});
