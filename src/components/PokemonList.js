import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import PokemonCard from "./PokemonCard";
import { motion } from "framer-motion";
import logo from "../assets/pokebola.png";
import Pagination from "./Pagination";
import axios from "axios";

const PokemonList = () => {
  const [pokeSearch, setPokeSearch] = useState("");
  const name = useSelector((state) => state.name);
  const item = useSelector((state) => state.item);
  const [pokemons, setPokemons] = useState([]);
  const [types, setTypes] = useState([]);
  const navigate = useNavigate();

  const baseURL = 'https://pokeapi.co/api/v2/';

  const getAllPokemons = () => {
    axios
      .get(baseURL + "pokemon?offset=0&limit=1126")
      .then((res) => setPokemons(res.data.results));
  };

  useEffect(() => {
    axios
      .get("https://pokeapi.co/api/v2/type")
      .then((res) => setTypes(res.data.results));
    getAllPokemons();
  }, []);

  /*
  const search = () => {
    navigate(`/pokedex/${pokeSearch.toLowerCase()}`);
  };
*/
  const search = async (e) => {
    e.preventDefault(); // Evita que el formulario recargue la página
  
    try {
      axios
      .get(baseURL + 'pokemon?limit=100000&offset=0')
      .then((res) => {
        var filteredPokemons = res.data.results.filter(pokemon => {
          return pokemon.name.includes(pokeSearch.toLocaleLowerCase());
        });
        setPokemons(filteredPokemons);
      });
		
    } catch (error) {
      console.error('Error al buscar:', error);
    }
  };

  const filterPokemons = (e) => {
    if (e.target.value === "all-pokemons") {
      getAllPokemons();
    } else {
      axios.get(e.target.value).then((res) => setPokemons(res.data.pokemon));
    }
    setCurretPage(1);
  };

  //Pagination
  const [curretPage, setCurretPage] = useState(1);
  const [cardsPerPage] = useState(item);
  const indexOfLastCard = curretPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentPosts = pokemons.slice(indexOfFirstCard, indexOfLastCard);

  const paginate = (pageNumber) => {
    setCurretPage(pageNumber);
  };

  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      exit={{
        x: window.innerWidth,
        transition: {
          duration: 0.3,
        },
      }}
    >

      <div className="containerAux">
      <header className=''>

				<Link to='/' className='logo'>
					
					<img
						src={logo}
						alt='Logo Pokedex'
					/>
					<p>{name}</p>
				</Link>

				<form onSubmit={search}>
					<div className='form-group'>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							fill='none'
							viewBox='0 0 24 24'
							strokeWidth='1.5'
							stroke='currentColor'
							className='icon-search'
						>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								d='M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z'
							/>
						</svg>
						<input
							type='text'
							onChange={(e) => setPokeSearch(e.target.value)}
              value={pokeSearch}
							placeholder='Busca un pokemon'
						/>
					</div>

					<button className='btn-search'>Buscar</button>

          <select className="search__select" onChange={filterPokemons}>
            <option value="all-pokemons">Todos</option>
            {types.map((type) => (
              <option key={type.name} value={type.url}>
                {type.name}
              </option>
            ))}
          </select>
				</form>

        
          
			</header>
      

      <section className="card-list-pokemon">
        {currentPosts?.map((pokemon) => (
          <PokemonCard
            key={pokemon.url === undefined ? pokemon.pokemon.url : pokemon.url}
            link={pokemon.url === undefined ? pokemon.pokemon.url : pokemon.url}
          />
        ))}
      </section>
      <Pagination
        cardsPerPage={cardsPerPage}
        totalCards={pokemons.length}
        paginate={paginate}
        curretPage={curretPage}
      />

    </div>
    </motion.div>
  );
};

export default PokemonList;
