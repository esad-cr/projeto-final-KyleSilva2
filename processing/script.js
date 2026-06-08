/**************Processing**************/

new p5(function(p) {
 
    // ── Variáveis ──────────────────────────────────────────
    let bg, mcFont, bauFechado, bauAberto, scrollImg, falaImg;
 
    let bauX = 330, bauY = 175, bauSize = 110;
    let bauAbertoEstado = false;
    let falaAtiva = false;
 
    let ultimaHoraTrigger = -1;
    let falaTimer = 0;
 
    let personagemX = 0,  personagemY = 200;
    let personagemW = 200, personagemH = 250;
 
    // ── preload ────────────────────────────────────────────
    p.preload = function() {
        bg         = p.loadImage("p5/background.gif");
        mcFont     = p.loadFont("p5/Minecraft.ttf");
        bauFechado = p.loadImage("p5/Pixelart-Bau.png");
        bauAberto  = p.loadImage("p5/Pixelart-Bau-aberto.png");
        scrollImg  = p.loadImage("p5/Pixelart-Scroll.png");
        falaImg    = p.loadImage("p5/Pixelart-Balão-de-falas.png");
    };
 
    // ── setup ──────────────────────────────────────────────
    p.setup = function() {
        var myCanvas = createCanvas(450,450);
        myCanvas.parent("pjCanvas");
        /*let canvas = p.createCanvas(450, 450);*/
        /*canvas.parent("p5-canvas");*/
        p.textFont(mcFont);
        p.textAlign(p.CENTER, p.CENTER);
        p.noSmooth();
    };
 
    // ── draw ───────────────────────────────────────────────
    p.draw = function() {
        p.image(bg, 0, 0, p.width, p.height);
 
        let h = p.nf(p.hour(), 2);
        let m = p.nf(p.minute(), 2);
        p.fill(255);
        p.textSize(80);
        p.text(h + ":" + m, p.width / 2, 95);
 
        p.textSize(30);
        p.text("ESAD", p.width / 2 - 70, 160);
        p.text("MON",  p.width / 2 + 70, 160);
 
        if (bauAbertoEstado) {
            p.image(bauAberto, bauX, bauY, bauSize, bauSize);
            p.image(scrollImg, 0, 0, 450, 450);
        } else {
            p.image(bauFechado, bauX, bauY, bauSize, bauSize);
        }
 
        if (falaAtiva) {
            p.image(falaImg, 0, 0, 450, 450);
        }
 
        if (h !== ultimaHoraTrigger) {
            falaAtiva = true;
            falaTimer = p.millis();
            ultimaHoraTrigger = h;
        }
 
        if (falaAtiva && p.millis() - falaTimer > 15000) {
            falaAtiva = false;
        }
    };
 
    // ── mousePressed ───────────────────────────────────────
    p.mousePressed = function() {
        if (p.mouseX > bauX && p.mouseX < bauX + bauSize &&
            p.mouseY > bauY && p.mouseY < bauY + bauSize) {
            bauAbertoEstado = !bauAbertoEstado;
        }
        if (p.mouseX > personagemX && p.mouseX < personagemX + personagemW &&
            p.mouseY > personagemY && p.mouseY < personagemY + personagemH) {
            falaAtiva = !falaAtiva;
            if (falaAtiva) falaTimer = p.millis();
        }
    };
 
}, "p5-canvas");