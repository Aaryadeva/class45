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
  createCanvas(400,400)
  mario=createSprite(50,320,20,20)
  mario.addAnimation("standing",mario_standingImg)
  mario.addAnimation("running",mario_runningImg)
  ground=createSprite(200,370,800,65)
  ground.addImage(groundImg)
  ground.scale=0.75
  obstacle=createSprite(200,320,20,10)
  obstacle.addAnimation("plant",obstacleImg)
  obstacle.scale=0.75
  
  brick1=new Brick(250,250,20,20)
 
  coin=new Coin(brick1.x,brick1.y,20,20)
  enemyGroup=createGroup()
  enemyKillGroup=createGroup()
}

function draw(){
  background(bg)
  brick1.display()
  camera.position.x=mario.x
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
  mario.collide(brick1)
  mario.setCollider("rectangle",0,3,20,25)
  
  drawSprites()
  text("Coins: "+totalCoins,camera.position.x-180,10)
  //console.log(mouseY)
}
function spawnEnemies(){
  if(frameCount%100===0){
  enemy=createSprite(300,340,20,20)
  enemy.x=mario.x+80
  enemy.addImage(enemyImg)
  enemy.scale=0.2
  enemyKill=createSprite(enemy.x,enemy.y-35,20,5)
  enemyKill.visible=false
  enemy.setCollider("rectangle",-10,-50,100,100)
  enemyGroup.add(enemy)
  enemyKillGroup.add(enemyKill)

  }
}