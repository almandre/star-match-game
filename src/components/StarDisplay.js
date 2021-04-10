import React from 'react';
import utils from '../math-utils';

const StarDisplay = props => {
    const { count } = props;

    return (
        <>
        {utils.range(1, count).map(startId => 
            <div key={startId} className="star" />
        )}
        </>
    );
};

export default StarDisplay;
