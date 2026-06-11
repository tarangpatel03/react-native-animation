import React from 'react';
import {
  createDrawerNavigator,
  DrawerContentComponentProps,
} from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { HomeScreen } from '../screens/Reanimated/HomeScreen';
import { SharedValueScreen } from '../screens/Reanimated/SharedValueScreen';
import { AnimatedStyleScreen } from '../screens/Reanimated/AnimatedStyleScreen';
import { WithTimingScreen } from '../screens/Reanimated/WithTimingScreen';
import { WithDecayScreen } from '../screens/Reanimated/WithDecayScreen';
import { WithDelayScreen } from '../screens/Reanimated/WithDelayScreen';
import { TapGesture } from '../screens/Reanimated/TapGesture';
import { DragGesture } from '../screens/Reanimated/DragGesture';
import { SwappableList } from '../screens/Reanimated/SwappableList';
import { LongPress } from '../screens/Reanimated/LongPress';
import { RotateGesture } from '../screens/Reanimated/RotateGesture';
import { PinchGesture } from '../screens/Reanimated/PinchGesture';
import { ImagePreview } from '../screens/Reanimated/ImagePreview';
import { ReanimatedSwappableList } from '../screens/Reanimated/ReanimatedSwappableList';
import SharedElementExample from './NavigationTransition';
import { CustomDrawerContent } from './CustomDrawer';
import { SkeletonComponent } from '../screens/Moti/Skeleton';
import { MotiViewComponent } from '../screens/Moti/MotiView';
import { SequenceAnimation } from '../screens/Moti/SequenceAnimation';
import { RepeatLoop } from '../screens/Moti/RepeatLoop';
import { TransitionAnimation } from '../screens/Moti/TransitionAnimation';
import { DynamicAnimation } from '../screens/Moti/DynamicAnimation';
import { MotiPressableComponent } from '../screens/Moti/MotiPressable';
import { SkeletonComponent2 } from '../screens/Moti/SkeletonComponent';

export type RootDrawerParamList = {
  Home: undefined;
  SharedValue: undefined;
  AnimatedStyle: undefined;
  WithTiming: undefined;
  WithDecay: undefined;
  WithDelay: undefined;
  TapGesture: undefined;
  DragGesture: undefined;
  SwappableList: undefined;
  LongPress: undefined;
  RotateGesture: undefined;
  PinchGesture: undefined;
  ImagePreview: undefined;
  ReanimatedSwappableList: undefined;
  SharedElementExample: undefined;
  MotiView: undefined;
  Skeleton: undefined;
  SequenceAnimation: undefined;
  RepeatLoop: undefined;
  TransitionAnimation: undefined;
  DynamicAnimation: undefined;
  MotiPressableComponent: undefined;
  SkeletonComponent2: undefined;
};

const Drawer = createDrawerNavigator<RootDrawerParamList>();

const drawerContent = (props: DrawerContentComponentProps) => {
  return <CustomDrawerContent {...props} />;
};

export const RootNavigator = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        drawerContent={props => drawerContent(props)}
        screenOptions={{
          headerShown: true,
          headerStyle: {
            backgroundColor: '#6200ee',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 18,
          },
          drawerStyle: {
            backgroundColor: '#fff',
            width: '80%',
          },
          drawerLabelStyle: {
            marginLeft: -20,
          },
        }}
      >
        <Drawer.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: 'Home',
            drawerLabel: 'Home',
          }}
        />
        <Drawer.Screen
          name="SharedValue"
          component={SharedValueScreen}
          options={{
            title: 'Shared Value',
            drawerLabel: 'Shared Value',
          }}
        />
        <Drawer.Screen
          name="AnimatedStyle"
          component={AnimatedStyleScreen}
          options={{
            title: 'Animated Style',
            drawerLabel: 'Animated Style',
          }}
        />
        <Drawer.Screen
          name="WithTiming"
          component={WithTimingScreen}
          options={{
            title: 'With timing',
            drawerLabel: 'With timing',
          }}
        />
        <Drawer.Screen
          name="WithDecay"
          component={WithDecayScreen}
          options={{
            title: 'With Decay',
            drawerLabel: 'With Decay',
          }}
        />
        <Drawer.Screen
          name="WithDelay"
          component={WithDelayScreen}
          options={{
            title: 'With Delay',
            drawerLabel: 'With Delay',
          }}
        />
        <Drawer.Screen
          name="TapGesture"
          component={TapGesture}
          options={{
            title: 'Tap Gesture',
            drawerLabel: 'Tap Gesture',
          }}
        />
        <Drawer.Screen
          name="DragGesture"
          component={DragGesture}
          options={{
            title: 'Drag Gesture',
            drawerLabel: 'Drag Gesture',
          }}
        />
        <Drawer.Screen
          name="SwappableList"
          component={SwappableList}
          options={{
            title: 'Swappable List',
            drawerLabel: 'Swappable List',
          }}
        />
        <Drawer.Screen
          name="LongPress"
          component={LongPress}
          options={{
            title: 'Long Press',
            drawerLabel: 'Long Press',
          }}
        />
        <Drawer.Screen
          name="RotateGesture"
          component={RotateGesture}
          options={{
            title: 'Rotate Gesture',
            drawerLabel: 'Rotate Gesture',
          }}
        />
        <Drawer.Screen
          name="PinchGesture"
          component={PinchGesture}
          options={{
            title: 'Pinch Gesture',
            drawerLabel: 'Pinch Gesture',
          }}
        />
        <Drawer.Screen
          name="ImagePreview"
          component={ImagePreview}
          options={{
            title: 'Image Preview',
            drawerLabel: 'Image Preview',
          }}
        />
        <Drawer.Screen
          name="ReanimatedSwappableList"
          component={ReanimatedSwappableList}
          options={{
            title: 'Reanimated Swappable List',
            drawerLabel: 'Reanimated Swappable List',
          }}
        />
        <Drawer.Screen
          name="SharedElementExample"
          component={SharedElementExample}
          options={{
            title: 'Reanimated Swappable List',
            drawerLabel: 'Reanimated Swappable List',
          }}
        />
        <Drawer.Screen
          name="MotiView"
          component={MotiViewComponent}
          options={{
            title: 'Moti View',
            drawerLabel: 'Moti View',
          }}
        />
        <Drawer.Screen
          name="Skeleton"
          component={SkeletonComponent}
          options={{
            title: 'Moti Skeleton',
            drawerLabel: 'Moti Skeleton',
          }}
        />
        <Drawer.Screen
          name="SequenceAnimation"
          component={SequenceAnimation}
          options={{
            title: 'Sequence Animation',
            drawerLabel: 'Sequence Animation',
          }}
        />
        <Drawer.Screen
          name="RepeatLoop"
          component={RepeatLoop}
          options={{
            title: 'Repeat and Loop',
            drawerLabel: 'Repeat and Loop',
          }}
        />
        <Drawer.Screen
          name="TransitionAnimation"
          component={TransitionAnimation}
          options={{
            title: 'Transition Animation',
            drawerLabel: 'Transition Animation',
          }}
        />
        <Drawer.Screen
          name="DynamicAnimation"
          component={DynamicAnimation}
          options={{
            title: 'Dynamic Animation',
            drawerLabel: 'Dynamic Animation',
          }}
        />
        <Drawer.Screen
          name="MotiPressableComponent"
          component={MotiPressableComponent}
          options={{
            title: 'Dynamic Animation',
            drawerLabel: 'Dynamic Animation',
          }}
        />
        <Drawer.Screen
          name="SkeletonComponent2"
          component={SkeletonComponent2}
          options={{
            title: 'Skeleton Component',
            drawerLabel: 'Skeleton Component',
          }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};
