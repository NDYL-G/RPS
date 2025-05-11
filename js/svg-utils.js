// svg-utils.js
// ----------------
// Utility functions for coordinate conversion and drawing hex shapes.

export const HEX_SIZE = 40;

export function hexToPixel(q, r, size = HEX_SIZE) {
  const x = size * Math.sqrt(3) * (q + r / 2);
  const y = size * 3/2 * r;
  return { x, y };
}

export function drawHexShape(svg, q, r, fill) {
  const { x, y } = hexToPixel(q, r);
  const points = [];

  for (let i = 0; i < 6; i++) {
    const angle = Math.PI / 180 * (60 * i - 30);
    const px = x + HEX_SIZE * Math.cos(angle);
    const py = y + HEX_SIZE * Math.sin(angle);
    points.push(`${px},${py}`);
  }

  const hex = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
  hex.setAttribute("points", points.join(" "));
  hex.setAttribute("fill", fill);
  hex.setAttribute("stroke", "#333");
  svg.appendChild(hex);
}
