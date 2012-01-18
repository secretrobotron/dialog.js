define( [], function(){

  var Event = function( type, data ) {
    var _type = type + "",
        _data = data;
    Object.defineProperty( this, "type", { get: function() { return _type; } } );
    Object.defineProperty( this, "data", { get: function() { return _data; } } );
  }; //Event

  var EventManager = function( object ) {
    var _listeners = [],
        _this = this;

    this.dispatch = function( eventName, eventData ) {
      var e = {
        type: eventName + "",
        data: eventData
      };
      if( _listeners[ eventName ] ) {
        var theseListeners = _listeners[ eventName ];
        for( var i=0, l=theseListeners.length; i<l; ++i ){
          theseListeners[ i ]( e );
        } //for
      } //if
    }; //dispatch

    this.listen = function( eventName, listener ) {
      if ( !_listeners[ eventName ] ) {
        _listeners[ eventName ] = [];
      }
      _listeners[ eventName ].push( listener );
    }; //listen

    this.unlisten = function( eventName, listener ) {
      var theseListeners = _listeners[ eventName ];
      if ( theseListeners ) {
        if ( listener ) {
          var idx = theseListeners.indexOf( listener );
          if ( idx > -1 ) {
            theseListeners.splice( idx, 1 );
          } //if
        }
        else {
          _listeners[ eventName ] = [];
        }
      } //if
    }; //unlisten

    this.apply = function( object ) {
      object.listen = _this.listen;
      object.unlisten = _this.unlisten;
      object.dispatch = _this.dispatch;
    }; //apply

    if( object ) {
      this.apply( object );
    } //if

  }; //EventManager

  return EventManager;

});
