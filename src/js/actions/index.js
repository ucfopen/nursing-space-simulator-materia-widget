export const INIT_DATA = "init_data"

function getAssetInfo(gridValue) {
  if (gridValue === "0") return gridValue
  const assetInfo = gridValue.split(".")
  return {
    id: assetInfo[0],
    rotation: parseInt(assetInfo[1])
  }
}

function loadGrid(gridString, rows, columns) {
  let tempGrid = gridString.split(" ")
  return [...Array(rows)].map(() => {
    return tempGrid.splice(0, columns).map(gridItem => {
      return getAssetInfo(gridItem)
    })
  })
}

// function getGrid(grid) {
//   return {
//     type: INIT_GRID,
//     payload: grid
//   }
// }

// function getCategories(categories) {
//   return {
//     type: INIT_GRID,
//     payload: categories
//   }
// }

// function getAssets(assets) {
//   return {
//     type: INIT_GRID,
//     payload: categories
//   }
// }

export function initData(qset) {
  const grid = loadGrid(
    qset.options.gridLoader.content,
    qset.options.gridLoader.rows,
    qset.options.gridLoader.columns
  )
  // getGrid(grid)
  const categories = qset.options.categories
  // getCategories(categories)
  const assets = qset.options.assets
  // getAssets(assets)

  return {
    type: INIT_DATA,
    payload: { grid, categories, assets }
  }
}
