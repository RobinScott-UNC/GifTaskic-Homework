var topics = ["tiny things", "pygmy", "cute", "baby animals"];


//javascript, jQuery to pull data for the click me button.

var xhr = $.get("http://api.giphy.com/v1/gifs/search?q=tiny+things&api_key=nWHcLTfVR9gnJa9An9mVe170Ia04SZOS&limit=10");

xhr.done(function(data) {
    console.log(data)
})

//Need to edit out what is not needed below, and change API key

 $.embedly.defaults.key = '1d5c48f7edc34c54bdae4c37b681ea2b';

    $('.gifs a').embedly({
        display: function(obj) {
            if (obj.type === 'photo') {

                var $this = $(this);

                // Create the static image src with Embedly Display.
                var src = $.embedly.display.display(obj.url, {
                    query: {
                        animate: false
                    }
                });

                // Add static gif placeholder to the parent
                $this.html('<img class="gif-holder" src="' + src + '" />');

                // Start preloading the actually gif.
                $this.append('<img class="gif-preload" src="' + obj.url + '" />');

                // Create a promise so we can keep track of state.
                $this.data('promise', $.Deferred());

                // Get the element we added.
                var elem = $this.find('.gif-preload').get(0);

                // If the image is not in cache then onload will fire when it is.
                elem.onload = function() {
                    $this.data('promise').resolve();
                };

                // If the image is already in the browsers cache call the handler.
                if (elem.complete) {
                    $this.data('promise').resolve();
                }
                // Set the static gif url so we can use it later.
                $(this).data('static_url', src);
            } else {
                // remove li if it's not an image.
                $(this).parent().remove();
            }
        }
    }).on('mouseenter', function() {
        var $this = $(this);
        animationStart($this)



    }).on('mouseleave', function() {
        var $this = $(this);
        animationEnd($this);
    });

    function animationStart($this){
        // Set the hover state to true so that the load function knows to run.
        $this.data('hover', true);

        // Create a function to load the gif into the image.
        var load = function() {
            if ($this.data('hover') === true) {
                // Remove the loading image if there is one
                $this.find('.gif-loading').remove();

                // Swap out the static src for the actually gif.
                $this.find('img.gif-holder').attr('src', $this.data('embedly').url);
            }
        };
        // Add the load function to the done callback. If it's already resolved
        // this will fire immediately.
        $this.data('promise').done(load);

        // Add a spinner if it's not going to play right away.
        if ($this.data('promise').state() === 'pending') {
            // Add a loading spinner.
            $this.append('<i class="gif-loading fa fa-spinner fa fa-spin"></i>');

            // we need to center it over the image.
            $this.find('.gif-loading').css({
                top: $this.height() / 2 - 20,
                left: $this.width() / 2 - 20
            });
        }
    }

    function animationEnd($this){
        // Make sure the load function knows we are no longer in a hover state.
        $this.data('hover', false);

        // Remove the spiner if it's there.
        $this.find('.gif-loading').remove();

        // Set the src to the static url.
        $this.find('img.gif-holder').attr('src', $this.data('static_url'));
    }

$(".gif").on("click", function() {
  var state = $(this).attr("data-state");
  if (state === "still") {
    $(this).attr("src", $(this).attr("data-animate"));
    $(this).attr("data-state", "animate");
  } else {
    $(this).attr("src", $(this).attr("data-still"));
    $(this).attr("data-state", "still");
  }
});





