function mostraPokemon(url) {
  //TO-DO:
  //  1. FAZER CONSUMO DA URL RECEBIDA COMO PARAMETRO
  //  2. TRATAR DADOS RECEBIDOS PELA URL
  //  3. CHAMAR FUNÇÃO POPULA MODAL PARA ELA ADICIONAR
  //     OS COMPONENTES HTML NO MODAL
  //  4. ABRIR MODAL (.modal) COM JAVASCRIPT
  //     (http://getbootstrap.com/docs/4.0/components/modal/#via-javascript)
  let xhr = new XMLHttpRequest();
  xhr.open('GET', url);
  xhr.send();

  xhr.onload = event => {
    let res = JSON.parse(xhr.response);
    populaModal(res);
  };
}


// Mostrar o nome, imagem do pokemon, tipo (todos os tipos), peso, altura e id
function populaModal(poke) {
  //TO-DO:
  //  1. CRIAR COMPONENTES PARA MOSTRAR NO MODAL
  //     SEGUINDO O PADRÃO DO BOOTSTRAP
  //     (http://getbootstrap.com/docs/4.0/components/modal/#modal-components)
  //  2. LINKAR TODOS OS COMPONENTES COM O MODAL .modal
  //  3. SEMPRE QUE FECHAR O MODAL LIMPAR O CONTEUDO ADICIONADO

  $('.poke.name').html(poke.name);
  $('.poke.weight').html((poke.weight/1000).toFixed(2));
  $('.poke.height').html((poke.height/100).toFixed(2));
  $('.poke-photo').attr({src: poke.sprites.front_default, alt : poke.name});
  $('.favoritar').attr('data-pokeid', poke.id);

  if(pokemon.has(poke.id.toString())){
    $('.favoritar').addClass('btn-warning').removeClass('btn-primary').html("Unfavorite");
  } else {
    $('.favoritar').removeClass('btn-warning').addClass('btn-primary').html("Favorite");
  }

  poke.abilities.map(item => $('<li>').html(item.ability.name).appendTo('.poke-abilities'))

  $('#pokemodal').modal('show');

}

$('#pokemodal').on('hidden.bs.modal', e => {
  $('.poke').html('');
  $('.poke-abilities').html('');
  $('.poke-photo').attr({src: '', alt : ''});
});
