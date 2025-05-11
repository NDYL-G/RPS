// js/map-generator.js

// Log to ensure this script is loaded
console.log("map-generator.js script loaded");

// Define the TILE_TYPES and UNIT_TYPES constants (as before)
const TILE_TYPES = {
  NEUTRAL: "neutral",
  BASE: "base",
  ATTACK_BOOST: "boost_attack",
  DEFENSE_BOOST: "boost_defense",
  TYPE_BOOST: "type_boost",
  TYPE_IMPEDIMENT: "type_impediment"
};

const UNIT_TYPES = ["rock", "paper", "scissors"];
const PLAYER_COLORS = ["red", "blue", "yellow", "green"];

// Generate a hex grid with axial coordinates
function generateHexGrid(radius) {
  const tiles = [];
  for (let q = -radius; q <= radius; q++) {
    const r1 = Math.max(-radius, -q - radius);
    const r2 = Math.min(radius, -q + radius);
    for (let r = r1; r <= r2; r++) {
      tiles.push({ q, r, type: TILE_TYPES.NEUTRAL });
    }
  }
  return tiles;
}

// Axial distance between two hexes
function hexDistance(a, b) {
  return (Math.abs(a.q - b.q) + Math.abs(a.q + a.r - b.q - b.r) + Math.abs(a.r - b.r)) / 2;
}

// Function to choose N random tiles that meet a predicate
function chooseRandomTiles(tiles, count, predicate) {
  const candidates = tiles.filter(predicate);
  const chosen = [];
  while (chosen.length < count && candidates.length > 0) {
    const idx = Math.floor(Math.random() * candidates.length);
    chosen.push(candidates.splice(idx, 1)[0]);
  }
  return chosen;
}

// Exported function to generate the game map
export function generateMap(players) {
  // Log to confirm the function is called and see how many players are passed
  console.log("generateMap called with " + players + " players");

  const radius = Math.max(5, 3 + players); // min size with breathing room
  const tiles = generateHexGrid(radius);

  const baseSpacing = 4;
  const playerTiles = [];

  // Place bases
  for (let i = 0; i < players; i++) {
    const baseTile = chooseRandomTiles(tiles, 1, tile =>
      tile.type === TILE_TYPES.NEUTRAL &&
      playerTiles.every(p => hexDistance(p, tile) >= baseSpacing)
    )[0];

    baseTile.type = TILE_TYPES.BASE;
    baseTile.owner = PLAYER_COLORS[i];
    playerTiles.push(baseTile);
  }

  // Add terrain
  // 1 generic attack & defense boost
  chooseRandomTiles(tiles, 1, t => t.type === TILE_TYPES.NEUTRAL)[0].type = TILE_TYPES.ATTACK_BOOST;
  chooseRandomTiles(tiles, 1, t => t.type === TILE_TYPES.NEUTRAL)[0].type = TILE_TYPES.DEFENSE_BOOST;

  // Boosts and impediments for each player
  playerTiles.forEach((base, i) => {
    const boosts = chooseRandomTiles(tiles, 3, t => t.type === TILE_TYPES.NEUTRAL);
    const imps = chooseRandomTiles(tiles, 3, t => t.type === TILE_TYPES.NEUTRAL);
    boosts.forEach(t => {
      t.type = TILE_TYPES.TYPE_BOOST;
      t.affects = UNIT_TYPES[i % 3]; // cycle rock/paper/scissors
    });
    imps.forEach(t => {
      t.type = TILE_TYPES.TYPE_IMPEDIMENT;
      t.affects = UNIT_TYPES[i % 3];
    });
  });

  // Return the generated map (tiles)
  return tiles;
}

// Additional log for debugging
console.log("generateMap function is defined");
