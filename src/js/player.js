import React from 'react';
import ReactDOM from 'react-dom';

import App from "./components/app";

function getAssetInfo(gridValue) {
    if (gridValue === "0")
        return gridValue;
    const assetInfo = gridValue.split(".");
    return {
        id: assetInfo[0],
        rotation: parseInt(assetInfo[1]),
    };
}

function loadGrid(gridString, rows, columns) {
    let tempGrid = gridString.split(' ');
    return [...Array(rows)].map(() => {
        return tempGrid.splice(0, columns).map((gridItem) => {
            return getAssetInfo(gridItem)
        });
    });
}

/*
** Places the first--and main--React element in the document.
*/
Namespace('HospitalSim').Engine = (function() {
    var start = function(instance, qset, version) {
        const data = {
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

    // Public
    return { start };
})();