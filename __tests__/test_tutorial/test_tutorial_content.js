import steps from "../../src/js/steps";

describe("Tutorial Tests", () => {
	it("should have the correct part 1", () => {
		const part1JSON = JSON.stringify(steps[0]);
		expect(part1JSON).toMatchSnapshot();
	});

	it("should have the correct part 2", () => {
		const part2JSON = JSON.stringify(steps[1]);
		expect(part2JSON).toMatchSnapshot();
	});

	it("should have the correct part 3", () => {
		const part3JSON = JSON.stringify(steps[2]);
		expect(part3JSON).toMatchSnapshot();
	});

	it("should have the correct part 4", () => {
		const part4JSON = JSON.stringify(steps[3]);
		expect(part4JSON).toMatchSnapshot();
	});

	it("should have the correct part 5", () => {
		const part5JSON = JSON.stringify(steps[4]);
		expect(part5JSON).toMatchSnapshot();
	});
});
