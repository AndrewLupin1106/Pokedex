import { useEffect, useState } from "react"
import api from "../../services/api"
import "./index.css"
import {AiOutlineLoading3Quarters} from "react-icons/ai"
import { Link } from "react-router-dom"

export default function Card({name}){
    const [pokedata, setPokeData] = useState({
        id: "",
        types: [],
        sprites: "",
    })
    const [loading, setLoading] = useState(true)

    const colors = {
        bug: 'bg-bug',
        dark: 'bg-dark',
        dragon: 'bg-dragon',
        electric: 'bg-electric',
        fairy: 'bg-fairy',
        fighting: 'bg-fighting',
        fire: 'bg-fire',
        flying: 'bg-flying',
        ghost: 'bg-ghost',
        grass: 'bg-grass',
        ground: 'bg-ground',
        ice: 'bg-ice',
        normal: 'bg-normal',
        poison: 'bg-poison',
        psychic: 'bg-psychic',
        rock: 'bg-rock',
        steel: 'bg-steel',
        water: 'bg-water',
    }

    useEffect(() => {
        async function getPokemonData() {
            const response = await api.get(`/pokemon/${name}`)
            setPokeData({
                id: response.data.id,
                types: response.data.types,
                sprites: response.data.sprites.other['official-artwork'].front_default
            })
            setLoading(false)
        }   
        getPokemonData()
    }, [])

    return(
        <div className="wraper flex justify-center min-h-full h-full items-stretch"> 
        {loading ? 
        <div className="corte sombra px-8 pb-6 flex flex-col items-center bg-[#DEDEDE] w-[90vw] min-h-[340px] md:w-full lg:w-96 lg:h-[340px] rounded-2xl gap-y-2 
        transition ease-in-out hover:-translate-y-1 hover:scale-105 duration-300 hover:cursor-pointer
        ">
            <div className="flex flex-row gap-x-4 p-4">
                <div className="h-6 w-6 bg-red-600 rounded-full shadow-xl">
                    <div className="relative top-[0.6px] -rotate-[25deg] bg-red-400 h-3 w-5 rounded-full small-oval">
                    </div>
                </div>
                <div className="h-6 w-6 bg-red-600 rounded-full shadow-xl">
                    <div className="relative top-[0.6px] -rotate-[25deg] bg-red-400 h-3 w-5 rounded-full small-oval">
                    </div>
                </div>
            </div>
            <div className="flex items-center justify-center bg-gray-700 w-full rounded-md shadow-2xl">
                <div className="flex w-full h-40 overflow-hidden gap-2 items-center justify-center m-auto">
                <AiOutlineLoading3Quarters
                    size={25}
                    className="animate-spin text-white"
                />
                <p className="text-white"> Loading...</p>
            </div>
            </div>
        </div>
         
        : 
        <Link to={"/pokemon/" + pokedata.id} className="">
            <div className="corte sombra px-8 pb-6 flex flex-col items-center bg-[#DEDEDE] w-[90vw] min-h-full h-fit md:w-80 lg:w-96 rounded-2xl gap-y-2 
            transition ease-in-out hover:-translate-y-1 hover:scale-105 duration-300 hover:cursor-pointer
            ">
                <div className="flex flex-row gap-x-4 p-4">
                    <div className="h-6 w-6 bg-red-600 rounded-full shadow-xl">
                        <div className="relative top-[0.6px] -rotate-[25deg] bg-red-400 h-3 w-5 rounded-full small-oval">
                        </div>
                    </div>
                    <div className="h-6 w-6 bg-red-600 rounded-full shadow-xl">
                        <div className="relative top-[0.6px] -rotate-[25deg] bg-red-400 h-3 w-5 rounded-full small-oval">
                        </div>
                    </div>
                </div>
                <div className="flex items-center justify-center bg-gray-700 w-full rounded-md shadow-2xl">
                    {pokedata.sprites ? 
                    <div className="h-40 w-40">
                        <img className="cover w-full h-full floating" src={pokedata.sprites} alt={name}/>
                    </div>
                    : <div className="flex h-40 w-40 justify-center items-center ">
                        <h1  className="text-center text-white font-semibold">Este pokemon não possui imagem! &#58;&#40;</h1>
                    </div>
                    }
                </div>
                <div className="flex flex-row items-center justify-around  w-full">
                    <p className="font-semibold text-xl text-gray-900">#{pokedata.id}</p>
                    <p className="font-black text-3xl capitalize text-gray-900">{name}</p>
                </div>
                <div className="flex flex-row items-center justify-end lg:justify-center w-full gap-x-2">
                    {pokedata.types.map((type, value) => {
                        return(
                            <div key={value} className={`flex flex-row justify-start items-center gap-x-2 ${colors[type.type.name]} rounded-md p-2 shadow-sm`}>
                                <img className="h-6 w-6" src={`/types/${type.type.name}.svg`} alt={`${type.type.name} icon`}/>
                                <p className="text-white font-bold capitalize">{type.type.name}</p>
                            </div>
                        )
                    })}
                </div>
            </div>
        </Link>
        }
        </div>
    )
}