
var nums=new Array();

$(function(){
	newGame();

})

//初始化游戏
function newGame(){
	init();
	getOneNumber();
	getOneNumber();
}
//页面初始化
function init(){
	//单元格初始化
	for(var i=0;i<4;i++){
		for(var j=0;j<4;j++){
			$('#grid-ceil-'+i+'-'+j).css('top',getTop(i,j));
			$('#grid-ceil-'+i+'-'+j).css('left',getLeft(i,j));
		}
	}

	//数组初始化
	for(var i=0;i<4;i++){
		nums[i]=new Array(); 
		for(var j=0;j<4;j++){
			nums[i][j]=0;
		}
	}

	updateView();
}
//更新视图
function updateView(){
	$('.num-ceil').remove();
	for(var i=0;i<4;i++){
		for(var j=0;j<4;j++){
			$('#grid-container').append(`<div id="num-ceil-${i}-${j}" class="num-ceil"></div>`);
			var numberCeil= $(`#num-ceil-${i}-${j}`);
			if(nums[i][j]!=0){
				numberCeil.css('width','100px')
						  .css('height','100px')
						  .css('top',getTop(i,j))
						  .css('left',getLeft(i,j))
						  .css('background',getBackgroundColor(nums[i][j]))
						  .css('color',getNumberColor(nums[i][j]))
						  .text(nums[i][j]);
			}else{
				numberCeil.css('width','0px')
						  .css('height','0px')
						  .css('top',getTop(i,j)+50)
						  .css('left',getLeft(i,j)+50);
			}
		}
	}
}

//随机一个位置产生一个数字
function getOneNumber(){
	if(noSpace(nums)){
		return;
	}
	var count=0;
	var arr=new Array();
	for(var i=0;i<4;i++){
		for(var j=0;j<4;j++){
			if(nums[i][j]==0){
				arr[count]=i*4+j;
				count++;
			}
		}
	}
	var n=Math.floor((Math.random()*count));
	var randX=Math.floor(arr[n]/4);
	var randY=Math.floor(arr[n]%4);
	
	//随机产生2或4
	var randNumber=Math.random()<0.5?2:4;
	nums[randX][randY]=randNumber;
	showNumberAnimation(randX,randY,randNumber);
}

//实现键盘响应
$(document).keydown(function(event) {
	event.preventDefault();
	switch(event.keyCode){
		case 37://left
			if(canMoveLeft(nums)){//判断是否可以向左移动
				moveLeft();
				setTimeout(getOneNumber,210);
			}

			break;
		case 38://up
			if(canMoveUp(nums)){
				moveUp();
				setTimeout(getOneNumber,210);
			}
			break;
		case 39://right
			if(canMoveRight(nums)){
				moveRight();
				setTimeout(getOneNumber,210);
			}
			break;
		case 40://down
			if(canMoveDown(nums)){
				moveDown();
				setTimeout(getOneNumber,210);
			}
			break;
	}
});

//向左移动
function moveLeft(){
	for(var i=0;i<4;i++){
		for(var j=1;j<4;j++){
			if(nums[i][j]!=0){
				for(var k=0;k<j;k++){
					if(nums[i][k]==0&&noBlockH(i,k,j,nums)){
						showMoveAnimation(i,j,i,k);
						nums[i][k]=nums[i][j];
						nums[i][j]=0;
						break;
					}else if(nums[i][k]==nums[i][j]&&noBlockH(i,k,j,nums)){
						showMoveAnimation(i,j,i,k); //显示移动的动画效果
						nums[i][k]+=nums[i][j]; //从i,j移动到i,k
						nums[i][j]=0; //将原来位置设置为0
						break;
					}
				}
			}
		}
	}
	setTimeout(updateView,200);	
}

//向上移动
function moveUp(){
	for(var i=1;i<4;i++){
		for(var j=0;j<4;j++){
			if(nums[i][j]!=0){
				for(var k=0;k<i;k++){
					if(nums[k][j]==0&&noBlockUp(i,k,j,nums)){
						showMoveAnimation(i,j,k,j);
						nums[k][j]=nums[i][j];
						nums[i][j]=0;
						break;
					}else if(nums[k][j]==nums[i][j]&&noBlockUp(i,k,j,nums)){
						showMoveAnimation(i,j,k,j); //显示移动的动画效果
						nums[k][j]+=nums[i][j]; //从i,j移动到i,k
						nums[i][j]=0; //将原来位置设置为0
						break;
					}
				}
			}
		}
	}
	setTimeout(updateView,200);	
}

//向右移动
function moveRight(){
	for(var i=0;i<4;i++){
		for(var j=2;j>=0;j--){
			if(nums[i][j]!=0){
				for(var k=3;k>j;k--){
					if(nums[i][k]==0&&noBlockH(i,j,k,nums)){
						showMoveAnimation(i,j,i,k);
						nums[i][k]=nums[i][j];
						nums[i][j]=0;
						break;
					}else if(nums[i][k]==nums[i][j]&&noBlockH(i,j,k,nums)){
						showMoveAnimation(i,j,i,k); //显示移动的动画效果
						nums[i][k]+=nums[i][j]; //从i,j移动到i,k
						nums[i][j]=0; //将原来位置设置为0
						break;
					}
				}
			}
		}
	}
	setTimeout(updateView,200);	
}

//向下移动
function moveDown(){
	for(var i=2;i>=0;i--){
		for(var j=0;j<4;j++){
			if(nums[i][j]!=0){
				for(var k=3;k>i;k--){
					if(nums[k][j]==0&&noBlockUp(k,i,j,nums)){
						showMoveAnimation(i,j,k,j);
						nums[k][j]=nums[i][j];
						nums[i][j]=0;
						break;
					}else if(nums[k][j]==nums[i][j]&&noBlockUp(k,i,j,nums)){
						showMoveAnimation(i,j,k,j); //显示移动的动画效果
						nums[k][j]+=nums[i][j]; //从i,j移动到i,k
						nums[i][j]=0; //将原来位置设置为0
						break;
					}
				}
			}
		}
	}
	setTimeout(updateView,200);	
}