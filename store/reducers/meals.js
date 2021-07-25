import { MEALS } from "../../data/dummy-data";
import { TOGGLE_FAVORITE } from "../actions/meals";
import { SET_FILTER } from "../actions/meals";

const initialState = {
    meals: MEALS,
    filteredMeals: MEALS,
    favorite: []
};

const mealsReducer = (state = initialState, action) => {
    switch (action.type) {
        case TOGGLE_FAVORITE:
            const existingIndex = state.favorite.findIndex(meal => meal.id === action.mealID);
            if (existingIndex >= 0) {
                const updatedFavMeals = [...state.favorite];
                updatedFavMeals.splice(existingIndex, 1);
                return { ...state, favorite: updatedFavMeals };
            } else {
                const meal = state.meals.find(meal => meal.id === action.mealID);
                return { ...state, favorite: state.favorite.concat(meal) };
            }
        case SET_FILTER:
            const appliedFilter = action.filter;
            const updatedFilteredMeals = state.meals.filter(meal => {
                if (appliedFilter.glutenFree && !meal.isGlutenFree) {
                    return false;
                }
                if (appliedFilter.lactoseFree && !meal.isLactoseFree) {
                    return false;
                }
                if (appliedFilter.vegan && !meal.isVegan) {
                    return false;
                }
                if (appliedFilter.vegetarian && !meal.isVegetarian) {
                    return false;
                }
                return true;
            });
            return { ...state, filteredMeals: updatedFilteredMeals };
        default:
            return state;
    }

};

export default mealsReducer;