import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Header from "../../components/Header";
import api from "../../services/api";
import { AiOutlineLoading3Quarters, AiOutlineHeart } from "react-icons/ai"
import EvolutionChain from "../../components/EvolutionChain"
import { FaArrowUp } from "react-icons/fa"
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Pokemon() {
  const { id } = useParams();
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(true)
  const [pokedata, setPokeData] = useState({
    abilities: [],
    height: "",
    name: "",
    sprites: "",
    stats: [],
    types: [],
    weight: "",
    text: "",
  });
  var color = "";

  async function getPokemon() {
    try {
      const response = await api.get(`/pokemon/${id}`);
      const secResponse = await api.get(`/pokemon-species/${id}`);
      setUrl(secResponse.data.evolution_chain.url.split("v2")[1]);
      setPokeData({
        abilities: response.data.abilities,
        height: response.data.height,
        name: response.data.name,
        sprites: response.data.sprites.other['official-artwork'].front_default,
        stats: response.data.stats,
        types: response.data.types,
        weight: response.data.weight,
        text: secResponse.data.flavor_text_entries[0].flavor_text,
      });
      setLoading(false)
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getPokemon();
    window.scroll({
      top: 0,
      behavior: "smooth",
  })
  }, [url, id]);

  const colors = {
    bug: "bg-bug",
    dark: "bg-dark",
    dragon: "bg-dragon",
    electric: "bg-electric",
    fairy: "bg-fairy",
    fighting: "bg-fighting",
    fire: "bg-fire",
    flying: "bg-flying",
    ghost: "bg-ghost",
    grass: "bg-grass",
    ground: "bg-ground",
    ice: "bg-ice",
    normal: "bg-normal",
    poison: "bg-poison",
    psychic: "bg-psychic",
    rock: "bg-rock",
    steel: "bg-steel",
    water: "bg-water",
  };

  function scrollTop() {
    window.scroll({
      top: 0,
      behavior: "smooth",
    })
  }

  function setFavorite() {
    if (localStorage.getItem(pokedata.name) !== null ){
      try {
        localStorage.removeItem(pokedata.name)
        toast.success('Pokemon removed from your favorites!', {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 5000,
        });
      } catch (error) {
        toast.error('Unable to remove pokemon, try again!', {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 5000,
        });
      }
      return
    }
    try {
      localStorage.setItem(pokedata.name, id)
      toast.success('Pokemon added to favorites!', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 5000,
      })
    } catch (error) {
      toast.error('Error adding pokemon, try again!', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 5000,
      });
    }
  }



  return (
    <>
      <div className="flex flex-col min-h-screen max-w-screen bg-[#CE092A]">
        <Header />
        <div className="flex mt-4 ml-4 justify-start items-center">
          <Link
            to="/"
            className="text-white font-semibold bg-gray-900 p-2 px-10 rounded-md"
          >
            Back
          </Link>
        </div>
        <div className="flex items-center justify-center mt-6">
        <ToastContainer/>
          <div className="shadow-2xl bg-gray-700 w-11/12 h-fit p-10 mb-10 rounded-2xl">
            <div className="flex flex-col lg:flex-row gap-y-6">
              <div className="flex flex-col justify-center items-center">
                {loading ?
                 <div className="flex w-full h-40 overflow-hidden gap-2 items-center justify-center m-auto">
                 <AiOutlineLoading3Quarters
                     size={25}
                     className="animate-spin text-white"
                 />
                 <p className="text-white"> Loading...</p>
                 </div>
                :
                <img
                  className="h-64 w-64"
                  src={pokedata.sprites}
                  alt={pokedata.name}
                />
                }
                <div className="flex flex-row items-center justify-start lg:justify-center w-full gap-x-2">
                  {pokedata.types.map((type, value) => {
                    color = pokedata.types[0].type.name;
                    return (
                      <div
                        key={value}
                        className={`flex flex-row justify-start items-center gap-x-2 ${
                          colors[type.type.name]
                        } rounded-md p-2 shadow-sm`}
                      >
                        <img
                          className="h-6 w-6"
                          src={`/types/${type.type.name}.svg`}
                          alt={`${type.type.name} icon`}
                        />
                        <p className="text-white font-bold capitalize">
                          {type.type.name}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="flex flex-col max-w-sm lg:mx-10">
                <div className="flex gap-5 items-center ">
                  <h1 className="text-white capitalize text-5xl md:text-6xl font-bold">
                    {pokedata.name}
                  </h1>
                  <button onClick={() => setFavorite()} 
                  aria-label="Add to Favorites"
                  className="flex group items-center justify-center bg-red-600 hover:bg-white p-3 rounded-full">
                    <AiOutlineHeart className="text-white group-hover:text-red-600" size={30}/>
                  </button>
                </div>
                <p className="text-justify text-lg text-white font-medium">
                  {pokedata.text}
                </p>
                  <div className="mt-6">
                  <p className="text-xl text-white font-medium">
                    Height:{" "}
                    <span className="font-normal">{pokedata.height}</span>
                  </p>
                  <p className="text-xl text-white font-medium">
                    Weight: <span className="font-normal">{pokedata.weight}</span>
                  </p>
                  </div>
                  <h2 className="text-white mt-6 text-lg font-medium">Abilities:</h2>
                <div className="flex flex-row gap-x-4">
                  {pokedata.abilities.map((item, index) => {
                    return (
                      <p key={index} className="text-white capitalize text-md">
                        {item.ability.name}
                      </p>
                    );
                  })}
                </div>
              </div>
              <div className="flex flex-col flex-1">
                <div className="grid  gap-x-6">
                  {pokedata.stats.map((item, index) => {
                    return (
                      <div key={index}>
                        <p className="capitalize text-white font-medium">
                          {item.stat.name}
                        </p>
                        <div className="w-full relative h-5 bg-gray-300 rounded-lg">
                          <div
                            className={`${colors[color]} absolute top-0 left-0 h-full rounded-lg max-w-full`}
                            style={{ width: `${item.base_stat}%` }}
                          ></div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            <div>
                <h1 className="text-white w-full text-center mt-10 font-bold text-3xl">Evolutions</h1>
                {url &&(
                    <EvolutionChain url={url}/>
                )}
            </div>
          </div>
        </div>
        <button onClick={scrollTop}
        aria-label="Back to top"
        className='flex fixed items-center justify-center bottom-14 right-8  rounded-full h-14 w-14 shadow-2xl bg-gray-900 text-white'>
          <FaArrowUp size={30} />
        </button>
      </div>
    </>
  );
}
