// svg-renderer.js
// ----------------
// Coordinates rendering of the full SVG map: tiles + units.

import { drawTile } from "./tile-renderer.js";
import { drawUnit } from "./unit-renderer.js";

export function renderMap(svg, mapData) {
  svg.innerHTML = "";
  mapData.forEach(tile => {
    drawTile(svg, tile);
    if (tile.unit) {
      drawUnit(svg, tile.q, tile.r, tile.unit);
    }
  });
}
