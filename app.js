const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
// getContext() : 會回傳一個canvas的drawing context，drawing context可以用來在canvas內畫圖
const unit = 20;
const rows = canvas.height / unit;
const columns = canvas.width / unit;

function createSnake() {
  // 製作貪食蛇身體
  snake = [];
  snake[0] = {
    x: 80,
    y: 0,
  };
  snake[1] = {
    x: 60,
    y: 0,
  };
  snake[2] = {
    x: 40,
    y: 0,
  };
  snake[3] = {
    x: 20,
    y: 0,
  };
}

class Fruit {
  constructor() {
    this.x = Math.floor(Math.random() * columns) * unit;
    this.y = Math.floor(Math.random() * rows) * unit;
  }

  drawFruit() {
    // ctx.lineWidth = 2;
    ctx.fillStyle = "yellow";
    // ctx.strokeStyle = "burlywood";
    ctx.fillRect(this.x, this.y, unit, unit);
    // ctx.strokeRect(this.x, this.y, unit, unit);
  }

  checkOverlap(newX, newY) {
    for (let i = 0; i < snake.length; i++) {
      if (snake[i].x == newX && snake[i].y == newY) {
        overlap = true;
        newX = Math.floor(Math.random() * columns) * unit;
        newY = Math.floor(Math.random() * rows) * unit;
      } else {
        overlap = false;
      }
    }
    return overlap;
  }

  pickNewLocation() {
    let overlap = false;
    let newX;
    let newY;
    // 確認新的果實位置是否與snake身體重疊
    function checkOverlap(newX, newY) {
      for (let i = 0; i < snake.length; i++) {
        if (newX == snake[i].x && newY == snake[i].y) {
          console.log("overlapping!!");
          overlap = true;
          return;
        } else {
          overlap = false;
        }
      }
    }

    do {
      newX = Math.floor(Math.random() * columns) * unit;
      newY = Math.floor(Math.random() * rows) * unit;
      console.log("果實新座標 = " + newX + ", " + newY);
      checkOverlap(newX, newY);
    } while (overlap);
    this.x = newX;
    this.y = newY;
  }
}
// <-------遊戲初始化---->
// 製作Snake
createSnake();
// 製作果實物件
let fruit = new Fruit();
window.addEventListener("keydown", changeDirection);
let direction = "Right";
let score = 0;
let highestScore;
getHighestScore();
document.getElementById("myScore").innerHTML = "遊戲分數:" + score;
document.getElementById("myScore2").innerHTML = "歷史最高分數:" + highestScore;

function changeDirection(e) {
  if (e.key == "ArrowRight" && direction != "Left") {
    direction = "Right";
  } else if (e.key == "ArrowUp" && direction != "Down") {
    direction = "Up";
  } else if (e.key == "ArrowLeft" && direction != "Right") {
    direction = "Left";
  } else if (e.key == "ArrowDown" && direction != "Up") {
    direction = "Down";
  }
  //關閉addEventListener監聽事件，防止快速draw執行間隔可以變換方向
  window.removeEventListener("keydown", changeDirection);
}

function draw() {
  // 確認蛇頭是否觸碰到自己的身體
  for (let i = 1; i < snake.length; i++) {
    if (snake[0].x == snake[i].x && snake[0].y == snake[i].y) {
      clearInterval(myGame);
      alert("遊戲結束!!!");
    }
  }

  //初始化畫布
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  fruit.drawFruit();
  //畫貪食蛇
  for (let i = 0; i < snake.length; i++) {
    if (i == 0) {
      ctx.fillStyle = "lightgreen";
    } else {
      ctx.fillStyle = "lightblue";
    }
    ctx.lineWidth = 2;
    ctx.strokeStyle = "white";
    // 設定蛇穿牆功能
    if (snake[i].x >= canvas.width) {
      snake[i].x = 0;
    }
    if (snake[i].x < 0) {
      snake[i].x = canvas.width - unit;
    }
    if (snake[i].y >= canvas.height) {
      snake[i].y = 0;
    }
    if (snake[i].y < 0) {
      snake[i].y = canvas.height - unit;
    }

    // x, y , width, height
    ctx.fillRect(snake[i].x, snake[i].y, unit, unit);
    ctx.strokeRect(snake[i].x, snake[i].y, unit, unit);
  }

  //以direction方向來決定下一幀座標
  let newX = snake[0].x;
  let newY = snake[0].y;
  if (direction == "Right") {
    newX += unit;
  } else if (direction == "Down") {
    newY += +unit;
  } else if (direction == "Up") {
    newY -= unit;
  } else if (direction == "Left") {
    newX -= unit;
  }
  let newHead = {
    x: newX,
    y: newY,
  };
  // 如果吃到果實不執行pop()
  if (snake[0].x == fruit.x && snake[0].y == fruit.y) {
    // 1.random更新果實位置
    fruit.pickNewLocation();
    // fruit.drawFruit();
    // 2.計算分數
    score++;
    UpdateHighestSocre(score);
    document.getElementById("myScore").innerHTML = "遊戲分數:" + score;
    document.getElementById("myScore2").innerHTML =
      "歷史最高分數:" + highestScore;
  } else {
    snake.pop();
  }
  //沒有吃到果實就unshift(newHead) + pop()
  snake.unshift(newHead);
  window.addEventListener("keydown", changeDirection);
}

let myGame = setInterval(draw, 100);

function getHighestScore() {
  let stored_hScore = localStorage.getItem("highestScore");
  if (stored_hScore == null) {
    highestScore = 0;
  } else {
    highestScore = Number(stored_hScore);
  }
}

function UpdateHighestSocre(score) {
  if (score > highestScore) {
    localStorage.setItem("highestScore", score);
    highestScore = score;
    // console.log("1111");
  }
}
