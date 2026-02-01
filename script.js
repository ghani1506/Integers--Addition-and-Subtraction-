const SHEET_URL = https://script.google.com/u/0/home/projects/1xwC4NHiJQ4BjTM2n5sA3WLhJdgq-bTi8OEXnbD-EJsKg86NiTfNJvoN0/edit;

const questions = [
  { q: "7 + (-12)", a: -5 },
  { q: "-9 + (-6)", a: -15 },
  { q: "15 - (-8)", a: 23 },
  { q: "-14 - 5", a: -19 },
  { q: "-3 + 19", a: 16 },
  { q: "22 - 9", a: 13 },
  { q: "-20 + 13", a: -7 },
  { q: "6 - 17", a: -11 },
  { q: "-11 - (-4)", a: -7 },
  { q: "18 + (-7)", a: 11 }
];

let current = 0;
let score = 0;
let answers = [];
let student = {};

function startQuiz() {
  student.name = document.getElementById("name").value;
  student.school = document.getElementById("school").value;
  student.class = document.getElementById("class").value;

  if (!student.name || !student.school || !student.class) {
    alert("Please fill in all details");
    return;
  }

  document.getElementById("student-section").classList.add("hidden");
  document.getElementById("quiz-section").classList.remove("hidden");
  loadQuestion();
}

function loadQuestion() {
  document.getElementById("question-number").innerText =
    `Question ${current + 1} of 10`;
  document.getElementById("question-text").innerText =
    questions[current].q;
  document.getElementById("answer").value = "";
}

function nextQuestion() {
  const userAnswer = Number(document.getElementById("answer").value);
  answers.push(userAnswer);

  if (userAnswer === questions[current].a) score++;
  current++;

  if (current < questions.length) {
    loadQuestion();
  } else {
    finishQuiz();
  }
}

function finishQuiz() {
  document.getElementById("quiz-section").classList.add("hidden");
  document.getElementById("result-section").classList.remove("hidden");

  document.getElementById("score").innerText =
    `Score: ${score} / 10`;

  sendToSheet();
}

function sendToSheet() {
  if (SHEET_URL.includes("PASTE")) {
    document.getElementById("status").innerText =
      "⚠ Result not saved (Sheet not connected)";
    return;
  }

  fetch(SHEET_URL, {
    method: "POST",
    mode: "no-cors",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: student.name,
      school: student.school,
      class: student.class,
      score: score,
      answers: answers,
      timestamp: new Date().toISOString()
    })
  });

  document.getElementById("status").innerText =
    "✅ Result saved successfully";
}
