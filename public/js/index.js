
$(document).ready(function(){
    $('.sidenav').sidenav();
  });


$(document).ready(function(){
  $('.carousel').carousel();
});

$(document).ready(function() {
  $('input#input_text, textarea#textarea2').characterCounter();
});

$( document ).ready(function (){
  $(".dropdown-trigger").dropdown();
});
        
// const name = document.getElementById('email')
// const password = document.getElementById('password')
// const form = document.getElementById('form')
// const errorElement = document.getElementById('error')
// form.addEventListener('submit',(e) => {
//   let messages []
//   if (name.value === ''|| name.value === null){
//     message.push ('Email is Required')
//   }
//   if (messages.length > 0){

//     e.preventDefault()
//     errorElement.innerText = messages.join(', ')
//   }
// })


