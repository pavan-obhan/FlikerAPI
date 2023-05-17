$(function(){

    var flickerURL = "https://www.flickr.com/services/feeds/photos_public.gne"+"?jsoncallback=?" //converts JSON to JSONP


// Function to show loading container
  function showLoading() {
    $("#loadingContainer").fadeIn();
  }

  // Function to hide loading container
  function hideLoading() {
    $("#loadingContainer").fadeOut();
  }

  // Function to update progress bar
  function updateProgressBar(percentage) {
    $("#progressBarFill").css("width", percentage + "%");
  }

    function fetchImages(tags) {

    showLoading();
        updateProgressBar(0); // Reset progress bar

    $.getJSON(flickerURL,{
    tags: tags, // gets images of sunrise and mountains
    tagmode:"any", //means we can either get images that are tagged as sunrise or mountain, if we select all, it should
    //be tagged as both mountain and sunrise in flicker
    format:"json"
    }).done(function(data) {
             $("#content").empty(); // Clear previous images
             var totalImages = data.items.length;
             var loadedImages = 0;

             $.each(data.items, function(index, item) {
               $("<img>").attr("src", item.media.m).on("load", function() {
                 loadedImages++;
                 updateProgressBar((loadedImages / totalImages) * 100);

                 if (loadedImages === totalImages) {
                   hideLoading();
                 }
               }).appendTo("#content").css({
                 width: "200px",
                 height: "200px"
               });
             });
           }).fail(function(){
     alert("AJAX call failed.")
     hideLoading();
    })

    }

 $("#submitBtn").on("click", function() {
    var tags = $("#tagsInput").val().trim();
    if (tags !== "") {
      fetchImages(tags);
    }
  });

});