import React, { useState, useEffect } from 'react';
import { getRecipeSuggestions } from '../api'; // Import the function from api.js
import './IngredientForm.css';

export default function IngredientForm() {
  const [ingredients, setIngredients] = useState([]);
  const [newIngredient, setNewIngredient] = useState('');
  const [recipes, setRecipes] = useState('');
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (newIngredient.trim() !== '') {
      setIngredients((prevIngredients) => [...prevIngredients, newIngredient]);
      setNewIngredient('');
    }
  };

  const handleChange = (event) => {
    setNewIngredient(event.target.value);
  };

  const getRecipes = async () => {
    if (ingredients.length >= 4) {
      setLoading(true);
      try {
        const recipeData = await getRecipeSuggestions(ingredients);
        setRecipes(recipeData);
      } catch (error) {
        console.error('Error fetching recipes:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    if (ingredients.length < 4) {
      setRecipes('');
    }
  }, [ingredients]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <section className={`app ${darkMode ? 'dark-mode' : ''}`}>
      <button className="dark-mode-toggle" onClick={toggleDarkMode}>
        {darkMode ? 'Light Mode' : 'Dark Mode'}
      </button>
      
      <form className="ingredient-form" onSubmit={handleSubmit}>
        <h2>Ingredient List</h2>
        <div className="form">
          <label className="form-label">Ingredients:</label>
          <input
            name="ingredient"
            type="text"
            className="input-field"
            value={newIngredient}
            onChange={handleChange}
          />
          <button type="submit" className="submit-btn">Add Ingredient</button>
        </div>
      </form>

      <ul className="ingredient-list">
        {ingredients.map((ingredient, index) => (
          <li key={index} className="ingredient-item">
            {ingredient}
            <button onClick={() => {
              setIngredients(ingredients.filter((_, i) => i !== index));
            }} className="remove-btn">X</button>
          </li>
        ))}
      </ul>

      {ingredients.length >= 4 && !loading && (
        <div className="get-recipe">
          <button onClick={getRecipes} className="get-recipe-btn">Get Recipe</button>
        </div>
      )}

      {loading && <p className="loading">Loading...</p>}

      {recipes && !loading && (
        <div className="recipe-suggestions">
          <h3>Recipe Suggestions</h3>
          {recipes.split('\n').map((recipe, index) => (
            <div key={index} className="recipe-item">
              <p>{recipe}</p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
