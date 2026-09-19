const questions = [
  {category:"Numerical reasoning", q:"What number comes next? 3, 6, 12, 24, ?", a:["36","42","48","54"], c:2},
  {category:"Mental arithmetic", q:"A flight covers 360 km in 45 minutes. What is the average speed?", a:["360 km/h","420 km/h","480 km/h","540 km/h"], c:2},
  {category:"Numerical reasoning", q:"What number is missing? 81, 27, 9, 3, ?", a:["0","1","2","6"], c:1},
  {category:"Logic", q:"All pilots are trained. Alex is a pilot. What must be true?", a:["Alex is trained","Alex is an instructor","Alex flies jets","Alex works for an airline"], c:0},
  {category:"Mental arithmetic", q:"What is 15% of 200?", a:["15","20","30","35"], c:2},
  {category:"Numerical reasoning", q:"What number comes next? 2, 5, 10, 17, 26, ?", a:["35","36","37","38"], c:2},
  {category:"Logic", q:"If A is taller than B and B is taller than C, who is shortest?", a:["A","B","C","Cannot tell"], c:2},
  {category:"Mental arithmetic", q:"An aircraft uses 240 L of fuel in 3 hours. At the same rate, how much in 5 hours?", a:["300 L","360 L","400 L","420 L"], c:2},
  {category:"Numerical reasoning", q:"Find the odd one out: 16, 25, 36, 48, 49", a:["16","36","48","49"], c:2},
  {category:"Logic", q:"A clock shows 3:00. What is the angle between the hands?", a:["60°","90°","120°","180°"], c:1}
];

let current = 0;
let score = 0;
let answered = false;

const qEl = document.getElementById("question");
const answersEl = document.getElementById("answers");
const categoryEl = document.getElementById("category");
const progressEl = document.getElementById("progress");
const barEl = document.getElementById("bar");
const nextBtn = document.getElementById("next");
const feedbackEl = document.getElementById("feedback");

function render() {
  const item = questions[current];
  answered = false;
  categoryEl.textContent = item.category;
  qEl.textContent = item.q;
  progressEl.textContent = `${current + 1} / ${questions.length}`;
  barEl.style.width = `${((current + 1) / questions.length) * 100}%`;
  answersEl.innerHTML = "";
  feedbackEl.textContent = "";
  nextBtn.disabled = true;

  item.a.forEach((answer, i) => {
    const button = document.createElement("button");
    button.className = "answer";
    button.textContent = answer;
    button.onclick = () => choose(i, button);
    answersEl.appendChild(button);
  });
}

function choose(index, button) {
  if (answered) return;
  answered = true;
  const item = questions[current];
  const buttons = [...document.querySelectorAll(".answer")];
  buttons.forEach(b => b.disabled = true);

  if (index === item.c) {
    score++;
    button.classList.add("correct");
    feedbackEl.textContent = "Correct ✓";
  } else {
    button.classList.add("wrong");
    buttons[item.c].classList.add("correct");
    feedbackEl.textContent = "Not quite — the correct answer is highlighted.";
  }
  nextBtn.disabled = false;
}

nextBtn.onclick = () => {
  if (current < questions.length - 1) {
    current++;
    render();
  } else {
    document.getElementById("app").classList.add("hidden");
    document.getElementById("result").classList.remove("hidden");
    document.getElementById("finalScore").textContent = `${score} / ${questions.length}`;
    document.getElementById("message").textContent =
      score >= 8 ? "Excellent result. Keep practicing!" :
      score >= 6 ? "Good result. A little more practice will help." :
      "Keep practicing — you can improve with repetition!";
  }
};

render();
