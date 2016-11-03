function DOMtoString(document_root) {
    var html = '',
        node = document_root.body;
    while (node) {
        switch (node.nodeType) {
        case Node.ELEMENT_NODE:
            html += node.outerHTML;
            break;
        case Node.TEXT_NODE:
            html += node.nodeValue;
            break;
        case Node.CDATA_SECTION_NODE:
            html += '<![CDATA[' + node.nodeValue + ']]>';
            break;
        case Node.COMMENT_NODE:
            html += '<!--' + node.nodeValue + '-->';
            break;
        case Node.DOCUMENT_TYPE_NODE:
            // (X)HTML documents are identified by public identifiers
            html += "<!DOCTYPE " + node.name + (node.publicId ? ' PUBLIC "' + node.publicId + '"' : '') + (!node.publicId && node.systemId ? ' SYSTEM' : '') + (node.systemId ? ' "' + node.systemId + '"' : '') + '>\n';
            break;
        }
        node = node.nextSibling;
    }
    
    var words = html.replace(/<.*?>/g, '');

    var wordcount = words.match(/\S+/g).length;

    return wordcount;
}

function overalltimer(timer){
    var words_count = DOMtoString(document);
    words_count = Math.round(words_count/timer);
    return toHHMMSS(words_count);
}

function toHHMMSS (word) {
        var m = word % 60;
        var h = (word-m)/60;
        var tm = '';
        if(h == 0){ 
            tm = (m<10?"0":"") + m.toString()+" mins";
        }else{
            tm = h.toString() + "hrs " + (m<10?"0":"") + m.toString()+" mins";
        }
        return tm;
}

chrome.runtime.sendMessage({
    action: "getSource",
    source: DOMtoString(document),
    time_150: overalltimer(150),
    time_200: overalltimer(200),
    time_300: overalltimer(300),
    time_500: overalltimer(500)
});