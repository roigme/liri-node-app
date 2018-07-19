
//requiring dotenv to read and create environment variables.
require("dotenv").config();

//requiring node modules used
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require('request');
var fs = require('fs');


//pulling the twitter keys and spotify keys from keys.js ((due to issue with twitter i was unable to generate keys for twitter))
var keys = require('./keys.js');
var twitterKeys = keys.twitter;
var spotifyKeys = keys.spotify;

var spotify = new Spotify(keys.spotify)
//making variables of command line arguments the first argument after declaring the app willl be the command all subsequent arguments will be 
// search terms.
var command = process.argv[2]
var term = process.argv.slice(3).join(" ");
var txtFile = "./random.txt"


// functions


// a twitter function i f i could have gotten twitter working
var tweets = function(){
    console.log("Someone broke my twitter woops.")
}
//spotify function
var spotifyThis= function(songTitle){
    console.log('made it')
    spotify.search({ type: 'track', query: songTitle}, function(error, data){
          
        
        var songData = JSON.parse(data);
        console.log (songData)
          //artist
          console.log("-----------------------")
          console.log("Artist: " + songData.artists[0].name);
          console.log("Song: " + songData.name);
          console.log("Preview URL: " + songData.preview_url);
          console.log("Album: " + songData.album.name);
          console.log("-----------------------");
          
          //adds text to log.txt
          fs.appendFile('log.txt', songData.artists[0].name);
          fs.appendFile('log.txt', songData.name);
          fs.appendFile('log.txt', songData.preview_url);
          fs.appendFile('log.txt', songData.album.name);
          fs.appendFile('log.txt', "-----------------------");
    });
  }

  var random = function(file){
    fs.readFile(file, 'utf8', function(err, data) {
        if (err) throw err;
        console.log('reading: ' + file);
        text=data.split(",");
        console.log(text)
        command= text[0].trim();
        console.log(command);
        term= text[1].trim();
        action()
      });
  }

var action= function(){
    switch(command){
    case "my-tweets":
      tweets();
    break;
      case "spotify-this-song":
      if(term !=""){
        spotifyThis(term);
      } else{
        spotifyThis("Ace of Base");
      }
    break;
      case "movie-this":
      if(term !=""){
        omdbRequest(terms)
      } else{
        omdbRequest("Mr. Nobody")
      }
    break;
  
    case "do-what-it-says":
      random(txtFile)
      
    break;
  
  }
}


//calling the action function to get everything started
action();