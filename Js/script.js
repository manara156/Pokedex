const nomePoke = document.querySelector('.pokemon_name');
const numeroPoke = document.querySelector('.pokemon_number');
const fotoPoke = document.querySelector('.pokemon_image');

const form = document.querySelector('.form');
const input = document.querySelector('.input_search');
const btnProx = document.querySelector('.btn-prox');
const btnVoltar = document.querySelector('.btn-volta');

let searchPokemon = 1;





const buscaPokemon = async (pokemon) => {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
   if(APIResponse.status == 200){
    const data = await APIResponse.json();
    return data;
   }
}

const renderPokemon = async (pokemon) =>{

    nomePoke.innerHTML = 'Carregando...'
    numeroPoke.innerHTML= '';

    const data = await buscaPokemon(pokemon);
    if(data){
        fotoPoke.style.display='block'
        nomePoke.innerHTML = data.name;
        numeroPoke.innerHTML = data.id;
        fotoPoke.src = data['sprites']['versions']['generation-v']['black-white']
        ['animated']['front_default'];

        input.value ='';
        searchPokemon =data.id;
    
    } else {
        fotoPoke.style.display = 'none';
        nomePoke.innerHTML = 'Não encontrado :c';
        numeroPoke.innerHTML ='';
    }
   

}

form.addEventListener('submit',(event) =>{
    event.preventDefault();
    renderPokemon(input.value.toLowerCase());
});

btnProx.addEventListener('click',()=>{
   searchPokemon ++;
   renderPokemon(searchPokemon);
})

btnVoltar.addEventListener('click',()=>{
    if(searchPokemon >1){
        searchPokemon --;
        renderPokemon(searchPokemon);
    }
});


renderPokemon(searchPokemon);
