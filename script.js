const myKey = "WWJUgTlwlv3O3ygkvY8EdqgSvFweLsMK";

const gifURLbase = "https://api.giphy.com/v1/gifs/search";
const gifURLRandom = "https://api.giphy.com/v1/gifs/random";
const gifURLTrending = "https://api.giphy.com/v1/gifs/trending";

function formatQueryParams(params) {
  const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
  return queryItems.join('&');
}

function expandResultsSection(){
  $(".results-section").css("height",`7000`);
  console.log("done");
}



function callGiphy(searchTerm){

  

 const keyValueObj = {

   api_key: myKey,
   q : searchTerm,
   limit: 25
  };

  const myQuery = formatQueryParams(keyValueObj);

  const mySerach = gifURLbase + "?" + myQuery;
  //console.log(mySerach);

   fetch(mySerach)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })      
    .then(responseJson => displayData(responseJson))
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });

}


function displayData(responseJsonObj){

 
  let numOfObjReturned = 25;
  expandResultsSection();


  for(x=0; x < numOfObjReturned; x++){
    

   $("#my-results-list").append(`
      <li>
      
      <img src="${responseJsonObj.data[x].images.original.url}" 
      alt="aGif" >
      <div class="display-info">
      <p> this is a link holder </p>
      </div>
      
      </li>`);

  }
}

function watchForm() {
  $('#myForm').submit(event => {
    event.preventDefault();
    const value = $('#user-input').val();
    if (value === ""){
      $('.intro').show();
      $('h2').html("You have to give a search term first.");
    } else{
    //const theRate = $('option:selected').val();
    $('.intro').hide();
    clearList();
    callGiphy(value);
    }
  });
}

function clearList(){
  $('#my-results-list').empty();
}

function callRandomGiphy(searchTerm){

  const keyValueObj = {

   api_key: myKey,
   tag : searchTerm, //q

 };

  const myQuery = formatQueryParams(keyValueObj);

  const mySerach = gifURLRandom + "?" + myQuery;
  console.log("this is your random serach" + mySerach);

  fetch(mySerach)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })      
    .then(responseJson => displayRandomResult(responseJson))
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });

}

function displayRandomResult(responseJsonObj){

  $("#my-results-list").append(`<li>
      <img src="${responseJsonObj.data.images.fixed_width.url}"
      alt="aGif" id="random-result"></li>`);

}

function userHitsRandom(){
  
  $("#random-button").click(function (){
    
    const value = $("#user-input").val();
    if (value === ""){
      $('.intro').show();
      $('h2').html("You have to give a search term first.");
    } else{
      $('.intro').hide();
      clearList();
      callRandomGiphy(value);
    }
  });
}

function searchTrending(){

  const myKeys = {
    api_key : myKey,
    limit: 20
  };

  const myQuery = formatQueryParams(myKeys);
  const theSearch = gifURLTrending + "?" + myQuery;
  
  console.log(theSearch);
  fetch(theSearch)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })      
    .then(responseJson => displayData(responseJson))
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });

}

function userHitsTrending(){

  $("#trending-button").click(function(){
    $('.intro').hide();
    $("#user-input").empty();
    clearList();
    searchTrending();

  });

}

function runTheApp(){
  watchForm();
  userHitsRandom();
  userHitsTrending();
}

$(runTheApp);
