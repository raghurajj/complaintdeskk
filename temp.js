var apikey = '4a619a36656941199bc6b32ec0c058a2';
var latitude = '26.8467088';
var longitude = '80.9461592';

var api_url = 'https://api.opencagedata.com/geocode/v1/json'

var request_url = api_url
  + '?'
  + 'key=' + apikey
  + '&q=' + encodeURIComponent(latitude + ',' + longitude)
  + '&pretty=1'
  + '&no_annotations=1';

// see full list of required and optional parameters:
// https://opencagedata.com/api#forward

var request = new XMLHttpRequest();
request.open('GET', request_url, true);

request.onload = function() {
  // see full list of possible response codes:
  // https://opencagedata.com/api#codes

  if (request.status === 200){ 
    // Success!
    var data = JSON.parse(request.responseText);
    alert(data.results[0].formatted); // print the location

  } else if (request.status <= 500){ 
    // We reached our target server, but it returned an error
                         
    console.log("unable to geocode! Response code: " + request.status);
    var data = JSON.parse(request.responseText);
    console.log('error msg: ' + data.status.message);
  } else {
    console.log("server error");
  }
};

request.onerror = function() {
  // There was a connection error of some sort
  console.log("unable to connect to server");        
};

request.send();