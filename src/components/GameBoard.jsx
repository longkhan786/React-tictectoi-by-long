
export default function GameBoard({ onSelectSquare, board }) {
    
    return (
    <ol id="game-board">
        {board.map((row, rowIndex) =>(
            <li key={rowIndex}>
                <ol>
                    {row.map((player, colnIndex) =>(
                        <li key={colnIndex}>
                            <button onClick={() => onSelectSquare(rowIndex, colnIndex)} disabled={player != null}>{player}</button>
                        </li>
                    ))}
                </ol>
            </li>
        ))
        }
    </ol>
    );
}