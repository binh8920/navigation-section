import { MEALS } from "../../data/dummy-data";
import { TOGGLE_FAVORITE } from "../actions/meals";

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
        default:
            return state;
    }

};

export default mealsReducer;