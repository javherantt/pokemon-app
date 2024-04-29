import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const PokemonCard = ({ link }) => {
  const [dataPokemon, setDataPokemon] = useState({});
  const [colorCard, setColorCard] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(link).then((res) => setDataPokemon(res.data));
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, [link]);

  useEffect(() => {
    if (dataPokemon.species !== undefined) {
      axios.get(dataPokemon.species?.url).then((res) => setColorCard(res.data));
    }
  }, [dataPokemon]);

  const redirection = () => {
    navigate(`/pokedex/${dataPokemon.id}`);
  };

  const loader = () => {
    return (
      <div className="card__spinner">
        <span>L</span>
        <span>O</span>
        <span>A</span>
        <span>D</span>
        <span>I</span>
        <span>N</span>
        <span>G</span>
      </div>
    );
  };

  if (loading) {
    return loader();
  } else {
    return (
      <button onClick={redirection} className='card-pokemon'>
			<div className='card-img'>
				<img
					src={dataPokemon.sprites.other.dream_world.front_default}
					alt={`Pokemon ${dataPokemon.name}`}
				/>
			</div>
			<div className='card-info'>
				<span className='pokemon-id'>N° {dataPokemon.id}</span>
				<h3>{dataPokemon.name}</h3>
				<div className='card-types'>
					{dataPokemon.types.map(type => (
						<span key={type.type.name} className={type.type.name}>
							{type.type.name}
						</span>
					))}
				</div>
			</div>
		</button>
    );
  }
};

export default PokemonCard;
