$(document).ready(function(){
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
               $('#ext-aviso').html('Extens√£o n√£o ativada'); 
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
                    if(response == "Extens√£o ativada"){
                         $('#chkAtivo').prop('checked', true);
                         $('.aviso').text('Extens„o est· ativa');
                    }
               },
               dataType: 'text',

          });
     });
});

function returnToDefault(){
     $('#btnAtivar').addClass('btn-primary');
     $('#btnAtivar').removeClass('btn-danger');
     $('#btnAtivar').removeAttr('disabled'); 
     $('#btnAtivar').text('Ativar Extens„o');    
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
        alert("erro:" + status); //Exibe na requisi√ß√£o Ajax
   });
});*/
