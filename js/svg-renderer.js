// js/svg-renderer.js

const HEX_SIZE = 40;
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

function hexToPixel(q, r, size = HEX_SIZE) {
  const x = size * Math.sqrt(3) * (q + r / 2);
  const y = size * 3/2 * r;
  return { x, y };
}

function drawHex(svg, q, r, fill) {
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

function renderMap(svg, mapData) {
  svg.innerHTML = ""; // clear previous content
  mapData.forEach(tile => {
    let fill = COLORS.neutral;

    if (tile.type === "boost_attack") fill = COLORS.boost_attack;
    else if (tile.type === "boost_defense") fill = COLORS.boost_defense;
    else if (tile.type === "type_boost") fill = COLORS.type_boost;
    else if (tile.type === "type_impediment") fill = COLORS.type_impediment;
    else if (tile.type === "base" && tile.owner) fill = COLORS.base[tile.owner];

    drawHex(svg, tile.q, tile.r, fill);
  });
}
