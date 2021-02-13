var mario,mario_standingImg,mario_runningImg,ground,groundImg,bg,bgImg,coin,coinImg
var enemy,enemyImg,mushroom,mushroomImg,obstacle,obstacleImg,enemyKill,brickImg
var totalCoins = 0
var enemyGroup,enemyKillGroup
function preload(){
  mario_standingImg=loadAnimation("mario00.png")
  mario_runningImg=loadAnimation("mario00.png","mario03.png","mario01.png","mario02.png")
  groundImg=loadImage("ground2.png")
  bg=loadImage("bg.png")
  obstacleImg=loadAnimation("obstacle1.png","obstacle2.png","obstacle3.png","obstacle4.png")
  enemyImg=loadImage("enemy.png")
  brickImg=loadImage("brick.png")
  coinImg=loadImage("coin.png")


}

function setup(){
  createCanvas(windowWidth,windowHeight)
  mario=createSprite(10,height-100,20,20)
  mario.addAnimation("standing",mario_standingImg)
  mario.addAnimation("running",mario_runningImg)
  ground=createSprite(0,height-90,width*4,20)
  ground.visible=true
  
  obstacle=createSprite(200,height-116,20,10)
  obstacle.addAnimation("plant",obstacleImg)
  obstacle.scale=0.75
  
 // brick1=createSprite()
 
  
  enemyGroup=createGroup()
  enemyKillGroup=createGroup()
  for(var i=0;i<width*8;i=i+500){
    brick1=createSprite(i,height-200,20,20)
    brick1.addImage(brickImg)
    brickImg.scale=0.1
  }
  coin=new Coin(brick1.x,brick1.y,20,20)
}

function draw(){
  background(bg)
  brick1.display()
  camera.position.x=mario.x
  ground.x=mario.x
  
  //mario.debug=true
  //enemy.debug=true
  if(keyIsDown(RIGHT_ARROW)){
    mario.changeAnimation("running",mario_runningImg)
    mario.x=mario.x+5
  }else{
    mario.changeAnimation("standing",mario_standingImg)
  }
  if(keyDown(UP_ARROW)&&mario.y>=320){
    mario.velocityY=mario.velocityY-10
  }
  

  if(keyIsDown(LEFT_ARROW)){
    mario.changeAnimation("running",mario_runningImg)
    mario.x=mario.x-5
  }else{
    mario.changeAnimation("standing",mario_standingImg)
  }
  if(enemyKillGroup.isTouching(mario)){
    
    enemyGroup.destroyEach()
  }
  if(enemyGroup.isTouching(mario)||mario.isTouching(obstacle)){
    mario.visible=false
  }
  if(mario.y===brick1.y&&mario.x===brick1.x){
    coin.display();
    brick1.destroy()
  }
  if(mario.y===coin.y&&mario.x===coin.x){
    totalCoins=totalCoins+1
    coin.destroy()
  }
  mario.velocityY=mario.velocityY+0.5
  mario.collide(ground)
  //mario.collide(brick1)
  mario.setCollider("rectangle",0,3,20,25)
  
  drawSprites()
  text("Coins: "+totalCoins,camera.position.x-180,10)
  //console.log(mouseY)
  spawnEnemies()
}
function spawnEnemies(){
  if(frameCount%400===0){
  enemy=createSprite(width,height-96,20,20)
  enemy.velocityX=-1
  enemy.addImage(enemyImg)
  enemy.scale=0.2
  enemyKill=createSprite(enemy.x,enemy.y-35,20,5)
  enemyKill.visible=false
  enemy.setCollider("rectangle",-10,-50,100,100)
  enemy.lifetime=width
  enemyKill.lifetime=width
  enemyKill.velocityX=-1
  enemyGroup.add(enemy)
  enemyKillGroup.add(enemyKill)

  }
}