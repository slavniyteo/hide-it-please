(function() {

  chrome.contextMenus.create({
    title: "Hide it, please.",
    contexts: ["all"],
    onclick: function(tab, e) {
      chrome.tabs.executeScript({code: 'hip.execute();'});
    }
  });

})();
