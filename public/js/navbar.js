$(document).ready(function() {
  $('.nav li:nth-child(1)').click(function(){ activate(1) });
  $('.nav li:nth-child(2)').click(function(){ activate(2) });
  $('.nav li:nth-child(3)').click(function(){ activate(3) });
  $('.nav li:nth-child(4)').click(function(){ activate(4) });
});

function activate(li) {
  $('.nav li').each(function(){
    $(this).removeClass('active')
  })
  $('.nav li:nth-child('+li+')').addClass('active');
}