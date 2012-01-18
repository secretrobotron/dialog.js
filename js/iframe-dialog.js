define( [ "./util", "./base-dialog", "./comm" ], function( util, BaseDialog, Comm ){

  var IFRAMEDialog = function( context, dialogOptions ) {
    dialogOptions = dialogOptions || {};

    if( !dialogOptions.url ){
      throw new Error( "IFRAME dialog requires a url." );
    } //if

    var _this = this,
        _baseDialog = new BaseDialog( context, _this, dialogOptions ),
        _url = dialogOptions.url,
        _currentComm,
        _currentBackground,
        _currentTemplate;

    this.show = function( options, background ){
      var showOptions = _baseDialog.prepareToShow( options ),
          iframe = document.createElement( "iframe" );
      _currentTemplate = _this.template.clone();
      _currentBackground = background;
      iframe.src = _url;
      _currentTemplate.appendChild( iframe );
      _currentBackground.appendChild( _currentTemplate );
      util.css( iframe, "width", util.css( _currentTemplate, "width" ) );
      util.css( iframe, "height", util.css( _currentTemplate, "height" ) );
      util.css( iframe, "border", "none" );
      iframe.addEventListener( "load", function( e ){
        _currentComm = new Comm( iframe.contentWindow, function(){
          util.css( _currentTemplate, "visibility", "visible" );
        });
      }, false );
      _baseDialog.show();
    }; //show

    this.hide = function(){
      _baseDialog.hide();
      _currentBackground.element.removeChild( _currentTemplate );
    }; //hide
    
  }; //IFRAMEDialog

  return IFRAMEDialog;
});
