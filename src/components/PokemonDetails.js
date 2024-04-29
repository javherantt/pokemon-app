import { useParams, Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import logo from "../assets/pokebola.png";
import axios from "axios";

const PokemonDetails = () => {
  const [colorCard, setColorCard] = useState({});
  const [pokeData, setPokeData] = useState();
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${id}/`)
      .then((res) => setPokeData(res.data));
  }, [id]);

  useEffect(() => {
    if (pokeData?.species !== undefined) {
      axios.get(pokeData?.species.url).then((res) => setColorCard(res.data));
    }
  }, [pokeData]);

  return (
    <main className='container main-pokemon'>
    <>
      {pokeData === undefined ? (
        <>
          <img  src={logo} alt="Logo" />
          <div className="error">
            <img
              src="https://forums.pokemmo.eu/uploads/monthly_2021_10/poxdex.gif.85c1135c0176f841a90a240b6c572fe3.gif"
              alt="Error"
              className="error__img"
            />
          </div>
          <Link className="btn-out" to={-1}>
            <i className="bx bx-log-out-circle"></i>
          </Link>
        </>
      ) : (

        <div class="main-pokemon" >

				<div className='header-main-pokemon'>
						<span className='number-pokemon'>#{pokeData.id}</span>
						<div className='container-img-pokemon'>
							<img
								src={pokeData.sprites.other.dream_world.front_default}
								alt={`Pokemon ${pokeData?.name}`}
							/>
						</div>

						<div className='container-info-pokemon'>
							<h1>{(pokeData.name)}</h1>
							<div className='card-types info-pokemon-type'>
								{pokeData.types.map(type => (
									<span key={type.type.name} className={`${type.type.name}`}>
										{type.type.name}
									</span>
								))}
							</div>
							<div className='info-pokemon'>
								<div className='group-info'>
									<p>Altura</p>
									<span>{pokeData.height}</span>
								</div>
								<div className='group-info'>
									<p>Peso</p>
									<span>{pokeData.weight}KG</span>
								</div>
							</div>
						</div>
					</div>

          <div className='container-stats'>
						<h1>Estadísticas</h1>
						<div className='stats'>
							<div className='stat-group'>
								<span>Hp</span>
								<div className='progress-bar'></div>
								<span className='counter-stat'>
									{pokeData.stats[0].base_stat}
								</span>
							</div>
							<div className='stat-group'>
								<span>Attack</span>
								<div className='progress-bar'></div>
								<span className='counter-stat'>
									{pokeData.stats[1].base_stat}
								</span>
							</div>
							<div className='stat-group'>
								<span>Defense</span>
								<div className='progress-bar'></div>
								<span className='counter-stat'>
									{pokeData.stats[2].base_stat}
								</span>
							</div>
							<div className='stat-group'>
								<span>Special Attack</span>
								<div className='progress-bar'></div>
								<span className='counter-stat'>
									{pokeData.stats[3].base_stat}
								</span>
							</div>
							<div className='stat-group'>
								<span>Special Defense</span>
								<div className='progress-bar'></div>
								<span className='counter-stat'>
									{pokeData.stats[4].base_stat}
								</span>
							</div>
							<div className='stat-group'>
								<span>Speed</span>
								<div className='progress-bar'></div>
								<span className='counter-stat'>
									{pokeData.stats[5].base_stat}
								</span>
							</div>
						</div>
					</div>

        </div>
      )}
    </>
    </main>
  );

};

export default PokemonDetails;
