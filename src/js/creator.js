/*
** Template Note: These are the basic functions required to create an instance of a widget through
** Materia's creator. Additional functions like those near the bottom can give your creator
** functionality. Most widgets require more user input for unique widgets and have unique functions
** to account for that input.
*/
document.addEventListener("DOMContentLoaded", function(event) {
	console.log("woo!");

	var qset = "";
	var widget =
	{
		engineName: '',
		title: ''
	};

	var materiaInterface = {}

	materiaInterface.initNewWidget = function(w) {
		console.log("new");
	};

	materiaInterface.initExistingWidget = function(title, widget, qset, version, baseUrl) {
		console.log("Existing!");
	}

	materiaInterface.onSaveClicked = function() {
		console.log("save!");
	}

	materiaInterface.onSaveComplete = function() {
		console.log("save complete!");
	}

	return Materia.CreatorCore.start(materiaInterface);

});

// var MateriaCreator = angular.module('materiaCreator', []);

// MateriaCreator.controller('creatorCtrl', ['$scope', '$http', function($scope, $http) {
// 	var qset = "";
// 	$scope.widget =
// 	{
// 		engineName: '',
// 		title: ''
// 	};
// 	$scope.state =
// 	{
// 		isEditingExistingWidget: false
// 	};
// 	$scope.initNewWidget = function(widget) {
// 		console.log("new");
// 		$scope.$apply(function() {
// 			return $scope.widget.engineName = $scope.widget.title = widget.name;
// 		});
// 		return $http.get('assets/questions.json').then(function(success) {
// 			return qset = success.data.qset.data;
// 		}, function(fail) {
// 			return console.log("Could not load preset questions!");
// 		});
// 	};
// 	$scope.initExistingWidget = function(title, widget, qset, version, baseUrl) {
// 		console.log("edit");
// 		$scope.state.isEditingExistingWidget = true;
// 		$scope.$apply(function() {
// 			$scope.widget.engineName = widget.name;
// 			return $scope.widget.title = title;
// 		});
// 		if (!qset.length) {
// 			return $http.get('assets/questions.json').then(function(success) {
// 				return qset = success.data.qset.data;
// 			}, function(fail) {
// 				return console.log("Could not load preset questions!");
// 			});
// 		} else {
// 			return qset;
// 		}
// 	};
// 	$scope.onSaveClicked = function() {
// 		console.log("save");
// 		if($scope.widget.title) {
// 			return Materia.CreatorCore.save($scope.widget.title, qset);
// 		} else {
// 			return Materia.CreatorCore.cancelSave('This widget has no title!');
// 		}
// 	};
// 	/**
// 	* Template Note: Typical creator function not needed in this example template
// 	*
// 	*	$scope.onSaveComplete = function(title, widget, qset, version) {
// 	*		console.log("complete");
// 	*		return null;
// 	*	};
// 	*	$scope.onMediaImportComplete = function(media) {
// 	*		console.log("import");
// 	*		return null;
// 	*	};
// 	*	var _buildSaveData = function() {
// 	*		return {
// 	*			name: '',
// 	*			items: []
// 	*		};
// 	*	};
// 	*/
// 	return Materia.CreatorCore.start($scope);
// }]);