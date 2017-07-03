import * as steps from "../../src/js/steps";

describe("Tutorial Tests", () => {
	it("should have the correct part 1", () => {
		const part1JSON = JSON.stringify(steps.part1);
		expect(part1JSON).toMatchSnapshot();
	});

	it("should have the correct part 2", () => {
		const part2JSON = JSON.stringify(steps.part2);
		expect(part2JSON).toMatchSnapshot();
	});

	it("should have the correct part 3", () => {
		const part3JSON = JSON.stringify(steps.part3);
		expect(part3JSON).toMatchSnapshot();
	});

	it("should have the correct part 4", () => {
		const part4JSON = JSON.stringify(steps.part4);
		expect(part4JSON).toMatchSnapshot();
	});

	it("should have the correct part 5", () => {
		const part5JSON = JSON.stringify(steps.part5);
		expect(part5JSON).toMatchSnapshot();
	});
});
