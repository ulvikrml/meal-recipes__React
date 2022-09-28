import React, {useState} from 'react'
import MealForm from '../components/MealForm';
import RecipeListItem from  '../components/RecipeListItem';

const Meals = () => {
    const [recipes, setRecipes] = useState([]);
    const [error, setError] = useState(false);

    const getRecipe = async(e) =>{
        setRecipes([]);
        setError(false);
        e.preventDefault();
        const recipeName = e.target.elements.recipeName.value;
        console.log(recipeName);
        try{
            const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${recipeName}`);
            // const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${recipeName}`);
            const data = await response.json();
            if(response.ok && data.meals !== null){
                console.log(data);
                setRecipes(data.meals);
            }
            else{
                throw new Error('Invalid recipe name!');
            }
        }
        catch(err){ 
            console.log(err.message);
            setError(err.message)
        }
    }
    return (
        <div>
            <div className="container">
                <MealForm getRecipe={getRecipe}></MealForm>
                {error ? error : ''}
                {recipes ? recipes.map(recipe=>{
                    return <RecipeListItem key={recipe.idMeal} data={recipe}></RecipeListItem>
                }) : ''}
            </div>
        </div>
    )
}

export default Meals;