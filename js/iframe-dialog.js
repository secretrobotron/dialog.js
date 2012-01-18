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

    function onSubmit(){
      console.log("submit");
    } //onSubmit

    function onCancel(){
      close();
    } //onCancel

    function onClose(){
      close();
    } //onClose

    function close(){
      _currentComm.unlisten( "submit", onSubmit );
      _currentComm.unlisten( "cancel", onCancel );
      _currentComm.unlisten( "close", onClose );
      _currentTemplate.destroy();
      _baseDialog.hide();
    } //close

    this.show = function( options, background ){
      var showOptions = _baseDialog.prepareToShow( options ),
          iframe = document.createElement( "iframe" );
      _currentTemplate = _this.template.createInstance();
      _currentTemplate.insertContent( iframe );
      _currentBackground = background;
      iframe.src = _url;
      _currentTemplate.attach( _currentBackground );
      util.css( iframe, "width", util.css( _currentTemplate.element, "width" ) );
      util.css( iframe, "height", util.css( _currentTemplate.element, "height" ) );
      util.css( iframe, "border", "none" );
      iframe.addEventListener( "load", function( e ){
        _currentComm = new Comm( iframe.contentWindow, function(){
          _currentTemplate.show();
          _currentComm.listen( "submit", onSubmit );
          _currentComm.listen( "cancel", onCancel );
          _currentComm.listen( "close", onClose );
        });
      }, false );
      _baseDialog.show();
    }; //show

    this.hide = function(){
      close();
    }; //hide
    
  }; //IFRAMEDialog

  return IFRAMEDialog;
});
