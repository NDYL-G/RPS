// unit-renderer.js
// ----------------
// Renders units on top of hex tiles, including their type and attack/defense stats.

import { hexToPixel } from './svg-utils.js';

export function drawUnit(svg, q, r, unit) {
  const { x, y } = hexToPixel(q, r);

  const group = document.createElementNS("http://www.w3.org/2000/svg", "g");
  group.setAttribute("transform", `translate(${x}, ${y})`);
  svg.appendChild(group);

  const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
  circle.setAttribute("r", 12);
  circle.setAttribute("fill", unit.owner);
  circle.setAttribute("stroke", "#000");
  group.appendChild(circle);

  const label = document.createElementNS("http://www.w3.org/2000/svg", "text");
  label.setAttribute("x", 0);
  label.setAttribute("y", 5);
  label.setAttribute("text-anchor", "middle");
  label.setAttribute("font-size", "12");
  label.setAttribute("fill", "#fff");
  label.textContent = unit.type[0].toUpperCase();
  group.appendChild(label);

  const defText = document.createElementNS("http://www.w3.org/2000/svg", "text");
  defText.setAttribute("x", -20);
  defText.setAttribute("y", -20);
  defText.setAttribute("font-size", "10");
  defText.textContent = "D:" + unit.defense;
  group.appendChild(defText);

  const atkText = document.createElementNS("http://www.w3.org/2000/svg", "text");
  atkText.setAttribute("x", -20);
  atkText.setAttribute("y", 30);
  atkText.setAttribute("font-size", "10");
  atkText.textContent = "A:" + unit.attack;
  group.appendChild(atkText);
}
