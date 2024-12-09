const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
// getContext() : 會回傳一個canvas的drawing context，drawing context可以用來在canvas內畫圖
const unit = 20;
const rows = canvas.height / unit;
const columns = canvas.width / unit;

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

window.addEventListener("keydown", changeDirection);
let direction = "Right";
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
}

function draw() {
  //初始化畫布
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
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
  //沒有吃到果實就unshift(newHead) + pop()
  snake.pop();
  snake.unshift(newHead);
  //   snake.pop();
}

setInterval(draw, 100);
