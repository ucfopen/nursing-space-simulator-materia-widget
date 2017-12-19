import React from 'react'

export default props => {
	return (
		<span id="selected-asset-tooltip" className={props.showTooltip ? 'shown' : 'hidden'}>
			{props.toolTipText}
		</span>
	)
}
