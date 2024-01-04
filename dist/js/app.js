let nombrePokemon = null;
let imgPokemon = null;
let contentButtons = null;
let btnBack = null;
let btnNext = null;
let estadisticasPokemon = null;
let tituloPg = null;
let iconPg = null;
let alturaPeso = null;
let loader = null;

window.onload = function () {
  nombrePokemon = document.getElementById("nombrePokemon");
  imgPokemon = document.getElementById("imgPokemon");
  contentButtons = document.getElementById("contentButtons");
  btnBack = document.getElementById("btnBack");
  btnNext = document.getElementById("btnNext");
  estadisticasPokemon = document.getElementById("estadisticasPokemon");
  tituloPg = document.getElementById("tituloPg");
  iconPg = document.getElementById("iconPg");
  alturaPeso = document.getElementById("alturaPeso");
  loader = document.getElementById("loader2");

  pokemonsLoad("https://pokeapi.co/api/v2/pokemon");
}

function pokemonsLoad(endpoint) {
  console.log("Iniciando consumo API: ", endpoint);
  loader.style.display = "flex";

  fetch(endpoint)
    .then(respuesta => respuesta.json())
    .then(data => {

      contentButtons.innerHTML = "";

      const fetchPromises = [];

      for (var i = 0; i < data.results.length; i++) {
        const tempURL = data.results[i].url;
        const fetchPromise = fetch(tempURL)
          .then(datosPokemon => datosPokemon.json())
          .then(dataPokemon => {
            var temp = `<button style="text-transform: capitalize;" class="btn btn-outline-primary col-2 m-2 p-2" onclick="verPokemon('${tempURL}')">
                      <img src="${dataPokemon.sprites.front_default}" alt=""> ${dataPokemon.name} 
                    </button>`;
            contentButtons.innerHTML += temp;
          });

        fetchPromises.push(fetchPromise);
      }

      // Usar Promise.all para esperar a que todas las solicitudes fetch se completen
      Promise.all(fetchPromises)
        .then(() => {
          loader.style.display = "none";

          btnBack.disabled = data.previous == null;
          btnNext.disabled = data.next == null;
          btnBack.setAttribute("onclick", `pokemonsLoad("${data.previous}")`);
          btnNext.setAttribute("onclick", `pokemonsLoad("${data.next}")`);
        });
    })
    .catch(error => {
      console.error("Error al cargar los datos:", error);
      loader.style.display = "none";
    });
}



function verPokemon(url) {
  fetch(url)
    .then(datosPokemon => datosPokemon.json())
    .then(dataPokemon => {

      nombrePokemon.innerHTML = `${dataPokemon.name}`;
      let pokemonSprite = dataPokemon.sprites.versions["generation-v"]["black-white"]["animated"]["front_default"] ? dataPokemon.sprites.versions["generation-v"]["black-white"]["animated"]["front_default"] : dataPokemon.sprites["other"]["official-artwork"]["front_default"];
      imgPokemon.setAttribute("src", pokemonSprite);
      tituloPg.innerHTML= `${dataPokemon.name} | Pokédex`;
      iconPg.setAttribute("href", dataPokemon.sprites.other.dream_world.front_default);
      estadisticasPokemon.setAttribute("class", "border border-primary col-sm-4 col-md-3 shadow");
      var estadisticas = `<div class="my-3">
      <h6>HP</h6>
      <div class="progress" role="progressbar" aria-label="Danger" aria-valuenow="${dataPokemon.stats[0].base_stat}" aria-valuemin="0"
        aria-valuemax="100">
        <div class="progress-bar bg-danger" style="width: ${dataPokemon.stats[0].base_stat}%">${dataPokemon.stats[0].base_stat}</div>
      </div>
    </div>

    <div class="my-3">
      <h6>Ataque</h6>
      <div class="progress" role="progressbar" aria-label="Success" aria-valuenow="${dataPokemon.stats[1].base_stat}" aria-valuemin="0"
        aria-valuemax="100">
        <div class="progress-bar bg-success" style="width: ${dataPokemon.stats[1].base_stat}%">${dataPokemon.stats[1].base_stat}</div>
      </div>
    </div>

    <div class="my-3">
      <h6>Defensa</h6>
      <div class="progress" role="progressbar" aria-label="Info" aria-valuenow="${dataPokemon.stats[2].base_stat}" aria-valuemin="0"
        aria-valuemax="100">
        <div class="progress-bar bg-info text-dark" style="width: ${dataPokemon.stats[2].base_stat}%">${dataPokemon.stats[2].base_stat}</div>
      </div>
    </div>

    <div class="my-3">
      <h6>Ataque Especial</h6>
      <div class="progress" role="progressbar" aria-label="Warning" aria-valuenow="${dataPokemon.stats[3].base_stat}" aria-valuemin="0"
        aria-valuemax="100">
        <div class="progress-bar bg-warning text-dark" style="width: ${dataPokemon.stats[3].base_stat}%">${dataPokemon.stats[3].base_stat}</div>
      </div>
    </div>

    <div class="my-3">
      <h6>Defensa Especial</h6>
      <div class="progress" role="progressbar" aria-label="Warning" aria-valuenow="${dataPokemon.stats[4].base_stat}" aria-valuemin="0"
        aria-valuemax="100">
        <div class="progress-bar bg-warning text-dark" style="width: ${dataPokemon.stats[4].base_stat}%">${dataPokemon.stats[4].base_stat}</div>
      </div>
    </div>

    <div class="my-3">
      <h6>Velocidad</h6>
      <div class="progress" role="progressbar" aria-label="Info" aria-valuenow="${dataPokemon.stats[5].base_stat}" aria-valuemin="0"
        aria-valuemax="100">
        <div class="progress-bar bg-info text-dark" style="width: ${dataPokemon.stats[5].base_stat}%">${dataPokemon.stats[5].base_stat}</div>
      </div>
    </div>`;
    var pesoFormateado = (dataPokemon.weight / 10).toFixed(1); 
    var alturaFormateada = (dataPokemon.height / 10).toFixed(1); 


    alturaPeso.setAttribute("class", "col-md-2 col-sm-2 col-lg-1 d-flex flex-column-reverse");
    var alturaPesoPk = `
                <div class="border border-primary border-top-0">
                  <p><img src="./dist/img/icons8-altura-48.png" alt="">${alturaFormateada}m</p>
                </div>
                
                <div class="border border-primary border-bottom-0">
                  <p><img src="./dist/img/icons8-peso-kg-48.png" alt="">${pesoFormateado}kg</p>
                </div>`;

    alturaPeso.innerHTML = alturaPesoPk;
    estadisticasPokemon.innerHTML = estadisticas;
    });
}


function cambiarTema() {
  var htmlElement = document.getElementById("htmlElement");
  var currentTheme = htmlElement.getAttribute("data-bs-theme");

  if (currentTheme === "dark") {
    htmlElement.setAttribute("data-bs-theme", "light");
  } else {
    htmlElement.setAttribute("data-bs-theme", "dark");
  }
}