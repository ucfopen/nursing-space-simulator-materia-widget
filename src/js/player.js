import React from 'react';
import ReactDOM from 'react-dom';

import App from "./components/app";

function loadGrid(gridString, gLen, gWid) {
    var grid;
    var tempGrid;
    var counter = -1;

    tempGrid = gridString.split('-');
    grid = new Array(gLen);

    for(let i = 0; i < gLen; i++) {
        grid[i] = new Array(gWid);
        for(let j = 0; j < gWid; j++) {
            counter++;
            grid[i][j] = tempGrid[counter];
        }
    }

    return grid;
}

/*
** Places the first--and main--React element in the document.
*/
Namespace('HospitalSim').Engine = (function() {
    var start = function(instance, qset, version) {
        let data = {
            assetsFromFile : qset.options.assets,
            categories : qset.options.categories,
            gridLoader : qset.options.gridLoader
        };
        ReactDOM.render(
            <App 
                map={loadGrid(data.gridLoader.content, data.gridLoader.rows, data.gridLoader.columns)}
                categories={data.categories}
                assetsFromFile={data.assetsFromFile} />, 
            document.querySelector('#sceneContainer'));
    };

    // Public.
    return {start:start};
})();
    
