export const TOGGLE_MENU_VISIBILITY = "toggle_menu_visibility"
export const SET_CATEGORY = "set_menu_category"

export function toggleMenuVisibility() {
  return {
    type: TOGGLE_MENU_VISIBILITY
  }
}

export function setCategory(category) {
  return {
    type: SET_CATEGORY,
    payload: category
  }
}

// export function selectAsset(asset, x, y) {
//         if (!asset)
//             return;
//         if (!x)
//             x = -1;
//         if (!y)
//             y = -1;

//         this.setState({selectedAsset: {asset: asset, x: x, y: y}});

//         if (x < 0 || y < 0)
//             this.setState({manipulationMode: false});
// }
