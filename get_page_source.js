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

    // var message = document.querySelector('#message');
    // message.innerHTML = 'asadads'+ wordcount;
    console.log(wordcount);
    return wordcount;
    //return html;
}

chrome.runtime.sendMessage({
    action: "getSource",
    source: DOMtoString(document)
});