import React from 'react';
import { StyleSheet } from 'react-native';

import { Balance } from '../components/Balance';
import { ProfileComponent } from '../components/Profile/ProfileComponent';
import { Screen } from '../components/Screen';
import { Colors } from '../constants/Colors';

export const Profile = ({ navigation }: any) => {
  // const navigation = useNavigation();
  // navigation.setOptions({ tabBarStyle: { display: 'none' } });

  return (
    <Screen style={styles.container}>
      <Balance />
      <ProfileComponent navigation={navigation} />
      {/* <MyGame/> */}
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.dark.background,
  },
});
