import { useState } from 'react';
import Player from './components/Player.jsx';
import GameBoard from './components/GameBoard.jsx';
import Log from './components/Log.jsx';
import GameOver from './components/GameOver.jsx';
import { WINNING_COMBINATIONS } from './data.js';

const PLAYERS = {
  X: "player 1",
  O: "player 2"
}
const initialBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function changeGameturn(gameTurns) {
  let currentPlayer = "X";
  if (gameTurns.length > 0 && gameTurns[0].player === "X") {
    currentPlayer = "O";
  }
  return currentPlayer;
}

function derivedWinner(gameBoard, playerName) {
  let winner;
  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column];

    if (firstSquareSymbol && firstSquareSymbol === secondSquareSymbol && firstSquareSymbol === thirdSquareSymbol) {
      winner = playerName[firstSquareSymbol];
    }
  }
  return winner;
}

function derivedGameBoard(gameTurns) {
  let gameBoard = [...initialBoard.map(array => [...array])];
  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;
    gameBoard[row][col] = player;
  }
  return gameBoard;
}

function App() {
  const [gameTurns, setGameTurns] = useState([]);
  const [playerName, setplayerName] = useState(PLAYERS);

  const activePlayer = changeGameturn(gameTurns);
  const gameBoard = derivedGameBoard(gameTurns);
  const winner = derivedWinner(gameBoard, playerName);
  const hasDraw = gameTurns.length === 9 && !winner;

  function handleActivePlayer(rowIndex, colnIndex) {
    setGameTurns((prevGameTurn) => {
      const currentPlayer = changeGameturn(prevGameTurn);
      const updateTurn = [{ square: { row: rowIndex, col: colnIndex }, player: currentPlayer }, ...prevGameTurn];
      return updateTurn;
    });
  }

  function handleGameOver() {
    setGameTurns([]);
  }

  function handlePlayerName(symbol, newName) {
    setplayerName(prevPlayerName => {
      return {
        ...prevPlayerName,
        [symbol]: newName
      };
    });
  }

  return (<main>
    <div id="game-container">
      <ol id="players" className='highlight-player'>
        <Player initialName={PLAYERS.X} symbol="X" isAcitve={activePlayer === "X"} onChange={handlePlayerName} />
        <Player initialName={PLAYERS.O} symbol="O" isAcitve={activePlayer === "O"} onChange={handlePlayerName} />
      </ol>
      {(winner || hasDraw) && <GameOver winner={winner} isClick={handleGameOver} />}
      <GameBoard onSelectSquare={handleActivePlayer} board={gameBoard} />
    </div>
    <Log turns={gameTurns} />
  </main>);
}
export default App;