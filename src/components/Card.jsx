import React, { useEffect, useState } from "react";
import { GetPokemon } from "../api";
import { usePokemonContext } from "../context/PokemonContext";
import Filter from './filter';

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

const Card = ({ searchQuery }) => {
  const [pokemonData, setPokemonData] = useState([]);
  const [visiblePokemon, setVisiblePokemon] = useState([]);
  const [visiblePokemonCount, setVisiblePokemonCount] = useState(30);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const { savedPokemon, savePokemon } = usePokemonContext();
  const [aliasInput, setAliasInput] = useState("");
  const [selectedType, setSelectedType] = useState('all');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await GetPokemon(300);
        setPokemonData(result);
        setVisiblePokemon(result.slice(0, visiblePokemonCount));
        // console.log(result);
      } catch (error) {
        console.error("Error fetching Pokémon data:", error);
      }
    };

    fetchData();
  }, [visiblePokemonCount]);

  useEffect(() => {
    const filteredPokemon = pokemonData.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    let filteredByType = filteredPokemon;
    if (selectedType !== 'all') {
      filteredByType = filteredByType.filter((pokemon) =>
        pokemon.types.some((type) => type.type.name === selectedType)
      );
    }

    setVisiblePokemon(filteredByType.slice(0, visiblePokemonCount));
  }, [searchQuery, pokemonData, visiblePokemonCount, selectedType]);

  const loadMorePokemon = () => {
    setVisiblePokemonCount((prevCount) => prevCount + 30);
  };

  const handleSaveClick = (content) => {
    setSelectedPokemon({ ...content, alias: "" });
    document.getElementById("my_modal_2").showModal();
  };

  useEffect(() => {
    // console.log('Saved Pokemon:', savedPokemon);
  }, [savedPokemon]);

  const handleSavePokemon = () => {
    const aliasValue = aliasInput.trim();
    if (aliasValue) {
      const savedData = { ...selectedPokemon, alias: aliasValue };
      savePokemon(savedData);
      document.getElementById("my_modal_2").close();
      setAliasInput("");
    } else {
      // console.error('Alias cannot be empty');
      document.getElementById("my_modal_2").close();
    }
  };

  return (
    <div>
      <div className="px-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 grid gap-4">
        <Filter onChange={setSelectedType} />
      </div>


      <div className="flex flex-wrap justify-center mx-20">
        {visiblePokemon.map((content, i) => (
          <div key={i} className="card w-72 bg-base-100 shadow-xl m-4">
            <figure>
              <img
                src={content.sprites.other["official-artwork"].front_default}
                className="w-44 h-44"
                alt={content.name}
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title justify-center font-bold">
                {content.name}
              </h2>
              <p className="text-gray-400 text-sm font-semibold">
                Height:{" "}
                <span className="text-black">{content.height / 10} m</span>
              </p>
              <p className="text-gray-400 text-sm font-semibold">
                Weight:{" "}
                <span className="text-black">{content.weight / 10} Kg</span>
              </p>
              <ul className="flex gap-2">
                {content.types.map((type, index) => (
                  <li
                    className="badge font-bold text-white text-center h-8 text-1xl rounded-md"
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
                onClick={() => handleSaveClick(content)}
              >
                Save
              </button>
              <dialog id="my_modal_2" className="modal">
                <div className="modal-box">
                  <h3 className="font-bold text-lg">
                    Give a nickname to Pokemon!
                  </h3>
                  <input
                    type="text"
                    name=""
                    id=""
                    placeholder="e.g. Mamat Gunshop"
                    className="input input-bordered w-full bg-gray-100 mt-2 focus:outline-none"
                    value={aliasInput}
                    onChange={(e) => setAliasInput(e.target.value)}
                  />
                  <form method="dialog">
                    <button
                      className="w-full bg-[#f55464] hover:bg-[#a83944] btn mt-5 text-white"
                      onClick={handleSavePokemon}
                    >
                      Save Pokemon
                    </button>
                  </form>
                </div>
                <form method="dialog" className="modal-backdrop">
                  <button></button>
                </form>
              </dialog>
            </div>
          </div>
        ))}
      </div>
      <div className="py-10">
        {!searchQuery && (
          <button
            className="btn flex justify-center mx-auto bg-[#f55464] hover:bg-[#a83944] text-white"
            onClick={loadMorePokemon}
          >
            Load More
          </button>
        )}
      </div>
    </div>
  );
};

export default Card;
