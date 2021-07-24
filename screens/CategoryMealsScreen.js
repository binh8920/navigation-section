import React from 'react';
import { CATEGORIES } from '../data/dummy-data';
import MealList from '../components/MealList';
import { useSelector } from 'react-redux';

const CategoryMealsScreen = props => {

    const catID = props.navigation.getParam('categoryID');

    const availableMeals = useSelector(state => state.meals.filteredMeals);

    const displayedMeals = availableMeals.filter(
        meal => meal.categoryIds.indexOf(catID) >= 0
    );

    return (
        <MealList listData={displayedMeals} navigation={props.navigation} />
    );
};

CategoryMealsScreen.navigationOptions = navigationData => {
    const catID = navigationData.navigation.getParam('categoryID');

    const selectedCategory = CATEGORIES.find(cat => cat.id === catID);

    return {
        headerTitle: selectedCategory.title,
    };
};

export default CategoryMealsScreen;