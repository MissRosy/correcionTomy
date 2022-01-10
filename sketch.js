var dog,sadDog,happyDog, database;
var foodS,foodStock;
var addFood;
var foodObj;

//crea aquí las variables feed y lastFed 
var feed, lastFed;

//TENIAS QUE DECLARAR UNA VARIABLE PARA LA HORA
var hora;

function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
}

function setup() {
  database=firebase.database();
  createCanvas(1000,400);

  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  //crea aquí el boton Alimentar al perro, *No se hace en una clase?
 //NO SE CREA CLASE, SOLO UN BOTON COMO EL DE AGREGAR ALIMENTO PERO QUE DIGA ALIMENTAR AL PERRO
 //Y ESTE BOTON CUANDO SE PRESIONE VA A MANDAR LLAMAR LA FUNCION feedDog 

  addFood=createButton("Agregar Alimento");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

}

function draw() {
  background(46,139,87);
  foodObj.display();

  //escribe el código para leer el valor de tiempo de alimentación de la base de datos, *Creo q no tengo el enlace necesario
  //ASI ES SOLO SE NECESITA UNA FUNCION YA PREHECHA QUE DA LA HORA
  if (lastFed >= 12) {
    //muestra la hora en formato PM cuando lastFed sea mayor que 12
  } else if (lastFed == 0) {
    //Y AQUI SOLO SE LA CONCATENAS
    text("Última hora en que se alimentó : " + hora, 350, 30);
  } else {
    //muestra la hora en formato AM cuando lastFed sea mayor que 12
  }
  
 
  drawSprites();
}

//función para leer la Existencia de alimento, *No sé como ponerle el .ref
//ESTA FUNCION YA ESTA HECHA SOLO TE PUSIERON EL COMENTARIO PARA QUE SUPIERAS QUE HACE
//NO NECESITAS AGREGARLE NADA AQUÍ
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}


function feedDog(){
  dog.addImage(happyDog);

  //escribe el código aquí para actualizar las existencia de alimento, y la última vez que se alimentó al perro
  var food_stock_val = foodObj.getFoodStock();
  if(food_stock_val <= 0){
    foodObj.updateFoodStock(food_stock_val *0);
  }else{
    foodObj.updateFoodStock(food_stock_val -1);
  }
  //CON LA VARIABLE HORA MANDAS LLAMAR UNA FUNCION hour() ASI:
  hora=hour();

  //AQUI PRIMERO VA LA VARIABLE foodS QUE ES LA QUE LLEVA EL CONTEO DE COMIDA
  //LE RESTAS -1 POR CADA VEZ QUE SE EJECUTE ESTA FUNCION

  //Y LUEGO SOLO LO ACTUALIZAS, SE UTILIZA EL CODIGO DE UPDATE QUE ES PARA ACTUALIZAR
  //LA HORA Y FOODS ES COMO EL CODIGO QUE TIENES ENTRE LAS LINEAS 91 Y 93 
}

//funcón para agregar alimento al almacén, *Creo q este ya está bien
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}