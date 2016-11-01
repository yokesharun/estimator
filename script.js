	// I changed the name of function, in order to be more meaningfull.
function countWords(fullHTML){
  
    // Select all the p elements in the page.
    var paragraphs = fullHTML;
  
    // The counter.
    var count = 0;
  
    for(var i = 0; i < paragraphs.length; i++)
    {
        // Split the innerHtml of the current paragraph to count the words.
        count += paragraphs[i].innerHTML.split(' ').length;
    }
   
    document.write("Number of words: "+count);
}
