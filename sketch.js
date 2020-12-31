var tower,door,climber,ghost;
var doorImage,climberImage,ghostImage,towerImage;
var gamestate = "play";

function preload(){
doorImage = loadImage("door.png");
towerImage = loadImage("tower.png");
ghostImage = loadImage("ghost-jumping.png","ghost-standing.png");
climberImage = loadImage("climber.png");
}

function setup(){
createCanvas(600,600);
  
doorsGroup = new Group();
climbersGroup = new Group();

tower = createSprite(300,300);
tower.addAnimation("tower",towerImage);
tower.velocityY = 1;                          
  
ghost = createSprite(200,200,50,50);
ghost.addAnimation("ghost",ghostImage);
ghost.scale = 0.3;
}

function draw(){
background("black");

if(gamestate === "play"){
  
if(keyDown("space")){
ghost.velocityY = -10;

} 
ghost.velocityY = ghost.velocityY+0.8;
  
if(tower.y >400){
tower.y = 300;
} 
  
spwanDoors();
  
if(climbersGroup.isTouching(ghost)){
ghost.velocityY = 0;
gamestate = "end";
}
  
drawSprites();
}  
if(gamestate === "end"){
ghost.destroy();
text("GAMEOVER",230,250);
}
}

function spwanDoors(){
if(frameCount % 260 === 0){
door = createSprite(200,-50);
door.addAnimation("door",doorImage);
door.velocityY = 7;
door.x = Math.round(random(120,400));


climber = createSprite(200,10);
climber.addAnimation("climber",climberImage);
climber.velocityY = 7;
climber.x = door.x;

ghost.depth = door.depth;
ghost.depth = ghost.depth +1;

door.lifetime = 800;
climber.lifetime = 800;
  
doorsGroup.add(door);
climbersGroup.add(climber);
}
}