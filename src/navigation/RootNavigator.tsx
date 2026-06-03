import React from 'react';
import {
  createDrawerNavigator,
  DrawerContentComponentProps,
} from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { HomeScreen } from '../screens/HomeScreen';
import { SharedValueScreen } from '../screens/SharedValueScreen';
import { AnimatedStyleScreen } from '../screens/AnimatedStyleScreen';
import { WithTimingScreen } from '../screens/WithTimingScreen';
import { WithDecayScreen } from '../screens/WithDecayScreen';
import { WithDelayScreen } from '../screens/WithDelayScreen';
import { TapGesture } from '../screens/TapGesture';
import { DragGesture } from '../screens/DragGesture';
import { SwappableList } from '../screens/SwappableList';
import { LongPress } from '../screens/LongPress';

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
};

const Drawer = createDrawerNavigator<RootDrawerParamList>();

const CustomDrawerContent = (props: any) => {
  const { navigation } = props;

  const menuItems = [
    { label: 'Home', screen: 'Home' },
    { label: 'Shared Value', screen: 'SharedValue' },
    { label: 'Animated Style', screen: 'AnimatedStyle' },
    { label: 'With Timing', screen: 'WithTiming' },
    { label: 'With Decay', screen: 'WithDecay' },
    { label: 'With Delay', screen: 'WithDelay' },
    { label: 'Tap Gesture', screen: 'TapGesture' },
    { label: 'Drag Gesture', screen: 'DragGesture' },
    { label: 'Swappable List', screen: 'SwappableList' },
    { label: 'Long Press', screen: 'LongPress' },
  ];

  return (
    <SafeAreaView style={styles.safeAreaDrawer} edges={['top', 'bottom']}>
      <View style={styles.drawerContainer}>
        <View style={styles.drawerHeader}>
          <Text style={styles.drawerTitle}>{'Animation Learning'}</Text>
        </View>

        <ScrollView style={styles.drawerContent}>
          {menuItems.map(item => (
            <TouchableOpacity
              key={item.screen}
              style={styles.drawerItem}
              onPress={() => {
                navigation.navigate(item.screen);
              }}
            >
              <Text style={styles.drawerItemLabel}>{item.label}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

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
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  safeAreaDrawer: {
    flex: 1,
    backgroundColor: '#6200ee',
  },
  drawerContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  drawerHeader: {
    paddingVertical: 20,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    backgroundColor: '#6200ee',
  },
  drawerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  drawerContent: {
    flex: 1,
    paddingVertical: 8,
  },
  drawerItem: {
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  drawerItemLabel: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
});
