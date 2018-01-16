NodeWalker = function(onSelectNode){

  var HOVER_CLASSNAME = 'content_highlight';

  var nodes = null;
  var min = -1;
  var max = -1;

  var currentIndex = -1;
  var currentNode = null;

  this.init = function(position){
    var hoverElements = document.elementsFromPoint(position.x, position.y);

    if (hoverElements.length < 3) {
      console.warn("Can not hide root element");
      return;
    }

    nodes = hoverElements;
    min = 0;
    max = nodes.length - 3;
    currentIndex = 0;
    currentNode = null;

    selectNode(min);
  }

  var current = function(){
      return currentNode;
  }

  this.finishAndGet = function(){
      var result = current();
      result.classList.remove(HOVER_CLASSNAME);
      return result;
  }

  this.next = function(){
    if (currentIndex >= max) return;
    selectNode(currentIndex + 1);
  }

  this.previous = function() {
    if (currentIndex <= min) return;
    selectNode(currentIndex - 1);
  }

  function selectNode(newIndex){
    var oldValue = currentNode;
    if (oldValue) oldValue.classList.remove(HOVER_CLASSNAME);

    currentIndex = newIndex;
    currentNode = nodes[currentIndex];
    currentNode.classList.add(HOVER_CLASSNAME);

    onSelectNode(currentNode, oldValue);
  }
}