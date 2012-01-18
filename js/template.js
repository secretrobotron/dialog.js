define( [ "./util" ], function( util ){

  var Template = function( element, options ) {
    options = options || {};

    var _element = element,
        _name = options.name || element.id,
        _this = this;

    util.addClass( _element, "dialog-template" );
    util.css( _element, "position", "absolute" );
    util.css( _element, "visibility", "hidden" );

    _element.parentNode.removeChild( _element );

    this.clone = function(){
      return _element.cloneNode( true );
    }; //clone

    Object.defineProperties( this, {
      name: {
        get: function(){ return _name; }
      },
      element: {
        get: function(){ return _element; }
      }
    });

  }; //Template

  return Template;
});
