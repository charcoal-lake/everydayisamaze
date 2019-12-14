
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

// <--------- variable for TEST --------------->
let mousecount =0;

function setup(){

  createCanvas(windowWidth, windowHeight);
  todayMaze = createGraphics(400, 400);

  textFont('Black Han Sans');
  textSize(15);
  var today = new Date();
  month = String(today.getMonth()+1);
  date = String(today.getDate());
  console.log(month + "/" + date);
  dataSize = data[month][date].length;
  
  mazeCplx = Math.round(Math.sqrt(data[month][date].length)*1.3);
  maze = createMaze(todayMaze, mazeCplx);
  path = findPath(maze, mazeCplx);
  pathLine = getPathLine(maze, mazeCplx);
  image(todayMaze, (windowWidth-todayMaze.width)/2, (windowHeight-todayMaze.height)/2);
 
  patch = matchPath(pathLine, mazeCplx);
  test = data[month][date];

  for (var i=0; i<patch.length; i++){
    begin = pathLine[patch[i].dir][patch[i].idx][0];
    end = pathLine[patch[i].dir][patch[i].idx][pathLine[patch[i].dir][patch[i].idx].length-1];
    totalLength += pathLine[patch[i].dir][patch[i].idx].length;
    x = begin%mazeCplx;
    y = parseInt(begin/mazeCplx);
    
    posx = (windowWidth-todayMaze.width)/2 + x*cellsize + (cellsize-textsize)/2;
    posy = (windowHeight-todayMaze.height)/2 + y*cellsize +(cellsize-textsize)/2;
    pool[i] = new TextBox("", posx, posy, patch[i].dir, patch[i].reverse, pathLine[patch[i].dir][patch[i].idx].length);

  }

  i=0;
  while(i<dataSize && i<pool.length){
    dataText = "";
    if (test[i]['year']>0){
      dataText = test[i]['year']+"년, ";
    }
    dataText = dataText+test[i]['content'];
     
    if (test[i]['category'] == '탄생' || test[i]['category'] == '사망'){
      dataText = dataText+" "+test[i]['category'];
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

  mapVal = hour()*3600+minute()*60+second();
  curLength = mapRate * mapVal;  // map val == 현재시간
  var temp=0;
  for(var i=0; i<pool.length; i++){
    temp += pool[i].len;
    if(temp > curLength) {
      mapIndex = i;
      break;
    }
  }
  
  mouseOver(mouseX, mouseY);
  createTextBox();
}

