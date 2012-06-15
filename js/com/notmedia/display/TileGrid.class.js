(function() {

	var TileGrid = my.Class( com.notmedia.events.EventDispatcher, {

		STATIC: {},

		constructor: function( ) {
			// Imports
			Namespace.import (this, 'com.notmedia.utils.ArrayUtils' );
			Namespace.import (this, 'com.notmedia.utils.NumberUtils' );
			Namespace.import (this, 'com.notmedia.display.Tile' );

			// Member Vars
			this._displayWidth = 1;
			this._displayHeight = 1;
			this._container = null;
			this._matrix = [null];
			this._matrixWidth = 1;
			this._matrixHeight = 1;
		},

		setContainer: function ( container ) {
			this._container = container;
			this._updateContainer();
		},

		setDisplayWidth: function ( displayWidth ) {
			this._displayWidth = this.NumberUtils.isNumeric (displayWidth) ? parseFloat(displayWidth) : this._displayWidth;
			this._updateContainer();
		},

		setDisplayHeight: function ( displayHeight ) {
			this._displayHeight = this.NumberUtils.isNumeric (displayHeight) ? parseFloat(displayHeight) : this._displayHeight;
			this._updateContainer();
		},

		attachMatrix: function ( matrix, width, height ) {
			var newMatrix = this.ArrayUtils.isArray ( matrix ) ? matrix : this._matrix;
			this._matrixWidth = this.NumberUtils.isNumeric (width) ? width : 1;
			this._matrixHeight = this.NumberUtils.isNumeric (height) ? height : 1;
			for ( var i = 0; i < this._matrixWidth; ++i ) {
				for ( var j = 0; j < this._matrixHeight; ++j ) {
					var index = i + ( j * this._matrixWidth );
					var item = ( index < newMatrix.length -1 ) ? newMatrix[ index ] : null;
					item = (item instanceof jQuery) ? item : (item && item.nodeType == 1) ? jQuery (item) : null;

					if (item == null) {
						this._matrix [index] = null;
					} else {
						var tile = new this.Tile ( item, this._displayWidth, this._displayHeight, String(i) + '-' + String (j) );
						this._matrix [index] = tile;
						item.css ( 'top', this._displayHeight * j);
						item.css ( 'left', this._displayWidth * i);
					}
				}
			}
		},

		_updateContainer: function () {
			var css = { 'display': 'block', 'overflow': 'hidden', 'position': 'relative', 'width': this._displayWidth, 'height': this._displayHeight }
			this._container.css ( css );
			this._container.css ( 'border', '1px solid red');
		},

		logProperties: function () {
			log ( '[TileGrid] ', this._displayWidth, this._displayHeight );
		}

	});

	var namespace = new Namespace ( 'com.notmedia.display' );
	namespace.TileGrid = TileGrid;

})();


