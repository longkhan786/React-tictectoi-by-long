export default function GameOver({ winner, isClick }) {
    return (
        <div id="game-over">
            <h2>Game Over</h2>
            {winner && <p>{winner} Won the Match play again!</p>}
            {!winner && <p>Its Draw</p>}
            <button onClick={isClick}>Rematch</button>
        </div>
    );
}