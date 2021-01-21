

var balloon ,balloonImg , backgroundImg;
var database;
var position;


function preload(){
  balloonImg = loadAnimation("Hot Air Ballon-02.png","Hot Air Ballon-03.png","Hot Air Ballon-04.png");
  backgroundImg = loadImage("Hot Air Ballon-01.png");
}

function setup() {
  createCanvas(800,500);
  balloon = createSprite(250,250,1,1);
  balloon.addAnimation("moving",balloonImg);
  balloon.scale = 0.5;

  var balloonPosition = database.ref('balloon/height');
  balloonPosition.on("value", readPosition, showError);
}

function draw() {
  background(backgroundImg);  
    
  if(keyDown(LEFT_ARROW)){
    balloon.x = balloon.x -10  
  }
  else if(keyDown(RIGHT_ARROW)){
    balloon.x = balloon.x +10 
  }
  else if(keyDown(UP_ARROW)){
    balloon.y = balloon.y -10 
    balloon.scale = balloon.scale -0.01
  }
  else if(keyDown(DOWN_ARROW)){
    balloon.y = balloon.y +10 
    balloon.scale = balloon.scale +0.01
  }
  
  textSize(25);
  text("Press arrow keys to move the balloon",10 ,50);

  drawSprites();
}

function updateHeight(x,y){
  database.ref('balloon/height').set({
    'x': height.x + x ,
    'y': height.y + y
  })
}

function readHeight(data){
  height = data.val();
  balloon.x = height.x;
  balloon.y = height.y;
}

function showError(){
  console.log("Error in writing to the database");
}
