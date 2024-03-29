(function() {

	var TileGrid = my.Class( org.tomasino.events.EventDispatcher, {

		STATIC: {},

		constructor: function( ) {
			// Imports
			Namespace.import (this, 'org.tomasino.utils.Delegate' );
			Namespace.import (this, 'org.tomasino.utils.ArrayUtils' );
			Namespace.import (this, 'org.tomasino.utils.NumberUtils' );
			Namespace.import (this, 'org.tomasino.display.Tile' );

			// Member Vars
			this._displayWidth = 1;
			this._displayHeight = 1;
			this._container = null;
			this._scrollContainer = null;
			this._matrix = [null];
			this._matrixWidth = 1;
			this._matrixHeight = 1;
			this._slideSpeed = 250;
			this._allItems = [];
			this._allTiles = [];
			this._x = 0;
			this._y = 0;
			this._scrollEnabled = true;
			this._isDebug = false;
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

			// Reset Tiles and Items
			this._removeTiles();
			this._allItems = [];
			this._allTiles = [];

			for ( var i = 0; i < this._matrixWidth; ++i ) {
				for ( var j = 0; j < this._matrixHeight; ++j ) {
					var index = i + ( j * this._matrixWidth );
					var item = ( index < newMatrix.length ) ? newMatrix[ index ] : null;
					item = this._getJQueryItem ( item );
					if (item == null) {
						this._matrix [index] = null;
					} else {
						var tile = new this.Tile ( item, this._displayWidth, this._displayHeight, String(i) + '-' + String (j) );
						this._matrix [index] = tile;
						item.css ( 'top', this._displayHeight * j);
						item.css ( 'left', this._displayWidth * i);
						this._allItems.push ( item );
						this._allTiles.push ( tile );
					}
				}
			}

			this._updateContainer();
			this._updateTiles();
		},

		goto: function ( x, y ) {
			this._scrollEnabled = false;
			x = this.NumberUtils.isNumeric (x) ? x : 0;
			y = this.NumberUtils.isNumeric (y) ? y : 0;

			if ( x > this._matrixWidth - 1 ) x =  this._matrixWidth - 1;
			if ( x < 0 ) x = 0;

			if ( y > this._matrixHeight - 1 ) y =  this._matrixHeight - 1;
			if ( y < 0 ) y = 0;

			this._x = x;
			this._y = y;

			var xPos = 0 - (this._x * this._displayWidth);
			var yPos = 0 - (this._y * this._displayHeight);

			this._scrollContainer.css( 'left', xPos );
			this._scrollContainer.css( 'top', yPos );

			this._scrollEnabled = true;
		},

		swipeUp: function () {
			if (this._scrollEnabled) {

				++ this._y;
				var animate = true;
				var newIndex = this._x + ( this._y * this._matrixWidth );

				if ( this._y > this._matrixHeight - 1)
				{
					animate = false;
					-- this._y
				} else if ( this._matrix[newIndex] == null ) {
					animate = false
					-- this._y;
				}

				if (animate) {
					this._scrollContainer.stop (true, true);
					this._scrollEnabled = false;
					this._scrollContainer.animate({ top: '-=' + this._displayHeight }, this._slideSpeed, null, this.Delegate.createDelegate ( this, this._swipeComplete ) );
				}
			}
		},

		swipeDown: function () {
			if (this._scrollEnabled) {

				-- this._y;
				var animate = true;
				var newIndex = this._x + ( this._y * this._matrixWidth );

				if ( this._y < 0 )
				{
					animate = false;
					++ this._y
				} else if ( this._matrix[newIndex] == null ) {
					animate = false
					++ this._y;
				}

				if (animate) {
					this._scrollContainer.stop (true, true);
					this._scrollEnabled = false;
					this._scrollContainer.animate({ top: '+=' + this._displayHeight }, this._slideSpeed, null, this.Delegate.createDelegate ( this, this._swipeComplete ) );
				}
			}
		},

		swipeLeft: function () {
			if (this._scrollEnabled) {

				++ this._x;
				var animate = true;
				var newIndex = this._x + ( this._y * this._matrixWidth );

				if ( this._x > this._matrixWidth - 1) {
					animate = false;
					-- this._x;
				} else if ( this._matrix[newIndex] == null ) {
					animate = false
					-- this._x;
				}

				if (animate) {
					this._scrollContainer.stop (true, true);
					this._scrollEnabled = false;
					this._scrollContainer.animate({ left: '-=' + this._displayWidth}, this._slideSpeed, null, this.Delegate.createDelegate ( this, this._swipeComplete ) );
				}
			}
		},

		swipeRight: function () {
			if (this._scrollEnabled) {

				-- this._x;
				var animate = true;
				var newIndex = this._x + ( this._y * this._matrixWidth );

				if ( this._x < 0 )
				{
					animate = false;
					++ this._x;
				} else if ( this._matrix[newIndex] == null ) {
					animate = false
					++ this._x;
				}

				if (animate) {
					this._scrollContainer.stop (true, true);
					this._scrollEnabled = false;
					this._scrollContainer.animate({ left: '+=' + this._displayWidth}, this._slideSpeed, null, this.Delegate.createDelegate ( this, this._swipeComplete ) );
				}
			}
		},

		_swipeComplete: function () {
			this._scrollEnabled = true;
		},

		_getJQueryItem: function ( item ) {
			return (item instanceof jQuery) ? item : (item && item.nodeType == 1) ? jQuery (item) : null;
		},

		_updateTiles: function () {
			for ( var i = 0; i < this._matrixWidth; ++i ) {
				for ( var j = 0; j < this._matrixHeight; ++j ) {
					var index = i + ( j * this._matrixWidth );
					var tile = this._matrix[index];

					if ( tile )
					{
						var leftIndex  = index - 1;
						var rightIndex = index + 1;
						var upIndex    = i + ( (j - 1) * this._matrixWidth );
						var downIndex  = i + ( (j + 1) * this._matrixWidth );

						if ( i > 0 && this._matrix[leftIndex] ) tile.setNavigation ( this.Tile.DIR_LEFT, true );
						else tile.setNavigation ( this.Tile.DIR_LEFT, false );

						if ( i < (this._matrixWidth - 1) && this._matrix[rightIndex] ) tile.setNavigation ( this.Tile.DIR_RIGHT, true );
						else tile.setNavigation ( this.Tile.DIR_RIGHT, false );

						if ( j > 0 && this._matrix[upIndex] ) tile.setNavigation ( this.Tile.DIR_UP, true );
						else tile.setNavigation ( this.Tile.DIR_UP, false );

						if ( j < (this._matrixHeight - 1) && this._matrix[downIndex] ) tile.setNavigation ( this.Tile.DIR_DOWN, true );
						else tile.setNavigation ( this.Tile.DIR_DOWN, false );
					}
				}
			}
		},

		_removeTiles: function () {
			for (var i = 0; i < this._allTiles.length; ++i ) {
				var tile = this._allTiles[i];
				tile.removeEventListener ( this.Tile.ENABLED_CHANGE );
				tile.destroy();
			}
		},

		_updateContainer: function () {
			var css = { 'display': 'block', 'overflow': 'hidden', 'position': 'relative', 'width': this._displayWidth, 'height': this._displayHeight }
			var wrapperCSS = { 'display': 'block', 'overflow': 'hidden', 'position': 'relative', 'width': this._displayWidth * this._matrixWidth, 'height': this._displayHeight * this._matrixHeight }
			this._container.css ( css );

			if (!this._scrollContainer) {
				var odv = document.createElement("div");
				var containerID = this._container.attr('id') + '_scrollWrap';
				odv.id = containerID
				this._scrollContainer = $(odv);
			}

			this._scrollContainer.css ( wrapperCSS );

			this._container.append ( this._scrollContainer );

			for ( var i = 0; i < this._allItems.length; ++i ) {
				this._scrollContainer.append ( this._allItems[i] );
			}
		},

		isDebug: function () { return this._isDebug; },
		setDebug: function (val) {
			this._isDebug = val;
			for (var i = 0; i < this._allTiles.length; ++i ) {
				this._allTiles[i].setDebug ( val );
			}
		},


		logProperties: function () {

		}

	});

	var namespace = new Namespace ( 'org.tomasino.display' );
	namespace.TileGrid = TileGrid;

})();


