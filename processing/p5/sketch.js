let bg;
let mcFont;
let bauFechado;
let bauAberto;
let scrollImg;
let falaImg;

let bauX = 330;
let bauY = 175;
let bauSize = 110;

let bauAbertoEstado = false; // controla ON/OFF do baú
let falaAtiva = false;

// TEMPO
let ultimaHoraTrigger = -1; 
let falaTimer = 0;

// POSIÇÃO DO PERSONAGEM 
let personagemX = 0;
let personagemY = 200;
let personagemW = 200;
let personagemH = 250;

function preload() {
 bg = loadImage("background.gif");
  mcFont = loadFont("Minecraft.ttf");
  bauFechado = loadImage("Pixelart Bau.png");
  bauAberto = loadImage("Pixelart Bau aberto.png");    
  scrollImg = loadImage("Pixelart Scroll.png");   
   falaImg = loadImage("Pixelart Balão de falas.png");
}

function setup() {
  createCanvas(450, 450);
  textFont(mcFont);
  textAlign(CENTER, CENTER);
  noSmooth();
}

function draw() {
  image(bg, 0, 0, width, height);
  
  

  // --- Relógio ---
  let h = nf(hour(), 2);
  let m = nf(minute(), 2);
  fill(255);
  textSize(80);
  text(h + ":" + m, width/2, 95);

  // --- ESAD e MON ---
  textSize(30);
  text("ESAD", width/2 - 70, 160);
  text("MON",  width/2 + 70, 160);

  // --- BAÚ ---
  if (bauAbertoEstado) {
    image(bauAberto, bauX, bauY, bauSize, bauSize);
   image(scrollImg, 0, 0, 450, 450);
  } else {
    image(bauFechado, bauX, bauY, bauSize, bauSize);
  }
  // --- BALÃO DE FALA ---
  if (falaAtiva) {
    image(falaImg, 0, 0, 450, 450);
  }

 
  if (h !== ultimaHoraTrigger) {
    falaAtiva = true;          // ativa o balão
    falaTimer = millis();
    ultimaHoraTrigger = h;     // guarda hora do trigger
  }
  
  if (falaAtiva && millis() - falaTimer > 15000) { // 15000 ms = 15 s
    falaAtiva = false;
  }
}

function mousePressed() {
  // verifica se o mouse está dentro da área do baú
  if (mouseX > bauX && mouseX < bauX + bauSize &&
      mouseY > bauY && mouseY < bauY + bauSize) {

    
    bauAbertoEstado = !bauAbertoEstado;
  }
   // --- CLICK NO PERSONAGEM ---
  if (mouseX > personagemX && mouseX < personagemX + personagemW &&
      mouseY > personagemY && mouseY < personagemY + personagemH) {
    falaAtiva = !falaAtiva;  // alterna mostrar/esconder
    if (falaAtiva) {
      falaTimer = millis();
    }
  }
}

