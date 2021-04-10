import React from 'react';

const colors = {
    available: 'lightgray',
    used: 'lightgreen',
    wrong: 'lightcoral',
    candidate: 'deepskyblue',
};

const PlayNumber = props => {
    const { number, status, onClick, gameStatus } = props;

    const numberStatus = status(number);

    const handleOnClick = () => {
        if (gameStatus !== 'active' || numberStatus == 'used') {
            return;
        }
  
        return onClick(number, numberStatus);
    }

    return (
        <button
            className="number"
            style={{ backgroundColor: colors[numberStatus] }}
            onClick={handleOnClick}
        >{number}</button>
    );
};

export default PlayNumber;
