import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { colors } from '../../theme/colors';

type HomeScreenProps = {
  navigation: DrawerNavigationProp<any>;
};

export const HomeScreen: React.FC<HomeScreenProps> = ({}) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.content}>
        <Text style={styles.title}>{'Animation Learning'}</Text>
        <Text style={styles.subtitle}>
          {'Explore different animation patterns and techniques'}
        </Text>
        <Text style={styles.subtitle}>
          {'Open Drawer at top left to see all the animations'}
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.app_F5F5F5,
  },
  content: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    marginBottom: 10,
    fontWeight: 'bold',
    color: colors.app_333333,
  },
  subtitle: {
    fontSize: 16,
    color: colors.app_666666,
    marginBottom: 30,
  },
});
