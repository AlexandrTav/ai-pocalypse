// boss.js
import { bossTasks } from "./tasks.js";

let currentTask = null;
let currentTest = null;

export function showTask(task, test) {
  currentTask = task;
  currentTest = test;

  //console.log("BOSS UI RECEIVED TEST", currentTest.input, currentTest.expected);
   
  document.getElementById("bossTitle").textContent = task.title;
  document.getElementById("bossDescription").textContent = task.description;
  document.getElementById("bossInput").textContent = test.input;
  document.getElementById("bossOutput").value = "";
  document.getElementById("bossFeedback").textContent = "";

  document.getElementById("bossModal").classList.remove("hidden");
}

let onTaskFail = null;
let onTaskSolved = null;

export function setBossCallbacks({ fail, solved }) {
  onTaskFail = fail;
  onTaskSolved = solved;
}

// Submit handler
document.getElementById("bossSubmit").onclick = () => {
  const answer = document.getElementById("bossOutput").value.trim();
  const expected = currentTest.expected.trim();

  if (answer === expected) {
    document.getElementById("bossModal").classList.add("hidden");

    if (onTaskSolved) onTaskSolved();
  } else {
    if (onTaskFail) onTaskFail();
  }
};

export function updateBossHearts(hearts) {
  const container = document.getElementById("bossHearts");
  container.innerHTML = "";

  for (let i = 0; i < hearts; i++) {
    const heart = document.createElement("span");
    heart.textContent = "❤️";
    heart.classList.add("boss-heart");
    container.appendChild(heart);
  }
}

export function updateBossTaskCounter(current, total) {
  const el = document.getElementById("bossTaskCounter");
  el.textContent = `PRIORITY OBJECTIVE ${current}/${total}`;
}