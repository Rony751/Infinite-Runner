var gameState = "start";
var ground, invisibleGround, groundImage;
var backgroundImage;
var mario, mario_running;
var stone, stoneImage, stoneGroup;
var fire, fireImage, fireGroup
var score = 0;

var mainb1, mainb2, mainb3, mainb4;

function preload() {
  mario_running = loadImage("boy.gif");
  groundImage = loadImage("groundImage.png");
  stoneImage = loadImage("stone.png");
  backgroundImage = loadImage("backgroundImage.png");
  fireImage = loadImage("fire.gif");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  mainb1 = createSprite(width/2, height/2 - 65, 400, 8);
  mainb2 = createSprite(width/2, height/2 + 32, 400, 8);
  mainb3 = createSprite(width/2 - 200, height/2 - 16.5, 8, 104.5);
  mainb4 = createSprite(width/2 + 200, height/2 - 16.5, 8, 104.5);
  
  mainb1.shapeColor = "black";
  mainb2.shapeColor = "black";
  mainb3.shapeColor = "black";
  mainb4.shapeColor = "black";
  
  ground = createSprite(width/2,height,width,2);
  ground.addImage("ground",groundImage);
  ground.x = width/2
  //ground.velocityX = -(6 + 3*score/100);
  
  invisibleGround = createSprite(width/2,height-70,width,2);
  invisibleGround.visible = false;
  
  mario = createSprite(120, height - 100);
  mario.addImage("marioImage", mario_running);
  mario.scale = 0.8;
  //mario.debug = true;
  mario.setCollider("rectangle", 0, 0, 70, 82);
  marioY = mario.y;
  
  stoneGroup = new Group();
  fireGroup = new Group();
}

function draw() {
  background(backgroundImage);
  
  if(gameState === "start") {
    fill("black");
    textSize(15);
    text("Tap to start", width/2 - 40, height/2 + 60, stroke("black"));
    
    fill("blue");
    textSize(50);
    text("Infinite Runner", width/2 - 160, height/2 - 50, stroke("black"));
    
    fill("red");
    textSize(15);
    text("developed by Rony Philip", width/2 - 85, height/2 + 2, stroke("black"));
    
    if((touches.length > 0||keyDown("SPACE"))) {
      touches = [];
      gameState = "play";
    }
    
  }
    
  if(gameState === "play") {
    
    fill("black");
    stroke("black");
    textSize(20);
    text("Score : " + score, 30, 50);
    
    fill("red");
    stroke("black");
    textSize(20);
    textFont("Tahoma")
    text("Tap to jump", width/2 - 60, 50);
    
    mainb1.visible = false;
    mainb2.visible = false;
    mainb3.visible = false;
    mainb4.visible = false;
    
    mario.visible = true;
    
    if(frameCount % 4 === 0) {
      score += 1
    }
  
    ground.velocityX = -(12 + 3*score/100);
  
    if (ground.x < 0){
      ground.x = ground.width/2;
    }

    if((touches.length > 0||keyDown("SPACE"))&&mario.y >= height-120) {
      mario.velocityY = -23;
      touches = [];
    }
    
    mario.velocityY = mario.velocityY + 1.8;
    mario.collide(invisibleGround);
    
    if(mario.isTouching(stoneGroup) || mario.isTouching(fireGroup)) {
      gameState = "end";
    }
  
    spawn_rocks();
    spawn_fire();
  }
  
  if(gameState === "end") {
    stoneGroup.setVelocityXEach(0);
    fireGroup.setVelocityXEach(0);
    ground.velocityX = 0;
    stoneGroup.setLifetimeEach(-1);
    fireGroup.setLifetimeEach(-1);
    mario.visible = false;
    
    if(keyDown('r')) {
      reset();
    }
    
    fill("blue");
    textSize(60);
    text("Wasted", width/2 - 110, height/2 - 50, stroke("black"));
    
    fill("red");
    textSize(16);
    text("Press 'R' to restart", width/2 - 70, height/2 + 10, stroke("black"));
  }
  
  drawSprites();
}

function spawn_rocks() {
  if(frameCount % 50 === 0) {
    stone = createSprite(740, height - 95, 20, 30);
    stone.addImage(stoneImage);
    stone.scale = 0.17;
    stone.velocityX = -(12 + 3*score/100);
    stone.lifetime = 300;
    stone.debug = true;
    stone.setCollider("rectangle", 0, 0, 400, 430);
    stoneGroup.add(stone);
  }
}

function spawn_fire() {
  if(frameCount % 70 === 0) {
    fire = createSprite(800, height - 95, 20, 30);
    fire.addImage(fireImage);
    fire.scale = 0.17;
    fire.velocityX = -(12 + 3*score/100);
    fire.lifetime = 300;
    fire.debug = true
    fire.setCollider("rectangle", 0, 0, 200, 300);
    fireGroup.add(fire);
  }
}

function reset() {
  gameState = "play";
  stoneGroup.destroyEach();
  fireGroup.destroyEach();
  score = 0;
  mario.y = height/2;
}