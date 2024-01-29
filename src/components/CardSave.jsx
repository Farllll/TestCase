import React, { useContext, useEffect } from "react";
import { usePokemonContext } from "../context/PokemonContext";

const typeColorMap = {
  normal: "#4A5568",
  ighting: "#E53E3E",
  fighting: "#E53E3E",
  flying: "#667EEA",
  poison: "#8B5CF6",
  ground: "#D69E2E",
  rock: "#D97706",
  bug: "#48BB78",
  ghost: "#667EEA",
  steel: "#718096",
  fire: "#EF4444",
  water: "#3B82F6",
  grass: "#4ADE80",
  electric: "#FBBF24",
  psychic: "#9333EA",
  ice: "#93C5FD",
  dragon: "#4C51BF",
  dark: "#1F2937",
  fairy: "#F472B6",
  unknown: "#999999",
  shadow: "#555555",
};

const CardSave = () => {
  const { savedPokemon, deletePokemon } = usePokemonContext();

  const handleDelete = (pokemonId) => {
    deletePokemon(pokemonId);
  };

  if (savedPokemon.length === 0) {
    return (
      <div className=" text-gray-600 flex justify-center">
        No saved Pokemon.
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-wrap justify-center mx-20">
        {savedPokemon.map((content, i) => (
          <div key={i} className="card w-72 bg-base-100 shadow-xl m-4">
            {content.sprites && content.sprites.other && (
              <figure>
                <img
                  src={content.sprites.other["official-artwork"].front_default}
                  className="w-44 h-44"
                  alt={content.name}
                />
              </figure>
            )}
            <div className="card-body">
              <h2 className="card-title justify-center font-bold">
                {content.alias}
              </h2>
              <p className="text-gray-400 text-sm font-bold">
                Height:{" "}
                <span className="text-black">{content.height / 10} m</span>
              </p>
              <p className="text-gray-400 text-sm font-bold">
                Weight:{" "}
                <span className="text-black">{content.weight / 10} Kg</span>
              </p>
              <ul className="flex gap-2">
                {content.types.map((type, index) => (
                  <li
                    className="badge font-bold text-white text-center h-5 text-xs rounded-2xl"
                    key={index}
                    style={{
                      backgroundColor:
                        typeColorMap[type.type.name] || "#CCCCCC",
                    }}
                  >
                    {type.type.name}
                  </li>
                ))}
              </ul>
              <button
                className="btn bg-[#f55464] hover:bg-[#a83944] text-white"
                onClick={() => handleDelete(content.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardSave;