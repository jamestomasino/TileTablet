(function() {

	var Tile = my.Class( com.notmedia.events.EventDispatcher, {

		STATIC: {
			ENABLED_CHANGE: 'Tile_ENABLED_CHANGE',
			DIR_UP: 0,
			DIR_RIGHT: 1,
			DIR_DOWN: 2,
			DIR_LEFT: 3
		},

		constructor: function( domObj, width, height, id ) {
			Namespace.import (this, 'com.notmedia.utils.NumberUtils' );
			Namespace.import (this, 'com.notmedia.data.BitArray' );

			this._domObj = domObj;
			this._tileWidth = 1;
			this._tileHeight = 1;
			this._id = id;
			this._isEnabled = true;
			this.setGridSize ( width, height );
			this._navDirections = new this.BitArray ([0,0,0,0]);
		},

		setGridSize: function ( width, height ) {
			this._tileWidth = this.NumberUtils.isNumeric (width) ? parseFloat(width) : this._tileWidth;
			this._tileHeight = this.NumberUtils.isNumeric (height) ? parseFloat(height) : this._tileHeight;
			this._tileBaseCSS = {'overflow': 'hidden', 'position': 'absolute', 'display': 'block', 'margin': '0', 'padding': '0', 'width': this._tileWidth, 'height': this._tileHeight };
			this._domObj.css ( this._tileBaseCSS );
			this._domObj.addClass ( 'tile' );
			this._domObj.removeClass('swipeL swipeR swipeU swipeD');
			this._domObj.html ('<div class="label" style="margin: 0 auto; width: 200px; text-align: center;">Item ' + this._id + '</div>' );
		},

		getNavigation: function ( dir ) { return this._navDirections.get ( dir ); },
		setNavigation: function ( dir, isEnabled ) {
			this._navDirections.set ( dir, isEnabled );
			switch (dir)
			{
				case Tile.DIR_UP:
					if ( isEnabled ) this._domObj.addClass ('swipeU');
					else this._domObj.removeClass ('swipeU');
					break;
				case Tile.DIR_RIGHT:
					if ( isEnabled ) this._domObj.addClass ('swipeR');
					else this._domObj.removeClass ('swipeR');
					break;
				case Tile.DIR_DOWN:
					if ( isEnabled ) this._domObj.addClass ('swipeD');
					else this._domObj.removeClass ('swipeD');
					break;
				case Tile.DIR_LEFT:
					if ( isEnabled ) this._domObj.addClass ('swipeL');
					else this._domObj.removeClass ('swipeL');
					break;
			}

			// All combos, because why not
			this._domObj.removeClass ( 'u r d l ur ud ul rd rl dl urd url udl rdl urdl' );
			var comboClass = '';
			comboClass += this._navDirections.get ( 0 ) ? 'u' : '';
			comboClass += this._navDirections.get ( 1 ) ? 'r' : '';
			comboClass += this._navDirections.get ( 2 ) ? 'd' : '';
			comboClass += this._navDirections.get ( 3 ) ? 'l' : '';
			this._domObj.addClass ( comboClass );
		},

		isEnabled: function () {
			return this._isEnabled;
		},

		enable: function () {
			this._isEnabled = true;
			dispatchEvent ( Tile.ENABLED_CHANGE );
		},

		disable: function () {
			this._isEnabled = false;
			dispatchEvent ( Tile.ENABLED_CHANGE );
		},

		destroy: function () {
			// Remove custom classes
			this._domObj.removeClass ( 'tile swipeU swipeR swipeD swipeL' );
			this._domObj.removeClass ( 'u r d l ur ud ul rd rl dl urd url udl rdl urdl' );
		}
	});

	var namespace = new Namespace ( 'com.notmedia.display' );
	namespace.Tile = Tile;

})();


