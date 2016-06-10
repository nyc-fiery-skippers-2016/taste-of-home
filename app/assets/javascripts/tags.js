$(document).ready(function(){
  $('#new_store_tag').submit(function(e){
    e.preventDefault();
    $.ajax({
      url: e.target.action,
      method: e.target.method,
      data: $(e.target).serialize()
    }).done(function(response){
      $('#tags').append("<li><a href=\"/tags/"+response.id+"\">#"+response.name+"</a></li>");
      $('#new_tag_name').val('');
    });
  });
});
