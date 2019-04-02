import React, { Component } from 'react';
import { Feather } from '@expo/vector-icons'; // 6.2.2
import { createAppContainer, createBottomTabNavigator, createStackNavigator } from 'react-navigation';
import Comments from './Comments';
import GooglePlaces from './GooglePlaces';
import Home from './Home';
import Profile from './Profile';
import UserProfile from './UserProfile';

let IconComponent = Feather;

const HomeStack = createStackNavigator({
  Home: { 
    screen: Home,
    navigationOptions: {
      header: null,
      },
    },
  User: { 
    screen: UserProfile,
    navigationOptions: {
      header: null,
      },
    },
  Comments: { 
    screen: Comments,
    navigationOptions: {
      header: null,
      },
    },
  }, {
    initialRouteName: 'Home',
    mode: 'modal',
});

const FavoriteStack = createStackNavigator({
  Favorites: { 
    screen: GooglePlaces,
    navigationOptions: {
      header: null,
    }
  },
});

const ProfileStack = createStackNavigator({
  Profile: { 
    screen: Profile,
    navigationOptions: {
      header: null,
      },
    },
});

// HomeStack.navigationOptions = ({ navigation }) => {
//   let { routeName } = navigation.state.routes[navigation.state.index];
//   let navigationOptions = {};

//   if (routeName === 'Comments') {
//       navigationOptions.tabBarVisible = false;
//   }

//   return navigationOptions;
// };

const TabNavigator = createBottomTabNavigator({
  Home: {
    screen: HomeStack,
    navigationOptions: {
      tabBarLabel: "Home",
      tabBarOptions: {
          activeTintColor: '#b23f2e',
          inactiveTintColor: 'gray',
          tabStyle: {
            height: 45,
        },
      },
      tabBarIcon: ({tintColor})=>(
        <IconComponent name={`home`} size={25} color={tintColor} />
      )
    },
  },
  Favorites: {
    screen: FavoriteStack,
    navigationOptions: {
      tabBarLabel: "Favorites",
      tabBarOptions: {
          activeTintColor: '#b23f2e',
          inactiveTintColor: 'gray',
          tabStyle: {
            height: 45,
        },
      },
      tabBarIcon: ({tintColor})=>(
        <IconComponent name={`star`} size={25} color={tintColor} />
      )
    },
  },
  Profile: {
    screen: ProfileStack,
    navigationOptions: {
      tabBarLabel: "Profile",
      tabBarOptions: {
          activeTintColor: '#b23f2e',
          inactiveTintColor: 'gray',
          tabStyle: {
            height: 45,
        },
      },
      tabBarIcon: ({tintColor})=>(
        <IconComponent name={`user`} size={25} color={tintColor} />
      )
    },
  },
});

const HomeAppContainer = createAppContainer(TabNavigator);

export default HomeAppContainer;