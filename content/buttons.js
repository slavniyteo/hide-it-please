Buttons = function(){

  var buttons = [];

  this.create = function(parent, text, onClick) {
    var result = document.createElement('button');
    result.appendChild(document.createTextNode(text));
    result.className = 'control_button';
    result.onclick = onClick;

    parent.appendChild(result);

    buttons.push(result);

    return result;
  }

  this.show = function() {
    buttons.forEach(function(btn) {
      btn.style.display = 'block';
    });
  },
  this.hide = function() {
    buttons.forEach(function(btn) {
      btn.style.display = 'none';
    });
  },

  this.alignAt = function(anchor){
    for (var i = 0; i < buttons.length; i++){
      setPosition(buttons[i], anchor, buttons.length, i);
    }
  }

  function setPosition(btn, anchor, count, index) {
    var rect = anchor.getBoundingClientRect(),
        docRect = document.body.getBoundingClientRect(),
        offset = {
          top: rect.top - docRect.top - 40,
          left: rect.left + (rect.width - 45*count)/2 + 45*index
        };

    if (offset.top < 10) offset.top = 10;

    btn.style.top = offset.top + 'px';
    btn.style.left = offset.left + 'px';
  }
}
