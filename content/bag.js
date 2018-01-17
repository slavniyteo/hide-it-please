Bag = function(){
  var content = {};

  this.put = function(node){
    console.assert(node, "Node must be not null");

    var key = calculateKey(node);
    content[key] = node;
  }

  this.get = function(key){
    console.assert(key, "Key must be not null");

    return content[key];
  }

  this.remove = function(key){
    console.assert(key, "Key must be not null");

    delete content[key];
  }

  this.getKeys = function(){
    var result = [];
    for (var key in content){
      result.push(key);
    }
    return result;
  }

  function calculateKey(node){
    var key = node.tagName;
    if (node.src){
      key += ' -- ' + node.src;
    }
    if (node.alt){
      key += ' -- ' + node.alt;
    }
    if (node.textContent){
      key += ' -- ' + node.textContent;
    }
    key = key.replace(/(\r\n|\n|\r)/gm,''); // Remove line greaks
    key = key.replace(/(\'|\")/gm, ''); // Remove quotes
    return key;
  }
}