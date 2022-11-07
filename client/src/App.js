import './App.css';
import { BrowserRouter, Route, Switch } from "react-router-dom";

import LandingPage from './components/LandingPage';
import Home from './components/Home';
import RecipeDetails from './components/RecipeDetails';
import CreateRecipe from './components/CreateRecipe';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getDietTypes, getRecipesByName } from './redux/actions/IndexActions';

function App() {
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(getDietTypes());
    dispatch(getRecipesByName("ham"))
  }, [dispatch])
  
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path='/' component = {LandingPage}/>
          <Route path='/home' component = {Home}/>
          <Route path='/details/:id' component = {RecipeDetails}/>
          <Route path='/create-recipe' component = {CreateRecipe}/>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
