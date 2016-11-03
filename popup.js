chrome.runtime.onMessage.addListener(function(request, sender) {
  if (request.action == "getSource") {
    var word_150 = document.querySelector('#word_150');
    var word_200 = document.querySelector('#word_200');
    var word_300 = document.querySelector('#word_300');
    var word_500 = document.querySelector('#word_500');
    var time_150 = document.querySelector('#time_150');
    var time_200 = document.querySelector('#time_200');
    var time_300 = document.querySelector('#time_300');
    var time_500 = document.querySelector('#time_500');

    time_150.innerHTML = request.time_150;
    time_200.innerHTML = request.time_200;
    time_300.innerHTML = request.time_300;
    time_500.innerHTML = request.time_500;
    word_150.innerText = "Number of Words in this page: "+request.source;
    word_200.innerText = "Number of Words in this page: "+request.source;
    word_300.innerText = "Number of Words in this page: "+request.source;
    word_500.innerText = "Number of Words in this page: "+request.source;
  }
});

function onWindowLoad() {

  var message = document.querySelector('.number_of_words');

  chrome.tabs.executeScript(null, {
    file: "get_page_source.js"
  }, function() {
    // If you try and inject into an extensions page or the webstore/NTP you'll get an error
    if (chrome.runtime.lastError) {
      message.innerText = 'There was an error injecting script : \n' + chrome.runtime.lastError.message;
    }
  });

}

window.onload = onWindowLoad;