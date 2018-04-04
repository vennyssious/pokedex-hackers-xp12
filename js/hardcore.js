class Pokemon {

  constructor (){
    this._data = [];
    this._sync();
  }

  get data (){
    return this._data;
  }

  set data (data){
    this._data = data;
  }

  _sync (){
    this.data = JSON.parse(localStorage.getItem('favoritados') || '[]');
  }

  _update (){
    localStorage.setItem('favoritados', JSON.stringify(this.data));
  }

  _index (id){
    return this.data.indexOf(id);
  }

  has (id){
    return this._index(id) > -1;
  }

  add (id){
    if(!this.has(id)){
      this.data.push(id);
    }
    this._update();
  }

  rm (id) {
    if(this.has(id)){
      this.data.splice(this._index(id), 1);
    }
    this._update();
  }

}

function favoritar (id) {
  if(pokemon.has(id)){
    pokemon.rm(id);
    return false;
  }

  pokemon.add(id);
  return true;
}

function exportarCSV (pokemon){
  let CSVData = pokemon.reduce((value, entry) =>
    `${value}\r\n${entry.name},${entry.sprites.front_default},${entry.weight},${entry.height},${entry.abilities[0].ability.name},${entry.abilities[1].ability.name}`,
    'pokename, photo, weight, height, ability1, ability2'
  );
  console.log(CSVData )
  var a = document.createElement('A');
  a.href = `data:text/csv;charset=UTF-8,${encodeURI(CSVData)}`;
  a.download = "lista.csv";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

async function exportaFavoritos (){

  if(window.exporting)
    return false;

  window.exporting = true;

  let pokemons = [];

  if(pokemon.data.length > 0){

    await pokemon.data.map((poke, i) => {

      let xhr = new XMLHttpRequest();
      xhr.open("GET", `https://pokeapi.co/api/v2/pokemon/${poke}`);
      xhr.onload = e => {
        pokemons.push(JSON.parse(e.target.response));
        if(pokemons.length >= pokemon.data.length){
          exportarCSV(pokemons);
          window.exporting = false;
        }
      }

      xhr.send();

    });



  }


}
