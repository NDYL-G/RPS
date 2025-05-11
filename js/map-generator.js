// js/map-generator.js

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

/**
 * Create axial coordinates for a hex grid of given radius
 */
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

/**
 * Axial distance between two hexes
 */
function hexDistance(a, b) {
  return (Math.abs(a.q - b.q) + Math.abs(a.q + a.r - b.q - b.r) + Math.abs(a.r - b.r)) / 2;
}

/**
 * Choose N random tiles that meet a predicate
 */
function chooseRandomTiles(tiles, count, predicate) {
  const candidates = tiles.filter(predicate);
  const chosen = [];
  while (chosen.length < count && candidates.length > 0) {
    const idx = Math.floor(Math.random() * candidates.length);
    chosen.push(candidates.splice(idx, 1)[0]);
  }
  return chosen;
}

/**
 * Generate a game map
 */
function generateMap(players) {
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

  return tiles;
}

// Example usage:
const mapData = generateMap(4);
console.log(mapData);
