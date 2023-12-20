import { useState } from "react";
export default function Player({ initialName, symbol, isAcitve, onChange }) {
    const [isNameEditing,setNameEditing] = useState(initialName);
    const [isEditing,setIsEditing] = useState(false);
    const nameUpdate = () => {
        setIsEditing((editing) => !editing)
        if (isEditing) {
            onChange(symbol,isNameEditing);
        }
    }

    function handleName(event) {
        setNameEditing(event.target.value);
    }


    let playerName = <span className="player-name">{isNameEditing}</span>;
    let btnCp = "Edit";
    if (isEditing) {
        playerName = <input type="text" value={isNameEditing} onChange={handleName} required/>
        btnCp = "Save";
    }

    return <>
       <li className = {isAcitve ? 'active' : undefined}>
          <span className="player">
            {playerName}
            <span className="player-symbol">{symbol}</span>
          </span>
          <button onClick={nameUpdate}>{btnCp}</button>
        </li>
    </>;
}