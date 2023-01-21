import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import NavBar from './NavBar';
import SearchBar from './SearchBar';
import { filterByDietType, orderAlpha, orderByHealthScore, getRecipeDetails } from '../redux/actions/IndexActions';
import { useEffect, useState } from 'react';
import RecipeCard from './RecipeCard';
import { Link } from 'react-router-dom';
import Paginate from './Paginate';
import style from './Styles/Home.module.css'

export default function Home(){
    const dispatch = useDispatch();
    const allRecipes = useSelector((state) => state.allRecipes)
    const allDiets = useSelector((state) => state.diets)

    const [, setOrder] = useState("")
    const [currentPage, setCurrentPage] = useState(1)
    const [RecipesPerPage, ] = useState(9)
    const lastRecipe = currentPage * RecipesPerPage
    const firstRecipe = lastRecipe - RecipesPerPage
    const renderThis = allRecipes.slice(firstRecipe, lastRecipe)

    const paginated = (page)=> {
        setCurrentPage(page)
    }
    
    useEffect(()=>{
        dispatch(getRecipeDetails(0));
    }, [dispatch])


    function handleFilterType(e){
        e.preventDefault();
        dispatch(filterByDietType(e.target.value));
        setCurrentPage(1)
    }

    function handleOrderAlpha(e){
        e.preventDefault();
        dispatch(orderAlpha(e.target.value));
        setOrder(`Ordenado ${e.target.value}`);
    }

    function handleOrderByScore(e){
        e.preventDefault();
        dispatch(orderByHealthScore(e.target.value));
        setOrder(`Ordenado ${e.target.value}`);
    }
   

    return (
        <div className={style.back}>
            <div>
                <section>
                    <NavBar/>
                    <SearchBar/>
                </section>  
            </div>
            <div className={style.filtros}>
                Alphabetical Order: 
                <select>
                    <option value="asc" onClick={(e) => handleOrderAlpha(e)}>Ascendent Order</option>
                    <option value="desc" onClick={(e) => handleOrderAlpha(e)}>Descendent Order</option>
                </select>
                
                Order By Score: 
                <select>
                    <option value="high" onClick={(e) => handleOrderByScore(e)}>Higher Score</option>
                    <option value="low" onClick={(e) => handleOrderByScore(e)}>Lower Score</option>
                </select>
                Filter by diet type: 
                <select>{
                    allDiets?.map((f) => {return <option value={f} onClick={(e) => handleFilterType(e)}>{f}</option>;})}
                </select>
            </div>
            <div className={style.paginado}>
                <Paginate RecipesPerPage={RecipesPerPage} allRecipes={allRecipes.length} paginated={paginated}/>
            </div>
            <div className={style.cardContainer}>
                <h1>Recipes:</h1>
            {
                
                renderThis?.map((e)=>{
                    return(
                        <Link  to={`/details/${e.id}`}>
                            <RecipeCard img={e.image} title={e.title} diets={e.diets.map(f => f.name)}  healthScore={e.healthScore} key={e.id}/>
                        </Link>
                    )
                })
            }
            </div>
        </div>
    )
}