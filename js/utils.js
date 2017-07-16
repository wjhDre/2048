//单元格距离上边的距离
function getTop(i,j){
	return 20+120*i
}

//单元格距离左边的距离
function getLeft(i,j){
	return 20+120*j
}

//每个数字的背景颜色
function getBackgroundColor(num){
	switch( num ){
		case 2:return "#eee4da";break;
		case 4:return "#ede0c8";break;
		case 8:return "#f2b179";break;
		case 16:return "#f59563";break;
		case 32:return "#f67c5f";break;
		case 64:return "#f65e3b";break;
		case 128:return "#edcf72";break;
		case 256:return "#edcc61";break;
		case 512:return "#9c0";break;
		case 1024:return "#33b5e5";break;
		case 2048:return "#09c";break;
		case 4096:return "#a6c";break;
		case 8192:return "#93c";break;
	}
}

//数字的颜色
function getNumberColor(num){
	if(num<=4){
		return "#776e65";
	}else{
		return "#fff";
	}
}

//判断是否有空间
function noSpace(nums){
	for(var i=0;i<4;i++){ 
		for(var j=0;j<4;j++){
			if(nums[i][j]==0)
				return false;
		}
	}
	return true;
}

//判断是否可以向左移动
function canMoveLeft(nums){
	for(var i=0;i<4;i++){
		for(var j=1;j<4;j++){
			if(nums[i][j]!=0){
				if(nums[i][j-1]==0||nums[i][j-1]==nums[i][j]){
					return true;
				}
			}
		}
	}
	return false;
}

//判断水平方向上是否有障碍物
function noBlockH(row,col1,col2,nums){
	for(var i=col1+1;i<col2;i++){
		if(nums[row][i]!=0){
			return false;
		}
	}
	return true;
}

//判断是否可以向上移动
function canMoveUp(nums){
	for(var i=1;i<4;i++){
		for(var j=0;j<4;j++){
			if(nums[i][j]!=0){
				if(nums[i-1][j]==0||nums[i-1][j]==nums[i][j]){
					return true;
				}
			}
		}
	}
	return false;
}

//判断垂直方向上是否有障碍物
function noBlockUp(row1,row2,col,nums){
	for(var i=row2+1;i<row1;i++){
		if(nums[i][col]!=0){
			return false;
		}
	}
	return true;
}

//判断是否可以向右移动
function canMoveRight(nums){
	for(var i=0;i<4;i++){
		for(var j=2;j>=0;j--){
			if(nums[i][j]!=0){
				if(nums[i][j+1]==0||nums[i][j+1]==nums[i][j]){
					return true;
				}
			}
		}
	}
	return false;
}

//判断是否可以向下移动
function canMoveDown(nums){
	for(var i=2;i>=0;i--){
		for(var j=0;j<4;j++){
			if(nums[i][j]!=0){
				if(nums[i+1][j]==0||nums[i+1][j]==nums[i][j]){
					return true;
				}
			}
		}
	}
	return false;
}
