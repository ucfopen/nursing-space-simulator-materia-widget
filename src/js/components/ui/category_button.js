import React from 'react'

export default props => {
	const { category, currentCategory, onClick } = props
	return (
		<button
			className={category == currentCategory ? 'active-category asset-category' : 'asset-category'}
			data-category={category}
			onClick={onClick}
		>
			{category}
		</button>
	)
}
