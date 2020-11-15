var PLAY=1
var END=0
var gameState=PLAY
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score;
var survivalTime=0
var ground,invisibeground,ground_moving
var lose
var eat
var win,won
function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
ground_moving=loadImage("download (13).jfif")
 lose=loadSound("casual-game-lose-sound-effect-45947266.mp3");
eat=loadSound("insect-eat-bite-bu01-229-sound-effect-8508301.mp3")
win=loadImage("30562489-stock-vector-vector-illustration-of-winner-starburst-icon-on-white-background.jpg")
}



function setup() {
  createCanvas(400,400)
  
  ground=createSprite(200,200,400,400)
  ground.addImage(ground_moving)
  ground.velocityX=-5

  ground.scale=2.5

  invisibleground=createSprite(50,490,1400,290)
  invisibleground.visible=false


  
  monkey=createSprite(50,310,20,20);
  monkey.addAnimation("running",monkey_running);
  monkey.scale=0.1
  
  won=createSprite(200,200,50,50);
  won.addImage(win)
  won.scale=0.5
  won.visible=false
  
  
//making groups  
FoodGroup=createGroup();
obstacleGroup=createGroup();

   monkey.setCollider("rectangle",0,0,monkey.width,monkey.height);
  monkey.debug = false ;
  
 score=0;

}

 
function draw() {

  if(gameState===PLAY){

    //calling the fruits and obstacles function
  fruitsRand();
   ObstaclesRand();
    
    
   //make infinite ground
  if(ground.x<90){
    ground.x=ground.width/2
  }
  
  //jump monkey when space is pressed
  if(keyDown("space")){
    monkey.velocityY=-3
  }
  

  if(keyDown("space")&& monkey.y >=0) {
        monkey.velocityY = -12;
  }
  
 if(monkey.isTouching(FoodGroup)){
   score=score+2
   FoodGroup.destroyEach();
   eat.play()
   switch(score){
     case 10 : monkey.scale=0.12
       break;
    
     case 20 : monkey.scale=0.14;
       break;
     
    case 30 : monkey.scale=0.16;
       break;
  
    case 40 : monkey.scale=0.18
       break;
       
    case 50 : monkey.scale=0.20;
       break;
    default : break;   
       
   }
   
 }

if(monkey.isTouching(obstacleGroup)){
  obstacleGroup.destroyEach();
  monkey.scale=0.1
  lose.play()
   }

    if(score===40){
      gameState="end";
      monkey.x=0
      monkey.y=0
      monkey.destroy()
      ground.velocityX=0
      ground.velocityY=0
    won.visible=true
      
    }

  //gravity
  monkey.velocityY=monkey.velocityY+0.8
  }
  
  
  
  
  //collision for debbuging
  monkey.collide(invisibleground) 
  
  
   
  drawSprites();
  
  stroke("red")
  textSize(13);
  fill("black")
  text("Score :"+ score,340,25);
  
 
  
}

function fruitsRand(){
  if(frameCount% 80===0 ){
   var fruits=createSprite(400,200,10,10);
    fruits.y=Math.round(random(130,270))
    fruits.addImage(bananaImage);
    fruits.scale=0.09
    fruits.velocityX=-5
     fruits.depth=monkey.depth
    monkey.depth=monkey.depth+1
    fruits.lifetime=300
    FoodGroup.add(fruits)
    
   
  }
}

function ObstaclesRand(){
  if(frameCount%50===0){
    var obstacles=createSprite(200,330,1,1);
    obstacles.x=Math.round(random(400,390))
    obstacles.addImage(obstacleImage);
    obstacles.scale=0.09
    obstacles.velocityX=-9;
    obstacles.collide(invisibleground)
    obstacles.lifetime=300
    obstacleGroup.add(obstacles)
    
   
  }
}




