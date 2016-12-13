var board = new Array();
var iscombind  = new Array();
var score = 0;

$(document).ready(function()
{
	prepareForMobile();
	newgame();
}
)

function prepareForMobile()
{
	if(documentwidth > 1280)
	{
		box = 1280;
		cellpadding = 56;
		littlebox = 250;
	}
	else
	{
		$('.container').css('width',box-2*cellpadding);
		$('.container').css('height',box-2*cellpadding);
		$('.container').css('padding',cellpadding);
		$('.container').css('border-radius',0.02*box);
		
		
		$('.real-cell').css('width',littlebox);
		$('.real-cell').css('height',littlebox);
		$('.real-cell').css('border-radius',0.02*littlebox);
	}
	
}

function newgame()
{
	// 初始化棋盘
	init();
	score = 0;
	//随机产生两个数
	formOneNumber();
	formOneNumber();
}

function init()
{
//	var i = 0 ; 
//	var j = 0 ;
//	var realcell = $('#real-cell-'+i+'-'+j);
//	alert(realcell.length);
	for(var i = 0 ; i < 4 ; i++ )
	{
		// 初始化boder 的值
		board[i] = new Array();
		iscombind[i] = new Array();
		for(var j = 0 ; j < 4 ; j++ )	
		{
			// 初始化boder 的值
			board[i][j] = 0;
			iscombind[i][j] = false;
			// 初始化小格子 的值
			var realcell = $('#real-cell-'+i+'-'+j);
			realcell.css('top',getPostTop(i,j));
			realcell.css('left',getPostLeft(i,j));
		}
	}
	
	undateboardView();
}

function undateboardView()
{
	$('.number-cell').remove();
	for(var i = 0 ; i < 4 ; i++ )
	{
		for(var j = 0 ; j < 4 ; j++ )	
		{
			$('.container').append('<div class= "number-cell" id = "number-cell-'+i+'-'+j+'" ></div>');
			var numbercell = $('#number-cell-'+i+'-'+j);
			if(board[i][j] == 0)
			{
				numbercell.css('width',0);
				numbercell.css('height',0);
				numbercell.css('top',getPostTop(i,j)+littlebox/2);
				numbercell.css('left',getPostLeft(i,j)+littlebox/2);
//				numbercell.css('transform','scale(0.1)');
			}
			else
			{
//				numbercell.animate(		
//					{
//						width:"100px",
//						height:"100px",
//					}
//				,100)
//				numbercell.css('transform','scale(1.2)');
//				numbercell.css('transition','transform 1s');
				numbercell.css('transform','scale(1)');
//				numbercell.css('transition','transform 1s');
				numbercell.css('width',littlebox);
				numbercell.css('height',littlebox);
				numbercell.css('top',getPostTop(i,j));
				numbercell.css('left',getPostLeft(i,j));
				numbercell.css('background-color',getNumberBackgroundColor(board[i][j]));
				numbercell.css('color',getNumberColor(board[i][j]));
				
//				if(board[i][j] > 100)
//				{
//					numbercell.css('font-size',0.4*littlebox+'px');
//				}
//				else if(board[i][j] > 1000)
//				{
//					numbercell.css('font-size',0.2*littlebox+'px');
//				}
//				else
//				{
//					numbercell.css('font-size',0.6*littlebox+'px');
//				}
				text_num = qun(board[i][j]);
				numbercell.text(text_num);
			}
			
			iscombind[i][j] = false;
			
		}
		
	}
	$('.number-cell').css('font-size',0.2*littlebox+'px');
//	alert(0.01*littlebox);
	$('.number-cell').css('line-height',littlebox+'px');
	
}


function formOneNumber()
{
//	var temp_length = 
	if(nospaceboard())
	{
		return false;
	}
	var tempx = Math.floor(Math.random()*4);
	var tempy = Math.floor(Math.random()*4);
	while(true)
	{
		if(board[tempx][tempy] == 0)
		{
			break;
		}
		tempx = Math.floor(Math.random()*4);
		tempy = Math.floor(Math.random()*4);
	}
//	var num= Math.floor(Math.random()*temp_length);
//	var tempx = parseInt(num/4);
//	var tempy =  num%4 ;
	var randomnum = (Math.random()>0.5?2:4) ;
//	alert(tempx +'+'+tempy);
	board[tempx][tempy] = randomnum;
	shownumber(tempx,tempy,randomnum);
//	return true;
	
}

$(document).keydown(function(event)
{
	event.preventDefault();
//	alert(event.keyCode);
	switch(event.keyCode)
	{
		case 37:
			if(MoveLeft())
			{
				setTimeout("formOneNumber()",210);
				setTimeout("isgameover()",300);
			}
			break;
		case 38:
			if(MoveUp())
			{
				setTimeout("formOneNumber()",210);
				setTimeout("isgameover()",300);
			}
			break;
		case 39:
			if(MoveRight())
			{
				setTimeout("formOneNumber()",210);
				setTimeout("isgameover()",300);
			}
			break;
		case 40:
			if(MoveDown())
			{
				setTimeout("formOneNumber()",210);
				setTimeout("isgameover()",300);
			}
			break;
		default:
		break;
	}
})
