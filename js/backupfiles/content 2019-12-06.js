
// Text class
class Text{
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


// <-------- begin --------->
let data = {};
var month;
var date;
let i=0;

var array = [];
var text = "";

function preload(){
  data = loadJSON('data/sorted-wiki.json');
  // month = "5";
  day = "5";
  // console.log(data);

}

function loadData(){
}

function setup(){
  var today = new Date();
  month = String(today.getMonth()+1);
  date = String(today.getDate());
  //month = "10";
  //date = "15";
  console.log(month + "/" + date);
  console.log(data[month][date].length);

}

function draw(){
  test = data[month][date];

  while(i<test.length){
    text = "";
    if (test[i]['year']>0){
      text = test[i]['year']+"년, ";
    }
    text = text+test[i]['content'];
    if (test[i]['category'] == '탄생' || test[i]['category'] == '사망'){
      text = text+test[i]['category'];
    }
    document.write(text + "<br>");
    i++;
  }
}

