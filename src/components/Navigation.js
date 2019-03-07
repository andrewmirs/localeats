import React, { Component } from 'react';
import { Feather } from '@expo/vector-icons'; // 6.2.2
import { createAppContainer, createBottomTabNavigator, createStackNavigator } from 'react-navigation';
import Favorites from './Favorites';
import Home from './Home';
import Profile from './Profile';

let IconComponent = Feather;

const TabNavigator = createBottomTabNavigator({
  Home: {
    screen: Home,
    navigationOptions: {
      tabBarLabel: "Home",
      tabBarOptions: {
          activeTintColor: '#b23f2e',
          inactiveTintColor: 'gray',
      },
      tabBarIcon: ({tintColor})=>(
        <IconComponent name={`home`} size={25} color={tintColor} />
      )
    },
  },
  Favorites: {
    screen: Favorites,
    navigationOptions: {
      tabBarLabel: "Favorites",
      tabBarOptions: {
          activeTintColor: '#b23f2e',
          inactiveTintColor: 'gray',
      },
      tabBarIcon: ({tintColor})=>(
        <IconComponent name={`star`} size={25} color={tintColor} />
      )
    },
  },
  Profile: {
    screen: Profile,
    navigationOptions: {
      tabBarLabel: "Profile",
      tabBarOptions: {
          activeTintColor: '#b23f2e',
          inactiveTintColor: 'gray',
      },
      tabBarIcon: ({tintColor})=>(
        <IconComponent name={`user`} size={25} color={tintColor} />
      )
    },
  },
});

const HomeAppContainer = createAppContainer(TabNavigator);

export default HomeAppContainer;