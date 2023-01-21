import axios from 'axios';
import Swal from "sweetalert2";
export const GET_ALL = "GET_ALL";
export const GET_DETAILS = "GET_DETAILS";
export const GET_DIET_TYPES = "GET_DIET_TYPES";
export const FILTER_BY_DIET_TYPE = "FILTER_BY_DIET_TYPE";
export const ORDER_BY = "ORDER_BY";
export const ORDER_BY_HEALTH_SCORE = "ORDER_BY_HEALTH_SCORE";
export const GET_BY_NAME = "GET_BY_NAME";


const recipe_route = 'http://localhost:3001/recipe';

export function getRecipesByName(name){
    return async function(dispatch){
        try{
            let json = await axios.get(`${recipe_route}?name=${name}`);
            return dispatch({type: GET_BY_NAME, payload: json.data});
        }catch(error){
            Swal.fire({
                title: `${error.response.data.msg}`,
                icon: "error",
                confirmButtonText: "Continue",
            });
        }
    }
}

export function getRecipeDetails(id){
    return async function(dispatch){
        try{
            if(id === 0){
                return dispatch({type: GET_DETAILS, payload: ""});
            }else{
                let json = await axios.get(`${recipe_route}/${id}`);
                return dispatch({type: GET_DETAILS, payload: json.data});
            }
        }catch(error){
            Swal.fire({
                title: `${error.response.data.msg}`,
                icon: "error",
                confirmButtonText: "Continue",
            });
        }
    }
}

export function postRecipe(payload){
    return async function(){
        try{
            let aux = await axios.post(recipe_route, payload);
            return aux;
        }catch(error){
            Swal.fire({
                title: `${error.response.data.msg}`,
                icon: "error",
                confirmButtonText: "Continue",
            });
        }
    }
}

export function getDietTypes(){
    return async function(dispatch){
        try{
            let json = await axios.get('http://localhost:3001/diet');
            return dispatch({type: GET_DIET_TYPES, payload: json.data})
        }catch{
            Swal.fire({
                title: `Front-Back error`,
                icon: "error",
                confirmButtonText: "Continue",
            });
        }
    }
}

export function filterByDietType(type){
    return{
        type: FILTER_BY_DIET_TYPE,
        payload: type
    }
}

export function orderAlpha(order){
    return{
        type: ORDER_BY,
        payload: order,
    }
}

export function orderByHealthScore(healthScore){
    return{
        type: ORDER_BY_HEALTH_SCORE,
        payload: healthScore
    }
}