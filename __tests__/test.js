import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import CameraFP from '../src/js/components/assets/camera_fp';

describe('Loads Components', () => {
	it('Camera renders aframe Camera', () => {
		const component = renderer.create(<CameraFP />);
		const json = component.toJSON();
		expect(json).toMatchSnapshot();
	});
})