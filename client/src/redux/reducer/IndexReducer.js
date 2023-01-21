import {
    GET_ALL,
    GET_DETAILS,
    FILTER_BY_DIET_TYPE,
    ORDER_BY,
    ORDER_BY_HEALTH_SCORE,
    GET_DIET_TYPES,
    GET_BY_NAME
} from "../actions/IndexActions";

const initialState = {
    recipes: [],
    allRecipes: [],
    diets: [],
    recipeDetails: [],
}; 

const rootReducer = (state = initialState, action) => {
    switch (action.type){
        case GET_ALL: return{...state, allRecipes: action.payload, recipes: action.payload}
        case GET_BY_NAME: return{...state, allRecipes: action.payload, recipes: action.payload}
        case GET_DETAILS:  return{...state, recipeDetails: action.payload}
        case GET_DIET_TYPES: return{...state, diets: action.payload}
        case FILTER_BY_DIET_TYPE:
            if(action.payload === "all"){
                return{...state, allRecipes: state.recipes}
            }else{
                const recipes = state.recipes;
                const filter = recipes.filter((e) =>{
                    const aux = e.diets.map((f) =>{
                        return f.name
                    });
                    return aux.includes(action.payload) === true
                })
                return{...state, allRecipes: filter}
            }
        case ORDER_BY: 
            const sorted = action.payload === "asc" ?
            state.allRecipes.sort(function (a, b){
                if(a.title > b.title){
                    return 1;
                }
                if(b.title > a.title){
                    return -1;
                }
                return 0;
            }) :
            state.allRecipes.sort(function (a, b){
                if(a.title > b.title){
                    return -1;
                }
                if(b.title > a.title){
                    return 1;
                }
                return 0;
            })
            return{...state, allRecipes: sorted}
        case ORDER_BY_HEALTH_SCORE:
            const sortedScore = action.payload === "high" ?
                state.allRecipes.sort(function (a, b){
                    if(a.healthScore > b.healthScore){
                        return -1;
                    }
                    if(b.healthScore > a.healthScore){
                        return 1;
                    }
                    return 0;
                }) :
                state.allRecipes.sort(function (a, b){
                    if(a.healthScore > b.healthScore){
                        return 1;
                    }
                    if(b.healthScore > a.healthScore){
                        return -1;
                    }
                    return 0;
                })
                return{...state, allRecipes: sortedScore}
        default: return state;
    }
}

export default rootReducer;