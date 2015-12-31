var canvas;
var x;
var y;
var direction = 0;
var gunfire = new Array();
var gun_count = 0;

var end = 9;
var begin = 0;
var start_point=0;
var end_point=0;
var dead = 0;
var winning_condition=new Array();

var monsters = new Array();
var monster_count = 0;
var winning_number = 0;
var restart = 0;
var score = 0;

var enemy_fire=new Array();
var fire_num = 0;

var lives = 3;

window.onload = function() {
	canvas = document.getElementById("canvas_1"); 
	// do a focus on canvas element here
	run_it();
	setInterval(function(){fire(),monster_coordinate(), fire(),enemy_gun(),draw_ship(), collision(),show_score(),enemy_gun(),  move_bullet()},10);

}

function enemy_gun()
{
	for (var i = monsters.length - 1; i >= 0; i--) {	
		if(monsters[i].dead == 0)
		{	
			var s = Math.random();
			if(s < 0.0001)
			{			
				var enemy = new enemy_bullet(monsters[i].x + 1, monsters[i].y);

				enemy_fire[fire_num] = enemy;
				fire_num++;
			}
		}
	};
 	
}

function move_bullet()
{
	for (var i = enemy_fire.length - 1; i >= 0; i--) {

		if(enemy_fire[i].alive == 0)
		{

			canvas_context.fillRect(enemy_fire[i].x, enemy_fire[i].y, 2,5);
			enemy_fire[i].y +=1;
		}
		if(x < enemy_fire[i].x &&enemy_fire[i].x <(x+50) && enemy_fire[i].y == y)
		{
			lives--;
		}
		if(lives == 0)
		{
			run_it();
			break;
		}
		canvas_context.fillText("Lives: "+lives, 300, 50);
	};
}

function enemy_bullet(b, m)
{
	this.x = b;
	this.y = m;
	this.alive = 0;
}

function show_score()
{
	score = winning_condition.length * 100;
	canvas_context.font = 'italic 40pt Calibri';
    canvas_context.fillStyle = 'red';
    canvas_context.fillText(score, 0, 50);
}

function run_it()
{
	direction = 0;
	gunfire = new Array();
	gun_count = 0;

	end = 9;
	begin = 0;
	start_point=0;
	end_point=0;
	dead = 0;
	winning_condition=new Array();

	monsters = new Array();
	monster_count = 0;
	winning_number = 0;
	restart = 0;
	score = 0;
	enemy_fire=new Array();
	fire_num = 0;
	lives = 3;
	startup();
}

function draw_ship()
{
  	//canvas_context.drawImage('space.png', 100, 100);
	canvas_context.fillRect(x, y, 50, 370);	
}

function startup()
{
	for (var i = 0; i <40; i++) 
	{
		create_monster(i);
	};

	x = 100;
	y = 370;
	monster_height=10;
	monster_width = 10;
	canvas.addEventListener('keydown', doKeyDown, true);
	canvas_context = canvas.getContext("2d");
	canvas_context.fillRect(x, y, 50, 370);
}

function collision()
{
	for (var i = gunfire.length - 1; i >= 0; i--) 
	{
		if(gunfire[i].alive != 1)
		{
			for (var x = monsters.length - 1; x >= 0; x--) 
			{
				if(monsters[x].dead != 1)
				{
					if(gunfire[i].x > monsters[x].x && gunfire[i].x < (monsters[x].x + monsters[x].width))
					{
						if(gunfire[i].y < (monsters[x].y + monsters[x].height) && gunfire[i].y > (monsters[x].y - monsters[x].height))
						{
								monsters[x].dead = 1;
								gunfire[i].alive = 1;
								winning_condition[winning_number] = monster[x];

							show_score();
								winning_number++;
								if(winning_condition.length == 40)
								{
									alert("YOU WON BIZNATCH");
									restart = 1;
								}
							}
					}
				}
				if(restart ==1 )
				{
					break;
				}

			};	
			if(restart ==1 )
			{
				restart = 0;
				run_it();
				break;
			}
		}
	};
}


function monster(x_value, y_value)
{
	this.x = x_value;
	this.y = y_value;
	this.width = 20;
	this.height = 20;
	this.dead = 0;
}
function create_monster(i)
{
	if(i>=30)
	{
		var monster_s = new monster((i%30)*40,120);
		monsters[monster_count] = monster_s;
		monster_count+=1;
	}
	else if (i>=20)
	{
		var monster_s = new monster((i%20)*40,80);
		monsters[monster_count] = monster_s;
		monster_count+=1;

	}
	else if(i >= 10)
	{
		var monster_s = new monster((i%10)*40,40);
		monsters[monster_count] = monster_s;
		monster_count+=1;

	}
	else
	{
		var monster_s = new monster((i)*40,0);
		monsters[monster_count] = monster_s;
		monster_count+=1;
	}
}

function monster_coordinate()
{
	if(monsters[end].dead == 1 && monsters[end+10].dead == 1 && monsters[end+20].dead == 1 && monsters[end+30].dead == 1)
	{
		end--;
	}
	if(monsters[begin].dead == 1 && monsters[begin+10].dead == 1 && monsters[begin+20].dead == 1 && monsters[begin+30].dead == 1)
	{
		begin++;
	}

	if(monsters[dead].dead == 1 && monsters[dead+1].dead == 1 && monsters[dead+2].dead == 1 && monsters[dead+3].dead == 1 && monsters[dead+4].dead == 1 && monsters[dead+5].dead == 1 && monsters[dead+6].dead == 1 && monsters[dead+7].dead == 1 && monsters[dead+8].dead == 1 && monsters[dead+9].dead == 1)
	{
		dead += 10;
	}
	if(monsters[end].x + monsters[end].width == 500)
	{
		for (var i = monsters.length - 1; i >= 0; i--) {
			monsters[i].x -= 1;
			monsters[i].y +=10;
		};
		direction = -1;
	}
	else if(monsters[begin].x == 0)
	{
		for (var i = monsters.length - 1; i >= 0; i--) {
			monsters[i].x += 1;
			monsters[i].y +=10;
		};
		direction = 0;		
	}
	else 
	{
		if(direction == 0)
		{
			for (var i = monsters.length - 1; i >= 0; i--) {
				monsters[i].x += 1;
			};
		}
		else
		{
			for (var i = monsters.length - 1; i >= 0; i--) {
				monsters[i].x -= 1;
			};
		}
	}
	if(monsters[39-dead].y > y - 40)
	{
		alert("You lost!");
		clearCanvas();
		direction = 0;
		gunfire = new Array();
		gun_count = 0;

		end = 9;
		begin = 0;
		start_point=0;
		end_point=0;
		dead = 0;

		monsters = new Array();
		monster_count = 0;

		startup();
	}
	clearCanvas();
	canvas_context.fillRect(x, y, 50, 370);
	draw_monster();
}

function draw_monster()
{	
	clearCanvas();
	for (var i = monsters.length - 1; i >= 0; i--) {
		if(monsters[i].dead != 1)
		{
			canvas_context.fillRect(monsters[i].x, monsters[i].y, monsters[i].width, monsters[i].height);
		}
	};
}

function doKeyDown(e){

	
	if (e.keyCode == 37) { //left one
		if(x == 0)
		{

		}
		else
		{
			draw_monster();
			x = x - 5;
			canvas_context.fillRect(x, y, 50, 370);					
		}
	}

	if (e.keyCode == 39) { //right
		if(x+50 == 500)
		{

		}
		else
		{
			draw_monster();
			x = x + 5;
			canvas_context.fillRect(x, y, 50, 370);					
		}
	}

	if (e.keyCode == 32) { //shoot (aka space)
		create_fire();
	}

}

function make_gun()
{
	this.x = x + 24;
	this.y = y - 25;
	this.x_width = 2;
	this.y_width = 25;
	this.alive = 0;
}

function fire()
{
	for (var i = gunfire.length - 1; i >= 0; i--) {
		if(gunfire[i].alive != 1)
		{
			canvas_context.fillRect(gunfire[i].x,gunfire[i].y, gunfire[i].x_width, gunfire[i].y_width);
			gunfire[i].y -=1;

		}
	};
}

function create_fire() {			
	var firea = new make_gun();
	gunfire[gun_count] = firea;
	gun_count+=1;
}
function clearCanvas() {
	canvas.width = canvas.width;
}