let circles = [];
let introImage; // 用於儲存圖片
let showIntro = false; // 控制是否顯示自我介紹內容
let showPortfolio = false; // 控制是否顯示作品集內容
let showTutorial = false; // 控制是否顯示教學影片
let iframeDiv; // 用於儲存 iframe 的容器
let portfolioDiv; // 用於儲存作品集選單
let quizDiv; // 用於儲存測驗區域
let currentQuestion; // 當前的數學題目
let correctAnswer; // 正確答案

function preload() {
  // 載入圖片（請將圖片檔案放在專案資料夾中，並確保檔名正確）
  introImage = loadImage('哈囉大家好.jpg'); // 替換為你的圖片檔名
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  // 建立選單按鈕
  let menu = createDiv();
  menu.style('position', 'absolute');
  menu.style('top', '10px');
  menu.style('right', '10px');
  menu.style('background-color', '#ffffff');
  menu.style('padding', '10px');
  menu.style('border', '1px solid #ccc');
  menu.style('border-radius', '5px');

  let homeButton = createButton('首頁');
  homeButton.parent(menu);
  homeButton.mousePressed(() => {
    showIntro = false; // 隱藏自我介紹內容
    showPortfolio = false; // 隱藏作品集內容
    showTutorial = false; // 隱藏教學影片
    if (iframeDiv) iframeDiv.remove(); // 移除 iframe
    if (portfolioDiv) portfolioDiv.remove(); // 移除作品集選單
    if (quizDiv) quizDiv.remove(); // 移除測驗區域
    loop(); // 重新啟動 draw()，以顯示原本的頁面
  });

  let introButton = createButton('自我介紹');
  introButton.parent(menu);
  introButton.mousePressed(() => {
    showIntro = true; // 顯示自我介紹內容
    showPortfolio = false; // 隱藏作品集內容
    showTutorial = false; // 隱藏教學影片
    if (iframeDiv) iframeDiv.remove(); // 移除 iframe
    if (portfolioDiv) portfolioDiv.remove(); // 移除作品集選單
    if (quizDiv) quizDiv.remove(); // 移除測驗區域
    showIntroContent(); // 顯示自我介紹內容
  });

  let portfolioButton = createButton('作品集');
  portfolioButton.parent(menu);
  portfolioButton.mousePressed(() => {
    showPortfolio = true; // 顯示作品集內容
    showIntro = false; // 隱藏自我介紹內容
    showTutorial = false; // 隱藏教學影片
    if (iframeDiv) iframeDiv.remove(); // 移除 iframe
    if (portfolioDiv) portfolioDiv.remove(); // 確保不重複創建作品集選單
    showPortfolioMenu(); // 顯示作品集選單
  });

  let quizButton = createButton('測驗卷');
  quizButton.parent(menu);
  quizButton.mousePressed(() => {
    showQuiz(); // 顯示測驗卷
  });

  let tutorialButton = createButton('教學影片');
  tutorialButton.parent(menu);
  tutorialButton.mousePressed(() => {
    showTutorial = true; // 顯示教學影片
    showIntro = false; // 隱藏自我介紹內容
    showPortfolio = false; // 隱藏作品集內容
    if (iframeDiv) iframeDiv.remove(); // 移除 iframe
    if (portfolioDiv) portfolioDiv.remove(); // 移除作品集選單
    showTutorialVideo(); // 顯示教學影片
  });

  // 隨機生成圓圈
  let numCircles = int(random(50, 101));
  for (let i = 0; i < numCircles; i++) {
    circles.push({
      x: random(width),
      y: random(height),
      color: color(random(255), random(255), random(255)),
      size: random(10, 30),
      speedX: random(-2, 2),
      speedY: random(-2, 2)
    });
  }
}

function draw() {
  background(220);

  for (let circle of circles) {
    // 動態更新圓圈位置
    circle.x += circle.speedX;
    circle.y += circle.speedY;

    // 碰到邊界反彈
    if (circle.x < 0 || circle.x > width) circle.speedX *= -1;
    if (circle.y < 0 || circle.y > height) circle.speedY *= -1;

    // 根據滑鼠位置改變大小和顏色
    let distance = dist(mouseX, mouseY, circle.x, circle.y);
    let newSize = map(distance, 0, width, 50, 5);
    let newColor = color(
      map(mouseX, 0, width, 0, 255),
      map(mouseY, 0, height, 0, 255),
      random(255)
    );

    fill(newColor);
    noStroke();
    ellipse(circle.x, circle.y, newSize, newSize);
  }
}

function showIntroContent() {
  if (iframeDiv) iframeDiv.remove(); // 如果已有 iframe，先移除

  iframeDiv = createDiv();
  iframeDiv.style('position', 'absolute');
  iframeDiv.style('top', '50%');
  iframeDiv.style('left', '50%');
  iframeDiv.style('transform', 'translate(-50%, -50%)');
  iframeDiv.style('background-color', '#f9f9f9');
  iframeDiv.style('padding', '20px');
  iframeDiv.style('border', '1px solid #ccc');
  iframeDiv.style('border-radius', '5px');
  iframeDiv.style('text-align', 'center');
  iframeDiv.html('<iframe src="https://yt1n9.github.io/1/" width="800" height="450" frameborder="0" allowfullscreen></iframe>');
}

function showPortfolioMenu() {
  portfolioDiv = createDiv();
  portfolioDiv.style('position', 'absolute');
  portfolioDiv.style('top', '50%');
  portfolioDiv.style('left', '50%');
  portfolioDiv.style('transform', 'translate(-50%, -50%)');
  portfolioDiv.style('background-color', '#f9f9f9');
  portfolioDiv.style('padding', '20px');
  portfolioDiv.style('border', '1px solid #ccc');
  portfolioDiv.style('border-radius', '5px');
  portfolioDiv.style('text-align', 'center');

  let week1Button = createButton('第一周');
  week1Button.parent(portfolioDiv);
  week1Button.mousePressed(() => {
    if (iframeDiv) iframeDiv.remove(); // 移除之前的 iframe
    iframeDiv = createDiv();
    iframeDiv.position(width / 2 - 400, height / 2 - 300);
    iframeDiv.size(800, 600);
    iframeDiv.html('<iframe src="https://yt1n9.github.io/241226/" width="100%" height="100%" frameborder="0"></iframe>');
    noLoop(); // 停止 draw()，避免重複繪製
  });

  let week2Button = createButton('第二周');
  week2Button.parent(portfolioDiv);
  week2Button.mousePressed(() => {
    if (iframeDiv) iframeDiv.remove(); // 移除之前的 iframe
    iframeDiv = createDiv();
    iframeDiv.position(width / 2 - 400, height / 2 - 300);
    iframeDiv.size(800, 600);
    iframeDiv.html('<iframe src="https://yt1n9.github.io/04188/" width="100%" height="100%" frameborder="0"></iframe>');
    noLoop(); // 停止 draw()，避免重複繪製
  });

  let week3Button = createButton('第三周');
  week3Button.parent(portfolioDiv);
  week3Button.mousePressed(() => {
    if (iframeDiv) iframeDiv.remove(); // 移除之前的 iframe
    iframeDiv = createDiv();
    iframeDiv.position(width / 2 - 400, height / 2 - 300);
    iframeDiv.size(800, 600);
    iframeDiv.html('<iframe src="https://yt1n9.github.io/041888/" width="100%" height="100%" frameborder="0"></iframe>');
    noLoop(); // 停止 draw()，避免重複繪製
  });
}

function showQuiz() {
  if (quizDiv) quizDiv.remove(); // 如果已有測驗區域，先移除

  quizDiv = createDiv();
  quizDiv.style('position', 'absolute');
  quizDiv.style('top', '50%');
  quizDiv.style('left', '50%');
  quizDiv.style('transform', 'translate(-50%, -50%)');
  quizDiv.style('background-color', '#f9f9f9');
  quizDiv.style('padding', '20px');
  quizDiv.style('border', '1px solid #ccc');
  quizDiv.style('border-radius', '5px');
  quizDiv.style('text-align', 'center');

  // 生成數學題目
  let num1 = int(random(10, 100)); // 兩位數
  let num2 = int(random(10, 100)); // 兩位數
  currentQuestion = `${num1} × ${num2}`;
  correctAnswer = num1 * num2;

  let questionP = createP(`題目：${currentQuestion}`);
  questionP.parent(quizDiv);

  let input = createInput();
  input.attribute('type', 'number');
  input.style('margin', '10px 0');
  input.parent(quizDiv);

  let submitButton = createButton('提交答案');
  submitButton.parent(quizDiv);
  submitButton.mousePressed(() => {
    let userAnswer = int(input.value());
    if (userAnswer === correctAnswer) {
      questionP.html('答對了！下一題：');
      input.value(''); // 清空輸入框
      showQuiz(); // 顯示下一題
    } else {
      questionP.html('答錯了！請再試一次：');
      input.value(''); // 清空輸入框
    }
  });
}

function showTutorialVideo() {
  if (iframeDiv) iframeDiv.remove(); // 如果已有 iframe，先移除

  iframeDiv = createDiv();
  iframeDiv.style('position', 'absolute');
  iframeDiv.style('top', '50%');
  iframeDiv.style('left', '50%');
  iframeDiv.style('transform', 'translate(-50%, -50%)');
  iframeDiv.style('background-color', '#f9f9f9');
  iframeDiv.style('padding', '20px');
  iframeDiv.style('border', '1px solid #ccc');
  iframeDiv.style('border-radius', '5px');
  iframeDiv.style('text-align', 'center');
  iframeDiv.html('<iframe src="https://cfchen58.synology.me/%E7%A8%8B%E5%BC%8F%E8%A8%AD%E8%A8%882024/A2/week8/20250411_111745.mp4" width="800" height="450" frameborder="0" allowfullscreen></iframe>');
}
