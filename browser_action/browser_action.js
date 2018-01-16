(function(){
  document.addEventListener('DOMContentLoaded', function() {
    chrome.tabs.executeScript(
      {code: 'hip.content();'},
      function(result){
        var keys = result[0];
        createTable(keys, 'keys-table-body')
      }
    );
  }, false);

  function createTable(hiddenElementKeys, tableId) {
    var tableBody = document.getElementById(tableId);

    hiddenElementKeys.forEach(function(key) {
      var row = document.createElement('tr');
      row.appendChild(createElementKey(key));
      row.appendChild(createShowButton(key));

      tableBody.appendChild(row);
    });
  }
  function createElementKey(key){
      var elementId = document.createElement('td');
      elementId.setAttribute('title', key);
      elementId.classList = ['elementId'];

      var text = key.substring(0,60);
      if (text.length < key.length) text += '...';
      elementId.appendChild(document.createTextNode(text));

      return elementId;
  }
  function createShowButton(key){
      var showBtn = document.createElement('button');
      showBtn.appendChild(document.createTextNode('Show'));
      showBtn.classList = ['showBtn'];
      showBtn.onclick = function(event) {
        chrome.tabs.executeScript(
          {code: `hip.returnHiddenElement('${key}');`},
          function() {location.reload();}
        );
      }

      var showBtnCell = document.createElement('td');
      showBtnCell.appendChild(showBtn);

      return showBtnCell;
  }
})();