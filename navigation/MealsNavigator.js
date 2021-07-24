import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createAppContainer } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { Ionicons } from '@expo/vector-icons';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';

import CategoriesScreen from '../screens/CategoriesScreen';
import CategoryMealsScreen from '../screens/CategoryMealsScreen';
import MealDetailScreen from '../screens/MealDetailScreen';
import FavoriteScreen from '../screens/FavoritesScreen';
import FiltersScreen from '../screens/FiltersScreen';
import Color from '../constants/Color';
import { Platform } from 'react-native';

const navOptions = {
    headerStyle: {
        backgroundColor: Platform.OS === 'android' ? Color.primaryColor : ''
    },
    headerTintColor:
        Platform.OS === 'android' ? 'white' : Color.primaryColor,
    headerTitle: 'A Screen'
};

const MealsNavigator = createStackNavigator({
    Categories: CategoriesScreen,
    CategoryMeals: {
        screen: CategoryMealsScreen
    },
    MealDetail: MealDetailScreen
},
    {
        defaultNavigationOptions: navOptions
    });


const FavNavigator = createStackNavigator({
    Favorites: FavoriteScreen,
    Detail: MealDetailScreen
},
    {
        defaultNavigationOptions: navOptions
    });

const tabScreenConfig = {
    Meals: {
        screen: MealsNavigator,
        navigationOptions: {
            tabBarIcon: tabIcon => {
                return <Ionicons
                    name='ios-restaurant'
                    size={25}
                    color={tabIcon.tintColor}
                />;
            },
            tabBarColor: Color.primaryColor
        }
    },
    Favorites: {
        screen: FavNavigator,
        navigationOptions: {
            tabBarIcon: tabIcon => {
                return <Ionicons
                    name='ios-star'
                    size={25}
                    color={tabIcon.tintColor}
                />;
            },
            tabBarColor: Color.accentColor
        }
    }
};

const MealsFavTabNavigator = Platform.OS === 'android'
    ? createMaterialBottomTabNavigator(tabScreenConfig, {
        activeTintColor: Color.accentColor,
        shifting: true,
    })
    : createBottomTabNavigator(tabScreenConfig,
        {
            tabBarOptions: {
                activeTintColor: Color.accentColor
            }
        });

const FiltersNavigator = createStackNavigator(
    {
        Filters: FiltersScreen
    },
    {
        defaultNavigationOptions: navOptions
    }
);

const MainNavigator = createDrawerNavigator(
    {
        MealsFav: {
            screen: MealsFavTabNavigator,
            navigationOptions: {
                drawerLabel: 'Meals'
            }
        },
        Filters: FiltersNavigator
    },
    {
        contentOptions: {
            activeTintColor: Color.accentColor,
            labelStyle: {
                fontFamily: 'open-sans-bold'
            },
            itemsContainerStyle: {
                marginTop: 37
            }
        }
    }
);

export default createAppContainer(MainNavigator);