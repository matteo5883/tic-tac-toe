# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- Game modes for 1 Player (vs BOT) and 2 Player (human vs human).
- Pre-game configuration to choose the BOT side (X or O).
- Three BOT difficulty levels: easy (random moves), normal (intermediate strategy with win/block priorities), hard (optimal minimax strategy).
- Match score shown above the board for Player 1 wins, draws, and Player 2 wins.

### Changed

- New Game flow improved to continue the same match while keeping players, mode, and difficulty.
- Starting turn now alternates automatically between X and O on each new round.
- Match header updated with an X icon close button.
- Mode labels updated in the UI from Human vs ... to 2 Player / 1 Player.
- Typography weight aligned to bold for pregame controls.
- Board turn management refactored to avoid mutating Angular @Input state directly.

### Fixed

- Fixed race conditions between rounds that caused out-of-turn BOT moves in the second game.
- Fixed BOT opening move trigger when BOT is the starting player.
- Improved icon centering in the match close button.
- Added proper modal dialog semantics and title references to winner and draw popups.
- Removed conflicting aria-pressed semantics from the theme switch.
- Added explicit button type and accessible labels to board squares.

### Removed

- Removed the Stop Match text button in favor of the X icon button.

[unreleased]: https://github.com/matteo5883/tic-tac-toe/compare/v1.0.0...HEAD
