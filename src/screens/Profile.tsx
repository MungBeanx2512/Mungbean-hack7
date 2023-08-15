import React, { useContext } from 'react';
import { StyleSheet } from 'react-native';

import { Balance } from '../components/Balance';
import { Screen } from '../components/Screen';
import { Colors } from '../constants/Colors';
import { ProfileComponent } from '../components/Profile/ProfileComponent';
import MyGame from '../components/Games/MyGame';

export const Profile = () => {
  // const navigation = useNavigation();
  // navigation.setOptions({ tabBarStyle: { display: 'none' } });

  return (
    <Screen style={styles.container}>
      <Balance />
      <ProfileComponent />
      {/* <MyGame/> */}
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.dark.background,
  },
});
