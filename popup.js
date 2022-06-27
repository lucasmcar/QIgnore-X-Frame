debugger;
$(document).ready(function(){
     $('#btnAtivar').on("click", function() {
          var user = $("#usuario").val();
          var pass = $("#senha").val();

          //alert(user + " " + pass);
          if(user == "" || pass == ""){
               $('#btnAtivar').removeClass('btn-primary');
               $('#btnAtivar').addClass('btn-danger');
               $('#btnAtivar').attr('disabled', 'disabled');   
               $('#ext-aviso').html('Extensão não ativada'); 
               $('#ext-aviso').removeClass('alert-success');
               $('#ext-aviso').addClass('alert-danger');

          }

          $.ajax({
              
               url: 'http://localhost/login/login.php',
               type: 'POST',
               data :{
                    usuario : user,
                    senha : pass
               },

               

               success: function(response){
                    if(response == "Extensão ativada"){
                         $('#chkAtivo').prop('checked', true);
                         $('.aviso').html(response);

                    }
               },
               dataType: 'text',

          });
     });
});






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
        alert("erro:" + status); //Exibe na requisição Ajax
   });
});*/
