//Create variables here
var dog,dogImg,dogImg2,happyDog,database,food,foodStock

function preload()
{
  //load images here
  dogImg=loadImage("images/dogImg.png")
dogImg2=loadImage("images/dogImg1.png")
}

function setup() {
  createCanvas(500, 500);
  database=firebase.database()
  dog=createSprite(250,250,20,20)
  dog.addImage(dogImg)
  dog.scale=0.1
  foodStock=database.ref("Food")
  foodStock.on("value",readStock)
}


function draw() {  
background(46,139,87)

  drawSprites();
  //add styles here
  fill("blue")
textSize(20)
  text("foodStock:10",400,50)
  text("NOTE:Press the UP ARROW to feed the dog",200,40)
  if(keyWentDown(UP_ARROW)){
  writeStock(foodStock)
  dog.addImage(dogImg2)
}
}
function readStock(data){
foodStock=data.val();
//console.log(foodStock)
}

function writeStock(foodStock){
  if(foodStock<=0){
    foodStock=0
  }else{
    foodStock=foodStock-1
  }
  database.ref("/").update({
    Food:foodStock
  })
}



