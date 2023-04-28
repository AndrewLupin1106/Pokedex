import Card from '../../components/Card'
import { useEffect, useState } from 'react'
import api from '../../services/api'
import { BiSearchAlt } from "react-icons/bi"
import { FaArrowUp } from "react-icons/fa"
import Pagination from '../../components/Pagination'
import { Link } from 'react-router-dom'

export default function Pokedex() {
  const [pokemons, setPokemons] = useState([])
  const [pokemonsFilter, setPokemonsFilter] = useState([])
  const [totalPokemon, setTotalPokemon] = useState(9)
  const [search, setSearch] = useState("")
  const [offset, setOffset] = useState(0)
  const [total, setTotal ] = useState(0)
  const [types, setTypes] = useState([])
  const [searchType, setSearchType] = useState("")
  const [pokemonList, setPokemonList] = useState([]);

  useEffect(() => {
    if (pokemons.length > 0) return
    async function getPokemon() {
          try {
              const { data: {count} } = await api.get("/pokemon")
              const response  = await api.get(`/pokemon?limit=10000&offset=0`)
              setPokemons(response.data.results)
              setTotal(count)
            } catch (error) {
              console.log(error)
          }
      }
    getPokemon()
  }, [])

  useEffect(() => {
    if (types.length > 0) return
    async function getTypes() {
          try {
              const { data: {count} } = await api.get("/type")
              const response  = await api.get(`/type?limit=10000&offset=0`)
              setTypes(response.data.results)
            } catch (error) {
              console.log(error)
          }
      }
    getTypes()
  }, [])

  useEffect(() => {
    const lowerSearch = search.toString().toLowerCase();
    setPokemonsFilter(pokemons.filter((item) => item.name.toLowerCase().startsWith(lowerSearch)));
  }, [search, pokemons]);

  useEffect(() => {
    setTotal(pokemonsFilter.length);
  }, [pokemonsFilter]);

  
  function scrollTop() {
    window.scroll({
      top: 0,
      behavior: "smooth",
    })
  }

  function onLimitChange(value) {
    setTotalPokemon(parseInt(value));
  }

  return (
    <>
        <div className='w-full flex flex-col md:flex-row  items-center justify-center mt-6 px-8'>
            <div className='relative w-full md:w-1/2'>
              <input className='flex p-2 w-full rounded-md shadow-md focus:outline-none'
              type='text'
              placeholder='Search Pokemon'
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              />
              <BiSearchAlt size={25} className='absolute top-2 right-3 text-gray-400'/>
            </div>
            <Link to="/favorites" className='px-10 mt-4 md:ml-4 md:mt-0 bg-gray-900 text-white rounded-md p-2'>
              <span className='font-semibold'>Favorite</span>
            </Link>
            <select className="mt-4 md:ml-4 md:mt-0 bg-gray-900 text-white rounded-md p-2" onChange={(e) => onLimitChange(e.target.value)}>
              <option>9</option>
              <option>18</option>
              <option>45</option>
            </select>
        </div>
        <div className='py-10 md:px-10 flex flex-col justify-center items-center gap-10 md:grid md:grid-cols-2 min-[1250px]:grid min-[1250px]:grid-cols-3'>
          {pokemonsFilter.length <= 0 && !search ? pokemons.map((item, index) => {
            if (index >= offset && index < offset + totalPokemon) {
              return(
                 <Card key={item.name} name={item.name}/>
              )
            }
          }) : pokemonsFilter.map((item, index) => {
            if (index >= offset && index < offset + totalPokemon) {
              return(
                <Card key={item.name} name={item.name}/>
              )
            }
          })}
        </div>
        <div className='w-full flex items-center justify-center'>          
          {total > 6 && (
            <Pagination 
            limit={totalPokemon} 
            total={total} 
            offset={offset}
            setOffset={setOffset}
            />
          )}
        </div>
       
 
      <button 
      onClick={scrollTop}
      aria-label='Back to top'
      className='flex fixed items-center justify-center bottom-28 md:bottom-14 right-8  rounded-full h-14 w-14 shadow-2xl bg-gray-900 text-white'>
        <FaArrowUp size={30} />
      </button>
    </>
  )
}