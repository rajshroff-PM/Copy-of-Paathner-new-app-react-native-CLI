import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LoginScreen from '../components/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import RewardsView from '../components/RewardsView';
import { Map, CreditCard, User, Flame } from 'lucide-react-native';
import { COLORS } from '../theme';
import { View, Text } from 'react-native';

// Placeholder screens
const Placeholder = ({ title }: { title: string }) => (
  <View style={{flex:1, justifyContent:'center', alignItems:'center', backgroundColor: '#111'}}>
    <Text style={{color: '#fff'}}>{title}</Text>
  </View>
);

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const MainTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: { backgroundColor: '#111', borderTopColor: '#333' },
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: '#666',
      }}
    >
      <Tab.Screen 
        name="Map" 
        component={HomeScreen} 
        options={{ tabBarIcon: ({ color }) => <Map color={color} size={24} /> }}
      />
      <Tab.Screen 
        name="Offers" 
        component={() => <Placeholder title="Hot Offers" />} 
        options={{ tabBarIcon: ({ color }) => <Flame color={color} size={24} /> }}
      />
      <Tab.Screen 
        name="Rewards" 
        component={RewardsView} 
        options={{ tabBarIcon: ({ color }) => <CreditCard color={color} size={24} /> }}
      />
      <Tab.Screen 
        name="Profile" 
        component={() => <Placeholder title="User Profile" />} 
        options={{ tabBarIcon: ({ color }) => <User color={color} size={24} /> }}
      />
    </Tab.Navigator>
  );
};

const AppNavigator = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!isLoggedIn ? (
          <Stack.Screen name="Login">
            {() => <LoginScreen onLogin={() => setIsLoggedIn(true)} />}
          </Stack.Screen>
        ) : (
          <Stack.Screen name="Main" component={MainTabs} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
