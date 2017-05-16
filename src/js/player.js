import React from 'react';
import ReactDOM from 'react-dom';

import App from "./components/app";

let map = "w1-w1-w1-w1-w1-w1-w1-w1-w1-w1-w1-w1-w1-w1-w1-w1-w1-w1-w1-w1-w1-w1-w1-w1-w1-w1-w1-w1-w1-w1-w1-x-x-0-0-0-0-0-0-0-0-0-0-0-w1-w1-0-0-0-0-0-0-0-0-0-0-0-x-x-w1-w1-x-x-0-0-0-0-0-0-0-0-0-0-0-w1-w1-0-0-0-0-0-0-0-0-0-0-0-x-x-w1-w1-x-x-0-0-0-0-0-0-0-0-0-0-0-w1-w1-0-0-0-0-0-0-0-0-0-0-0-x-x-w1-w1-x-x-0-0-0-0-0-0-0-0-0-0-0-w1-w1-0-0-0-0-0-0-0-0-0-0-0-x-x-w1-w1-x-x-0-0-0-0-0-0-0-0-0-0-0-w1-w1-0-0-0-0-0-0-0-0-0-0-0-x-x-w1-w1-x-x-0-0-0-0-0-0-0-0-0-0-0-w1-w1-0-0-0-0-0-0-0-0-0-0-0-x-x-w1-w1-x-x-0-0-0-0-0-0-0-0-0-0-0-w1-w1-0-0-0-0-0-0-0-0-0-0-0-x-x-w1-w1-x-x-0-0-0-0-0-0-0-0-0-0-0-w1-w1-0-0-0-0-0-0-0-0-0-0-x-x-x-w1-w1-x-x-0-0-0-0-0-0-0-0-0-0-0-w1-w1-0-0-0-0-0-0-0-0-0-0-0-x-x-w1-w1-x-x-0-0-0-0-0-0-0-0-0-0-0-w1-w1-0-0-0-0-0-0-0-0-0-0-x-x-x-w1-w1-w1-w1-w1-w1-w1-w1-w1-w1-w1-w1-w1-w1-w1-w1-w1-w1-w1-w1-w1-w1-w1-w1-w1-w1-w1-w1-w1-w1-w1";

function generateGrid(gridString, gLen, gWid) {
    var grid;
    var tempGrid;
    var counter = -1;

    tempGrid = gridString.split('-');
    grid = new Array(gLen);

    for(let i = 0; i < gLen; i++) {
        grid[i] = new Array(gWid);
        for(let j = 0; j < gWid; j++) {
            counter++;
            grid[i][j] = tempGrid[counter] === "w1" ? true : false;
        }
    }

    return grid;
}

ReactDOM.render(<App map={generateGrid(map, 12, 30)}/>, document.querySelector('#sceneContainer'));