(function() {

	var TileGrid = my.Class( com.notmedia.events.EventDispatcher, {

		STATIC: {},

		constructor: function( ) {
			// Imports
			Namespace.import (this, 'com.notmedia.utils.Delegate' );
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
			this._slideSpeed = 250;
		},

		setContainer: function ( container ) {
			var newContainer = this._getJQueryItem ( container );
			if ( newContainer != null ) {
				this._container = container;
				this._container.swipe({
					swipeUp: this.Delegate.createDelegate ( this, this.swipeUp ),
					swipeDown: this.Delegate.createDelegate ( this, this.swipeDown ),
					swipeLeft: this.Delegate.createDelegate ( this, this.swipeLeft ),
					swipeRight: this.Delegate.createDelegate ( this, this.swipeRight )
				});

				this._updateContainer();
			}
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
					item = this._getJQueryItem ( item );
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

		swipeUp: function () {
			this._container.animate({ top: '-=' + this._displayHeight }, this._slideSpeed );
		},

		swipeDown: function () {
			this._container.animate({ top: '+=' + this._displayHeight }, this._slideSpeed );
		},

		swipeLeft: function () {
			this._container.animate({ top: '+=' + this._displayWidth}, this._slideSpeed );
		},

		swipeRight: function () {
			this._container.animate({ top: '-=' + this._displayWidth}, this._slideSpeed );
		},

		_getJQueryItem: function ( item ) {
			return (item instanceof jQuery) ? item : (item && item.nodeType == 1) ? jQuery (item) : null;
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


