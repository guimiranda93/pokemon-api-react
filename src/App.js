import axios from "axios";
import { useEffect, useState } from "react";

function App() {
	const [pokemons, setPokemons] = useState([]);
	const [pokemonAtual, setPokemonAtual] = useState();

	useEffect(() => {
		buscarTodosPokemons();
	}, []);

	const buscarTodosPokemons = async () => {
		const result = await axios.get("https://pokeapi.co/api/v2/pokemon");

		setPokemons(result.data.results);
	};

	const buscarPokemon = async (url) => {
		const result = await axios.get(url);

		setPokemonAtual(result.data);
	};

	const buscarAnteriorPokemon = async () => {
		const result = await axios.get(
			"https://pokeapi.co/api/v2/pokemon/" + (pokemonAtual.id - 1)
		);

		setPokemonAtual(result.data);
	};

	const buscarProximoPokemon = async () => {
		const result = await axios.get(
			"https://pokeapi.co/api/v2/pokemon/" + (pokemonAtual.id + 1)
		);

		setPokemonAtual(result.data);
	};

	return (
		<div>
			<div className="btn-container">
				{pokemons.map((item, index) => (
					<button
						onClick={() => buscarPokemon(item.url)}
						className="btn-poke"
						key={index}
					>
						{item.name}
					</button>
				))}
			</div>

			{pokemonAtual && (
				<div className="container">
					<button
						onClick={() => buscarAnteriorPokemon()}
						className="btn-poke"
					>
						Anterior
					</button>
					<div className="card-container">
						<div className="card">
							<img
								src={pokemonAtual.sprites.front_default}
								alt={pokemonAtual.name}
							/>
							<h1>{pokemonAtual.name}</h1>
							<div className="tipo-container">
								<h2>Tipo:</h2>
								{pokemonAtual.types.map((item, index) => (
									<span>| {item.type.name} | </span>
								))}
							</div>
							<div className="tipo-container">
								<h2>Habilidades:</h2>
								{pokemonAtual.abilities.map((item, index) => (
									<span key={index}>
										| {item.ability.name} |{" "}
									</span>
								))}
							</div>
						</div>
					</div>
					<button
						onClick={() => buscarProximoPokemon()}
						className="btn-poke"
					>
						Próximo
					</button>
				</div>
			)}
		</div>
	);
}

export default App;
