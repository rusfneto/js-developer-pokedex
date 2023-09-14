const Pokeapi = { }

Pokeapi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url).then((response) => response.json())
        .then(convertPokeApiToModel)
}

Pokeapi.getPokemons = (offset = 0, limit = 5)=> {
    const url = 'https://pokeapi.co/api/v2/pokemon?offset=' + offset + '&limit=' + limit
    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .then((pokemons) => pokemons.map(Pokeapi.getPokemonDetail))
        .then((detailRequests) => Promise.all(detailRequests))
        .then((pokemonsDetails) => pokemonsDetails)
}

function convertPokeApiToModel(pokeDetail) {
    const pokemon = new Pokemon()
    pokemon.nome = pokeDetail.name
    pokemon.numero = pokeDetail.order
    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types
    pokemon.tipos = types
    pokemon.tipo = type
    pokemon.imagem = pokeDetail.sprites.other.dream_world.front_default

    return pokemon
}