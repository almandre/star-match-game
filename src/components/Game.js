import React, { useState, useEffect } from 'react';

import StarDisplay from './StarDisplay';
import PlayNumber from './PlayNumber';
import PlayAgain from './PlayAgain';

import utils from '../math-utils';

const useGameState = () => {
    const [star, setStar] = useState(utils.random(1, 9));
    const [availablesNum, setAvailablesNum] = useState(utils.range(1, 9));
    const [candidatesNum, setCandidatesNum] = useState([]);
    const [secondsLeft, setSecondsLeft] = useState(10);
    
    useEffect(() => {
      if (secondsLeft > 0 && availablesNum.length > 0) {
        const timeId = setTimeout(() => {
          setSecondsLeft(secondsLeft - 1);
        }, 1000);
      
        return () => clearTimeout(timeId);
      }
    }, [secondsLeft, availablesNum]);
    
    const setGameState = (candidatesNum) => {
      if (utils.sum(candidatesNum) !== star) {
        setCandidatesNum(candidatesNum);
      } else {
        const newAvailablesNum = availablesNum.filter(
          number => !candidatesNum.includes(number)
        );
    
        setStar(utils.randomSumIn(newAvailablesNum, 9));
        setAvailablesNum(newAvailablesNum);
        setCandidatesNum([]);
      }
    };

    return {
      star,
      availablesNum,
      candidatesNum,
      secondsLeft,
      setGameState,
    };
};

const setNumberStatus = (availablesNum, candidatesNum, star) => {
    const candidateAreWrong = utils.sum(candidatesNum) > star;

    return (number) => {
        if (!availablesNum.includes(number)) {
            return 'used';
        }
    
        if (candidatesNum.includes(number)) {
            return candidateAreWrong ? 'wrong' : 'candidate';
        } 
        
        return 'available';
    };
};

const setNewCandidates = (candidatesNum) => {
    return (number, status) => {
        if (status === 'available') {
            return candidatesNum.concat(number);
        }

        return candidatesNum.filter(cn => cn !== number);    
    }
}

const setGameStatus = (availablesNum, secondsLeft) => {
    if (availablesNum.length === 0) {
        return 'won';
    }

    if (secondsLeft === 0) {
        return 'lost';
    }

    return 'active';
}

const Game = (props) => {
    const {
      star,
      availablesNum,
      candidatesNum,
      secondsLeft,
      setGameState,
    } = useGameState();

    const gameStatus = setGameStatus(availablesNum, secondsLeft);

    const numberStatus = setNumberStatus(availablesNum, candidatesNum, star);

    const newCandidates = setNewCandidates(candidatesNum);

    const onNumberClick = (number, status) => setGameState(newCandidates(number, status));

    return (
        <div className="game">
            <div className="help">
                Pick 1 or more numbers that sum to the number of stars
            </div>
            <div className="body">
                <div className="left">
                    {gameStatus !== 'active'
                        ? (<PlayAgain onClick={props.startNewGame} gameStatus={gameStatus} />)
                        : (<StarDisplay count={star} />)}
                </div>
                <div className="right">
                    {utils.range(1, 9).map(number =>
                        <PlayNumber
                            key={number}
                            number={number}
                            status={numberStatus}
                            onClick={onNumberClick}
                            gameStatus={gameStatus}
                            className="number"
                        />
                    )}
                </div>
            </div>
            <div className="timer">Time Remaining: {secondsLeft}</div>
        </div>
    );
  };

  export default Game;
