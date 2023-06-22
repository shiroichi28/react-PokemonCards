import React, { useState, useEffect } from "react";

const App = () => {
  const typeColor = {
    bug: "#26de81",
    dragon: "#ffeaa7",
    electric: "#fed330",
    fairy: "#FF0069",
    fighting: "#30336b",
    fire: "#f0932b",
    flying: "#81ecec",
    grass: "#00b894",
    ground: "#EFB549",
    ghost: "#a55eea",
    ice: "#74b9ff",
    normal: "#95afc0",
    poison: "#6c5ce7",
    psychic: "#a29bfe",
    rock: "#2d3436",
    water: "#0190FF",
  };
  const url = "https://pokeapi.co/api/v2/pokemon/";
  const [pokeData, setPokeData] = useState(null);

  useEffect(() => {
    getPokeData();
  }, []);

  const getPokeData = () => {
    let id = Math.floor(Math.random() * 150) + 1;
    const finalUrl = url + id;
    fetch(finalUrl)
      .then((response) => response.json())
      .then((data) => {
        generateCard(data);
      });
  };

  const generateCard = (data) => {
    const hp = data.stats[0].base_stat;
    const imgSrc = data.sprites.other.dream_world.front_default;
    const pokeName = data.name[0].toUpperCase() + data.name.slice(1);
    const statAttack = data.stats[1].base_stat;
    const statDefense = data.stats[2].base_stat;
    const statSpeed = data.stats[5].base_stat;
    const themeColor = typeColor[data.types[0].type.name];

    setPokeData({
      hp,
      imgSrc,
      pokeName,
      statAttack,
      statDefense,
      statSpeed,
      themeColor,
      types: data.types,
    });
  };

  const appendTypes = (types) => {
    return types.map((item, index) => (
      <span key={index}>{item.type.name}</span>
    ));
  };

  const styleCard = (color) => {
    const card = document.getElementById("card");
    card.style.background = `radial-gradient(circle at 50% 0%, ${color} 36%, #ffffff 36%)`;
    card.querySelectorAll(".types span").forEach((typeColor) => {
      typeColor.style.backgroundColor = color;
    });
  };

  useEffect(() => {
    if (pokeData) {
      styleCard(pokeData.themeColor);
    }
  }, [pokeData]);

  return (
    <div className="container">
      <div id="card">
        {pokeData && (
          <>
            <p className="hp">
              <span>HP</span> {pokeData.hp}
            </p>
            <img src={pokeData.imgSrc} alt="Pokemon" />
            <h2 className="poke-name">{pokeData.pokeName}</h2>
            <div className="types">{appendTypes(pokeData.types)}</div>
            <div className="stats">
              <div>
                <h3>{pokeData.statAttack}</h3>
                <p>Attack</p>
              </div>
              <div>
                <h3>{pokeData.statDefense}</h3>
                <p>Defense</p>
              </div>
              <div>
                <h3>{pokeData.statSpeed}</h3>
                <p>Speed</p>
              </div>
            </div>
          </>
        )}
      </div>
      <button id="btn" onClick={getPokeData}>
        Generate
      </button>
    </div>
  );
};

export default App;
