import React, { useContext } from 'react';
import { StyleSheet } from 'react-native';

import { Balance } from '../components/Balance';
import { Screen } from '../components/Screen';
import { Colors } from '../constants/Colors';
import { LoadingContext } from '../context/LoadingContext';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Deposit from '../components/Deposit';
import Withdraw from '../components/Withdraw';

const Tab = createBottomTabNavigator();

export const DepositWithdraw = () => {
  const { loading, setLoading } = useContext(LoadingContext);

  const tabBarIcon = ({ color, size }: { color: string; size: number }) => (
    <MaterialCommunityIcons name="currency-usd" color={color} size={size} />
  );

  const withDrawIcon = ({ color, size }: { color: string; size: number }) => (
    <MaterialCommunityIcons name="currency-usd-off" color={color} size={size} />
  );

  return (
    <Screen style={styles.container}>
      <Balance />
      <Tab.Navigator
        initialRouteName="Deposit"
        screenOptions={{
          tabBarActiveTintColor: '#A79EE5',
          tabBarActiveBackgroundColor: Colors.dark.inputBackground,
          tabBarInactiveBackgroundColor: Colors.dark.inputBackground,
          tabBarStyle: styles.tabBarStyle,
        }}>
        <Tab.Screen
          name="Deposit"
          component={Deposit}
          options={{
            tabBarIcon,
            headerStyle: { height: 0 },
            headerTitle: '',
          }}
        />
        <Tab.Screen
          name="Withdraw"
          component={Withdraw}
          options={{
            tabBarIcon: withDrawIcon,
            headerStyle: { height: 0 },
            headerTitle: '',
          }}
        />
        {/* <Tab.Screen
          name="Profile"
          component={Profile}
          options={{
            tabBarIcon: ProfileBarIcon,
            tabBarLabel: 'Profile',
            headerStyle: styles.headerStyle,
            headerLeft: () => <HeaderLeft title="Profile" />,
            headerRight: () => <HeaderRight />,
            headerTitle: '',
          }}
        /> */}
      </Tab.Navigator>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.dark.background,
    display: 'flex',
    flexDirection: 'column',
  },
  headerStyle: {
    backgroundColor: Colors.dark.inputBackground,
    borderBottomColor: '#303030',
    maxHeight: 55,
  },
  tabBarStyle: {
    borderTopColor: Colors.dark.background,
    borderTopWidth: 0,
  },
});
