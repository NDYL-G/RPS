Hex Clash: RPS Conquest

Overview

Hex Clash is a 2–4 player, turn-based strategy game played on a fog-covered hexagonal map. It mixes the classic simplicity of rock-paper-scissors with deeper tactical elements like terrain, unit stats, and hidden information. Players spawn units, explore the board, and attempt to eliminate their opponents by capturing bases.

Objective

Capture all opponent bases to eliminate them from the game. The last remaining player wins.

Game Components

Players: 2 to 4

Units: Rock, Paper, or Scissors

Map: Hexagonal tiles with fog-of-war

Terrain Types:

Neutral tile (no effect)

Generic Attack Boost (+1)

Generic Defence Boost (+1)

Type-specific Boost Tiles (e.g. Rock +1)

Type-specific Impediment Tiles (e.g. Rock -1)

Base Tiles (1 per player)

Starting Conditions

Each player starts with:

1 Base

Ability to spawn 1 unit per turn at their base

Units begin with:

Attack: 2

Defence: 3

Max Defence: 5 (via combat victories)

Combat Rules

Units can only attack types they beat via RPS:

Rock beats Scissors

Scissors beats Paper

Paper beats Rock

Combat Calculation:



(Attacker's Attack ± Tile Bonus ± Support Unit Bonus) - (Defender's Defence ± Tile Bonus) > 0

- If true, attacker wins and the unit gains +1 defence (max 5).
- Units **cannot** attack types they do not beat.
- Two same-type units may combine their attack if both are adjacent to the defender.

## Movement & Terrain
- Hex grid allows movement in 6 directions unless blocked by:
  - Edge of the board
  - Another unit
  - Incompatible terrain (e.g. Paper cannot enter Rock-impediment tile)

## Fog of War
- Tiles are hidden until a unit reveals them by moving adjacent.
- Terrain and enemy positions are hidden under fog.

## Spawning
- Players can spawn 1 unit per turn at their base.
- Cannot spawn if all adjacent tiles are blocked.

## Victory Conditions
- Capture all enemy bases.
- A base is captured when an opponent moves a unit onto it unopposed.

### Optional Endgame Mechanics (to prevent stalemates)
- **Turn Limit**: Game ends after 30 turns. Highest score wins (points for units, terrain, bases).
- **Shrinking Map**: Outer rings of the map become impassable every 5 turns after turn 25.
- **Base Vulnerability**: If a base is surrounded on all 6 sides, it becomes capturable.

## Map Generation Guidelines
- Minimum size determined by players and terrain tiles:

