
const fetchPokemon= () => {

const getUrl = id => `https://pokeapi.co/api/v2/pokemon/${id}` // const recebe id como parametro

const pokemonPromises=[]

    for (let i=1; i<=150; i++){
    pokemonPromises.push(fetch(getUrl(i)) .then( response => response.json()))

     //faz a request com o fetch e transforma o resultado em json para melhor manipulação// a cada loop do for, a função recebe um id novo, traz um pokemon diferente e adiciona ao fim da array pokepromise
    }
    Promise.all(pokemonPromises) //recebe o array de promisse e quando todas elas forem recebidas, retornara uma promise podendo usar o then

    .then( pokemons =>{

        const lisPokemons = pokemons.reduce((accumulator,pokemon)=>{// o reduce foi usado para transformar todas as arrays devolvidas pela api em uma unica string

            const types = pokemon.types.map(typeInfo => typeInfo.type.name) //o map foi usado para selecionar o tipo do pokemon que estava dentro de outra array e  retorna-lo em string


            accumulator+= `
            <li>
            <img  id='${pokemon.id}' class=" ${types[0]}" alt="${pokemon.name}" src=" https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png" 
            <h1>${pokemon.id} . ${pokemon.name}</h1>
            <p> ${types.join(' | ')}</p>     
            </li>`
            return accumulator // o acumulator verifica cada pokemon que foi passado pelo parametro, trata como o html acima e concatena, tornando uma grande lista de pokemons
        },'') 
    
        const ol = document.querySelector('[data-js="pokedex"]')

        ol.innerHTML = lisPokemons;

    })

}

fetchPokemon()



