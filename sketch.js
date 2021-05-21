var ast, astImg;
var bg, bgImg;
var alien, alien1Img, alien2Img, alien3Img, alien4Img;
var alienGrp, foodGrp;
var food,food1Img, food2Img, food3Img;
var edges;
var distanceTr;
var deathCount;
var gameState=1;
var score=0;

function preload(){
    astImg=loadImage("ast.png");
    bgImg=loadImage("bg.jpg");

    alien1Img=loadImage("alien.png");
    alien2Img=loadImage("alien2.png");
    alien3Img=loadImage("alien3.png");
    alien4Img=loadImage("alien4.png");

    food1Img=loadImage("food.png");
    food2Img=loadImage("food2.png");
    food3Img=loadImage("food3.png");
}
function setup(){
    createCanvas(800,400);
    deathCount=0;
    distanceTr=0;
    bg=createSprite(400,200,800,400);
    bg.addImage(bgImg);
    bg.scale=0.25;
    
    
    ast= createSprite(40,100,20,20);
    ast.addImage(astImg);
    ast.scale=0.2;
   

    alienGrp=new Group();
    foodGrp=new Group();

}
function draw(){
    
    score=score+1;
   
    ast.velocityY=0;
    if(gameState===1){
    edges=createEdgeSprites();
    ast.collide(edges);
    bg.velocityX=-3;

    if(keyDown("UP_ARROW")){
        ast.y=ast.y-4;
    }
    if(keyDown("DOWN_ARROW")){
        ast.y=ast.y+4;
    }
    if(bg.x<350){
        bg.x=450;
        
     }
    //console.log(bg.x);
    if(score%500===0){
        deathCount=deathCount+1;
    }
    if(bg.x<=447){
        distanceTr=distanceTr+1;
    }
     if(ast.isTouching(alienGrp)){
        deathCount=deathCount+1;
        alienGrp.setVelocityXEach(0);
        console.log(deathCount); 
         if(deathCount===3){
             gameState=2;
             deathCount=0;
         }
     }


   
     
     
     spawnAliens();
     spawnFood();

     
    }
    else if(gameState===2){
        bg.velocityX=0;
        alienGrp.setVelocityXEach(0);
        foodGrp.setVelocityXEach(0);
    }
    drawSprites();
    fill("YELLOW");
    text("Score" + score, 200,200);

}

function spawnAliens(){
    if(frameCount%220===0){
    var rand1=random(50,350)
    alien=createSprite(800,rand1,20,20);
    
    var rand=Math.round(random(1,4));
    switch(rand){
        case 1: alien.addImage(alien1Img);
        break;
        case 2: alien.addImage(alien2Img);
        break;
        case 3: alien.addImage(alien3Img);
        break;
        case 4: alien.addImage(alien4Img);
        default: break;
    }
    alien.velocityX=-3;
    alien.scale=0.2;
    alienGrp.add(alien);
    }
}
function spawnFood(){
    if(frameCount%255===0){
    var rand2=random(50,350)
    food=createSprite(800,rand2,20,20);
    
    var rand3=Math.round(random(1,3));
    switch(rand3){
        case 1: food.addImage(food1Img);
        food.scale=0.3;
        break;
        case 2: food.addImage(food2Img);
        food.scale=0.2;
        break;
        case 3: food.addImage(food3Img);
        food.scale=0.15;
        default: break;
    }
    food.velocityX=-3;
    foodGrp.add(food);
    }
}