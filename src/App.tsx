import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { useFonts } from '@expo-google-fonts/dev';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Buffer } from 'buffer';
import { registerRootComponent } from 'expo';
import React, { useContext } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { RecoilRoot } from 'recoil';

import { Colors } from './constants';
import { AppMenu } from './screens/AppMenu';
import './App.css';
import { HeaderLeft } from './utils';
import ProviderWrapper from './context/ProviderWrapper';
import { Profile } from './screens/Profile';
import { WalletContext } from './context/WalletContext';
import { CheckBag } from './screens/CheckBag';
import { Marketplace } from './screens/Marketplace';
import { Transfer } from './screens/Transfer';
import { DepositWithdraw } from './screens/DepositWithdraw';
import MyGame from './components/Games/MyGame';
import { HeaderRight } from './components/Header/HeaderRight';
import NFTDetail from './screens/NFTDetails';
import HorseRace from './components/Games/MySeconGame';

global.Buffer = global.Buffer || Buffer;

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function TabNavigator() {
  const { wallet } = useContext(WalletContext);

  const tabBarIcon = ({ color, size }: { color: string; size: number }) => (
    <MaterialCommunityIcons name="widgets-outline" color={color} size={size} />
  );

  const ProfileBarIcon = ({ color, size }: { color: string; size: number }) => (
    <MaterialIcons name="person-outline" color={color} size={size} />
  );

  return (
    <Tab.Navigator
      initialRouteName="App"
      screenOptions={{
        tabBarActiveTintColor: '#A79EE5',
        tabBarActiveBackgroundColor: Colors.dark.inputBackground,
        tabBarInactiveBackgroundColor: Colors.dark.inputBackground,
        tabBarStyle: styles.tabBarStyle,
        tabBarLabelStyle: {
          paddingBottom: 4,
        },
      }}>
      <Tab.Screen
        name="App"
        component={AppMenu}
        options={{
          tabBarIcon,
          headerStyle: styles.headerStyle,
          headerLeft: () => <HeaderLeft title="Home" />,
          headerRight: () => <HeaderRight />,
          headerTitle: '',
        }}
      />
      {wallet?.address && (
        <Tab.Screen
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
        />
      )}
    </Tab.Navigator>
  );
}

function App() {
  const [fontsLoaded] = useFonts({
    'DMSans-Bold': require('./assets/fonts/DMSans-Bold.ttf'),
    'DMSans-Medium': require('./assets/fonts/DMSans-Medium.ttf'),
    'DMSans-Regular': require('./assets/fonts/DMSans-Regular.ttf'),
  });
  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <RecoilRoot>
      <ProviderWrapper>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Home" component={TabNavigator} options={{ headerShown: false }} />
            <Stack.Screen
              name="Search"
              component={CheckBag}
              options={{
                headerStyle: styles.headerStyle,
                headerTintColor: Colors.dark.text,
              }}
            />
            <Stack.Screen
              name="Marketplace"
              component={Marketplace}
              options={{
                headerStyle: styles.headerStyle,
                headerTintColor: Colors.dark.text,
              }}
            />
            <Stack.Screen
              name="NFT Detail"
              component={NFTDetail}
              options={{
                headerStyle: styles.headerStyle,
                headerTintColor: Colors.dark.text,
              }}
            />
            <Stack.Screen
              name="Transfer"
              component={Transfer}
              options={{
                headerStyle: styles.headerStyle,
                headerTintColor: Colors.dark.text,
              }}
            />
            <Stack.Screen
              name="Deposit Withdraw"
              component={DepositWithdraw}
              options={{
                headerStyle: styles.headerStyle,
                headerTintColor: Colors.dark.text,
              }}
            />
            <Stack.Screen
              name="Lucky Game"
              component={MyGame}
              options={{
                headerStyle: styles.headerStyle,
                headerTintColor: Colors.dark.text,
              }}
            />
            <Stack.Screen
              name="Racing"
              component={HorseRace}
              options={{
                headerStyle: styles.headerStyle,
                headerTintColor: Colors.dark.text,
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </ProviderWrapper>
    </RecoilRoot>
  );
}

const styles = {
  headerStyle: {
    backgroundColor: Colors.dark.inputBackground,
    borderBottomColor: '#303030',
    maxHeight: 55,
  },
  tabBarStyle: {
    borderTopColor: Colors.dark.background,
    borderTopWidth: 0,
  },
};

export default registerRootComponent(App);
