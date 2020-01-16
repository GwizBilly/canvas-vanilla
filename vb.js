// setup canvas
var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');
var bod = document.querySelector('body');
var width = canvas.width = window.innerWidth;
var height = canvas.height = window.innerHeight;
let $ = {
  "r": function (min, max) {
    let n;
    let raw = Math.random() * (max - min);
    n = Math.floor(raw) + min;
    return n;
  },
  "balls": {
    "count": 0,
    "B":[]
  },
  "newBall": function (){
    let nb = this.ball();
    this.balls.B[this.balls.count] = nb;
    this.balls.count += 1;
    return true;
    //make a ball
    //push ball into balls.B[]
  },
  "ball": function () {
    let ID    = this.count,
        size  = this.r(10, 20),
        xc    = this.r(0 + size, width - size),
        yc    = this.r(0 + size, height - size),
        velx  = this.r(-7, 7),
        vely  = this.r(-7, 7),
        color = 'rgb(' + this.r(0,255) + ',' 
				               + this.r(0,255) + ','
											 + this.r(0,255) + ')';
     let b = {
       "id": ID,
       "s" : size,
       "x" : xc,
       "y" : yc,
       "vx": velx,
       "vy": vely,
       "c" : color
     }
     return b;
    //return initialized object {x,y,vx,vy,c,s}
  },
  "draw": function (_ball) {
    ctx.beginPath();
    ctx.fillStyle = _ball.c;
    ctx.arc(
      _ball.x, 
      _ball.y, 
      _ball.s, 
      0, 
      2 * Math.PI
    );
    ctx.fill();
    // draw to canvas using ball object
  },
  "update": function (_ball) {
    // update ball object
    if((_ball.x + _ball.size) >= width) {
      this.balls.B[_ball.id][vx] = -(_ball.velX);
    }
    if((_ball.x - _ball.size) <= 0) {
      _ball.velX = -(_ball.velX);
    }
    if((_ball.y + _ball.size) >= height) {
      _ball.velY = -(_ball.velY);
    }
    if((_ball.y - _ball.size) <= 0) {
      _ball.velY = -(_ball.velY);
    }
    _ball.x += _ball.velX;
    _ball.y += _ball.velY;
    // probably want to return the updated ball... but also have stored it.
  },
  "collisionDetect": function (_ball) {
    for(var j = 0; j < balls.length; j++) {
      if(!(_ball === balls[j])) {
        var dx = _ball.x - balls[j].x;
        var dy = _ball.y - balls[j].y;
        var distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < _ball.size + balls[j].size) {
          balls[j].color = _ball.color = 'rgb(' + random(0,255) + ',' + random(0,255) + ',' + random(0,255) +')';
        }
      }
    }
  },
  "init": function (_howManyBalls) {
    // call new ball for _howManyBalls
    // keep adding balls
    for (let i = 0; i < _howManyBalls;) {
      $.newBall();
    }
    console.log("You wanted this many balls");
  }
}
// How many balls do we want?
$.init(25);
function repeat() {
  requestAnimationFrame(repeat);
}
repeat();
// function to generate random number
function random(min,max) {
  var num = Math.floor(Math.random()*(max-min)) + min;
  return num;
}
// define Ball constructor
function Ball(x, y, velX, velY, color, size) {
  this.x = x;
  this.y = y;
  this.velX = velX;
  this.velY = velY;
  this.color = color;
  this.size = size;
}
// define ball draw method
Ball.prototype.draw = function() {
  ctx.beginPath();
  ctx.fillStyle = this.color;
  ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
  ctx.fill();
}
// define ball update method
Ball.prototype.update = function() {
  if((this.x + this.size) >= width) {
    this.velX = -(this.velX);
  }
  if((this.x - this.size) <= 0) {
    this.velX = -(this.velX);
  }
  if((this.y + this.size) >= height) {
    this.velY = -(this.velY);
  }
  if((this.y - this.size) <= 0) {
    this.velY = -(this.velY);
  }
  this.x += this.velX;
  this.y += this.velY;
}
// define ball collision detection
Ball.prototype.collisionDetect = function() {
  for(var j = 0; j < balls.length; j++) {
    if(!(this === balls[j])) {
      var dx = this.x - balls[j].x;
      var dy = this.y - balls[j].y;
      var distance = Math.sqrt(dx * dx + dy * dy);
      if (distance < this.size + balls[j].size) {
        balls[j].color = this.color = 'rgb(' + random(0,255) + ',' + random(0,255) + ',' + random(0,255) +')';
      }
    }
  }
}
/*
// define array to store balls
var balls = [];
// define loop that keeps drawing the scene constantly
function loop() {
  ctx.fillStyle = "Blue";
  ctx.fillRect(0,0,width,height);
  while(balls.length < 25) {
    var size = random(10,20);
    var x = random(0 + size, width - size);
    var y = random(0 + size, height - size);
    var vx = random(-7,7);
    var vy = random(-7,7);
    var rgb = 'rgb(' + random(0,255) + 
                 ',' + random(0,255) + 
                 ',' + random(0,255) + ')';
    // ball position always drawn at least one ball width
    // away from the edge of the canvas, to avoid drawing errors
    var ball = new Ball(x, y, vx, vy, rgb, size);
    balls.push(ball);
  }
  for(var i = 0; i < balls.length; i++) {
    balls[i].draw();
    balls[i].update();
    balls[i].collisionDetect();
  }
  requestAnimationFrame(loop);
}
loop();
*/
