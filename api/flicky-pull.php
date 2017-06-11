<?php
  header('Content-Type: text/json'); 
  header("Access-Control-Allow-Origin: *");
  // ^^^ This handles CORS issues.

  // Pull the data, as is, from Flickr 
  error_reporting(0); // Don't want errors from this command (0).
  $flickr = file_get_contents('https://api.flickr.com/services/feeds/photos_public.gne?format=json');
  error_reporting(1); // Enable all error reporting again (E_ALL).

  // Replace escaped apostrophes with un-escaped ones, because the JS JSON validator doesn't like them.
  $flickr = str_replace("\'", "'", $flickr);

  // Strip the container/callback that wraps the JSON.  
  $stripThis = 'jsonFlickrFeed(';
  $flickr = substr($flickr, strlen($stripThis)); 
  echo substr($flickr, 0, -1); // Chop off the closing bracket.
?>