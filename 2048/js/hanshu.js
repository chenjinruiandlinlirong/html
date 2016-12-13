var documentwidth = document.documentElement.clientWidth ;
var box = 0.92 * documentwidth;
//alert(documentwidth);
var cellpadding = 0.04*documentwidth;
//var littleboxmargin = 0.02*documentwidth;
var littlebox = 0.18*documentwidth;
var startx = 0;
var starty = 0;
var endx = 0;
var endy = 0;

function getPostTop(i,j)
{
	return cellpadding+i*(littlebox+cellpadding);
}


function getPostLeft(i,j)
{
	return cellpadding+j*(littlebox+cellpadding);
}


function getNumberBackgroundColor( number ){
    switch( number ){
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

    return "black";
}

function getNumberColor( number ){
    if( number <= 4 )
        return "#776e65";

    return "white";
}


function nospaceboard()
{	
	var length = 0;
	var tempx = 0;
	var tempy = 0;
	for(var i = 0 ; i < 4 ; i++ )
	{
//		temp[i] = new Array();
		for( var j = 0 ; j < 4 ; j++ )
		{
//			if(board[i][j] == 0)
//			{
//				length++;
//				temp[tempx] = j;
//				tempy++;
//				if(tempy == 4 )
//				{
//					tempx ++;
//					tempy=0;
//				}
//			}
//			tempx++;
			if(board[i][j] == 0)
			{
				return false;
			}
		}
	}
		return true;
//	return length;
}


function qun(num)
{
	var text_num ="";
	 switch( num ){
        case 2:text_num ="脑四";break;
        case 4:text_num ="ppt";break;
        case 8:text_num ="肥腾";break;
        case 16:text_num ="悠悠敏";break;
        case 32:text_num ="黑楠";break;
        case 64:text_num ="架势韩";break;
        case 128:text_num ="锋总";break;
        case 256:text_num ="坤哥";break;
        case 512:text_num ="莞城煜";break;
        case 1024:text_num ="钒妈";break;
        case 2048:text_num ="基友才";break;
        case 4096:text_num ="啊沙";break;
        case 8192:text_num ="老鑫";break;
    }
	 return text_num;
}

function shownumber(i,j,num)
{
	var numbercell = $('#number-cell-'+i+'-'+j);
	var text_num = "";
	numbercell.css('background-color',getNumberBackgroundColor(num));
	numbercell.css('color',getNumberColor(num));
	numbercell.css('font-size',0.2*littlebox);
	text_num = qun(num);
	numbercell.text(text_num);
//	numbercell.text(num);
	numbercell.animate(
		{
			width:littlebox,
			height:littlebox,
			top:getPostTop(i,j),
			left:getPostLeft(i,j)
		}
	,100);
}


function MoveUp()
{
	if(!canMoveUp())
	{
		return false;
	}
	for(var i = 1 ; i < 4 ; i++ )
	{
		for(var j = 0 ; j < 4 ; j++ )
		{
			if(board[i][j] != 0 )
			{
				for(var k = 0 ; k < i ; k++ )
				{
					if(board[k][j] == 0 && nobstacle_row(k,i,j) && !iscombind[k][j])
					{
						showAnimateView(i,j,k,j);
						board[k][j] = board[i][j];
						board[i][j] = 0;
						iscombind[k][j] = true;
					}
					else if(board[k][j] == board[i][j] && nobstacle_row(k,i,j) && !iscombind[k][j])
					{
	//					alert(1);
						showAnimateView(i,j,k,j);
						showAnimateView1(k,j);
						board[k][j] += board[i][j];
						score += board[k][j];
						undatescore(score);
						board[i][j] = 0;
						iscombind[k][j] = true;
					}
				}
			}
		}
	}
	
	setTimeout("undateboardView()",200);
	return true;
}


function MoveDown()
{
	if(!canMoveDown())
	{
		return false;
	}
	for(var i = 2 ; i >=0 ; i-- )
	{
		for(var j = 0 ; j < 4 ; j++ )
		{
			if(board[i][j] != 0 )
			{
				for(var k = 3 ; k > i ; k-- )
				{
					if(board[k][j] == 0 && nobstacle_row(i,k,j))
					{
						showAnimateView(i,j,k,j);
						board[k][j] = board[i][j];
						board[i][j] = 0;
					}
					else if(board[k][j] == board[i][j] && nobstacle_row(i,k,j))
					{
						showAnimateView(i,j,k,j);
						showAnimateView1(k,j);
	//					alert(1);
						
						board[k][j] += board[i][j];
						score += board[k][j];
						undatescore(score);
						board[i][j] = 0;
					}
				}
			}
		}
	}
	
	setTimeout("undateboardView()",200);
	return true;
}


function MoveLeft()
{
	if(!canMoveLeft())
	{
		return false;
	}
	for(var i = 0 ; i < 4 ; i++ )
	{
		for(var j = 1 ; j < 4 ; j++ )
		{
			if(board[i][j] != 0 )
			{
				for(var k = 0 ; k < j ; k++ )
				{
					if(board[i][k] == 0 && nobstacle_col(k,j,i))
					{
						showAnimateView(i,j,i,k);
						board[i][k] = board[i][j];
						board[i][j] = 0;
					}
					else if(board[i][k] == board[i][j] && nobstacle_col(k,j,i))
					{
	//					alert(1);
						showAnimateView(i,j,i,k);
						showAnimateView1(i,k);
						board[i][k] += board[i][j];
						score += board[i][k];
						undatescore(score);
						board[i][j] = 0;
					}
				}
			}
			
		}
	}
	
	setTimeout("undateboardView()",200);
	return true;
}


function MoveRight()
{
	if(!canMoveRight())
	{
		return false;
	}
	for(var i = 0 ; i < 4 ; i++ )
	{
		for(var j = 2 ; j >= 0 ; j-- )
		{
			if(board[i][j] != 0 )
			{
				for(var k = 3 ; k > j ; k-- )
				{
					if(board[i][k] == 0 && nobstacle_col(j,k,i))
					{
						showAnimateView(i,j,i,k);
						board[i][k] = board[i][j];
						board[i][j] = 0;
					}
					else if(board[i][k] == board[i][j] && nobstacle_col(j,k,i))
					{
	//					alert(1);
						showAnimateView(i,j,i,k);
						showAnimateView1(i,k);
						board[i][k] += board[i][j];
						score += board[i][k];
						undatescore(score);
						board[i][j] = 0;
					}
				}
			}
		}
	}
	
	setTimeout("undateboardView()",200);
	return true;
}


function canMoveUp()
{
	for(var i = 1 ; i < 4 ; i++ )
	{
		for(var j = 0 ; j < 4 ; j++ )
		{
			if(board[i-1][j] == 0  || board[i-1][j] == board[i][j])
			{
				return true;
			}
		}
	}
	return false;
}
function canMoveDown()
{
	for(var i = 0 ; i < 3 ; i++ )
	{
		for(var j = 0 ; j < 4 ; j++ )
		{
			if(board[i+1][j] == 0  || board[i+1][j] == board[i][j])
			{
				return true;
			}
		}
	}
	return false;
}

function canMoveLeft()
{
	for(var i = 0 ; i < 4 ; i++ )
	{
		for(var j = 1 ; j < 4 ; j++ )
		{
			if(board[i][j-1] == 0  || board[i][j-1] == board[i][j])
			{
				return true;
			}
		}
	}
	return false;
}

function canMoveRight()
{
	for(var i = 0 ; i < 4 ; i++ )
	{
		for(var j = 0 ; j < 3 ; j++ )
		{
			if(board[i][j+1] == 0  || board[i][j+1] == board[i][j])
			{
				return true;
			}
		}
	}
	return false;
}



function nobstacle_row(row1,row2,col)
{
	for(var i = row1+1 ; i < row2 ; i++)
	{
		if(board[i][col] != 0)
		{

			return false;
		}
	}
	return true;
}


function nobstacle_col(col1,col2,row)
{
	for(var i = col1+1 ; i < col2 ; i++)
	{
		if(board[row][i] != 0)
		{
			return false;
		}
	}
	return true;
}


function showAnimateView(fromx,fromy,tox,toy)
{
	var numbercell = $('#number-cell-'+fromx +'-'+fromy);
	numbercell.animate(
		{
			top:getPostTop(tox,toy),
			left:getPostLeft(tox,toy),
		}
	,200);
	
	
}


function showAnimateView1(originalx,originaly)
{
	var numbercell = $('#number-cell-'+originalx +'-'+originaly);
	numbercell.css('transform','scale(1.2)');
	numbercell.css('transition','transform 0.2s');
	
}

function isgameover()
{
	if( nospaceboard() && nomove())
	{
		gameover();
	}
}

function gameover()
{
	alert("游戏结束!");
	newgame();
}

function nomove()
{
	if(canMoveRight() ||
	   canMoveLeft() ||
	   canMoveUp() ||
	   canMoveDown() )
	{
		return false;
	}
	return true;
}

function undatescore(score)
{
	$('#score').text(score);
}

document.addEventListener('touchstart',function(event)
{
	startx = event.touches[0].pageX;
	starty = event.touches[0].pageY;
//	alert(startx);
}
)

document.addEventListener('touchmove',function(event)
{
	event.preventDefault();
}
)
//
document.addEventListener('touchend',function(event)
{
	endx = event.changedTouches[0].pageX;
	endy = event.changedTouches[0].pageY;
	
	var deltax = endx - startx;
	var deltay = endy - starty;
	if(Math.abs(deltax) < 0.1*documentwidth && Math.abs(deltay) < 0.1*documentwidth )
	{
		return;
	}
	
	if(Math.abs(deltax) > Math.abs(deltay))
	{
		if(deltax > 0 )
		{
			//right
			if(MoveRight())
			{
				setTimeout("formOneNumber()",210);
				setTimeout("isgameover()",300);
			}	
		}
		else
		{
			//left
			if(MoveLeft())
			{
				setTimeout("formOneNumber()",210);
				setTimeout("isgameover()",300);
			}
		}
	}
	else
	{
		if(deltay > 0 )
		{
			//down
			if(MoveDown())
			{
				setTimeout("formOneNumber()",210);
				setTimeout("isgameover()",300);
			}
		}
		else
		{
			//up
			if(MoveUp())
			{
				setTimeout("formOneNumber()",210);
				setTimeout("isgameover()",300);
			}
		}
	}
//	alert(deltay);
}
)