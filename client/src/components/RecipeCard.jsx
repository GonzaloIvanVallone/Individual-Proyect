import React from "react";
import style from './Styles/RecipeCard.module.css'
import { Link } from 'react-router-dom'

<Link to='/home'>Return</Link>


export default function RecipeCard({img, title, diets }){
    return(
         <div className={style.container}>
            <img src={img} alt="img not found" className={style.card}/>
            <h3>{title}</h3>
            {diets[0] ? <p>Diets: {diets.join(" ")}</p>
                    : undefined
            }
        </div>
    )
}