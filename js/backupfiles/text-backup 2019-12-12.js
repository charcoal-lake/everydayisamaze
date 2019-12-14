

class TextBox{
    constructor(str, x, y, r, len){
        this.str = str;
        this.strlen = str.length;
        this.posx = x;        this.posy = y;        this.rotate = r; //true or false
        this.delta=0;
        this.len = len;
        if(this.rotate == 'V') this.canvas = createGraphics(textsize, (len*cellsize)-cellsize/2);
        else if (this.rotate == 'H') this.canvas = createGraphics((len*cellsize)-cellsize/2, textsize);
        this.bg = {'r':255, 'g':255, 'b':255};
        this.textfill = color(0, 0, 0);
    }

    init(){
        // this.canvas.background(77, 69 ,71);
        fill(255);
        this.canvas.textFont('Black Han Sans');
        this.canvas.textSize(textsize);
        this.canvas.textAlign(LEFT, CENTER);
        this.canvas.position(0,0);
    };

    drawImage(){
        this.init();
        this.canvas.background(this.bg['r'], this.bg['g'], this.bg['b']);
        this.canvas.fill(this.textfill);

        if(this.rotate == 'H'){
            this.canvas.text(this.str, this.delta, this.canvas.height/2);
            image(this.canvas, this.posx, this.posy);        
            //image(this.canvas, this.posx, 0);        
        } else if (this.rotate == 'V'){
            this.canvas.push();
            this.canvas.translate(this.canvas.width/2+textsize, 0);
            this.canvas.rotate(radians(90));
            this.canvas.position(0,20);
            this.canvas.text(this.str, this.delta, (this.canvas.width+textsize)/2);
            this.canvas.pop();
            image(this.canvas, this.posx, this.posy);    
            //image(this.canvas, this.posx, 0);    
        }
    };

}


function createTextBox(){

    var temp =0;
    var grow = curLength;
    for(var i=0; i<mapIndex; i++){
       // pool[i].posx = 0;
        temp += pool[i].len;
        pool[i].drawImage();
    }

    grow = curLength - temp;
    // pool[mapIndex].posy = mapIndex;
    console.log(grow*cellsize);
    if(pool[mapIndex].rotate == 'H') {
        pool[mapIndex].canvas.resizeCanvas(grow*cellsize - cellsize/2, pool[mapIndex].canvas.height);
        pool[mapIndex].drawImage();
    }
    else if(pool[mapIndex].rotate == 'V'){
        pool[mapIndex].canvas.resizeCanvas(pool[mapIndex].canvas.width, grow*cellsize-cellsize/2);
        pool[mapIndex].drawImage();
    }

};

function mouseOver(mouseX, mouseY){

    for(var i=0; i<mapIndex+1; i++){
        if(mouseX > pool[i].posx && mouseX < pool[i].canvas.width+pool[i].posx
            && mouseY > pool[i].posy && mouseY < pool[i].posy+pool[i].canvas.height){
                pool[i].bg['r'] = 77; pool[i].bg['g']=69; pool[i].bg['b']=71;
                pool[i].textfill = color(255,255,255);
                // 리사이즈 이거 쓰면 됨
                // pool[i].canvas.resizeCanvas(pool[i].canvas.width+10, pool[i].canvas.height);
                pool[i].delta -= deltaTime/10;
                if(pool[i].delta <= -(pool[i].str.length*textsize*0.7)){
                    pool[i].delta = pool[i].str.length*textsize*0.7;
                }
            }
            else {
                pool[i].delta = 0;
                pool[i].textfill = color(0);
                pool[i].bg['r'] = 255; pool[i].bg['g']=255; pool[i].bg['b']=255;
            }
    }
}
