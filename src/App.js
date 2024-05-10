import { useEffect, useState } from 'react';
import './App.css';
import video from './food.mp4'
import {MyNutrition} from './MyNutrition';

function App() {
  
  const [mySearch, setMySearch] = useState('');
  const [myRecipe, setMyRecipe] = useState();
  const [wordSubmitted, setWordSubmitted] = useState('');


  const MY_ID = '247255a8';
  const My_KEY = 'a97a60997107aa47a6be65466b24fd9a';
  const URL = 'https://api.edamam.com/api/nutrition-details'
  
  const getRecipe = async(ingr) => {
  const response = await fetch(`${URL}?app_id=${MY_ID}&app_key=${My_KEY}`, {
    method: 'POST',
    headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json;'
  },
    body: JSON.stringify({ingr: ingr})
  })
  if(response.ok) {
    const data = await response.json();
    console.log(data);
    setMyRecipe(data);
  }else {
    alert('ingredients entered incorrectly');
  }
  }
  const myRecipeSearch = (e) => {
    setMySearch(e.target.value)
  }
  const finalSearch = (e) => {
    e.preventDefault();
    setWordSubmitted(mySearch);
  }
  useEffect(() => {
    if(wordSubmitted !== ''){
      let ingr = wordSubmitted.split(/[,,;,\n,\r]/);
      getRecipe(ingr);
    }
  }, [wordSubmitted])
  return (
    <div>
        <video autoPlay muted loop>
        <source src={video} type="video/mp4" />
        </video>
        <h1>Nutrition Analysis</h1>
      <form onSubmit={finalSearch}>
          <input className='search' placeholder='Search...' 
          onChange={myRecipeSearch}/>
          <button type='submit'>Search</button>
    </form>
    <div className='result'>
        {
          myRecipe && <p className='kcal'>Calories {myRecipe.calories}</p>
        }
        {
          myRecipe && Object.values(myRecipe.totalNutrients)
            .map(({ label, quantity, unit }) =>
              <MyNutrition
                label={label}
                quantity={quantity}
                unit={unit}
              />
            )
        }
      </div>
    </div>
  );
}

export default App;