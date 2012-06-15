(function() {

	var Tile = my.Class( com.notmedia.events.EventDispatcher, {

		STATIC: {},

		constructor: function( domObj, width, height, id ) {
			Namespace.import (this, 'com.notmedia.utils.NumberUtils' );

			this._domObj = domObj;
			this._tileWidth = 1;
			this._tileHeight = 1;
			this._id = id;
			this.setGridSize ( width, height );
		},

		setGridSize: function ( width, height ) {
			this._tileWidth = this.NumberUtils.isNumeric (width) ? parseFloat(width) : this._tileWidth;
			this._tileHeight = this.NumberUtils.isNumeric (height) ? parseFloat(height) : this._tileHeight;
			this._tileBaseCSS = {'overflow': 'hidden', 'position': 'absolute', 'display': 'block', 'margin': '0', 'padding': '0', 'width': this._tileWidth, 'height': this._tileHeight };
			this._domObj.css ( this._tileBaseCSS );
			this._domObj.html ('<div class="label" style="margin: 0 auto; width: 200px; text-align: center;">Item ' + this._id + '</div>' );
		}

	});

	var namespace = new Namespace ( 'com.notmedia.display' );
	namespace.Tile = Tile;

})();


