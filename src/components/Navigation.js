import React, { Component } from 'react';
import { Ionicons } from '@expo/vector-icons'; // 6.2.2
import { createAppContainer, createBottomTabNavigator, createStackNavigator } from 'react-navigation';
import Home from './Home';
import Profile from './Profile';

const getTabBarIcon = (navigation, focused, tintColor) => {
  const { routeName } = navigation.state;
  let IconComponent = Ionicons;
  let iconName;
  if (routeName === 'Home') {
    iconName = `ios-home`;
    // We want to add badges to home tab icon
  } else if (routeName === 'Profile') {
    iconName = `ios-contact`;
  }

  // You can return any component that you like here!
  return <IconComponent name={iconName} size={25} color={tintColor} />;
};

const HomeAppContainer = createAppContainer(
  createBottomTabNavigator(
    {
      Home: { screen: Home },
      Profile: { screen: Profile },
    },
    {
      defaultNavigationOptions: ({ navigation }) => ({
        tabBarIcon: ({ focused, tintColor }) =>
          getTabBarIcon(navigation, focused, tintColor),
      }),
      tabBarOptions: {
        activeTintColor: 'tomato',
        inactiveTintColor: 'gray',
      },
    }
  )
);

export default HomeAppContainer;