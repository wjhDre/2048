function showNumberAnimation(i,j,randNumber){
	var numberCeil=$(`#num-ceil-${i}-${j}`);
	numberCeil.css('background',getBackgroundColor(randNumber))
			  .css('color',getNumberColor(randNumber))
			  .text(randNumber);
	numberCeil.animate({
		width:'100px',
		height:'100px',
		top:getTop(i,j),
		left:getLeft(i,j)
	},500)
}

function showMoveAnimation(fromX,fromY,toX,toY){
	var numberCeil=$(`#num-ceil-${fromX}-${fromY}`);
	console.log(toX,toY);
	numberCeil.animate({
		top:getTop(toX,toY),
		left:getLeft(toX,toY)
	},200);
}