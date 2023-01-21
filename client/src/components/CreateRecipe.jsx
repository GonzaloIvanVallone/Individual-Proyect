import React from 'react';
import { useState, useEffect } from "react";
import NavBar from './NavBar';
import { useDispatch, useSelector } from 'react-redux';
import { postRecipe } from  '../redux/actions/IndexActions'
import style from './Styles/CreateRecipe.module.css'
import { getDietTypes } from '../redux/actions/IndexActions';
import Swal from "sweetalert2";


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
            Swal.fire({
                title: "Recipe created",
                icon: "success",
                confirmButtonText: "Continue",
            });
        }else{
            Swal.fire({
                title: `the following fields are not valid:  ${isValidated.join('\n')}`,
                icon: "error",
                confirmButtonText: "Continue",
            });
        }
    }
    
    const handleSelect = (e) => {
        if(!recipeData.diets.includes(e.target.value)){
            setRecipeData({
                ...recipeData,
                diets: [...recipeData.diets, e.target.value],
            });
        }else{
            Swal.fire({
                title: `Recipe already added`,
                icon: "error",
                confirmButtonText: "Continue",
            });
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
                    <div className={style.hoja}>
                        <div><h3>Title: <input className={style.form} type='text' name='title' value={recipeData.title} onChange={handleChange} id="back"/></h3></div>
                        <div><h3 className={style.line}>Diets:</h3> <select>{allDiets?.map((t, i) => {
                            return <option  onClick={(e) => handleSelect(e)} value={t} key={i}>{t}</option>;
                            }
                        )}</select></div>
                        <div className={style.select}><h3>Selected diets: {recipeData.diets.join(" ")} </h3></div>
                        <div><h3>Summary:</h3></div> <textarea name="summary" rows="7" cols="40" className={style.form} value={recipeData.summary}  onChange={(e)=>handleChange(e)}> </textarea>
                        <div><h3>HealthScore: <input className={style.form} type='number' name='healthScore' value={recipeData.healthScore} onChange={(e)=>handleChange(e)}/></h3></div>
                        <div><h3>Instructions:</h3></div> <textarea name="instructions" rows="7" cols="40"   className={style.form} value={recipeData.instructions}  onChange={(e)=>handleChange(e)}> </textarea>
                        <div><h3>Image: <input className={style.form} type="text" name='image' value={recipeData.image} onChange={(e)=>handleChange(e)}/></h3></div>
                        <button type='submit'className={style.button}>Create Recipe</button>
                    </div>
                </form>
            </div>
        </div>
    )
}