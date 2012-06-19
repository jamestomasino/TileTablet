Namespace.import ( this, 'org.tomasino.display.TileGrid' );
/*
var matrix = [ $('#tile1'),  $('#tile2'),  $('#tile3'),
               $('#tile4'),  $('#tile5'),  null,
               $('#tile7'),  $('#tile8'),  $('#tile9'),
               $('#tile10'), null,         $('#tile12'),
               $('#tile13'), $('#tile14'), $('#tile15'),
               $('#tile16'), $('#tile17'), $('#tile18'),
               $('#tile19'), $('#tile20'), null];
*/
var matrix = [];
for ( var i = 1; i <= 128; ++i )
{
	var id = i;
	if (id < 10) id = '00' + id;
	else if (id < 100) id = '0' + id;
	var obj = $('#zelda' + id );
	matrix.push ( obj );
}

var grid = new TileGrid ( );
	grid.setContainer ( $('#container') );
	grid.setDisplayWidth ( 1024 );
	grid.setDisplayHeight ( 672 );
	grid.attachMatrix ( matrix, 16, 8 );
	grid.goto ( 7, 7 );
//	grid.setDebug(true);

$('#container').css('visibility', 'visible' );
