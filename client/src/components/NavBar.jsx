import React from 'react'
import { Link } from 'react-router-dom'
import style from './Styles/NavBar.module.css';

export default function NavBar(){
    return (
        <div className={style.navbar}>
            <Link to='/'>Landing</Link>
            <Link to='/home'>Home</Link>
            <Link to='/create-recipe'>Create Recipe</Link>
        </div>
    )
}