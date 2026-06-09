import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Screen1 } from '../screens/Reanimated/NavigationAnimation/Screen1';
import { Screen2 } from '../screens/Reanimated/NavigationAnimation/Screen2';

const Stack = createNativeStackNavigator<{
  Screen1: undefined;
  Screen2: { tagName: string };
}>();

export default function SharedElementExample() {
  return (
    <>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          animation: 'none',
        }}
      >
        <Stack.Screen name="Screen1" component={Screen1} />
        <Stack.Screen name="Screen2" component={Screen2} />
      </Stack.Navigator>
    </>
  );
}
