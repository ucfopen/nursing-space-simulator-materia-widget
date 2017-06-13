import React from "react";

export default class CategoryButton extends React.Component {
	render() {
		return (
			<button
				className="asset-category"
				data-category={this.props.category}
				onClick={this.props.onClick}>
				{this.props.category}
			</button>
		);
	}
}
