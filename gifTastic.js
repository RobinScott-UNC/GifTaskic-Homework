var topics = ["tiny things", "pygmy", "cute", "baby animals"];


//javascript, jQuery

var xhr = $.get("http://api.giphy.com/v1/gifs/search?q=tiny+things&api_key=nWHcLTfVR9gnJa9An9mVe170Ia04SZOS&limit=10");

xhr.done(function(data) 
{ console.log(data); });












