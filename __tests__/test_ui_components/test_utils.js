import { Provider } from "react-redux";
import { mount, shallow, render } from "enzyme";
import { createStore } from "redux";
import renderer from "react-test-renderer";
import reducers from "../../src/js/reducers";
import { initData } from "../../src/js/actions/";
import assetData from "../../src/assets/assets.json";
import {checkPropsExist, deepCopy} from "../../src/js/utils.js";

const testProps = [
	"store",
	"qset",
	"currentX",
	"currentZ"
];

const assets = {
	bed: {
		id: "bed-1",
		category: "beds",
		objSrc: "url/to/obj",
		mtlSrc: "url/to/mtl"
	},
	chair: {
		id: "chair",
		category: "equipment",
		objSrc: "url/to/obj",
		mtlSrc: "url/to/mtl"
	},
	wall: {
		id: "chair",
		category: "equipment"
	}
};

let deepCopyMock = jest.fn();

describe("Utils tests", () => {

	it("should console log if caller exists in checkPropsExist", () => { 
		const consoleSpy = jest.spyOn(console, 'log').mockReturnValue("test");
		checkPropsExist(testProps, true);
		expect(consoleSpy).toBeCalled();
	});

	it("should not console log if caller is false in checkPropsExist", () => { 
		const consoleSpy = jest.spyOn(console, 'log').mockReturnValue("test");
		checkPropsExist(testProps, false);
		expect(consoleSpy).toBeCalled();
	});

	it("should deepCopy an object", () => { 
		let deepCopyFunction = deepCopy(assets);
		var newAssets = deepCopy(assets);
		expect(newAssets).toEqual(assets);
	});

	it("should deepCopy when hasOwnProperty is false", () => { 
		let test = {bed: "bed-1"}
		test.__proto__.category = "beds";
		var newAssets = deepCopy(assets);
		expect(newAssets).toEqual(assets);
	});

	it("should deepCopy an array", () => { 
		deepCopy(testProps);
		var newProps = deepCopy(testProps);
		expect(newProps).toEqual(testProps);
	});

});