import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MealList from '../components/MealList';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../components/HeaderButton';
import { useSelector } from 'react-redux';

const FavoritesScreen = props => {
    const favMeals = useSelector(state => state.meals.favorite);

    return (
        <MealList navigation={props.navigation} listData={favMeals} />
    );
};

FavoritesScreen.navigationOptions = navData => {
    return {
        headerTitle: 'Your favorites',
        headerLeft: () => <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item title='Menu'
                iconName='ios-menu'
                onPress={() => {
                    navData.navigation.toggleDrawer();
                }}
            />
        </HeaderButtons>
    };
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default FavoritesScreen;