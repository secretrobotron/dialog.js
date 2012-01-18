define( [ "./eventmanager" ], function( EventManager ){

  var __context = 1;

  var Comm = function( clientWindow, readyCallback ) {
    var _this = this,
        _em = new EventManager( _this ),
        _context = __context++;

    clientWindow.addEventListener( "message", function( e ){
      if( e.source === clientWindow && typeof e.data === "object" && e.data.context ){
        _this.dispatch( e.data.type, e.data );
      } //if
    }, false );

    _em.listen( "ready", function( e ){
      clearInterval( pingInterval );
      readyCallback();
    });
    var pingInterval = setInterval( function(){
      _this.send( "ready", "ready" );
    }, 100 );

    this.send = function( type, data ){
      clientWindow.postMessage({
        type: type,
        context: _context,
        data: data
      }, "*" );
    }; //send
  }; //Comm

  return Comm;
});
