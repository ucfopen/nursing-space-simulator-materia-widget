document.addEventListener("DOMContentLoaded", function(event) {

	var qset = {
		items: [],
		options: {}
	};

	var widget = {
		engineName: "",
		title: ""
	};

	var materiaInterface = {};

	// Note: We're populating the qset assets and gridloader properties with default assets
	// This is currently copy/pasted from the demo.json
	qset.options.assets = {
		"bed-1": {
			buttonSource: "assets/icons/icon_bed.png",
			canReplace: [],
			defaultColor: "#376AD3",
			id: "bed-1",
			materialType: "complex",
			mtlSrc: "assets/bed/mesh_bed.mtl",
			objSrc: "assets/bed/mesh_bed.obj",
			position: {
				x: -100,
				y: 0,
				z: -100
			},
			rotation: {
				x: 0,
				y: 180,
				z: 0
			},
			scale: {
				x: 0.25,
				y: 0.25,
				z: 0.25
			},
			tag: "a-obj-model",
			type: "object",
			category: "equipment",
			title: "Bed",
			spanX:2,
			spanZ:1
		},
		chair: {
			buttonSource: "assets/icons/icon_chair.png",
			canReplace: [],
			defaultColor: "#376AD3",
			id: "chair",
			materialType: "complex",
			mtlSrc: "assets/chair/mesh_chair.mtl",
			objSrc: "assets/chair/mesh_chair.obj",
			position: {
				x: -100,
				y: 0,
				z: -100
			},
			rotation: {
				x: 0,
				y: 180,
				z: 0
			},
			scale: {
				x: 0.25,
				y: 0.25,
				z: 0.25
			},
			tag: "a-obj-model",
			type: "object",
			category: "equipment",
			title: "Chair",
			spanX:1,
			spanZ:1
		},
		curtain: {
			buttonSource: "assets/icons/icon_curtain.png",
			canReplace: [],
			defaultColor: "#376AD3",
			id: "curtain",
			materialType: "complex",
			mtlSrc: "assets/curtain/mesh_curtain.mtl",
			objSrc: "assets/curtain/mesh_curtain.obj",
			position: {
				x: -100,
				y: 0,
				z: -100
			},
			rotation: {
				x: 0,
				y: 180,
				z: 0
			},
			scale: {
				x: 0.25,
				y: 0.25,
				z: 0.25
			},
			tag: "a-obj-model",
			type: "object",
			category: "equipment",
			title: "Curtain",
			spanX:1,
			spanZ:1
		},
		counter: {
			buttonSource: "assets/icons/icon_counter.png",
			canReplace: [],
			defaultColor: "#376AD3",
			id: "counter",
			materialType: "complex",
			mtlSrc: "assets/counter/mesh_counter.mtl",
			objSrc: "assets/counter/mesh_counter.obj",
			position: {
				x: -100,
				y: 0,
				z: -100
			},
			rotation: {
				x: 0,
				y: 180,
				z: 0
			},
			scale: {
				x: 0.25,
				y: 0.25,
				z: 0.25
			},
			tag: "a-obj-model",
			type: "object",
			category: "equipment",
			title: "Counter",
			spanX:1,
			spanZ:1
		},
		crashcart: {
			buttonSource: "assets/icons/icon_cart.png",
			canReplace: [],
			defaultColor: "",
			id: "crashcart",
			materialType: "complex",
			mtlSrc: "assets/cart/mesh_medical_cart.mtl",
			objSrc: "assets/cart/mesh_medical_cart.obj",
			position: {
				x: -100,
				y: 0,
				z: -100
			},
			rotation: {
				x: 0,
				y: 180,
				z: 0
			},
			scale: {
				x: 0.25,
				y: 0.25,
				z: 0.25
			},
			tag: "a-obj-model",
			type: "object",
			category: "equipment",
			title: "Crash Cart",
			spanX:1,
			spanZ:1
		},
		doctor: {
			buttonSource: "assets/icons/icon_doc.png",
			canReplace: [],
			defaultColor: "",
			id: "doctor",
			materialType: "complex",
			mtlSrc: "assets/doctor/mesh_doc.mtl",
			objSrc: "assets/doctor/mesh_doc.obj",
			position: {
				x: -100,
				y: 0,
				z: -100
			},
			rotation: {
				x: 0,
				y: 180,
				z: 0
			},
			scale: {
				x: 0.25,
				y: 0.25,
				z: 0.25
			},
			tag: "a-obj-model",
			type: "object",
			category: "people",
			title: "Doctor",
			spanX:1,
			spanZ:1
		},
		nurse: {
			buttonSource: "assets/icons/icon_nurse.png",
			canReplace: [],
			defaultColor: "",
			id: "nurse",
			materialType: "complex",
			mtlSrc: "assets/nurse/mesh_peep.mtl",
			objSrc: "assets/nurse/mesh_peep.obj",
			position: {
				x: -100,
				y: 0,
				z: -100
			},
			rotation: {
				x: 0,
				y: 180,
				z: 0
			},
			scale: {
				x: 0.25,
				y: 0.25,
				z: 0.25
			},
			tag: "a-obj-model",
			type: "object",
			category: "people",
			title: "Nurse",
			spanX:1,
			spanZ:1
		},
		desk: {
			buttonSource: "assets/icons/icon_desk.png",
			canReplace: [],
			defaultColor: "",
			id: "desk",
			materialType: "complex",
			mtlSrc: "assets/desk/mesh_desk.mtl",
			objSrc: "assets/desk/mesh_desk.obj",
			position: {
				x: -100,
				y: 0,
				z: -100
			},
			rotation: {
				x: 0,
				y: 180,
				z: 0
			},
			scale: {
				x: 0.25,
				y: 0.25,
				z: 0.25
			},
			tag: "a-obj-model",
			type: "object",
			category: "equipment",
			title: "Desk",
			spanX:1,
			spanZ:3
		},
		"monitor-1": {
			buttonSource: "assets/icons/icon_monitor.png",
			canReplace: [],
			defaultColor: "",
			id: "monitor-1",
			materialType: "complex",
			mtlSrc: "assets/monitor/mesh_monitor.mtl",
			objSrc: "assets/monitor/mesh_monitor.obj",
			position: {
				x: -100,
				y: 0,
				z: -100
			},
			rotation: {
				x: 0,
				y: 180,
				z: 0
			},
			scale: {
				x: 0.25,
				y: 0.25,
				z: 0.25
			},
			tag: "a-obj-model",
			type: "object",
			category: "equipment",
			title: "Monitor Stand",
			spanX:1,
			spanZ:1
		},
		computer: {
			buttonSource: "assets/icons/icon_computer.png",
			canReplace: [],
			defaultColor: "",
			id: "computer",
			materialType: "complex",
			mtlSrc: "assets/computer-stand/mesh_computer2.mtl",
			objSrc: "assets/computer-stand/mesh_computer2.obj",
			position: {
				x: -100,
				y: 0,
				z: -100
			},
			rotation: {
				x: 0,
				y: 180,
				z: 0
			},
			scale: {
				x: 0.25,
				y: 0.25,
				z: 0.25
			},
			tag: "a-obj-model",
			type: "object",
			category: "equipment",
			title: "Computer",
			spanX:1,
			spanZ:1
		},
		"sink-1": {
			buttonSource: "assets/icons/icon_sink.png",
			canReplace: [],
			defaultColor: "",
			id: "sink-1",
			materialType: "complex",
			mtlSrc: "assets/sink/mesh_sink.mtl",
			objSrc: "assets/sink/mesh_sink.obj",
			position: {
				x: -100,
				y: 0,
				z: -100
			},
			rotation: {
				x: 0,
				y: 180,
				z: 0
			},
			scale: {
				x: 0.25,
				y: 0.25,
				z: 0.25
			},
			tag: "a-obj-model",
			type: "object",
			category: "equipment",
			title: "Sink",
			spanX:1,
			spanZ:1
		},
		"door-1": {
			buttonSource: "assets/icons/icon_door.png",
			canReplace: ["construction"],
			defaultColor: "",
			id: "door-1",
			materialType: "complex",
			mtlSrc: "assets/door/mesh_door.mtl",
			objSrc: "assets/door/mesh_door.obj",
			position: {
				x: -100,
				y: 0,
				z: -100
			},
			rotation: {
				x: 0,
				y: 180,
				z: 0
			},
			repeat: "1 1",
			scale: {
				x: 0.25,
				y: 0.25,
				z: 0.25
			},
			tag: "a-obj-model",
			type: "door",
			category: "construction",
			title: "Door",
			spanX:1,
			spanZ:1
		},
		"iv-1": {
			buttonSource: "assets/icons/icon_iv.png",
			canReplace: [],
			defaultColor: "",
			id: "iv-1",
			materialType: "complex",
			mtlSrc: "assets/iv/mesh_iv.mtl",
			objSrc: "assets/iv/mesh_iv.obj",
			position: {
				x: -100,
				y: 0,
				z: -100
			},
			rotation: {
				x: 0,
				y: 180,
				z: 0
			},
			scale: {
				x: 0.25,
				y: 0.25,
				z: 0.25
			},
			tag: "a-obj-model",
			type: "object",
			category: "equipment",
			title: "IV Stand",
			spanX:1,
			spanZ:1
		},
		"trashcan-1": {
			buttonSource: "assets/icons/icon_trash.png",
			canReplace: [],
			defaultColor: "",
			id: "trashcan-1",
			materialType: "complex",
			mtlSrc: "assets/trashcan/mesh_trashcan.mtl",
			objSrc: "assets/trashcan/mesh_trashcan.obj",
			position: {
				x: -100,
				y: 0,
				z: -100
			},
			rotation: {
				x: 0,
				y: 180,
				z: 0
			},
			scale: {
				x: 0.18,
				y: 0.18,
				z: 0.18
			},
			tag: "a-obj-model",
			type: "object",
			category: "equipment",
			title: "Trash Can",
			spanX:1,
			spanZ:1
		},
		"trashcan-bio": {
			buttonSource: "assets/icons/icon_trashbio.png",
			canReplace: [],
			defaultColor: "",
			id: "trashcan-bio",
			materialType: "complex",
			mtlSrc: "assets/trashcan_bio/mesh_trashcan.mtl",
			objSrc: "assets/trashcan_bio/mesh_trashcan.obj",
			position: {
				x: -100,
				y: 0,
				z: -100
			},
			rotation: {
				x: 0,
				y: 180,
				z: 0
			},
			scale: {
				x: 0.18,
				y: 0.18,
				z: 0.18
			},
			tag: "a-obj-model",
			type: "object",
			category: "equipment",
			title: "Biohazard Waste",
			spanX:1,
			spanZ:1
		},
		window: {
			buttonSource: "assets/icons/icon_window.png",
			canReplace: ["construction"],
			defaultColor: "#9FCDB1",
			id: "window",
			materialType: "complex",
			mtlSrc: "assets/window/mesh_window.mtl",
			objSrc: "assets/window/mesh_window.obj",
			position: {
				x: -100,
				y: 0,
				z: -100
			},
			rotation: {
				x: 0,
				y: 180,
				z: 0
			},
			scale: {
				x: 0.25,
				y: 0.25,
				z: 0.25
			},
			tag: "a-obj-model",
			type: "wall",
			category: "construction",
			title: "Window",
			spanX:1,
			spanZ:1
		},
		"wall-1": {
			buttonSource: "assets/icons/icon_wall.png",
			canReplace: ["construction"],
			defaultColor: "#9FCDB1",
			id: "wall-1",
			rotation: {
				x: 0,
				y: 180,
				z: 0
			},
			scale: {
				x: 0.25,
				y: 0.25,
				z: 0.25
			},
			tag: "a-box",
			type: "wall",
			category: "construction",
			title: "Wall",
			spanX:1,
			spanZ:1
		},
		fireSticker: {
			buttonSource: "assets/icons/icon_fire.png",
			canReplace: [],
			defaultColor: "#9FCDB1",
			id: "fireSticker",
			mtlSrc: "",
			objSrc: "",
			rotation: {
				x: 0,
				y: 180,
				z: 0
			},
			scale: {
				x: 0.25,
				y: 0.25,
				z: 0.25
			},
			tag: "a-obj-model",
			type: "sticker",
			category: "sticker",
			title: "Fire Sticker"
		},
		soapSticker: {
			buttonSource: "assets/icons/icon_soap.png",
			canReplace: [],
			defaultColor: "#9FCDB1",
			id: "soapSticker",
			mtlSrc: "",
			objSrc: "assets/stickers/soap.obj",
			rotation: {
				x: 0,
				y: 180,
				z: 0
			},
			scale: {
				x: 0.25,
				y: 0.25,
				z: 0.25
			},
			tag: "a-obj-model",
			type: "sticker",
			category: "sticker",
			title: "Soap Sticker"
		},
		tvSticker: {
			buttonSource: "assets/icons/icon_tv.png",
			canReplace: [],
			defaultColor: "#9FCDB1",
			id: "tvSticker",
			mtlSrc: "",
			objSrc: "assets/stickers/tv.obj",
			rotation: {
				x: 0,
				y: 180,
				z: 0
			},
			scale: {
				x: 0.25,
				y: 0.25,
				z: 0.25
			},
			tag: "a-obj-model",
			type: "sticker",
			category: "sticker",
			title: "TV Sticker"
		}
	};

	qset.options.categories = ["beds", "equipment", "walls"];

	qset.options.gridLoader = {
		columns: 30,
		content:
			"x-x-x-w1-w1-w1-w1-w1-w1-w1-w1-w1-w1-w1-w1-w1-w1-w1-w1-w1-w1-w1-w1-w1-w1-w1-w1-x-x-x-x-x-x-w1-0-0-0-0-0-0-0-0-0-0-w1-w1-0-0-0-0-0-0-0-0-0-0-w1-x-x-x-x-x-x-w1-0-0-0-0-0-0-0-0-0-0-w1-w1-0-0-0-0-0-0-0-0-0-0-w1-x-x-x-x-x-x-w1-0-0-0-0-0-0-0-0-0-0-w1-w1-0-0-0-0-0-0-0-0-0-0-w1-x-x-x-x-x-x-w1-0-0-0-0-0-0-0-0-0-0-w1-w1-0-0-0-0-0-0-0-0-0-0-w1-x-x-x-x-x-x-w1-0-0-0-0-0-0-0-0-0-0-d1-d2-0-0-0-0-0-0-0-0-0-0-w1-x-x-x-x-x-x-w1-0-0-0-0-0-0-0-0-0-0-w1-w1-0-0-0-0-0-0-0-0-0-0-w1-x-x-x-x-x-x-w1-0-0-0-0-0-0-0-0-0-0-w1-w1-0-0-0-0-0-0-0-0-0-0-w1-x-x-x-x-x-x-w1-0-0-0-0-0-0-0-0-0-0-w1-w1-0-0-0-0-0-0-0-0-0-0-w1-x-x-x-x-x-x-w1-0-0-0-0-0-0-0-0-0-0-w1-w1-0-0-0-0-0-0-0-0-0-0-w1-x-x-x-x-x-x-w1-0-0-0-0-0-0-0-0-0-0-w1-w1-0-0-0-0-0-0-0-0-0-0-w1-x-x-x-x-x-x-w1-w1-w1-w1-w1-d1-w1-w1-w1-w1-w1-w1-w1-w1-w1-w1-w1-d1-w1-w1-w1-w1-w1-w1-x-x-x",
		rows: 12
	};

	materiaInterface.initNewWidget = function(w) {
		console.log("new");
	};

	materiaInterface.initExistingWidget = function(
		title,
		widget,
		qset,
		version,
		baseUrl
	) {
		console.log("Existing!");
	};

	materiaInterface.onSaveClicked = function() {
		title = document.getElementById("title").value;
		Materia.CreatorCore.save(title, qset, 1);
	};

	materiaInterface.onSaveComplete = function() {
		console.log("save complete!");
		return true;
	};

	return Materia.CreatorCore.start(materiaInterface);
});
