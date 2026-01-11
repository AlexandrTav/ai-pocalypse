// game.js
import kaboom from "https://unpkg.com/kaboom/dist/kaboom.mjs";
import { bossTasks } from "./tasks.js";
import { badges } from "./badges.js";
import { showTask, setBossCallbacks, updateBossHearts, updateBossTaskCounter } from "./boss.js";

const DEFAULT_ROBOTS = 10;
const DEFAULT_COINS = 0;
const DEFAULT_HEARTS = 5;
const levelRobotTargets = [
  10, // Level 1
  15, // Level 2
  20, // Level 3
  23, // Level 4
  30, // Level 5
  35, // Level 6
  40, // Level 7
  45, // Level 8
  50, // Level 9
  55, // Level 10
];

setBossCallbacks({
  solved: () => {
    saveState.currentBossTaskId = null;
    saveState.currentBossTestIndex = null;
    saveState.tasksSolvedThisBoss++;
    saveGame();
    showNextTaskOrWin();
  },
  fail: () => {
    hearts--;
    refreshHUD();
    saveGame();

    updateBossHearts(hearts);
    updateBossTaskCounter(saveState.tasksSolvedThisBoss + 1, 3);

    const heartsContainer = document.getElementById("bossHearts");

    // Trigger shake animation
    heartsContainer.classList.remove("shake"); // reset if still there
    void heartsContainer.offsetWidth;          // force reflow so animation can re-run
    heartsContainer.classList.add("shake");

    if (hearts <= 0) {
      offerBuyHearts();
      return;
    }

    // Re-show the SAME task and SAME test
    const task = bossTasks[saveState.currentBossTaskId];
    const test = task.tests[saveState.currentBossTestIndex];
    showTask(task, test);
  }
});

// BADGES
const stats = {
  bossesBeaten: 0,
  jumps: 0,
  endlessUnlocked: false,
  totalCoins: 0,
  coinsSpent: 0,
  robotsJumped: 0,
  lose: 0,
  bestEndlessScore: 0,

  endlessModeActive: false
};

function saveStats() {
  localStorage.setItem("stats", JSON.stringify(stats));
}

function loadStats() {
  const saved = localStorage.getItem("stats");
  if (!saved) return;

  const data = JSON.parse(saved);

  for (const key in data) {
    stats[key] = data[key];
  }
}

function checkBadges() {
  for (const key in badges) {
    const badge = badges[key];

    if (!badge.unlocked && badge.condition(stats)) {
      badge.unlocked = true;
      onBadgeUnlocked(badge);
    }
  }
}

function onBadgeUnlocked(badge) {
  play("badgeUnlock", { volume: 0.7 });

  const popup = document.createElement("div");
  popup.className = "badge-popup";
  popup.innerHTML = `
    <img src="assets/images/${badge.icon}.png" class="badge-popup-icon">
    <span>${badge.name}</span>
  `;

  document.body.appendChild(popup);

  setTimeout(() => popup.classList.add("show"), 10);
  setTimeout(() => popup.classList.remove("show"), 2000);
  setTimeout(() => popup.remove(), 2600);

  saveBadges();
  refreshBadgeBar();
}

function refreshBadgeBar() {
  hudBadges.innerHTML = ""; // clear old icons

  for (const key in badges) {
    const badge = badges[key];
    if (badge.unlocked) {
      const img = document.createElement("img");
      img.src = `assets/images/${badge.icon}.png`; // adjust path if needed
      img.className = "hud-badge-icon unlocked";
      img.title = badge.name;
      img.onclick = () => openBadgeMenu();
      hudBadges.appendChild(img);
    }
  }
}

function openBadgeMenu() {
  const menu = document.createElement("div");
  menu.className = "badge-menu";

  const title = document.createElement("h2");
  title.textContent = "Frontline Awards";
  menu.appendChild(title);

  const grid = document.createElement("div");
  grid.className = "badge-grid";
  menu.appendChild(grid);

  for (const key in badges) {
    const badge = badges[key];

    const card = document.createElement("div");
    card.className = "badge-card";
    if (!badge.unlocked) card.classList.add("locked");

    const img = document.createElement("img");
    img.src = `assets/images/${badge.icon}.png`;

    const name = document.createElement("div");
    name.textContent = badge.name;

    const desc = document.createElement("small");
    desc.textContent = badge.description;

    card.appendChild(img);
    card.appendChild(name);
    card.appendChild(desc);

    grid.appendChild(card);
  }

  // Close menu on click anywhere
  menu.onclick = () => menu.remove();

  document.body.appendChild(menu);
}

function saveBadges() {
  const saveData = {};

  for (const key in badges) {
    saveData[key] = {
      unlocked: badges[key].unlocked
    };
  }

  localStorage.setItem("badges", JSON.stringify(saveData));
}

function loadBadges() {
  const saved = localStorage.getItem("badges");
  if (!saved) return;

  const data = JSON.parse(saved);

  for (const key in data) {
    if (badges[key]) {
      badges[key].unlocked = data[key].unlocked;
    }
  }
}


function makeParallaxLayer(name, imgWidth, imgHeight, speed) {
  const s = Math.max(width() / imgWidth, height() / imgHeight);

  const layer1 = add([
    sprite(name),
    pos(0, 0),
    scale(s),
    fixed(),
    { speed, w: imgWidth * s },
    "bg",
  ]);

  const layer2 = add([
    sprite(name),
    pos(layer1.w, 0),
    scale(s),
    fixed(),
    { speed, w: imgWidth * s },
    "bg",
  ]);

  return [layer1, layer2];
}

function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// ---------------------------
// SAVE SYSTEM
// ---------------------------
const DEFAULT_SAVE = {
  level: 1,
  coins: DEFAULT_COINS,
  bestEndlessScore: 0,
  nextBossTaskIndex: 0,
  taskOrder: null,              // shuffled list of task indices
  taskPointer: 0,               // where we are in the shuffled list
  currentBossTaskId: null,      // which task is currently active
  currentBossTestIndex: null,   // which test of that task is active
  tasksSolvedThisBoss: 0        // progress in current boss fight
};

function loadSave() {
  try {
    const raw = localStorage.getItem("runner_save");
    if (!raw) return { ...DEFAULT_SAVE };
    return { ...DEFAULT_SAVE, ...JSON.parse(raw) };
  } catch {
    return { ...DEFAULT_SAVE };
  }
}

function saveGame() {
  localStorage.setItem("runner_save", JSON.stringify(saveState));
}

let saveState = loadSave();

if (!saveState.taskOrder) {
  saveState.taskOrder = shuffle([...Array(bossTasks.length).keys()]);
}
if (saveState.taskPointer === undefined) saveState.taskPointer = 0;
if (saveState.currentBossTaskId === undefined) saveState.currentBossTaskId = null;
if (saveState.currentBossTestIndex === undefined) saveState.currentBossTestIndex = null;
if (saveState.tasksSolvedThisBoss === undefined) saveState.tasksSolvedThisBoss = 0;

// ---------------------------
// RESET PROGRESS
// ---------------------------
function resetProgress() {
  if (confirm("Are you sure you want to reset all progress?")) {
    localStorage.removeItem("runner_save");
    localStorage.removeItem("stats");
    localStorage.removeItem("badges");
    saveState = { ...DEFAULT_SAVE };
    coinsPermanent = DEFAULT_COINS;
    hearts = DEFAULT_HEARTS;
    robotsPassed = 0;
    tasksSolvedThisBoss = 0;
    robotsTarget = DEFAULT_ROBOTS;
    refreshHUD();
    location.reload();
  }
}

// ---------------------------
// GLOBAL STATE
// ---------------------------
let hearts = DEFAULT_HEARTS;
let coinsPermanent = saveState.coins; // saved coins
let coinsRun = 0;                     // coins collected this run
let robotsPassed = 0;
let robotsTarget = DEFAULT_ROBOTS;
let tasksSolvedThisBoss = 0;
let inBossPhase = false;
let currentSpeed = 0;

// ---------------------------
// DOM ELEMENTS
// ---------------------------
const hudLevelValue = document.getElementById("hud-level-value");
// const hudHeartsValue = document.getElementById("hud-hearts-value");
const hudCoinsValue = document.getElementById("hud-coins-value");
const hudRobotsValue = document.getElementById("hud-robots-value");
const hudBadges = document.getElementById("hud-badges");
document.getElementById("hud-badges-button").onclick = openBadgeMenu;

const taskOverlay = document.getElementById("task-overlay");
const taskTitle = document.getElementById("task-title");
const taskMeta = document.getElementById("task-meta");
const taskPrompt = document.getElementById("task-prompt");
const taskAnswer = document.getElementById("task-answer");
const taskFeedback = document.getElementById("task-feedback");
const btnSubmit = document.getElementById("btn-submit");
const btnCancel = document.getElementById("btn-cancel");

document.getElementById("reset-progress").addEventListener("click", resetProgress);

function closeBuyHearts() {
  document.getElementById("heartsModal").classList.add("hidden");
  document.getElementById("bossModal").classList.remove("hidden");
}

document.getElementById("buyHeartYes").onclick = () => {
  const totalCoins = coinsPermanent + coinsRun;
  const HEART_COST = 3;

  if (totalCoins >= HEART_COST) {
    let cost = HEART_COST;

    // spend run coins first
    const spendFromRun = Math.min(cost, coinsRun);
    coinsRun -= spendFromRun;
    cost -= spendFromRun;

    // if still need, spend from permanent
    const spendFromPermanent = Math.min(cost, coinsPermanent);
    coinsPermanent -= spendFromPermanent;
    cost -= spendFromPermanent;

    saveState.coins = coinsPermanent;

    // update stats
    stats.coinsSpent += HEART_COST;
    saveStats();

    // now cost should be 0
    hearts += 1;
    refreshHUD();
    saveGame();

    document.getElementById("heartsFeedback").textContent = "✔ Heart purchased!";
    document.getElementById("heartsFeedback").style.color = "#00ff66";

    setTimeout(() => {
      document.getElementById("heartsModal").classList.add("hidden");
      closeBuyHearts(); // return to boss
    }, 800);

  } else {
    document.getElementById("heartsFeedback").textContent = "✖ Not enough coins!";
    document.getElementById("heartsFeedback").style.color = "#ff0033";
  }
};

document.getElementById("buyHeartNo").onclick = () => {
  document.getElementById("heartsModal").classList.add("hidden");
  restartLevelAfterHeartLoss();
};


// ---------------------------
// KABOOM INIT
// ---------------------------
kaboom({
  global: true,
  width: 900,
  height: 400,
  background: [0, 0, 0],
  root: document.getElementById("game-container"),
  scale: 1,
});

setGravity(1600);

// ---------------------------
// SOUNDS
// ---------------------------
loadSound("background", "assets/sounds/background.mp3");
loadSound("bgMusic", "assets/sounds/stargate_rising.mp3")
loadSound("boss", "assets/sounds/boss.mp3");
loadSound("coin", "assets/sounds/coin.mp3");
loadSound("jump", "assets/sounds/jump.mp3");
loadSound("lose", "assets/sounds/lose.mp3");
loadSound("win", "assets/sounds/win.mp3");
loadSound("badgeUnlock", "assets/sounds/badge_unlock.mp3");
loadSound("type", "assets/sounds/type.mp3");
loadSound("explosion", "assets/sounds/final_boss_explosion.mp3");

loadFont("orbitron", "assets/fonts/Orbitron-VariableFont_wght.ttf");

let bgMusic;
// ---------------------------
// SPRITES
// ---------------------------
loadSprite("logo", "assets/images/tavgames.png")
loadSprite("hero", "assets/images/hero.png", {
  sliceX: 3,
  sliceY: 1,
  anims: {
    run: {
      from: 0,
      to: 2,
      speed: 7,
      loop: true
    }
  }
});
loadSprite("robot", "assets/images/robot.png");
loadSprite("coin", "assets/images/coin.png");
loadSprite("ground", "assets/images/ground.png");
loadSprite("boss", "assets/images/boss.png");
loadSprite("bg_sky", "assets/images/bg_sky.png");
loadSprite("bg_city", "assets/images/bg_city.png");
loadSprite("bg_fire", "assets/images/bg_fire.png");

// ---------------------------
// BADGES
// ---------------------------
loadSprite("badge_boss", "assets/images/badge_boss.png");
loadSprite("badge_jump", "assets/images/badge_jump.png");
loadSprite("badge_endless", "assets/images/badge_endless.png");
loadSprite("badge_coins100", "assets/images/badge_coins100.png");
loadSprite("badge_coins200", "assets/images/badge_coins200.png");
loadSprite("badge_coins300", "assets/images/badge_coins300.png");
loadSprite("badge_spend", "assets/images/badge_spend.png");
loadSprite("badge_robots100", "assets/images/badge_robots100.png");
loadSprite("badge_robots300", "assets/images/badge_robots300.png");
loadSprite("badge_robots500", "assets/images/badge_robots500.png");
loadSprite("badge_loser50", "assets/images/badge_loser50.png");
loadSprite("badge_loser100", "assets/images/badge_loser100.png");
loadSprite("badge_loser150", "assets/images/badge_loser150.png");
loadSprite("badge_loser300", "assets/images/badge_loser300.png");

loadStats();
loadBadges();
checkBadges();
refreshBadgeBar();

// ---------------------------
// HUD UPDATE
// ---------------------------
function pop(el) {
  el.style.transform = "scale(1.3)";
  setTimeout(() => el.style.transform = "scale(1)", 150);
}

function refreshHUD() {
  if (stats.endlessModeActive) {
    hudLevelValue.textContent = `> RESISTANCE_RECORD: ${saveState.bestEndlessScore}`;
    // hudHeartsValue.textContent = "∞";
    hudCoinsValue.textContent = coinsRun;
    pop(hudCoinsValue);
    hudRobotsValue.textContent = robotsPassed;
    pop(hudRobotsValue);
  } else {
    hudLevelValue.textContent = `> SECTOR [${saveState.level}]`;
    hudCoinsValue.textContent = `${coinsPermanent} (+${coinsRun})`;
    pop(hudCoinsValue);
    hudRobotsValue.textContent = `${robotsPassed}/${robotsTarget}`;
    pop(hudRobotsValue);
  }
}

// ---------------------------
// CLEAN SCENE (Kaboom 3000)
// ---------------------------
function cleanScene() {
  for (const obj of get("enemy")) destroy(obj);
  for (const obj of get("pickup")) destroy(obj);
  for (const obj of get("boss")) destroy(obj);
  for (const obj of get("hero")) destroy(obj);
  for (const obj of get("ground")) destroy(obj);
  for (const t of get("timer")) destroy(t);
  for (const obj of get("bg")) destroy(obj);

  taskOverlay.style.display = "none";
  inBossPhase = false;
}


function typeText(kaboomTextObj, fullText, speed = 0.1) {
  kaboomTextObj.text = "";
  let index = 0;

  const loopId = loop(speed, () => {
    if (index < fullText.length) {
      kaboomTextObj.text += fullText[index];

      // Play typing sound (skip spaces & newlines)
      const ch = fullText[index];
      if (ch !== " " && ch !== "\n") {
        wait(0.01, () => {
          play("type", {
            volume: 0.25,
            pitch: rand(0.9, 1.2),   // slight variation feels more organic
          });
        });
      }

      index++;
    } else {
      loopId.cancel();
    }
  });

  return loopId;
}

// ---------------------------
// LOGO START SCENE
// ---------------------------
scene("start", () => {
  // Centered logo
  add([
    sprite("logo"),       // your logo sprite
    pos(center()),
    anchor("center"),
    scale(0.8)
  ]);

  // Instruction text
  const mainText = add([
    text("Click to Start", { size: 20 }),
    pos(center().x, center().y + 150),
    color(0, 0, 0),
    opacity(1),
    anchor("center")
  ]);

  loop(1.5, () => {
    tween(mainText.opacity, 0, 0.6, v => mainText.opacity = v);
    wait(1, () => {
      tween(mainText.opacity, 1, 0.6, v => mainText.opacity = v);
    });
  });


  // Wait for click to unlock audio
  onClick(() => {
    play("background", { volume: 0.3 });  // audio now allowed
    go("intro");                         // switch to your real game scene
  });
});


// ---------------------------
// INTRO SCENE
// ---------------------------
scene("intro", () => {
  cleanScene();

  let bgStarted = false;
  onClick(() => {
    if (!bgStarted) {
      bgStarted = true;
    }
  });

  let skipped = false;

  function skipIntro() {
    if (skipped) return;   // prevent multiple triggers
    skipped = true;

    // Clear everything on screen
    destroyAll("*");

    // Go to the game
    go("runner");
  }

  let lastClick = 0;

  onClick(() => {
    const now = time();
    if (now - lastClick < 0.3) {
      skipIntro();
    }
    lastClick = now;
  });

  // --- BACKGROUND ---
  add([
    sprite("bg_city"),
    pos(0, 0),
    scale(width() / 1536, height() / 1024),
    fixed(),
  ]);

  // --- TITLE ---
  const title = add([
    text("AI-pocalypse", {
      size: 90,
      font: "orbitron",
      width: width(),
      align: "center",
    }),
    color(255, 10, 23),
    pos(width() / 2, height() / 2),
    anchor("center"),
    opacity(0),
    fixed(),
  ]);

  // Fade in title
  wait(1.5, () => {
    if (skipped) return;
    tween(
      title.opacity,
      1,
      2.6,
      (v) => title.opacity = v,
      easings.easeOutQuad
    );
  });

  // Fade out title
  wait(5.0, () => {
    if (skipped) return;
    tween(
      title.opacity,
      0,
      1.5,
      (v) => title.opacity = v,
      easings.easeInQuad
    );
  });

  // Slide title upward
  wait(8.2, () => {
    if (skipped) return;
    tween(
      title.pos.y,
      -100,
      2,
      (v) => title.pos.y = v,
      easings.easeInOutQuad
    );
  });

  // --- GLITCHY INTRO TEXT ---
  const introText = `
> 2#0#3#6#
> H U M A N I T Y  [ERR]

AI has taken control.
Machines hunt the last survivors.

One man breaks the loop—
sends a fractured hologram
b a c k   t h r o u g h   t i m e  to hImSsseLf
- to YOU.

Rebuild the future.
Rewrite the past.
S T O P  A I  R I S E --

The war for tomorrow  
b e g i n s   t o d a y.
`;

  // Add text object (empty at first)
  const plot = add([
    text("", {
      size: 18,
      width: width() - 80,
      align: "left",
    }),
    pos(100, 55),
    opacity(0),
    fixed(),
  ]);

  // Fade in + start typing
  wait(9.0, () => {
    if (skipped) return;

    tween(
      plot.opacity,
      1,
      1.5,
      (v) => plot.opacity = v,
      easings.easeOutQuad
    );

    // Start typing effect
    const typing = typeText(plot, introText, 0.08);

    // Allow skipping typing
    onClick(() => {
      typing.cancel();
      plot.text = introText;
    });

    // After typing finishes, allow click to continue
    wait(introText.length * 0.02 + 1, () => {
      if (skipped) return;
      const startText = add([
        text("Click to Join the Resistance...", {
          size: 18,
          width: width(),
          align: "right",
        }),
        pos(width() / 2, height() - 60),
        anchor("center"),
        opacity(0),
        fixed(),
      ]);

      tween(
        startText.opacity,
        1,
        2,
        (v) => {
          if (!skipped)
            startText.opacity = v
        },
        easings.easeOutQuad
      );

      // Blink forever
      loop(1, () => {
        tween(startText.opacity, 0, 0.5, (v) => startText.opacity = v);
        wait(0.5, () => {
          tween(startText.opacity, 1, 0.5, (v) => startText.opacity = v);
        });
      });

      onClick(() => {
        go("runner");
      });
    });
  });
});

// ---------------------------
// RUNNER SCENE
// ---------------------------
scene("runner", () => {
  // debug.inspect=true;

  cleanScene();
  robotsPassed = 0;

  if (!bgMusic) {
    bgMusic = play("bgMusic", {
      volume: 0.5,
      loop: true,
    });
  }

  // --- SET ROBOT TARGET BASED ON LEVEL OR ENDLESS MODE ---
  if (stats.endlessModeActive) {
    robotsTarget = Infinity;   // no boss fight in endless mode
  } else {
    robotsTarget = levelRobotTargets[saveState.level - 1];
  }

  let timeOfDay = 0;

  // --- PARALLAX BACKGROUND (RUNNER ONLY) ---

  const sky = makeParallaxLayer("bg_sky", 1536, 1024, 0.2);
  const city = makeParallaxLayer("bg_city", 1536, 1024, 0.5);
  const fire = makeParallaxLayer("bg_fire", 1536, 1024, 1.0);

  // Parallax scrolling
  onUpdate(() => {
    for (const pair of [sky, city, fire]) {
      for (const layer of pair) {
        layer.pos.x -= layer.speed;

        // Loop the layer
        if (layer.pos.x <= -layer.w) {
          layer.pos.x += layer.w * 2;
        }
      }
    }
    // --- DAY/NIGHT CYCLE ---
    timeOfDay += dt() * 0.02;   // speed of cycle (0.02 = 50 sec full cycle)
    if (timeOfDay > 1) timeOfDay = 0;

    // Compute brightness (0 = night, 1 = day)
    const brightness = Math.sin(timeOfDay * Math.PI);

    // Night tint (darker at night)
    overlay.opacity = 0.6 * (1.3 - brightness);
  });

  // --- DAY/NIGHT OVERLAY ---
  const overlay = add([
    rect(width(), height()),
    pos(0, 0),
    color(0, 0, 0),
    opacity(0),     // start fully transparent
    fixed(),
    "daynight",
  ]);


  hearts = DEFAULT_HEARTS;
  robotsPassed = 0;
  tasksSolvedThisBoss = 0;
  inBossPhase = false;
  coinsRun = 0;

  refreshHUD();

  const groundY = 350;
  const groundHeight = 48;
  const groundScale = 1;
  const tileSize = 64 * groundScale;

  // Ground  
  add([
    sprite("ground"),
    pos(0, height() - groundHeight),
    scale(width() / 48, 1),
    area(),
    body({ isStatic: true }),
    "ground",
  ]);

  // Hero
  const heroX = 120;
  const hero = add([
    sprite("hero"),
    scale(0.16),
    anchor("center"),
    area(),
    body(),
    pos(80, groundY - 120),
    "hero",
  ]);

  hero.play("run");

  // Jump on click
  onClick(() => {
    if (!inBossPhase && hero.isGrounded()) {
      hero.jump(610);
      play("jump", { volume: 0.5 });

      stats.jumps++;
      saveStats();
      checkBadges();
    }
  });

  const BASE_SPEED = 250;
  const SPEED_INCREMENT = 50;
  currentSpeed = BASE_SPEED;

  // Spawn robots
  function spawnRobot() {
    if (inBossPhase) return;  // ← prevents new timers

    const r = add([
      sprite("robot"),
      pos(width(), groundY - 28),
      scale(0.13),
      area(),
      anchor("center"),
      { type: "robot", hasPassed: false },
      "enemy",
    ]);

    r.onUpdate(() => {
      if (inBossPhase) return r.destroy();
      r.move(-currentSpeed, 0);

      if (!r.hasPassed && r.pos.x + 16 < heroX) {
        r.hasPassed = true;
        robotsPassed++;

        stats.robotsJumped++;
        saveStats();
        checkBadges();

        if (stats.endlessModeActive) {
          if (robotsPassed % 20 === 0) {
            currentSpeed += SPEED_INCREMENT % 2;
          }
        } else {
          if (robotsPassed % 7 === 0) {
            currentSpeed += SPEED_INCREMENT;
          }
        }

        refreshHUD();
        if (!stats.endlessModeActive && robotsPassed >= robotsTarget) {
          startBossPhase();
        }
      }

      if (r.pos.x < -50) r.destroy();
    });

    wait(rand(1.0, 2.0), spawnRobot, ["timer"]);
  }

  // Spawn coins
  function spawnCoin() {
    if (inBossPhase) return;  // ← prevents new timers

    const c = add([
      sprite("coin"),
      pos(width() + 40, groundY - 120),
      scale(0.1),
      area(),
      "pickup",
    ]);

    c.onUpdate(() => {
      if (inBossPhase) return c.destroy();
      c.move(-currentSpeed, 0);
      if (c.pos.x < -50) c.destroy();
    });

    wait(rand(5.0, 8.0), spawnCoin, ["timer"]);
  }

  spawnRobot();
  spawnCoin();

  // Collisions
  hero.onCollide((obj) => {
    if (inBossPhase) return;

    if (obj.type === "robot") {
      shake(12);
      coinsRun = 0;
      refreshHUD();

      wait(0.15, () => {
        if (stats.endlessModeActive) {
          if (robotsPassed > saveState.bestEndlessScore) {
            saveState.bestEndlessScore = robotsPassed;
            stats.bestEndlessScore = saveState.bestEndlessScore;

            saveStats();
            saveGame();
          }
          go("endless_failed");
        } else {
          go("run_failed");
        }
      });
    }

    if (obj.is("pickup")) {
      coinsRun++;

      play("coin", { volume: 1 });

      stats.totalCoins++;
      saveStats();
      checkBadges();

      refreshHUD();
      destroy(obj);
    }
  });
});

// ---------------------------
// RUN FAILED SCENE
// ---------------------------
scene("run_failed", () => {
  cleanScene();

  play("lose", { volume: 0.5 });

  stats.lose++;
  saveStats();
  checkBadges();

  // --- BACKGROUND IMAGE ---
  add([
    sprite("bg_city"),
    pos(0, 0),
    scale(width() / 800, height() / 400),
    fixed(),
    color(255, 0, 0),
    "bg",
  ]);

  add([
    text(`> [ERROR_47B] HUMAN SIGNAL LOST  
> …reinitializing combat protocol…  
> click to re-engage`, {
      size: 32,
      width: 600,
      color: rgb(255, 200, 200)
    }),
    pos(80, 200),
    fixed()
  ]);

  onClick(() => {
    go("runner");
  });
});

// ---------------------------
// BOSS PHASE
// ---------------------------
function startBossPhase() {
  inBossPhase = true;

  play("boss", { volume: 0.9 });

  currentSpeed = 0;

  const overlay = add([
    rect(width(), height()),
    pos(0, 0),
    color(0, 0, 0),
    opacity(0),
    fixed(),
    "bossOverlay"
  ]);

  tween(
    overlay.opacity,
    0.4,
    0.6,
    (v) => overlay.opacity = v,
    easings.easeOutQuad
  );

  const boss = add([
    sprite("boss"),
    pos(width() / 2, height() / 2 - 64),
    scale(0.3),
    anchor("center"),
    fixed(),
    "boss"
  ]);

  onUpdate("boss", (b) => {
    b.pos.y = height() / 2 + Math.sin(time() * 3) * 10;
  });

  wait(5.0, () => {
    if (saveState.currentBossTaskId !== null &&
      saveState.currentBossTestIndex !== null) {
      // resume exact saved task + test
      const task = bossTasks[saveState.currentBossTaskId];
      const test = task.tests[saveState.currentBossTestIndex];
      //console.log("SHOWING TASK", task.id, "TEST", test.input, "EXPECTED", test.expected);

      updateBossHearts(hearts);
      updateBossTaskCounter(saveState.tasksSolvedThisBoss + 1, 3);
      showTask(task, test);
    } else {
      // start new task
      showNextTaskOrWin();
    }
  });
}

function normalize(str) {
  return str.trim().replace(/\s+/g, " ").toLowerCase();
}

function getNextTaskAndTest() {
  // pick next task index from shuffled order
  const taskIndex = saveState.taskOrder[saveState.taskPointer];
  saveState.taskPointer++;

  if (saveState.taskPointer >= saveState.taskOrder.length) {
    saveState.taskOrder = shuffle([...Array(bossTasks.length).keys()]);
    saveState.taskPointer = 0;
  }

  const task = bossTasks[taskIndex];

  // pick random test index for this task
  const testIndex = Math.floor(Math.random() * task.tests.length);
  const test = task.tests[testIndex];

  // persist
  saveState.currentBossTaskId = taskIndex;
  saveState.currentBossTestIndex = testIndex;
  saveGame();

  return { task, test };
}

function showNextTaskOrWin() {
  if (saveState.tasksSolvedThisBoss >= 3) {
    // saveState.level++;

    saveState.currentBossTaskId = null;
    saveState.currentBossTestIndex = null;
    saveState.tasksSolvedThisBoss = 0;

    saveGame();
    go("boss_defeated", saveState.level);
    return;
  }

  const { task, test } = getNextTaskAndTest();
  updateBossHearts(hearts);
  updateBossTaskCounter(saveState.tasksSolvedThisBoss + 1, 3);
  showTask(task, test);
}

function restartLevelAfterHeartLoss() {
  // Reset run-specific values
  coinsRun = 0;
  robotsPassed = 0;
  tasksSolvedThisBoss = 0;

  // Reload the current level
  go("runner", saveState.level);
}

function failTask() {
  hearts--;
  // console.log("Hearts now: ", hearts);

  if (hearts <= 0) {
    offerBuyHearts();
    return;
  }

  refreshHUD();
  showNextTaskOrWin();
}

function offerBuyHearts() {
  const modal = document.getElementById("heartsModal");
  const feedback = document.getElementById("heartsFeedback");

  feedback.textContent = "";
  modal.classList.remove("hidden");

  // Disable boss window while this is open
  document.getElementById("bossModal").classList.add("hidden");
}

btnCancel.addEventListener("click", () => failTask());

// ---------------------------
// BOSS DEFEATED SCENE
// ---------------------------
scene("boss_defeated", (levelJustBeaten) => {
  cleanScene();

  play("win", { volume: 0.7 })

  saveState.coins += coinsRun;
  coinsPermanent = saveState.coins;
  saveState.level++;
  saveGame();

  stats.bossesBeaten++;
  saveStats();
  checkBadges();

  const isMaxLevel = levelJustBeaten >= 10;

  // --- BACKGROUND IMAGE ---
  add([
    sprite("bg_city"),
    pos(0, 0),
    scale(width() / 800, height() / 400),
    color(0, 255, 0),
    fixed(),
    "bg"
  ]);

  add([
    text(
      isMaxLevel
        ? `> -╗- SY▒TEM └CRASHED▓│┤
> AI Status: OFFLINE ...
> Humanity: PREVAILS ...
> Let's sweep the rest of this trash into the furnace
      
        [START ENDLESS SCRAP-COLLECTION]
`
        : `> [CORE NODE ███ OFFLINE]  
> AI integrity dropping…  
> click to advance
`,
      {
        size: 30,
        width: 700,
        color: rgb(200, 255, 200)
      }
    ),
    pos(100, 150),
    fixed()
  ]);

  // --- FINAL BOSS EFFECTS ---
  if (isMaxLevel) {
    if (bgMusic) {
      bgMusic.stop();
      bgMusic = null;
    }

    const bossSprite = add([
      sprite("boss"),
      pos(width() / 2, height() / 2),
      anchor("center"),
      scale(0.3),
      fixed(),
      "boss"
    ]);

    let shakeTimer = 0;
    bossSprite.onUpdate(() => {
      shakeTimer += dt();
      const intensity = 7; // adjust shake strength
      bossSprite.pos.x += rand(-intensity, intensity);
      bossSprite.pos.y += rand(-intensity, intensity);
    });

    const explosionLoop = play("explosion", { loop: true, volume: 1.0 });

    const fade = document.getElementById("fadeBlack");
    fade.style.opacity = "1";

    wait(5, () => {
      fade.style.opacity = "0";
      onClick(() => {
        stats.endlessUnlocked = true;
        stats.endlessModeActive = true;
        saveStats();
        refreshHUD();
        explosionLoop.stop();
        go("runner");
        return;
      });
    });
  }

  wait(3, () => {
    onClick(() => {
      saveStats();
      go("runner");
    });
  });
});


// ---------------------------
// BADGE MENU
// ---------------------------
scene("badgeMenu", () => {
  add([
    text("Frontline Awards", { size: 32, font: "orbitron" }),
    pos(20, 20),
  ]);

  let y = 80;

  for (const key in badges) {
    const badge = badges[key];

    add([
      sprite(badge.icon),
      pos(40, y),
      scale(1),
    ]);

    // add([
    //   text(badge.name + (badge.unlocked ? " ✓" : " ✗")),
    //   pos(100, y + 10),
    // ]);

    y += 60;
  }

  onClick(() => go("game"));
});

// ---------------------------
// ENDLESS FAILED SCENE
// ---------------------------
scene("endless_failed", () => {
  cleanScene();

  play("lose", { volume: 0.9 });

  stats.lose++;
  saveStats();
  checkBadges();

  // --- BACKGROUND IMAGE ---
  add([
    sprite("bg_city"),
    pos(0, 0),
    scale(width() / 800, height() / 400),
    fixed(),
    color(255, 0, 0),
    "bg",
  ]);

  add([
    text(
      `> [ENDLESS_MODE//FAIL]  
> breach count: ${robotsPassed}  
> record defense: ${saveState.bestEndlessScore}  
> reboot to resist again`,
      {
        size: 32,
        width: 600,
        color: rgb(255, 200, 200)
      }),
    pos(80, 200),
    fixed()
  ]);

  onClick(() => {
    go("runner");
  });
});


// ---------------------------
// START GAME
// ---------------------------
go("start");