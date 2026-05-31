# NEXUS BALLZ

A neon-themed, arcade-style **brick breaker** (Breakout-inspired) game that runs entirely in the browser. No build step, no dependencies — just open a single HTML file and play.

Built with vanilla JavaScript and the HTML5 Canvas API, NEXUS BALLZ features glowing particle effects, multi-ball power-ups, a combo scoring system, three difficulty levels, and Web Audio sound effects.

## Features

- Classic brick-breaking gameplay with paddle and bouncing ball physics
- Angle-based paddle deflection (where the ball hits the paddle changes its bounce angle)
- Five power-ups: Multi-Ball, Big Paddle, Slow Ball, Score x2 multiplier, and Extra Life
- Combo system that rewards rapid consecutive brick hits with escalating points
- Progressive levels with denser brick layouts and tougher (multi-hit) bricks
- Three difficulty modes: Normal, Hard, and Insane
- Visual polish: ball trails, particle explosions, animated starfield, shimmering bricks, glowing neon UI
- Web Audio API sound effects for hits, brick breaks, power-ups, and game over
- **Persistent high score** saved to your browser via `localStorage` — your best run survives page reloads, shown live in the stats panel and on the game-over screen *(added feature)*
- Responsive layout with mouse, touch, and keyboard controls

## Tech Stack

- HTML5
- CSS3 (gradients, animations, backdrop filters; Orbitron web font)
- Vanilla JavaScript (ES6+)
- HTML5 Canvas 2D rendering
- Web Audio API (procedural sound effects)
- Web Storage API (`localStorage`) for high-score persistence

No frameworks, no package manager, no build tooling required.

## Setup / Installation

There is nothing to install. Clone the repo and open the file:

```bash
git clone https://github.com/Developer1010x/game.git
cd game
```

Then open `index.html` in any modern web browser (double-click it, or drag it into a browser window).

> Tip: For full functionality (sound and high-score persistence behave best over HTTP), you can optionally serve the folder with a tiny local server:
>
> ```bash
> # Python 3
> python3 -m http.server 8000
> # then visit http://localhost:8000
> ```

## Usage

1. (Optional) Pick a difficulty: **Normal**, **Hard**, or **Insane**.
2. Click **START GAME**.
3. Move the paddle to keep the ball in play and destroy all the bricks to advance levels.
4. Catch falling power-ups for bonuses.
5. When you lose all your lives the game ends — your best score is remembered for next time. Click **PLAY AGAIN** to retry.

## Controls

| Action            | Input                                  |
| ----------------- | -------------------------------------- |
| Move paddle left  | `←` Arrow / `A`                        |
| Move paddle right | `→` Arrow / `D`                        |
| Move paddle       | Mouse move / touch drag over the board |
| Pause / resume    | `Spacebar` or the **PAUSE** button     |
| Restart game      | `R`                                    |

## Power-ups

| Power-up    | Effect                                          |
| ----------- | ----------------------------------------------- |
| Multi-Ball  | Spawns extra balls on the field                 |
| Big Paddle  | Widens your paddle for 10 seconds               |
| Slow Ball   | Slows all balls for 8 seconds                   |
| Score x2    | Doubles points scored for 15 seconds            |
| Extra Life  | Grants one additional life                      |

## Scoring

- Each brick hit awards `(10 + level * 5) x multiplier x combo` points.
- The combo counter increases with each brick hit within 1 second of the last; let the streak lapse and it resets.
- Power-ups dropping is more likely while a combo is active.
- Your highest score is stored locally and shown under **BEST** in the stats panel.

## Project Structure

```
game/
├── index.html    # Entire game: markup, styles, and game logic in one file
├── README.md     # This file
└── .gitignore    # Ignored OS/editor/build artifacts
```

The game is intentionally self-contained in `index.html`. The `<style>` block holds all theming and layout, and the `<script>` block holds the game state, rendering, physics, input handling, sound, and the high-score persistence layer.

## Browser Support

Works in any modern browser that supports HTML5 Canvas, the Web Audio API, and `localStorage` (recent Chrome, Firefox, Edge, and Safari). If `localStorage` is unavailable (e.g. some private-browsing modes), the game falls back to an in-memory high score for the current session.
