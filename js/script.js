Namespace.import ( this, 'com.notmedia.display.TileGrid' );

var matrix = [ $('#tile1'),  $('#tile2'),  $('#tile3'),
               $('#tile4'),  $('#tile5'),  null,
               $('#tile7'),  $('#tile8'),  $('#tile9'),
               $('#tile10'), null,         $('#tile12'),
               $('#tile13'), $('#tile14'), $('#tile15'),
               $('#tile16'), $('#tile17'), $('#tile18'),
               $('#tile19'), $('#tile20'), null];

var grid = new TileGrid ( );
	grid.setContainer ( $('#container') );
	grid.setDisplayWidth ( 1024 );
	grid.setDisplayHeight ( 768 );
	grid.attachMatrix ( matrix, 3, 7 );
