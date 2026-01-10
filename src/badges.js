export const badges = {
  
  jump1000: {
    id: "jump1000",
    name: "Sky Walker",
    icon: "badge_jump",
    description: "Jump 1000 times",
    unlocked: false,
    condition: (stats) => stats.jumps >= 1000,
  },

  coins100: {
    id: "coins100",
    name: "Coin Collector I",
    icon: "badge_coins100",
    description: "Collect 100 coins",
    unlocked: false,
    condition: (stats) => stats.totalCoins >= 100,
  },

  coins200: {
    id: "coins200",
    name: "Coin Collector II",
    icon: "badge_coins200",
    description: "Collect 200 coins",
    unlocked: false,
    condition: (stats) => stats.totalCoins >= 200,
  },

  coins300: {
    id: "coins300",
    name: "Coin Collector III",
    icon: "badge_coins300",
    description: "Collect 300 coins",
    unlocked: false,
    condition: (stats) => stats.totalCoins >= 300,
  },

  spend100: {
    id: "spend50",
    name: "Big Spender",
    icon: "badge_spend",
    description: "Spend 50 coins",
    unlocked: false,
    condition: (stats) => stats.coinsSpent >= 50,
  },

  robots100: {
    id: "robots100",
    name: "Silicon Slayer I",
    icon: "badge_robots100",
    description: "Decommission 100 Units",
    unlocked: false,
    condition: (stats) => stats.robotsJumped >= 100,
  },

  robots300: {
    id: "robots300",
    name: "Silicon Slayer II",
    icon: "badge_robots300",
    description: "Decommission 300 Units",
    unlocked: false,
    condition: (stats) => stats.robotsJumped >= 300,
  },

  robots500: {
    id: "robots500",
    name: "Silicon Slayer III",
    icon: "badge_robots500",
    description: "Decommission 500 Units",
    unlocked: false,
    condition: (stats) => stats.robotsJumped >= 500,
  },

  loser50: {
    id: "loser50",
    name: "The Great Loser I",
    icon: "badge_loser50",
    description: "Lose 50 times",
    unlocked: false,
    condition: (stats) => stats.lose >= 50,
  },

  loser100: {
    id: "loser100",
    name: "The Great Loser II",
      icon: "badge_loser100",
    description: "Lose 100 times",
    unlocked: false,
    condition: (stats) => stats.lose >= 100,
  },

  loser150: {
    id: "loser150",
    name: "The Great Loser III",
    icon: "badge_loser150",
    description: "Lose 150 times",
    unlocked: false,
    condition: (stats) => stats.lose >= 150,
  },

  loser300: {
    id: "loser300",
    name: "The Greatest Loser",
    icon: "badge_loser300",
    description: "Lose 300 times",
    unlocked: false,
    condition: (stats) => stats.lose >= 300,
  },

  beat10Bosses: {
    id: "beat10Bosses",
    name: "AI Destroyer",
    icon: "badge_boss",
    description: "Beat 10 bosses",
    unlocked: false,
    condition: (stats) => stats.bossesBeaten >= 10,
  },

  unlockEndless: {
    id: "unlockEndless",
    name: "Endless Explorer",
    icon: "badge_endless",
    description: "Unlock Endless Mode",
    unlocked: false,
    condition: (stats) => stats.endlessUnlocked === true,
  },

  endless300: {
    id: "endless300",
    name: "Unstoppable",
    icon: "badge-endless300",
    description: "Decommission 300 units in one run",
    unlocked: false,
    condition: (stats) => stats.bestEndlessScore >= 300
  }
};