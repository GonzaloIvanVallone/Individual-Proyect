import './App.css';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import NotFound from './components/NotFound';
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
          <Route exact path='/home' component = {Home}/>
          <Route exact path='/details/:id' component = {RecipeDetails}/>
          <Route exact path='/create-recipe' component = {CreateRecipe}/>
          <Route path='*' component={NotFound}/>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
