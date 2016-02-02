
   // this function takes the question object returned by the StackOverflow request
   // and returns new results to be appended to DOM
var xhr = new XMLHttpRequest();
var response;

xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
        response = JSON.parse(xhr.responseText);
    }
};

var showQuestion = function() {
    var resultsBox = document.getElementById('search-results');
    response.items.forEach(function(item) {
        var para = document.createElement('h2');
        para.innerHTML = item.title;
        resultsBox.appendChild(para);
    });
};

var showAnswerers = function() {
    var resultsBox = document.getElementById('search-results');
    response.items.forEach(function(item) {
        var h2 = document.createElement('h2');
        h2.innerHTML = item.user.reputation;
        var para = document.createElement('p');
        para.innerHTML = item.user.display_name;
        resultsBox.appendChild(h2);
        resultsBox.appendChild(para);
    });
};

// this function takes the results object from StackOverflow
// and returns the number of results and tags to be appended to DOM
var showSearchResults = function(query, resultNum) {
    var results = resultNum + ' results for <strong>' + query + '</strong>';
    return results;
};


// takes a string from input and searches
// for unaswered questions on StackOverflow API.


var getUnanswered = function(tags) {
    var url = 'https://api.stackexchange.com/2.2/questions/unanswered?pagesize=5&sort=activity&tagged=' + tags + '&site=stackoverflow&key=' + key;
    xhr.open('GET', url, false);
    xhr.send();
    console.log(response);
    showQuestion();
};

var getTopAnswerers = function(tags) {
    var url = 'https://api.stackexchange.com/2.2/tags/javascript/top-answerers/all_time?pagesize=5&site=stackoverflow&key=' + key;
    xhr.open('GET', url, false);
    xhr.send();
    console.log(response);
    showAnswerers();
};


document.getElementById('unanswered-getter').addEventListener('submit',function(e){
	  e.preventDefault();
	  document.getElementById('results').innerHTML+="";
	  var tags = document.getElementById('tags').value;
	  getUnanswered(tags);


});

document.getElementById('inspiration-getter').addEventListener('submit',function(e){
	  e.preventDefault();
	  document.getElementById('results').innerHTML+="";
	  var inspiration = document.getElementById('inspiration').value;
      console.log('inspiration');
	  getTopAnswerers(inspiration);
});
