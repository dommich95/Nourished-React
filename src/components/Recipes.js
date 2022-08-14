import { render } from "@testing-library/react";
import React, {Component, useEffect,useState} from "react";
import RecipeGallery from './RecipeGallery';
import axios from "axios";

export default function Recipes () {
    let obj1;
    let obj2;
    let obj3;
	const YOUR_APP_ID = `2cb4a854`;
	const YOUR_APP_KEY = `68c5e9abaabd7cda76ac6d01c1c7a90f`;

	const [recipes, setRecipes] = useState([]);
    const [recipes1, setRecipes1] = useState([]);
    const [recipes2, setRecipes2] = useState([]);
	const [search, setSearch] = useState('');
	const [query, setQuery] = useState('');
console.log(recipes)

	useEffect(() => {
		getRecipes();
	}, [query]);
    


	const getRecipes = async () => {
		const response = await Promise.all([
            (await fetch(`https://api.edamam.com/search?q=chicken&app_id=${YOUR_APP_ID}&app_key=${YOUR_APP_KEY}`)).json(),
            (await fetch(`https://api.edamam.com/search?q=eggs&app_id=${YOUR_APP_ID}&app_key=${YOUR_APP_KEY}`)).json(),
            (await fetch(`https://api.edamam.com/search?q=beef&app_id=${YOUR_APP_ID}&app_key=${YOUR_APP_KEY}`)).json()
        ]) 
        .then((response) => {
            const obj1 = response[0].hits
            const obj2 = response[1].hits
            const obj3 = response[2].hits
            setRecipes(obj1)
            setRecipes1(obj2)
            setRecipes2(obj3)
        })

        
	};

	const updateSearch = (e) => {
		setSearch(e.target.value);
	};

	const getSearch = (e) => {
		e.preventDefault();
		setQuery(search);
		setSearch('');
	};
    
	return (
		<div className="App">
            <div>
            {recipes.map((recipe,index) => (
                <RecipeGallery key={index} title={recipe.recipe.label} calories={recipe.recipe.calories} image={recipe.recipe.image} link={recipe.recipe.url}  />
            ))}
            </div>
            <div>
             {recipes1.map((recipe,index) => (
                <RecipeGallery key={index} title={recipe.recipe.label} calories={recipe.recipe.calories} image={recipe.recipe.image} link={recipe.recipe.url}  />
            ))}
            </div>
            <div>
             {recipes2.map((recipe,index) => (
                <RecipeGallery key={index} title={recipe.recipe.label} calories={recipe.recipe.calories} image={recipe.recipe.image} link={recipe.recipe.url}  />
            ))}
            </div>
		</div>
	);
}


