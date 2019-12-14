let c1;
let c2;
let str1 = "2003년, 대한민국의 가수 ITZY의 유나 탄생";
let str2 = "2016년, 대한민국 국회에서 18대 박근혜 대통령 탄핵 소추안이 찬성 234표, 반대 56표로 가결되었다. 이로써 박근혜는 대통령 직무정지 처분을 받았고, 황교안 국무총리가 대통령직 권한대행을 시작했다.";
let box;
let i=0;
let xpos, ypos=0;
let px=10, py=20;

function setup(){
    createCanvas(windowWidth, windowHeight);
    background(255, 0, 0);

    // 가로 텍스트
    c1 = createGraphics(200, 20);
    c1.position(px, py);
    c1.textFont('Black Han Sans');
    c1.textAlign(CENTER, CENTER);
    c1.textSize(20);

    // 세로 텍스트
    py+= 20;
    c2 = createGraphics(20, 300);
    //c2.push();
    c2.translate(c2.width/2+20, 0);
    c2.rotate(radians(90));
    c2.position(px, py);
    c2.textFont('Black Han Sans');
    c2.textSize(20);
    //c2.pop();

}

function draw(){

    background(150);
    c1.background(255);
    c2.background(0,255,0);

    fill(255);
    if(mouseOver(c1)){
        xpos -= deltaTime/10;
    } else {
        xpos = c1.width/2;
    }
    c1.text(str1, xpos, c1.height/2);
    c2.text(str2, 0, 30);

    console.log(mouseX +","+mouseY);
    //image(box, 0, 0);
    image(c1,c1.x,c1.y);
    image(c2,c2.x,c2.y);
    
    //image(box, (window.innerWidth-c1.width)/2, (window.innerHeight-c1.height)/2);
}

function mouseOver(box){

    console.log(box.x);
    if(mouseX > box.x && mouseX < box.x+box.width && 
        mouseY > box.y && mouseY< box.y+box.height){
        console.log("mouseover");
        return true;
    }
    return false;
}
