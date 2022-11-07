import React from 'react';
import { useState, useEffect } from "react";
import NavBar from './NavBar';
import { useDispatch, useSelector } from 'react-redux';
import { postRecipe } from  '../redux/actions/IndexActions'
import style from './Styles/CreateRecipe.module.css'
import { getDietTypes } from '../redux/actions/IndexActions';



export default function CreateRecipe(){
    const dispatch = useDispatch();
    const allDiets = useSelector((state) => state.diets)

    useEffect(()=>{
        dispatch(getDietTypes());
    }, [dispatch])
   
    const [recipeData, setRecipeData] = useState({
        title: "",
        image:"",
        summary: "",
        healthScore: 0,
        instructions: "",
        diets: [],
    })

    function validate(recipeData){
        let errors = [];
        for(let key in recipeData){
            switch(key){
                case "title":
                    if(!isNaN(recipeData[key]) || recipeData[key] === "" || recipeData[key].length > 100){
                        errors.push(key);
                    }
                    break;
                case "diets":
                    if(!recipeData[key].length){
                        errors.push(key);
                    }
                    break;
                case "summary":
                    if(recipeData[key] === ""){
                        errors.push(key);
                    }
                    break;
                case "healthScore":
                    if(isNaN(recipeData[key]) || recipeData[key]<0 || recipeData[key]>100){
                        errors.push(key);
                    }
                    break;
                case "instructions":
                    if(recipeData[key] === ""){
                        errors.push(key);
                    }
                    break;
                case "image":
                    if(recipeData[key] === ""){
                        errors.push(key);
                    }
                    break;
                default: break;
            }
        }
        return errors;
    }

    function handleSubmit(e){
        e.preventDefault();
        console.log(recipeData);
        const isValidated = validate(recipeData);
        console.log("campos erroneos: ",isValidated)
        if(!isValidated.length){
            dispatch(postRecipe(recipeData));
            let inputs = document.querySelectorAll("input");
            inputs.forEach((input) => (input.value = ""));
            setRecipeData({
                title: "",
                image:"",
                summary: "",
                healthScore: 0,
                instructions: "",
                diets: [],
            })
            alert("Recipe created");
        }else{
            alert(`the following fields are not valid:  ${isValidated.join('\n')}`)
        }
    }
    
    const handleSelect = (e) => {
        if(e.target.value !== "Select diet"){
            if(!recipeData.diets.includes(e.target.value)){
                setRecipeData({
                    ...recipeData,
                    diets: [...recipeData.diets, e.target.value],
                });
            }else{
                console.log(recipeData.diets)
            }   
        }
    };

    function handleChange(e){
        setRecipeData({
           ...recipeData,
           [e.target.name]: e.target.value
        })
    }

    return(
        <div className={style.back}>
            <div>
                <NavBar/>
            </div>
            <div>
                <form  onSubmit={handleSubmit}>
                    <div>Title: <input className={style.form} type='text' name='title' value={recipeData.title} onChange={handleChange} id="back"/></div>
                    <div>Diets: <select>{allDiets?.map((t, i) => {
                        return <option  onClick={(e) => handleSelect(e)} value={t} key={i}>{t}</option>;
                        }
                    )}</select></div>
                    <div>Selected diets: {recipeData.diets.join(" ")} </div>
                    <div>Summary: <input className={style.form} type='text' name='summary' value={recipeData.summary} onChange={(e)=>handleChange(e)}/></div>
                    <div>HealthScore: <input className={style.form} type='number' name='healthScore' value={recipeData.healthScore} onChange={(e)=>handleChange(e)}/></div>
                    <div>Instructions: <input className={style.form} type='text' name='instructions' value={recipeData.instructions} onChange={(e)=>handleChange(e)}/></div>
                    <div>Image: <input className={style.form} type="text" name='image' value={recipeData.image} onChange={(e)=>handleChange(e)}/></div>
                    <button type='submit'className={style.button}>Create Recipe</button>
                </form>
            </div>
        </div>
    )
}