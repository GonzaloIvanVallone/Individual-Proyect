import React from "react";
import style from './Styles/Paginate.module.css';

export default function Paginate({RecipesPerPage, allRecipes, paginated}){
    const pages = []
    

    for (let i = 1; i <= Math.ceil(allRecipes/RecipesPerPage); i++){
        pages.push(i)
    }
    return(
        <div className={style.text}> Pages:
            <ul className={style.pagination}>
                {
                    pages?.map(number =>{
                        return(
                            <button className={style.button} key={number} onClick={() => paginated(number)}>
                                <li className="element">{number}</li>
                            </button> 
                        )
                    })
                }
            </ul>
        </div>
    )
}