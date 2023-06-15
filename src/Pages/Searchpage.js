import React, { useState } from 'react';

function Search() {
  const [pokemonName, setPokemonName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [pokemonData, setPokemonData] = useState(null);

  const handleSearch = () => {
    if (pokemonName.trim() === '') {
      setError('Please enter a Pokemon name');
      return;
    }

    setLoading(true);
    setError('');

    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
      .then(response => {
        if (!response) {
          throw new Error('Pokemon not found');
        }
        return response.json();
      })
      .then(data => {
        setLoading(false);
        setPokemonData(data);
      })
      .catch(error => {
        setLoading(false);
        setError(error.message);
      });
  };

  return (
    <div>
      <h1>Pokemon Search</h1>
      <input
        type="text"
        value={pokemonName}
        onChange={e => setPokemonName(e.target.value)}
        placeholder="Enter a Pokemon name"
      />
      <button onClick={handleSearch}>Search</button>

      {loading && <div>Loading...</div>}
      {error && <div>{error}</div>}

      {pokemonData && (
        <div>
          <h2>{pokemonData.name}</h2>
          <img
            src={pokemonData.sprites.front_default}
            alt={pokemonData.name}
          />
        </div>
      )}
    </div>
  );
}

export default Search;
