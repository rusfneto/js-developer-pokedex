const loadMoreButton = document.getElementById('loadMoreButton')
const pokemonList = document.getElementById('pokemonList')
let offset = 0
const limit = 5


function loadPokemonItens(offset, limit) {

    Pokeapi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map((pokemon) => `<li class="pokemon ${pokemon.tipo}">
        <span class="number">#${pokemon.numero}</span>
        <span class="name">${pokemon.nome}</span>
    
        <div class="detail">
            <ol class="types">
                ${pokemon.tipos.map((type) => `<li class="type">${type}</li>`).join('')}
                <li class="type">${pokemon.tipo}</li>
            </ol>
    
            <img src="${pokemon.imagem}"
                alt="${pokemon.name}">
        </div>
    </li>`).join('')
        pokemonList.innerHTML += newHtml
    })
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    loadPokemonItens(offset, limit)
})