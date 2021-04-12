import React from 'react';

const PlayAgain = props => {
    const { gameStatus, onClick } = props;

    return (
        <div className="game-done">
            <div
                className="message"
                style={{ color: gameStatus === 'lost' ? 'red' : 'green'}}
            >
                {gameStatus === 'lost' ? 'Game Over' : 'You Win'}
            </div>

            <button onClick={onClick}>Play Again</button>
        </div>
    );
};

export default PlayAgain;
