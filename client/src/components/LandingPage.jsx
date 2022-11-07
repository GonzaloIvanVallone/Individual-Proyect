import React from 'react';
import { Link } from 'react-router-dom';
import Img from '../cooking.png'; 
import style from './Styles/LandingPage.module.css';


export default function LandingPage() {
    return (
        <div className={style.add}>
            <Link to='/home'>
                <button className={style.HomeButton}>Enter Food App</button>
            </Link><br></br>
            <img src={Img} alt='ups'className={style.img}/>
        </div>
    )
}