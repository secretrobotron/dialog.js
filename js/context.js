define( [
    "./util",
    "./modal",
    "./template",
    "./dom-dialog",
    "./iframe-dialog",
    "./xhr-dialog"
  ], function( util, Modal, Template, DOMDialog, IFRAMEDialog, XHRDialog ){

  const MAX_DIALOGS = 1000;
  const MIN_Z_INDEX = 2147483647 - MAX_DIALOGS;

  var Context = function() {

    var _dialogs = {},
        _this = this,
        _dialogTypes = {
          "dom": DOMDialog,
          "iframe": IFRAMEDialog,
          "xhr": XHRDialog
        },
        _dialogTemplates = [],
        _dialogContents = [],
        _currentZIndex = MIN_Z_INDEX;

    var _body = window.document.body;

/*
    var _background = document.createElement( "div" );
    util.css( _background, "position", "absolute" );
    util.css( _background, "top", "0px" );
    util.css( _background, "left", "0px" );
    util.css( _background, "z-index", MIN_Z_INDEX );

    function onWindowResize( e ){
      util.css( _background, "width", window.innerWidth + "px" );
      util.css( _background, "height", window.innerHeight + "px" );
    } //onWindowResize
    window.addEventListener( "resize", onWindowResize, false );
    onWindowResize();

    _body.appendChild( _background );
*/

    var innerUtil = {
      getTemplate: function( name ){
        if( typeof name === "string" ){
          for( var i=0, l=_dialogTemplates.length; i<l; ++i ){
            if( name === _dialogTemplates[ i ].name ){
              return _dialogTemplates[ i ];
            } //if
          } //for
        }
        else if( typeof name === "object" ){
          for( var i=0, l=_dialogTemplates.length; i<l; ++i ){
            if( name === _dialogTemplates[ i ].element ){
              return _dialogTemplates[ i ];
            } //if
          } //for
        } //if
      }
    }; //innerUtil

    this.add = function( name, options ){
      if( !name || !options ){
        throw new Error( "Name and options required to create a dialog." );
      } //if
      if( _dialogs[ name ] ){
        throw new Error( "Dialog " + name + " already exists." );
      } //if
      var type = options.type || "dom";
      if( type === "dom" ){
        if( findExistingDOMDialog( options.element ) ){
          throw new Error( "Dialog already exists!" );
        } //if
      } //if
      _dialogs[ name ] = new _dialogTypes[ type ]( innerUtil, options );
    }; //add

    this.remove = function( name ){
      var dialog = _dialogs[ name ];
      if( dialog ){
        dialog.hide();
        delete _dialogs[ name ];
      } //if
    }; //remove

    this.show = function( name, options ){
      var dialog = _dialogs[ name ];
      if( dialog ){
        dialog.show( options, _body );
      } //if
    }; //show

    this.hide = function( name ){
      var dialog = _dialogs[ name ];
      if( dialog ){
        dialog.hide();
      } //if
    }; //hide

    this.hideAll = function( name ){
      for( var d in _dialogs ){
        if( _dialogs.hasOwnProperty( d ) ){
          _dialogs[ d ].hide();
        } //if
      } //for
    }; //hideAll

    function getDialogTemplates(){
      var templates = document.querySelectorAll( "*[dialog-template]" );
      for( var i=0; i<templates.length; ++i ){
        var existingTemplate = undefined;
        for( var j=0; i<_dialogTemplates.length; ++j ){
          if( _dialogTemplates[ j ].element !== templates[ i ] ){
            existingTemplate = _dialogTemplates[ j ];
            break;
          } //if
        } //for
        if( !existingTemplate ){
          _dialogTemplates.push( new Template( templates[ i ] ) );
        } //if
      } //for
    } //getDialogTemplates

    function getDialogContents(){
      var contents = document.querySelectorAll( "*[dialog-content]" );
      for( var i=0; i<contents.length; ++i ){
        var existingContent = findExistingDOMDialog( contents[ i ] );
        if( !existingContent ){
          _this.add( contents[ i ].id, {
            type: "dom",
            element: contents[ i ]
          });
        } //if
      } //for
    } //getDialogContents

    function findExistingDOMDialog( element ){
      if( typeof element === "string" ){
        element = document.getElementById( element );
      } //if
      for( var d in _dialogs ){
        if( _dialogs.hasOwnProperty( d ) ){
          dialog = _dialogs[ d ];
          if( dialog.type === "dom" && dialog.element === element ){
            return dialog;
          } //if
        } //if
      } //for
    } //findExistingDOMDialog

    document.addEventListener( "DOMContentLoaded", function( e ){
      getDialogTemplates();
      getDialogContents();
    }, false );
    getDialogTemplates();
    getDialogContents();

  }; //Context

  return Context;
});
