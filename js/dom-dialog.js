define( [ "./base-dialog" ], function( BaseDialog ){

  var DOMDialog = function( context, options ){

    var _element = typeof options.element === "string" ? document.getElementById( options.element ) : options.element;
    if( !options.template ){
      var templateAttr = _element.getAttribute( "data-dialog-template" );
      options.template = context.getTemplate( templateAttr );
      if( !options.template ){
        options.template = _element;
      } //if
    } //if
    if( !options.container && _element.parentNode ){
      var thisNode = _element.parentNode;
      while( thisNode && thisNode.hasAttribute ){
        if( thisNode.hasAttribute( "dialog-container" ) ){
          options.container = context.getContainer( thisNode );
          break;
        } //if
        thisNode = thisNode.parentNode;
      } //while
    } //if

    var _baseDialog = new BaseDialog( this, options ),
        _this = this,
        _template,
        _state;

    if( _this.template === _element ){
      _template = _element;
    }
    else {
      _template = _this.template.clone();
    } //if

    if( !_element ){
      throw new Error( "Element required to make a DOM dialog." );
    } //if

    this.show = function( options ){
      if( _state ){
        throw new Error( "Dialog already open." );
      } //if
      var showOptions = _baseDialog.prepareToShow( options );
      if( _template !== _element ){
        _template.show
      } //if
      _state = showOptions;
    }; //show

    this.hide = function( options ){
      if( _state ){
      } //if
    }; //hide

    Object.defineProperties( this, {
      element: {
        get: function(){
          return _element;
        }
      },
      open: {
        get: function(){
          return !!_state;
        }
      }
    });
  }; //DOMDialog

  return DOMDialog;
});
