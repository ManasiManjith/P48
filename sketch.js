
var gameState = "play"

function preload(){
  pathImg = loadImage("a2.png")
  stoneImg = loadImage("stone.png")
  nutImg = loadImage("nut.png")
  squirrelImg = loadImage("squirrel_1.png")
}

function setup() {
  createCanvas(windowWidth,windowHeight);

  path = createSprite(width/2,height/2)
  path.addImage(pathImg)
  path.velocityX = -9 ;
  path.scale = 1.35
  path.width = 6000
  console.log(path.width)

  squirrel = createSprite(300,height-100,100,80)
  squirrel.addImage(squirrelImg)
  squirrel.scale = 1.8
  //squirrel.debug = true
  squirrel.setCollider("rectangle", -80,-40,120,40)

  stonesG = new Group()
  nutsG = new Group()
  
  ground = createSprite(width/2, height-20, width*1.5, 20)
  ground.visible = false
}

function draw() {
  background (0)
  console.log(frameCount)

if (gameState==="play"){
  if (path.x < 0) {
    path.x = width/2
  }
  if (keyDown("space") || touches.length > 0 && squirrel.y > height/2 ){
    squirrel.velocityY = -25
    touches = []
  }

  createStones()
  createNuts()

  if (stonesG.isTouching(squirrel)){
    squirrel.destroy()
    gameState="end"
  }

  nutsG.overlap(squirrel, destroyNuts)

  squirrel.velocityY += 1
  squirrel.collide(ground)

  drawSprites();
}

 if(gameState==="end"){
    textSize(30)
    text("gameOver",250,250)
  }
  
}

function createStones(){
  if (frameCount % 230 == 0) {
    var stones = createSprite(width, height - 60, 10, 10);
    stones.addImage(stoneImg);
    stones.scale=0.4;
    stones.velocityX = -5;
    stones.lifetime = width/stones.velocityY;
    stonesG.add(stones);
    stones.addImage(stoneImg)
  }
}

  function createNuts(){
    if (frameCount % 215 == 0) {
      var nuts = createSprite(width, height - 70, 20, 20);
      nuts.addImage(nutImg);
      nuts.scale=0.1;
      nuts.velocityX = -5;
      nuts.lifetime = width/nuts.velocityY;
      nutsG.add(nuts);
      nuts.addImage(nutImg)
    }
 }

 function destroyNuts(nuts, squirrel){
    nuts.destroy()
 }
