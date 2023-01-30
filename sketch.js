let canvas;
let button;
let button2;
let button3;

let food = 0;
let feeding = false;

let toy = 0;
let playing = false;

let water = 0;
let bathing = false;

let hungry = 0;
let full = 1;
let tamaState = hungry;

let sad = 0;
let happy = 1;
let tamaState2 = sad;

let dirty = 0;
let clean = 1;
let tamaState3 = sad;

let tamaX;
let tamaY;
let tamaDiam;
let tamaDiam2;
let tamaDiam3;

function setup() {

  canvas = createCanvas(500, 500);
  canvas.parent("sketch-container"); //move our canvas inside this HTML element

  tamaX = width/2;
  tamaY = height/2;
  tamaDiam = width/6;
  tamaDiam2 = width/6;
  tamaDiam3 = width/6;
  addGUI();
  addGUI2();
  addGUI3();
}

function draw() {
  background(255,191,191);
//-------------------------------------  1
  push();
  //Drawing
  background(255,191,191);
  noStroke();

  //manage state of Tama
  if(tamaState == hungry){
    fill(255);

    //manage switching to full state
    if(tamaDiam > width/4){
      tamaState = full;
    }

  }else if(tamaState == full){
    //full color
    fill(255,102,102);

    //manage returning to hungry state
    if(tamaDiam > width/6){
      if(frameCount % 2 == 0) tamaDiam--; // reduce every second frame
    }else{
      tamaState = hungry;
    }
  }
  fill(225,102,102);
  //draw Tama and closed mouth
 circle(tamaX,tamaY,tamaDiam);
  fill(0);
  let mouthOffset = tamaDiam/2;
  rect(tamaX-mouthOffset/2,tamaY,mouthOffset,3);
  fill(255);
  rect(tamaX+10,tamaY,mouthOffset/6,3);
  rect(tamaX-10,tamaY,mouthOffset/6,3);
  //draw Tama and closed eye
  fill(0);
  let eyeOffset = tamaDiam/2;
  circle(tamaX/2,tamaY/2,tamaDiam/2);
  circle(tamaX*1.5,tamaY/2,tamaDiam/2);
  fill(255);
  circle(tamaX/2,tamaY/2,tamaDiam/8);
  circle(tamaX*1.5,tamaY/2,tamaDiam/8);


  if(food > 0 ){

    //Tama Eat
    if(frameCount % 10 < 15 && tamaState == hungry){
      eatFood();
    }

    //draw food
    fill(255,238,169);
    circle(tamaX,tamaY+food,food,random(100,255));
    fill(255,238,169,random(200,255));
    circle(tamaX,tamaY+food*3,food*2,random(220,255));
    circle(tamaX,tamaY+food*6,food*4);
    circle(tamaX,tamaY+food*9,food*6);
  }else if(feeding){
    //manage button state, only do this once IF the button is inactive
    feeding = false;
    button.html("FEED");
    button.removeClass("inactive");
  }
  
pop();
  
//-------------------------------------   2 play
push();
  //Drawing
  noStroke();

  //manage state of Tama
  if(tamaState2 == sad){
    fill(255,0,0);

    //manage switching to full state
    if(tamaDiam2 > width/4){
      tamaState2 = happy;
    }

  }else if(tamaState2 == happy){
    //full color
     fill(255,50,10);

    //manage returning to hungry state
    if(tamaDiam2 > width/6){
      if(frameCount % 3 == 0) tamaDiam--; // reduce every second frame
    }else{
      tamaState2 = sad;
    }
  }

  // //draw Tama and closed mouth
  // circle(tamaX,tamaY,tamaDiam);
  // fill(0);
  // let mouthOffset = tamaDiam/2;
  // rect(tamaX-mouthOffset/2,tamaY,mouthOffset,3);

  
  if(toy > 0 ){

    //Tama Eat
    if(frameCount % 30 < 15 && tamaState2 ==sad){
      playToy();
    }


  }else if(playing){
    //manage button state, only do this once IF the button is inactive
    play = false;
    button2.html("PLAY");
    button2.removeClass("inactive");
  }
  
  pop();
//-------------------------------------  3 clean
  push();
  //Drawing
  noStroke();

  //manage state of Tama
  if(tamaState3 == dirty){
    fill(255);

    //manage switching to full state
    if(tamaDiam3 > width/4){
      tamaState3 = clean;
    }

  }else if(tamaState3 == clean){
    //full color
     fill(255,102,102);

    //manage returning to hungry state
    if(tamaDiam3 > width/6){
      if(frameCount % 2 == 0) tamaDiam3--; // reduce every second frame
    }else{
      tamaState3 = dirty;
    }
  }

  // //draw Tama and closed mouth
  // circle(tamaX,tamaY,tamaDiam);
  // fill(0);
  // let mouthOffset = tamaDiam/2;
  // rect(tamaX-mouthOffset/2,tamaY,mouthOffset,3);


  if(water > 0 ){

    //Tama Eat
    if(frameCount % 30 < 15 && tamaState3 == dirty){
      useWater();
    }

    // //draw food
    // fill(100);
    // circle(tamaX,tamaY+water,water);

  }else if(bathing){
    //manage button state, only do this once IF the button is inactive
    bathing = false;
    button3.html("clean");
    button3.removeClass("inactive");
  }
  
pop();
}

function eatFood(){

  //draw open mouth
  fill(0);
  arc(tamaX,tamaY, tamaDiam/2, tamaDiam/4,-45,180);

  //reduce food & grow Tama
  food --;
  tamaDiam++;

}

function playToy(){

  //draw open mouth
  // fill(0);
  // circle(tamaX,tamaY,tamaDiam2/2);

  //reduce food & grow Tama
  toy --;
  tamaDiam2++;

}

function useWater(){

  //draw open mouth
  fill(171,234,255);
  //circle(tamaX,tamaY,tamaDiam2/2);
  arc(tamaX+150,tamaY-120, tamaDiam2/2, tamaDiam2,-20,70);
  arc(tamaX-150,tamaY-120, tamaDiam2/2, tamaDiam2,70,-20);
  //reduce food & grow Tama
  water --;
  tamaDiam3++;

}


function addGUI()
{

  //add a button
  button = createButton("FEED");

  button.addClass("button");

  //Add the play button to the parent gui HTML element
  button.parent("gui-container");
  
  //Adding a mouse pressed event listener to the button 
  button.mousePressed(handleButtonPress); 

}

function addGUI2()
{

  //add a button
  button2 = createButton("PLAY");

  button2.addClass("button2");

  //Add the play button to the parent gui HTML element
  button2.parent("gui-container");
  
  //Adding a mouse pressed event listener to the button 
  button2.mousePressed(handleButtonPress2); 

}

function addGUI3()
{

  //add a button
  button3 = createButton("CLEAN");

  button3.addClass("button3");

  //Add the play button to the parent gui HTML element
  button3.parent("gui-container");
  
  //Adding a mouse pressed event listener to the button 
  button3.mousePressed(handleButtonPress3); 

}

function handleButtonPress()
{
    if(!feeding){
      //set food to random value
      food = random(40,60);
      feeding = true;

      //manage button state
      button.html("FEEDING");
      button.addClass("inactive");
    }
    
}

function handleButtonPress2()
{
    if(!playing){
      //set food to random value
      toy = random(80,100);
      playing = true;

      //manage button state
      button2.html("PLAYING");
      button2.addClass("inactive");
    }
    
}


function handleButtonPress3()
{
    if(!bathing){
      //set food to random value
      water = random(20,80);
      bathing = true;

      //manage button state
      button3.html("CLEANING");
      button3.addClass("inactive");
    }
    
}


