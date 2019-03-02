import React, { Component } from 'react';
import { Feather } from '@expo/vector-icons'; // 6.2.2
import { createAppContainer, createBottomTabNavigator, createStackNavigator } from 'react-navigation';
import Favorites from './Favorites';
import Home from './Home';
import Profile from './Profile';

const getTabBarIcon = (navigation, focused, tintColor) => {
  const { routeName } = navigation.state;
  let IconComponent = Feather;
  let iconName;
  if (routeName === 'Home') {
    iconName = `home`;
  } else if (routeName === 'Favorites') {
    iconName = `star`;
  } else if (routeName === 'Profile') {
    iconName = `user`;
  }

  // You can return any component that you like here!
  return <IconComponent name={iconName} size={25} color={tintColor} />;
};

const HomeAppContainer = createAppContainer(
  createBottomTabNavigator(
    {
      Home: { screen: Home },
      Favorites: { screen: Favorites },
      Profile: { screen: Profile },
    },
    {
      defaultNavigationOptions: ({ navigation }) => ({
        tabBarIcon: ({ focused, tintColor }) =>
          getTabBarIcon(navigation, focused, tintColor),
      }),
      tabBarOptions: {
        activeTintColor: "#b23f2e",
        inactiveTintColor: 'gray',
      },
    }
  )
);

export default HomeAppContainer;