//let regexPadrao = ["<all_urls>", "*://servicedesk.rodobens.com.br", "*://adfs.rodobens.com.br"].join('\n');

//let port = browser.runtime.connect({name: 'port-from-cs'});

let user         = document.querySelector('#usuario');
let senha        = document.querySelector('#senha');
let form         = document.querySelector('#meuform');
let avisoCampos  = document.querySelector("#ext-aviso-campo");
let avisoSucesso  = document.querySelector("#ext-aviso");
let checkbox      = document.querySelector("input[name=chkAtivo]");
let aviso = document.querySelector(".aviso");
const ativarExtensao = document.querySelector('#btnAtivar');

ativarExtensao.addEventListener('click', function(e){
     
     e.preventDefault();
     
     if(!verificaCampos()){
          form.setAttribute('hidden', 'hidden');
          avisoCampos.removeAttribute('hidden', 'hidden');
          checkbox.checked = false;
          setTimeout(showForm, 3000);
          aviso.innerHTML = "Extensão está desativada";
          return false;
     } else {

          let data = {
               nmusuariorede : user.value,
               cdsenha : senha.value
          }

          fetch(`http://localhost/8.20/getAuthExtension.php?nmusuariorede=${data.nmusuariorede}&cdsenha=${data.cdsenha}`, {
               headers: {
               Accept: "application/json",
               "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify(data)
          }).then((r) => r.json())
            .then(r => {
                    if(r.ok){
                         form.setAttribute('hidden', 'hidden');
                         avisoSucesso.removeAttribute('hidden', 'hidden');
                         setTimeout(showForm, 3000);
                         checkbox.checked = true;
                         aviso.innerHTML = "Extensão está ativada";
                         setTimeout(hiddenSucess, 3000);
                    }
                    console.log(r)
               }).catch((error) => {
                    console.log(error)
          });
     }
         
});

const verificaCampos = function(){ 
     if(user.value == "" && senha.value == ""){
          return false;
     }
     return true;
}

const hideLoading = function(){
     icon.classList.add('hidden-icon');
     icon.classList.remove('icon');
}


const showForm = function() {
     form.removeAttribute('hidden', 'hidden');
     avisoCampos.setAttribute('hidden', 'hidden');
}

const hiddenSucess = function (){
     avisoSucesso.setAttribute('hidden', 'hidden');
} 

url = window.location.href + '';

console.log(url)

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
              
               url: 'http://localhost/8.20/framework/login/request/atendente/getLogin.php',
               type: 'POST',
               data :{
                    cdusuario : user,
                    cdsenha : pass
               },
               dataType: 'text',
               success: function(response){
                    console.log(response);
                    /*if(response == "Extensão ativada"){
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
                    }*/
              // }
          //})
     //});*/
//});

function returnToDefault(){
     $('#btnAtivar').addClass('btn-primary');
     $('#btnAtivar').removeClass('btn-danger');
     $('#btnAtivar').removeAttr('disabled'); 
     $('#btnAtivar').text('Ativar Extensão');    
     $('#ext-aviso').hide(); 
     $('#ext-avis').hide(); 
     
}