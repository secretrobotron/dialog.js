define( [], function(){

  var BaseDialog = function( context, parentDialog, baseOptions ) {

    var _this = this,
        _type = baseOptions.type,
        _modal = baseOptions.modal || false,
        _template = baseOptions.template,
        _open = false;

    if( typeof _template === "string" ){
      _template = context.getTemplate( _template );
    } //if

    if( !_template ){
      throw new Error( "Template required to build dialog." );
    } //if

    this.show = function(){
      if( _open ){
        throw new Error( "Dialog already open!" );
      } //if
      _open = true;
    }; //show

    this.hide = function(){
      _open = false;
    }; //hide

    this.prepareToShow = function( options ){
      options = options || {};
      var showOptions = {
        modal: options.modal || _modal,
        template: _template,
      };
      return showOptions;
    }; //prepareToShow

    Object.defineProperties( parentDialog, {
      type: {
        get: function() {
          return _type;
        }
      },
      template: {
        get: function() {
          return _template;
        }
      },
      modal: {
        get: function(){
          return _modal;
        }
      },
      open: {
        get: function(){
          return _open;
        }
      }
    });

  }; //BaseDialog

  return BaseDialog;
});
