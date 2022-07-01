let regexPadrao = ["<all_urls>", "*://servicedesk.rodobens.com.br", "*://adfs.rodobens.com.br"].join('\n');

let port = browser.runtime.connect({name: 'port-from-cs'});

let user         = document.querySelector('#usuario');
let senha        = document.querySelector('#senha');
let form         = document.querySelector('#meuform');
let avisoCampos  = document.querySelector("#ext-aviso-campo");
let avisoUsuario  = document.querySelector("#ext-aviso-usuario");
let avisoSucesso  = document.querySelector("#ext-aviso");
let checkbox       = document.querySelector("input[name=chkAtivo]");
let aviso = document.querySelector(".aviso");
const ativarExtensao = document.querySelector('#btnAtivar');

ativarExtensao.addEventListener('click', function(e){
     
     e.preventDefault();
     
     if(!verificaCampos()){
          form.setAttribute('hidden', 'hidden');
          avisoCampos.removeAttribute('hidden', 'hidden');
          checkbox.checked = false;
          setTimeout(showForm, 3000);
          aviso.innerHTML = "Extens�o est� desativada";
          return false;
     } else {

          let data = {
               nmusuariorede : user.value,
               cdsenha : senha.value
          }

          fetch(`http://localhost/login/login.php?usuario=${data.nmusuariorede}&senha=${data.cdsenha}`, {
               headers: {
               Accept: "application/json",
               "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify(data)
          }).then((r) => r.json())
            .then(r => {
                    if(r.nome == data.nmusuariorede){
                         form.setAttribute('hidden', 'hidden');
                         avisoSucesso.removeAttribute('hidden', 'hidden');
                         setTimeout(showForm, 3000);

                         port.postMessage({is_disabled : checkbox.checked});
                         port.onMessage.addEventListener(function(m){
                              m.is_disabled;
                              aviso.innerHTML = "Extens�o est� ativada";
                         });
                         setTimeout(hiddenSucess, 3000);
                         clearInput();
                    } else {
                         form.setAttribute('hidden', 'hidden');
                         avisoUsuario.removeAttribute('hidden', 'hidden');
                         avisoUsuario.innerHTML = r.error_message;
                         setTimeout(showForm, 3000);
                         setTimeout(hiddenError, 3000);
                    }
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

const clearInput = function(){
     user.value = "";
     senha.value = "";
}

const showForm = function() {
     form.removeAttribute('hidden', 'hidden');
     avisoCampos.setAttribute('hidden', 'hidden');
}

const hiddenSucess = function (){
     avisoSucesso.setAttribute('hidden', 'hidden');
} 
const hiddenError = function (){
     avisoUsuario.setAttribute('hidden', 'hidden');
}
