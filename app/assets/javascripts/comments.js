$(document).ready(function(){
  $('#comment-link').on('click', function(event){
    event.preventDefault();

    $target = $(event.target)
    var yelpId = $target.attr('href').split('/')[2]
    var url = yelpId + '/comments/new'
    var data = $target.serialize();

    $.ajax({
      url: url,
      method: 'GET',
      data: data,
    }).done(function(response){
      $('#form').show();
      $('#comment-link').hide();
      $('#comments').prepend(response)


    })
  })
  // $('#comments').prepend(response)

})
