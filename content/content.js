HideItPlease = function() {

  var position = null;

  document.addEventListener('mousedown', function(e) {
    position = {
      x: e.x,
      y: e.y
    };
  }, false);

////////////////////////////////////////////////////////////////////////////////

  var bag = new Bag();
  var buttons = new Buttons();
  var nodes = new NodeWalker(selectNode);

  createButtons();
  hideControls();

  function createButtons(){
    buttons.create(document.body, '+', nodes.next);
    buttons.create(document.body, '-', nodes.previous);
    buttons.create(document.body, 'H', hideElement);
  }

  function hideElement(){
    var node = nodes.finishAndGet();
    node.style.display = 'none';
    bag.put(node);

    hideControls();
  }

  function hideControls(){
    buttons.hide();
    document.removeEventListener("wheel", onWheel, false);
    document.removeEventListener("keydown", onKeyDown, false);
  }
  function showControls(){
    buttons.show();
    document.addEventListener("wheel", onWheel, false);
    document.addEventListener("keydown", onKeyDown, false);
  }

  function onWheel(event){
    if (!(event.shiftKey && event.wheelDelta)) return;

    event.preventDefault();
    if (event.wheelDelta > 0) {
      nodes.next();
    }
    else {
      nodes.previous();
    }
  }
  function onKeyDown(event){
    console.log(event);
    if (event.key == "+" || event.key == "="){
      nodes.next();
    }
    else if (event.key == "-" || event.key == "_"){
      nodes.previous();
    }
    else if (event.shiftKey && event.key == "Enter"){
      hideElement();
    }
  }

  // Get hidden elements

  this.content = function(){
    return bag.getKeys();
  }

  this.returnHiddenElement = function(key){
    var node = bag.get(key);
    node.style.display = null;

    bag.remove(key);
  }

  // execute

  this.execute = function() {
    if (!position || !position.x || !position.y) {
      console.error(`Position must not be null, but was ${position}`);
      return;
    }

    nodes.init(position);
    showControls();
  };

  function selectNode(newNode) {
    buttons.alignAt(newNode);
  }
}
hip = new HideItPlease();
