import React, { useContext, useEffect } from 'react';
import { StyleSheet } from 'react-native';

import { Balance } from '../components/Balance';
// @ts-ignore
import { Menu, RecentFiles } from '../components/Menu/Menu';
import { Screen } from '../components/Screen';
import { Colors } from '../constants/Colors';
import { FullScreenLoadingIndicator } from '../utils';
import { LoadingContext } from '../context/LoadingContext';

export const AppMenu = ({navigation}: any) => {
  // const navigation = useNavigation();
  // navigation.setOptions({ tabBarStyle: { display: 'none' } });
  return (
    <Screen style={styles.container}>
     
      <Balance />
      <Menu navigation={navigation}/>
    </Screen>
   
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.dark.background,
  },
});
