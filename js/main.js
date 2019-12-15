
// lineText class
class lineText{
  constructor(year, month, day, category, str){
    if(year>0) {
      this.year = year;
    }
    else this.year = null;
    this.month = month;
    this.day = day;
    this.category = category;
    this.str = str;
  }
};

class Cell{
  constructor(){
    this.up = false;
    this.down = false;
    this.right = false;
    this.left = false;
    this.room = 0;
    this.visited = false;
  }
}

class Path{
  constructor(dir, reverse, idx){
    this.dir = dir;
    this.reverse = reverse;
    this.idx = idx;
  }
}

// <-------- JSON data control --------->
let data = {};
let dataSize;
let sortedStr = [];
let month;
let date;

let totalLength =0;
let curLength =0;
let mapRate = 0;
let mapVal = 0;
let mapIndex=0;
let maxIndex;


// <-------- MAZE generation control -------->
let mazeCplx;
let maze;
let todayMaze;
let cellsize;
var dataArray = [];
var dataText = "";

function preload(){
  data = loadJSON('data/sorted-wiki3.json');
  // month = "5";
  day = "5";
}

// <--------- MAZE PATHFIND control ---------->
let path;
let pathLine;
let patch;

// <-------- TEXTBOX generation control -------->
let textsize = 20;
let defaultWidth = 100; // test value
let pool = [];

// <--------- UI ------------>
let title;
let about;
let windowPosx;
let windowPosy;

// <----------save/load data --------->
let fp;

function setup(){


  createCanvas(windowWidth, windowHeight);
  //createCanvas(windowWidth, windowHeight*3);

  var today = new Date();
  month = String(today.getMonth()+1);
  date = String(today.getDate());

  title = document.getElementById('title');
  about = document.getElementById('about');
  title.innerHTML = 'maze of '+month+'/'+date;
 
  todayMaze = createGraphics(400, 400);
  
  textFont('Black Han Sans');
  textSize(15);
  dataSize = data[month][date].length;
  
  mazeCplx = Math.round(Math.sqrt(data[month][date].length)*1.3);
  maze = createMaze(todayMaze, mazeCplx);
  path = findPath(maze, mazeCplx);
  pathLine = getPathLine(maze, mazeCplx);
  windowPosx = (windowWidth/2)-todayMaze.width;
  windowPosy = (windowHeight-todayMaze.height)/2;
  image(todayMaze, windowPosx, windowPosy);
 
  patch = matchPath(pathLine, mazeCplx);
  dataArray = data[month][date];

  for (var i=0; i<patch.length; i++){
    begin = pathLine[patch[i].dir][patch[i].idx][0];
    end = pathLine[patch[i].dir][patch[i].idx][pathLine[patch[i].dir][patch[i].idx].length-1];
    totalLength += pathLine[patch[i].dir][patch[i].idx].length;
    x = begin%mazeCplx;
    y = parseInt(begin/mazeCplx);
    
    posx = windowPosx+ x*cellsize + (cellsize-textsize)/2;
    posy = windowPosy + y*cellsize +(cellsize-textsize)/2;
    pool[i] = new TextBox("", posx, posy, patch[i].dir, patch[i].reverse, pathLine[patch[i].dir][patch[i].idx].length);

  }

  fp = createWriter('history/'+month+'-'+date+'.maz');
  fp.write(patch);
  fp.close();

  i=0;
  while(i<dataSize && i<pool.length){
    dataText = "";
    if (dataArray[i]['year']>0){
      dataText = dataArray[i]['year']+"년, ";
    }
    dataText = dataText+dataArray[i]['content'];
     
    if (dataArray[i]['category'] == '탄생' || dataArray[i]['category'] == '사망'){
      dataText = dataText+" "+dataArray[i]['category'];
    }

    sortedStr[i] = dataText;
    pool[i].str = dataText;
    i++;
  }


  // total Length == length of the total path
  // cur Length == current length of the path
  mapRate = totalLength / (60*60*24);

}

function draw(){

  if(hour() == 0 && minute() == 0 && second() == 01) {
    setTimeout(function(){
      location.reload();
    },3000);
  }
  mapVal = hour()*3600+minute()*60+second();
  curLength = mapRate * mapVal;  // map val == 현재시간
  var temp=0;
  var prevIndex = mapIndex;
  for(var i=0; i<pool.length; i++){
    temp += pool[i].len;
    if(temp > curLength) {
      mapIndex = i;
      break;
    }
  }

  mouseOver(mouseX, mouseY);
  if(prevIndex != mapIndex){
  pool[prevIndex].delta =0;
  pool[prevIndex].bg = {'r':255, 'g':255, 'b':255};
  pool[prevIndex].textfill = color(0, 0, 0);
  }
  pool[mapIndex].delta -= deltaTime/20;
  if(pool[mapIndex].delta <= -(pool[mapIndex].str.length*textsize*0.7)){
    pool[mapIndex].delta = pool[mapIndex].str.length*textsize*0.7;
    pool[mapIndex].bg = {'r':77, 'g':69, 'b':71};
    pool[prevIndex].textfill = color(255);
  }
  createTextBox();

}

function mousePressed(){
}

function showinfo(){
  about.style('color', 'green');
}