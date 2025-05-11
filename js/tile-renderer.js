// tile-renderer.js
// ----------------
// Responsible for rendering terrain tiles on the hex grid using SVG.

import { hexToPixel, drawHexShape } from './svg-utils.js';

const COLORS = {
  neutral: "#ccc",
  boost_attack: "#f77",
  boost_defense: "#77f",
  type_boost: "#7f7",
  type_impediment: "#f99",
  base: {
    red: "#e00", blue: "#00e", yellow: "#cc0", green: "#0c0"
  }
};

export function drawTile(svg, tile) {
  let fill = COLORS.neutral;

  if (tile.type === "boost_attack") fill = COLORS.boost_attack;
  else if (tile.type === "boost_defense") fill = COLORS.boost_defense;
  else if (tile.type === "type_boost") fill = COLORS.type_boost;
  else if (tile.type === "type_impediment") fill = COLORS.type_impediment;
  else if (tile.type === "base" && tile.owner) fill = COLORS.base[tile.owner];

  drawHexShape(svg, tile.q, tile.r, fill);
}
