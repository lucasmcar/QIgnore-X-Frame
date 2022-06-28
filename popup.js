let regexPadrao = ["<all_urls>", "*://servicedesk.rodobens.com.br", "*://adfs.rodobens.com.br"].join('\n');

let port = browser.runtime.connect({name: 'port-from-cs'});

browser.storage.local.get(null, res => {
     //let rgxstr = (res.regstr_allowed || regexPadrao);
     let lista = document.querySelector('#lista');
     for(var i = 0; i<regexPadrao.length; i++){
          let tagLi = document.createElement('li');
          tagLi.appendChild(document.createTextNode(regexPadrao[i]));
          lista.appendChild(tagLi);
     }
     document.querySelector("#chkAtivo").checked = res.is_disabled;
});


window.onload = function(){
     let dsv_checkbox = $('#chkAtivo');

     dsv_checkbox.change(function(){
          port.postMessage({
               is_disabled : dsv_checkbox.checked
          });
     });
}



/*$(document).ready(function(){
     $('#btnAtivar').on("click", function() {
          var user = $("#usuario").val();
          var pass = $("#senha").val();

          //alert(user + " " + pass);
          if(user == "" || pass == ""){
               $('#btnAtivar').removeClass('btn-primary');
               $('#btnAtivar').addClass('btn-danger');
               $('#btnAtivar').attr('disabled', 'disabled');
               $('#btnAtivar').text('Erro ao ativar');      
               $('#ext-aviso').show(); 
               $('#ext-aviso').html('ExtensÃ£o nÃ£o ativada'); 
               $('#ext-aviso').removeClass('alert-success');
               $('#ext-aviso').addClass('alert-danger');
               setTimeout(returnToDefault, 3000);
          } 
          $.ajax({
              
               url: 'http://localhost/8.20/loginUsuarioSlim.php',
               type: 'POST',
               data :{
                    cdusuario : user,
                    cdsenha : pass
               },

               

               success: function(response){
                    if(response == "ExtensÃ£o ativada"){
                         $('#chkAtivo').prop('checked', true);
                         $('.aviso').text('Extensão está ativa');
                    }
               },
               dataType: 'text',

          });
     });
});*/

function returnToDefault(){
     $('#btnAtivar').addClass('btn-primary');
     $('#btnAtivar').removeClass('btn-danger');
     $('#btnAtivar').removeAttr('disabled'); 
     $('#btnAtivar').text('Ativar Extensão');    
     $('#ext-aviso').hide(); 
     $('#ext-avis').hide(); 
     
}


/*$(document).on("submit", "#meuform",function (e) {
    e.preventDefault();

    var meuform = $(this);

    $.ajax({
       type: "POST",
       url: meuform.attr("action"), //Pega o action do FORM
       data: meuform.serialize() //Pega os campos do FORM
   }).done(function (resposta) {
        alert('ok'); //Exibe a resposta
   }).fail(function (xhr, status) {
        alert("erro:" + status); //Exibe na requisiÃ§Ã£o Ajax
   });
});*/
