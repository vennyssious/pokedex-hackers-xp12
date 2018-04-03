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
