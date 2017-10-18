// Made by Dmitry Glinskiy, contact me at glinskiy.net

$(document).ready(function(){
  $('.element-remover').click(function(){
    var removeTarget = $(this).attr('id');
    $('#is-' + removeTarget).hide();
  });

});
