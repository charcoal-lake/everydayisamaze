
function createMaze(maze, mazeSize){
    // maze : target canvas
    // maze : maze complexity
   
    let clsopen = false;
    let cls = 0;
  
    // initialize

    maze.background(255);
    maze.strokeWeight(10);
    maze.stroke(0);
    maze.line(0, 0, maze.width, 0);
    maze.line(0, 0, 0, maze.height);
    maze.line(maze.width, 0, maze.width, maze.height);
    maze.line(0, maze.height, maze.width, maze.height);
    

    maze.strokeWeight(5);
    maze.strokeCap(PROJECT);
    let mazCell = [];

    let cellw = maze.width/mazeSize;
    let cellh = maze.height/mazeSize;
    for(let j=0; j< mazeSize; j++){
      mazCell[j] = [];
      for(let i=0; i<mazeSize; i++){
        mazCell[j][i]=new Cell();
      }
    }
  
    // 1. create first row
    mazCell[0][0].room = cls;
    for (let i=1; i<mazeSize; i++) {
      if(Math.random()*10 < 3) cls++;
      mazCell[0][i].room = cls;
      if(mazCell[0][i-1].room != mazCell[0][i].room){
        mazCell[0][i-1].left = false;
        mazCell[0][i].right = false;
      } else {
        mazCell[0][i-1].right = true;
        mazCell[0][i].left = true;
      }
    }
  
    // 2. create rest of the rows
    for(let j=0; j<mazeSize-1; j++){
      // horizontal line
      clsopen = false;
      for(i=0; i<mazeSize-1; i++){
        if(i==0){
          if(Math.random()*10<5){
            //open or not
            clsopen = true;
            mazCell[j][i].down = true;
            mazCell[j+1][i].up = true;
          }
        }
        else if (mazCell[j][i-1].down == false){
          // open or not
          if(Math.random()*10<5){
            //open or not
            clsopen = true;
            mazCell[j][i].down = true;
            mazCell[j+1][i].up = true;
            // keep row[i];
          } 
        }
  
        if(mazCell[j][i].room != mazCell[j][i+1].room){
          if(clsopen == false){
            // open
            mazCell[j][i].down = true;
            mazCell[j+1][i].up = true;
          }
          clsopen = false;
        }
  
      }
  
      if(mazCell[j][i-1].room != mazCell[j][i].room || (mazCell[j][i-1].room == mazCell[j][i].room && clsopen == false)){
        mazCell[j][i].down = true;
        mazCell[j+1][i].up = true;
      }
  
      // copy room
      for(i=0; i<mazeSize; i++){
        if(mazCell[j][i].down == true){
          mazCell[j+1][i].room = mazCell[j][i].room;
        } else {
          cls++;
          mazCell[j+1][i].room = cls;
        }
      }
      // vertical line j+1
      for(i=0; i<mazeSize-1; i++){
        if(mazCell[j+1][i].room == mazCell[j+1][i+1].room) {
          mazCell[j+1][i].left = false;
          mazCell[j+1][i+1].right = false;
        } else {
          if(Math.random()*10<5){
            mazCell[j+1][i].right = true;
            mazCell[j+1][i+1].left = true;
            let temp = mazCell[j+1][i+1].room;
            for(let t=0; t<mazeSize; t++){
              if(temp == mazCell[j+1][t].room) mazCell[j+1][t].room = mazCell[j+1][i].room;
            }
          }
        }
      }
  
  
    }
  
    // last line
    cls = mazCell[mazeSize-1][0].room;
    for(i=1; i<mazeSize; i++){
      if(mazCell[mazeSize-1][i].room != cls){
        mazCell[mazeSize-1][i].left = true;
        mazCell[mazeSize-1][i-1].right = true;
        temp = mazCell[mazeSize-1][i].room;
        for(t=1; t<mazeSize; t++){
          if(mazCell[mazeSize-1][t].room == temp) mazCell[mazeSize-1][t].room = cls;
        }
      } 
    }
  
    // test print
    for(j=0; j<mazeSize; j++){
      for(i=0; i<mazeSize; i++){
        if(mazCell[j][i].right == false){
          maze.line(cellw*(i+1), cellh*j,cellw*(i+1), cellh*(j+1));
        }
        if(mazCell[j][i].down == false){
          maze.line(cellw*(i), cellh*(j+1),cellw*(i+1), cellh*(j+1));
        }
      }
  
    }
  
    return mazCell;
  
  }

  function findPath(mazCell, size){
    let path = [];
    let stack = [];
    let y, x;
    let curpos =0;    
    // curpos = 27;
    stack.push(curpos);

    while(stack.length != 0){
//        curpos = stack.pop();

        path.push(curpos);
        x = curpos%size;
        y = parseInt(curpos/size);

        mazCell[y][x].visited = true;   
        
        if(mazCell[y][x].down == true && curpos+size < size**2 && mazCell[y+1][x].visited == false){
            stack.push(curpos);
            curpos = curpos + (size);
        }
        else if (mazCell[y][x].up == true && curpos-size >=0 && mazCell[y-1][x].visited == false){
            stack.push(curpos);
            curpos = curpos - (size);
        }
        else if (mazCell[y][x].right == true && curpos+1 < size**2 && mazCell[y][x+1].visited == false){
            stack.push(curpos);
            curpos = curpos+1;
        }
        else if ( x-1 >=0 && (mazCell[y][x].left == true || mazCell[y][x-1].right == true) && curpos-1 >=0 && mazCell[y][x-1].visited == false){
            stack.push(curpos);
            curpos = curpos-1;
        }
        // else if ( mazCell[y][x].left == true && curpos-1 >=0 && mazCell[y][x-1].visited == false){
        //     stack.push(curpos);
        //     curpos = curpos-1;
        // }
         else {
            curpos = stack.pop();
        }
    }
    
    // find path first
    // map the path to time

    return path;

  }

  function drawPath(canvas, path, cellw, cellh, size){
      
    var i=0;
    var px, py, qx, qy;

    canvas.stroke(0,0,255);
    canvas.strokeWeight(5);

    while(i < path.length-1){
        px = path[i]%size;
        py = parseInt(path[i]/size);
        qx = path[i+1]%size;
        qy = parseInt(path[i+1]/size);
//        console.log("("+py+","+px+") to ("+qy+","+qx+")");
        canvas.line(px*cellw+cellw/2, py*cellw+cellw/2, qx*cellw+cellw/2, qy*cellw+cellw/2);
        i++;
    }
  }

  function getPathLine(maze, size){

    var i, j;
    let stack = [];
    let pathH = [];
    let pathV = [];
    // search horizontal points
    for(j=0; j<size; j++){
      stack = [];
      i=0;

      while(i<size-1){
        if(maze[j][i].right == true || maze[j][i+1].left == true){
          stack.push(j*size+i);
        }
        else if(stack.length > 0){
          stack.push(j*size+i);
          pathH.push(stack);
          stack = [];
        }
        i++;
      }
      if(stack.length>0){
        stack.push(j*size+i);
        pathH.push(stack);
      }
    }

    // search vertical points
    for(j=0; j<size; j++){
      stack = [];
      i=0;

      while(i<size-1){
        if(maze[i][j].down == true || maze[i+1][j].up == true){
          stack.push(i*size+j);
        }
        else if(stack.length > 0){
          stack.push(i*size+j);
          pathV.push(stack);
          stack = [];
        }
        i++;
      }
      if(stack.length>0){
        stack.push(i*size+j);
        pathV.push(stack);
      }
    }
  

    return {'H' : pathH, 'V' :pathV};
  }


  function matchPath(path, pathLine){

    // match the path with pathLine,
    // allocate position for each pool
    var startpos =0;
    var endpos =0;

    

  }