
// Link base de cada pkm de la API
let URL = "https://pokeapi.co/api/v2/pokemon/"; 

// Como hay 150, lo recorreremos 150 veces al link, con cada id incrementado

for (let i=1; i<=151; i++) {

    // Concatenamos la iteracion a la URL para recorrer las 150 URLS (1 por cada pkm)
    
    // Fetchea la info en la URL que le pasamos / id=1, id=2, etc..
    fetch(URL + i)

        // El primer then toma la promesa (caso exitoso, es un string) y la convertimos a json con el metodo .json()
        .then((response) => response.json())

        // El segundo then nos permite mostrar la info ya jasoneada
        .then(data => mostrarPokemon(data))

}

/* 
En este punto, data es un conjunto de 150 objetos con la data de cada pkm
console.log(data);
De todas formas no vamos a usar todas las propiedades de los objetos, si no que
seleccionaremos la data que nos interesa mostrar.
*/

const listaPokemon = document.querySelector("#listaPokemon");   // div que contiene todas las cards de pkm



function mostrarPokemon(poke) {         // Toma como parametro la data de cada pkm en cada iteración

    const div = document.createElement("div");
    div.classList.add("pokemon");


    // Con este bloque podemos convertir el nro back en un 001, 024, etc. asi queda prolijo
    let pokeId = poke.id.toString();

    if (pokeId.length === 1) {

        pokeId = "00" + pokeId;             // #007

    } else if (pokeId.length === 2) {       

        pokeId = "0" + pokeId;              // #023
    }



    /* 
    Puede ocurrir que al acceder a ciertos datos se complique pues sean array, objetos con arrays, arrays de obj, etc.
    Por eso se recomienda tratarlos de antes en una variable, y luego usar el template con la variable directamente.
    */
    let tipos = poke.types.map(type =>`<p class="${type.type.name} tipo">${type.type.name}</p>`); 
    tipos = tipos.join('');


    /* 
    Ahora, mediante template literals, y mediante el placeholder ${ obj.atr } reemplazamos cada valor del JSON en nuestro div
    
    En algunos casos, como la imagen, debemos entrar a las propiedades del obj a traves de las prop padres y llegar justo a la que queremos:
    <img src="${poke.sprites.other["official-artwork"].front_default}" alt="pikachu">
    */

    div.innerHTML = 
    `
        <p class="pokemon-id-back">#${pokeId}</p>

        <div class="pokemon-imagen">
        <img src="${poke.sprites.other["official-artwork"].front_default}" alt="pikachu">
        </div>

        <div class="pokemon-info">
            <div class="nombre-contenedor">
                <p class="pokemon-id">#${pokeId}</p>
                <h2 class="pokemon-nombre">${poke.name}</h2>
            </div>
        </div>

        <div class="pokemon-tipos">
            ${tipos}
        </div>

        <div class="pokemon-stats">
            <p class="stat">${poke.height}kg</p>
            <p class="stat">${poke.weight}cm</p>
        </div>
    `
    listaPokemon.append(div);   // Una vez rellenada la card (div), se appendea en su seccion  
}




const botonesHeader = document.querySelectorAll(".btn-header");

botonesHeader.forEach(boton => boton.addEventListener("click", (event) => { 

    const botonId = event.currentTarget.id;     // el id del boton clickeado en el html

    listaPokemon.innerHTML = "";

    for (let i=1; i<=151; i++) {

        fetch(URL + i)

            .then((response) => response.json())
    
            .then(data => {

                // Si el boton apretado es "ver todos", llama a la funcion normal
                if (botonId === "ver-todos") {

                    mostrarPokemon(data);

                // Si el boton apretado es "tipo", por cada objeto que incluya ese tipo, se llama a la funcion (de los 150pkm..)
                } else {

                    const tipos = data.types.map(type => type.type.name);

                    if (tipos.some(tipo => tipo.includes(botonId))) {

                    mostrarPokemon(data);
                }

                }

            })
    }

} ) )
