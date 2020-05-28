const cvs = document.getElementById("snake");	
const ctx = cvs.getContext("2d");				

const box = 32;		
let score = 0;		


const ground = new Image();
ground.src = "ground.png";

const foodImg = new Image();
foodImg.src = "food.png";


let food = {
	x: Math.floor(Math.random()*17+1) * box,
	y: Math.floor(Math.random()*15+3) * box
};


let snake = [];
snake[0] = {
	x: 9 * box,
	y: 10 * box
};


let d;
document.addEventListener("keydown", direction);

function direction(event){
	let key = event.keyCode;
	
	if(key == 37 && d != "RIGHT"){
		d = "LEFT";
		// console.log("LEFT");
	} else if (key == 38 && d != "DOWN") {
		d = "UP";
		// console.log("UP");
	} else if (key == 39 && d != "LEFT") {
		d = "RIGHT";
		// console.log("RIGHT");
	} else if (key == 40 && d != "UP") {
		d = "DOWN";
		// console.log("DOWN");
	}
}


function collision(glava, niz){
	for(let i = 0; i < niz.length; i++){
		if(glava.x == niz[i].x && glava.y == niz[i].y){
			return true;
		}
	}
	return false;
}


function draw(){
	// Postavlja pozadinu
	ctx.drawImage(ground, 0, 0);
	
	// Farba glavu zmije u zelenu i telo u belo
	for(let i = 0; i < snake.length; i++){
		if(i == 0){
			ctx.fillStyle = "green";
		} else {
			ctx.fillStyle = "white";
		}
		ctx.fillRect(snake[i].x, snake[i].y, box, box);
		
		// Uokviruje svaki deo zmije sa crvenom bojom
		ctx.strokeStyle = "red";
		ctx.strokeRect(snake[i].x, snake[i].y, box, box);

	}
	
	// Crta sliku jabuke
	ctx.drawImage(foodImg, food.x, food.y);
	
	
	let glavaX = snake[0].x;
	let glavaY = snake[0].y;
	
	
	if (d == "LEFT"){
		glavaX = glavaX - box;
		console.log("Glava X " + glavaX + " Glava Y " + glavaY);
	}
	if (d == "UP"){
		glavaY = glavaY - box;
		console.log("Glava X " + glavaX + " Glava Y " + glavaY);
	}
	if (d == "RIGHT"){
		glavaX = glavaX + box;
		console.log("Glava X " + glavaX + " Glava Y " + glavaY);
	}
	if (d == "DOWN"){
		glavaY = glavaY + box;
		console.log("Glava X " + glavaX + " Glava Y " + glavaY);
	}
	
	
	if(glavaX == food.x && glavaY == food.y){
		
		score++;
		food = {
				x: Math.floor(Math.random()*17+1) * box,
				y: Math.floor(Math.random()*15+3) * box
		};

		while(collision(food, snake)){
			food = {
				x: Math.floor(Math.random()*17+1) * box,
				y: Math.floor(Math.random()*15+3) * box
			};
			console.log(food.x + " " + food.y);
		}		
	} else {
		
		snake.pop();
	}
	
	let novaGlava = {
		x : glavaX,
		y : glavaY
	};
	
	
	if(glavaX < box || glavaX > 17*box || glavaY < 3*box || glavaY > 17*box || collision(novaGlava, snake)){
		
		clearInterval(game);
	}
	
	
	snake.unshift(novaGlava);
	
	
	
	ctx.fillStyle = "white";
	ctx.font = "45px Changa One";
	ctx.fillText(score, 2*box, 1.5*box);
}


let game = setInterval(draw, 100);