/*
** Template Note: Try to separate unit tests by player and creator. Some
** widgets will separate them into different files. Preference.
** Some of the unit tests in player section are specific to the
** 'questionAnswered' function, which is relevant only as an example.
** and can be removed along with the function itself.
*/
describe('template', function() {
	// Template Note: Grab the demo widget for easy reference
	// Not necessary if demo independent.
	var widgetInfo = window.__demo__['build/demo'];
	var qset = widgetInfo.qset;

	var $scope = {};
	var ctrl;

	// Template Note: Controller unit tests. Directives and Services should
	// have their own unit tests if the widget has either.
	describe('templateCtrl', function(){
		// Template Note: Necessary when using 'beforeAll' instead of 'beforeEach'
		module.sharedInjector();
		beforeAll(module('template'));
		// Template Note: Creates a fresh scope, one time, for all tests inside
		// this describe section.
		beforeAll(inject(function ($rootScope, $controller) {
			$scope = $rootScope.$new();
			ctrl = $controller('templateCtrl', { $scope: $scope });
		}));
		// Template Note: Bypasses an issue where materia.enginecore.js tries to
		// access $('http'), which is inaccessible this way in PhantomJS.
		beforeEach(function(){
			spyOn(Materia.Engine, 'setHeight').and.returnValue(466);
		});
		// Template Note: Checks that start ran successfully.
		it('should be truthy if start function ran successfully"', function() {
			$scope.start(widgetInfo, qset.data);
			expect(true).toBeTruthy();
		});

		it('should have a title of "Template Widget"', function() {
			expect($scope.title).toBe('Template Widget');
		});
		// Template Note: (Can Be Deleted) -- Specific to this example widget
		it('should have (show) results hidden at start of widget', function() {
			expect($scope.showAnswer).toBe(false);
		});
		// Template Note: (Can Be Deleted) -- Specific to this example widget
		it('should have initial finalScore of -1', function() {
			expect($scope.finalScore).toBe(-1);
			expect($scope.currentQuestion).toBe(-1);
			expect($scope.currentAnswer.index).toBe(-1);
		});
		// Template Note: (Can Be Deleted) -- Specific to this example widget
		it('should have results empty at start of widget', function() {
			expect($scope.result).toBe('');
		});
		// Template Note: (Can Be Deleted) -- Specific to this example widget
		it('should have (show) results equal true after answering a question', function() {
			$scope.questionAnswered(qset.data.items[0].question[0], 0);
			expect($scope.showAnswer).toBe(true);
		});
		// Template Note: (Can Be Deleted) -- Specific to this example widget
		it('should have "Incorrect!\nScore: " + 100" in result for wrong answer', function() {
			expect($scope.result).toBe("Incorrect!\nScore: " + 0);
		});
		// Template Note: (Can Be Deleted) -- Specific to this example widget
		it('should have "Correct!\nScore: " + 100" in result for right answer', function() {
			$scope.questionAnswered(qset.data.items[0].question[0], 3);
			expect($scope.result).toBe("Correct!\nScore: " + 100);
		});
		// Template Note: (Can Be Deleted) -- Specific to this example widget
		it('should have (show) results equal false after answering a question with non-existant answer', function() {
			$scope.questionAnswered("Some impossible to acceidentally get by accident question?", 0);
			expect($scope.showAnswer).toBe(false);
		});
	});
	
});

describe('materiaCreator', function(){
	beforeEach(module('materiaCreator'));

	var $scope = {};
	var ctrl;

	beforeEach(inject(function($rootScope){
		$scope = $rootScope.$new();
	}));

	describe('creatorCtrl', function() {

		beforeEach(inject(function ($controller) {
			ctrl = $controller('creatorCtrl', { $scope: $scope });
		}));

		// override the method that runs if the widget is saved properly
		Materia.CreatorCore.save = function(title, qset, version) {
			return true;
		};
		// override the method that runs if the widget is saved without a title
		Materia.CreatorCore.cancelSave = function(msg) {
			return msg;
		};

		it('should have isEditingExistingWidget state as false before widget instantiation', function(){
			expect($scope.state.isEditingExistingWidget).toBe(false);
		});

		it('should make a new widget', function(){
			$scope.initNewWidget({name: 'template-widget'});
			expect($scope.widget.engineName).toBe('template-widget');
			expect($scope.widget.title).toBe('template-widget');
		});

		it('should receive a success when using initNewWidget successfully', inject(function($httpBackend) {
			var fakeHttpPromise = {
				success: function() {}
			};
			spyOn($scope, 'initNewWidget').and.returnValue(fakeHttpPromise).and.callThrough();

			$httpBackend
				.when('GET', function(url) {
					return (url.indexOf('assets/questions.json') !== -1);
				})
				.respond(200, { qset: { data: 'value' }});

			$scope.initNewWidget({name: 'template-widget'});

			$httpBackend.flush();
		}));
		
		it('should receive a fail when using initNewWidget unsuccessfully', inject(function($httpBackend) {
			var fakeHttpPromise = {
				fail: function() {}
			};
			spyOn($scope, 'initNewWidget').and.returnValue(fakeHttpPromise).and.callThrough();
			spyOn(console, 'log');

			$httpBackend
				.when('GET', function(url) {
					return (url.indexOf('assets/questions.json') !== -1);
				})
				.respond(500, "failed");

			$scope.initNewWidget({name: 'template-widget'});

			expect(console.log).toHaveBeenCalled();

			$httpBackend.flush();
		}));
		
		it('should cause an issue when saved without a title', function(){
			expect($scope.onSaveClicked()).toBe('This widget has no title!');
		});

		it('should save properly when it has a title', function(){
			$scope.widget.title = 'template-widget';
			expect($scope.onSaveClicked()).toBe(true);
		});

		it('should edit an existing widget with file-stored qset', function(){
			$scope.initExistingWidget('Template Widget', {name: 'template-widget'}, {});
			expect($scope.initExistingWidget).toBeDefined();
		});

		it('should edit an existing widget with passed in qset', function(){
			$scope.initExistingWidget('Template Widget', {name: 'template-widget'}, [
					{
						materiaType: "question",
						id: 0,
						type: "MC",
						question: [
							{
								text: "What's the capital in Florida?"
							}
						],
						answers: [
							{
								text: "Tallahassee",
								value: 0
							},
							{
								text: "Atlanta",
								value: 0
							},
							{
								text: "Orlando",
								value: 0
							},
							{
								text: "F",
								value: 100
							}
						]
					}
				]
			);
			expect($scope.initExistingWidget).toBeDefined();
		});

		it('should receive a success when using initExistingWidget successfully', inject(function($httpBackend) {
			var fakeHttpPromise = {
				success: function() {}
			};
			spyOn($scope, 'initExistingWidget').and.returnValue(fakeHttpPromise).and.callThrough();

			$httpBackend
				.when('GET', function(url) {
					return (url.indexOf('assets/questions.json') !== -1);
				})
				.respond(200, { qset: { data: 'value' }});

			$scope.initExistingWidget('Template Widget', {name: 'template-widget'}, {});

			$httpBackend.flush();
		}));
		
		it('should receive a fail when using initExistingWidget unsuccessfully', inject(function($httpBackend) {
			var fakeHttpPromise = {
				fail: function() {}
			};
			spyOn($scope, 'initExistingWidget').and.returnValue(fakeHttpPromise).and.callThrough();
			spyOn(console, 'log');

			$httpBackend
				.when('GET', function(url) {
					return (url.indexOf('assets/questions.json') !== -1);
				})
				.respond(500, "failed");

			$scope.initExistingWidget('Template Widget', {name: 'template-widget'}, {});

			expect(console.log).toHaveBeenCalled();

			$httpBackend.flush();
		}));
	});
});