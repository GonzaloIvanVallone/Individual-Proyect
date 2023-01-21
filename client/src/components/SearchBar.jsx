import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getRecipesByName } from "../redux/actions/IndexActions";
import style from './Styles/SearchBar.module.css';
import Swal from "sweetalert2";

export default function SearchBar(){
    const dispatch = useDispatch();
    const [name, setName] = useState("");

    function handleChange(e) {
        e.preventDefault(e);
        setName(e.target.value);
    }

    function handleSubmit(e){
        e.preventDefault(e);
        if(name){
            dispatch(getRecipesByName(name))
            let inputs = document.querySelectorAll("input");
            inputs.forEach((input) => (input.value = ""));
            setName("");
        }else{
            Swal.fire({
                title: "Name required before submit",
                icon: "error",
                confirmButtonText: "Continue",
            });
        }
    }

    return (
        <div className={style.searchBar}>
            <input  type="search" placeholder="Recipe to search..." onChange={(e) => handleChange(e)}></input>
            <button type='submit'  value={name} onClick={(e) => handleSubmit(e)}>Search</button><br />
        </div>
    )
}