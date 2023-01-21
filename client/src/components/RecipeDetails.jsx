import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getRecipeDetails } from  '../redux/actions/IndexActions'
import style from './Styles/RecipeDetail.module.css'
import { Link } from 'react-router-dom'


export default function RecipeDetails(props) {
    const dispatch = useDispatch();
    const id = props.match.params.id;

    useEffect(() => {
        dispatch(getRecipeDetails(id))
    },[dispatch, id])

    const recipe = useSelector((state) => state.recipeDetails);

    return (
        <div className={style.background}>
            <Link to='/home'>Return</Link><br />
            <h1>Recipe Detail</h1>
            <div className={style.container}>
                <img src={recipe.image}  alt="Imagen no encontrada" className={style.imagen}></img><br /><br />
                <div>Id: {recipe.id}</div><br />
                <div>Title: {recipe.title}</div><br />
                <div>Summary: </div>
                <div dangerouslySetInnerHTML={{ __html: recipe.summary }}></div><br />
                <div>Diets: </div>
                {
                recipe.diets
                ? recipe.diets?.map((el) => <div>{el.name}</div>)
                : undefined
                }<br />
                <div>HealthScore: {recipe.healthScore} </div><br />
                <div>Instructions: </div>
                <div dangerouslySetInnerHTML={{__html: recipe.instructions}}></div>
            </div>
        </div>
    )
}
