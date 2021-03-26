var bg,bgImg;
var girl,girlImg;
var girl3,girl3Img;
var girl2Img
var butterfly1,butterflyGif1,butterfly1Grp;
var butterfly2,butterflyGif2,butterfly2Grp;
var honeyBee,honeyBeeImg,honeyBeeGrp;
var invisibleGround;
var PLAY=1;
var END=0;
var GameState="PLAY";
var jumpSound, backgroundSound,pointSound;
var score=0;
var gameOver,gameOverImage;
var gameOverSound;
var restart,restartImg;

function preload(){
bgImg=loadImage("Images/Garden1.jpg");
girlImg=loadImage("Images/Girl.png");
girl3Img=loadImage("Images/Girl3.png");
girl2Img=loadAnimation("Images/Girl2.png");
butterflyGif1=loadAnimation("Images/Butterfly1.png","Images/Butterfly2.png");
butterflyGif2=loadAnimation("Images/Butterfly3.png","Images/Butterfly4.png");
honeyBeeImg=loadImage("Images/HoneyBee.png");
gameOverImage=loadImage("Images/GameOver.png");
restartImg=loadImage("Images/RestartImage.png")
jumpSound=loadSound("Sounds/JumpSound.wav");
//backgroundSound=loadSound("Sounds/BackgroundSound.wav");
pointSound=loadSound("Sounds/PointSound.wav");
gameOverSound=loadSound("Sounds/GameOverSound.wav");
}


function setup() {
  createCanvas(1000,500);

  bg=createSprite(-10,120,1000,500);
  bg.x=bg.width/2;
  bg.velocityX=-3;
  bg.scale=1.9;
  bg.addImage("Bg",bgImg);

  girl=createSprite(100, 350, 50, 20);
  girl.addImage("G1",girlImg);
  girl.scale=0.8
  //girl.debug=true;
  girl.setCollider("rectangle",0,40,80,150);
  
 // girl3=createSprite(200,200,10,40);
  //girl3.addImage("g3",girl3Img);

gameOver=createSprite(500,200,100,100);
gameOver.addImage("GameOver",gameOverImage);
//gameOver.scale=1.5;

restart=createSprite(500,400,50,50);
restart.addImage("restart",restartImg);
restart.scale=0.5;

invisibleGround=createSprite(50,450,600,20);
invisibleGround.visible=false;

honeyBeeGrp=new Group();
butterfly1Grp=new Group();
butterfly2Grp=new Group();
}

function draw() {
  background(255);  
if(GameState==="PLAY"){
// backgroundSound.play();
gameOver.visible=false;
restart.visible=false;
if(bg.x<450){
    bg.x=570
  }
if(keyDown(LEFT_ARROW)){
girl.changeAnimation("g3",girl3Img);
  }
  
if(keyDown("space")&& girl.y>100){
  girl.velocityY=-10;
  }
if(keyWentDown("space")){
jumpSound.play();
}
if(butterfly1Grp.isTouching(girl)){
  pointSound.play();
  butterfly1Grp.destroyEach();
  score=score+1;
}
if(butterfly2Grp.isTouching(girl)){
  pointSound.play();
  butterfly2Grp.destroyEach();
  score=score+2;
}

girl.velocityY=girl.velocityY+0.8;

if(girl.isTouching(honeyBeeGrp)){
  GameState="END";
butterfly1Grp.setVelocityXEach(0);
butterfly2Grp.setVelocityXEach(0);
honeyBeeGrp.setVelocityXEach(0);
gameOverSound.play();
}  
  spawnButterflies1();
  spawnButterflies2();
  spawnHoneyBees();
  
  
  }
 if(GameState==="END"){
   bg.velocityX=0;
   //girl.changeAnimation("crying girl",girl2Img);
   girl.velocityX=0;
   girl.velocityY=0;
   gameOver.visible=true;
   restart.visible=true;
   butterfly1Grp.destroyEach();
   butterfly2Grp.destroyEach();
   girl.y=350;
   

 if(mousePressedOver(restart) && GameState==="END"){
reset();
 }  
 } 
 
girl.collide(invisibleGround);

  drawSprites();
  textSize(20);
  fill(0);
  text("Score:"+score,900,20);
}
function reset(){
GameState="PLAY";
score=0;
honeyBeeGrp.destroyEach();
gameOver.visible=false;
restart.visible=false;
bg.velocityX=-3
}
function spawnButterflies1(){
if(World.frameCount%300===0){
  var butterfly1=createSprite(500,200,20,20);
  butterfly1.y=Math.round(random(100,200));
  butterfly1.addAnimation("B1",butterflyGif1);
  butterfly1.scale=0.2
  butterfly1.velocityX=-2;
  butterfly1.lifeTime=500;
  butterfly1Grp.add(butterfly1);
 }
}
function spawnButterflies2(){
  if(World.frameCount%400===0){
    var butterfly2=createSprite(700,200,20,20);
    butterfly2.y=Math.round(random(100,200));
    butterfly2.addAnimation("B2",butterflyGif2);
    butterfly2.scale=0.2;
    butterfly2.velocityX=-2;
    butterfly2.lifeTime=500;
    butterfly2Grp.add(butterfly2);
  }
}

function spawnHoneyBees(){
  if(World.frameCount%500===0){
    var honeyBee=createSprite(950,100,20,20);
    honeyBee.y=Math.round(random(50,100));
    honeyBee.addImage("H1",honeyBeeImg);
    honeyBee.scale=0.2;
    honeyBee.velocityX=-2;
    honeyBee.lifeTime=500;
    honeyBeeGrp.add(honeyBee);
  }
}
