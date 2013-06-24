window.onload = function() {
	if (Raphael.svg == false) {
		alert("this browser doesnt support svg!")
	} else {
		console.log("supported");
	}
	var paper = new Raphael(document.getElementById('canvas_container'), 960, 640);
	var arrowArray = paper.set();
	var currentPage = 0;
	var currentTime = 0;
	var fadeAnimationSpeed = 400;
	var puzzlePiecesCollected = 0;
	var puzzleCorrect = 0;
	var intro = true;
	var sleepMarksOn = true;
	var puzzlePiece9Clicked = true;
	var puzzlePiece4Clicked = true;
	var backgroundFade;
	var z1;
	var z2;
	var z3;
	var startBtn;
	var arrowPath = "M0,100 L25,50 L55,100 z";
	var kitchenObjects = [];
	var viewObjects = [];
	var loungeObjects = [];
	var potObjects = [];
	var fishObjects = [];
	var sofaObjects = [];
	var studyObjects = [];
	var kitchenHit = [];
	var studyHit = [];
	var viewHit = [];
	var loungeHit = [];
	var potHit = [];
	var fishHit = [];
	var lockHit = [];
	var puzzleObjects = [];
	var fridgeCopy = "Oh no the fridge is locked, I wonder if those magnets mean anything?";
	var blindCopy = "You opened the blind!";
	var pageUrl = ["assets/images/kitchen.jpg", "assets/images/lounge.jpg", "assets/images/view.jpg", "assets/images/study.jpg", "assets/images/lounge_BackgroundCloseUp.jpg", "assets/images/view_closeUpPlantPot.jpg", "assets/images/study_FishBowlCloseUp.jpg", "assets/images/kitchen_padlockCloseUp.jpg", "assets/images/endImage_background.jpg", "assets/images/lounge_frame02.jpg"];
	var piece9ID = 201;
	var piece4ID = 204;
	var sunglassesID = 203;
	var passport = 206;
	var piece6ID = 207;
	var flipflopID = 208;
	var iphoneID = 209;
	var supermanID = 210;
	var sunscreenID = 214;
	var piece7ID = 215;
	var piece2ID = 216;
	var toothbrushID = 217;
	var armbandsID = 219;
	var piece5ID = 222;
	var padlock = 12;
	var safeID = 218;
	var armbandsCollected = false;
	var flipFlopsCollected = false;
	var PassportCollected = false;
	var iPhoneCollected = false;
	var sunGlassesCollected = false;
	var sunScreenCollected = false;
	var ToothBrushCollected = false;
	var animIn = Raphael.animation({
		"opacity": "1"
	}, fadeAnimationSpeed);
	var animOut = Raphael.animation({
		"opacity": "0"
	}, fadeAnimationSpeed);
	var timerVar;
	function myTimer() {
		currentTime++;
		var date = new Date;
		var minutes = (date.getMinutes() < 10 ? '0' : '') + date.getMinutes()
		var hour = date.getHours();
		$('#currentTime').html(hour + ':' + minutes);
	}

	function drawRect(x, y, w, h, f, s, request, alpha, id) {
		var c = paper.rect(x, y, w, h);
		c.attr({
			fill: f,
			stroke: s,
			opacity: alpha
		});
		c.id = id;
		request.push(c);
	}

	function drawObjects(src, x, y, w, h, request, id) {
		var d = paper.image(src, x, y, w, h, request);
		d.id = id;
		d.hide();
		request.push(d);
	}

	function drawArrows() {
		var navigationArrow = paper.path(arrowPath);
		var navigationArrow2 = paper.path(arrowPath);
		navigationArrow.attr({
			fill: '#fff',
			stroke: "#ed3867",
			opacity: "0.8"
		});
		navigationArrow2.attr({
			fill: '#fff',
			stroke: "#ed3867",
			opacity: "0.8"
		});
		arrowArray.push(navigationArrow);
		arrowArray.push(navigationArrow2);
		arrowArray[0].rotate(270);
		arrowArray[0].translate(-200, 0);
		arrowArray[1].rotate(90);
		arrowArray[1].translate(200, -905);
		arrowArray[0].click(function() {
			if (currentPage == 2) {
				$('#currentTime').css({
					'display': 'none'
				});
			}
			currentPage++;
			if (currentPage == 4) {
				currentPage = 0;
			}
			arrowArray = [];
			fadebackGroundIn();
		});
		arrowArray[1].click(function() {
			if (currentPage == 2) {
				$('#currentTime').css({
					'display': 'none'
				});
			}
			currentPage--;
			if (currentPage == -1) {
				currentPage = 3;
			}
			arrowArray = [];
			fadebackGroundIn();
		});
	}

	function drawArrow() {
		var navigationArrow = paper.path(arrowPath);
		navigationArrow.attr({
			fill: '#fff',
			stroke: "#ed3867",
			opacity: "0.8"
		});
		arrowArray.push(navigationArrow);
		arrowArray[0].rotate(0);
		arrowArray[0].translate(20, -20);
		arrowArray[0].click(function() {
			if (currentPage == 4) {
				currentPage = 1;
			}
			if (currentPage == 5) {
				currentPage = 2;
			}
			if (currentPage == 6) {
				currentPage = 3;
			}
			if (currentPage == 7) {
				for (i = 0; i <= 2; i++) {
					$('#field' + i).animate({
						'opacity': '0'
					}, 400, function() {
						$('#field' + i).css({
							'display': 'none'
						});
					});
				}
				$('#submit0').css({
					'display': 'none'
				});
				currentPage = 0;
				document.activeElement.blur();
			}
			if (currentPage == 9) {
				currentPage = 1;
			}
			arrowArray = [];
			fadebackGroundIn();
		});
	}

	function initAnimation() {
		paper.image("assets/images/startImage_background.jpg", 0, 0, 960, 640);
		backgroundFade = paper.rect(1, 1, paper.width - 1, paper.height - 1);
		backgroundFade.attr({
			fill: 'black',
			stroke: 'black',
			opacity: 1
		});
		var copy1 = paper.image("assets/images/startImage_copy1.png", 160, 50, 319, 184);
		var copy2 = paper.image("assets/images/startImage_copy2.png", 535, 142, 241, 120);
		startBtn = paper.image("assets/images/startImage_playBotton.png", 610, 278, 98, 62);
		z1 = paper.image("assets/images/startImage_z.png", 690, 359, 13, 13);
		z2 = paper.image("assets/images/startImage_z.png", 690, 359, 13, 13);
		z3 = paper.image("assets/images/startImage_z.png", 690, 359, 13, 13);
		z1.attr({
			opacity: 0
		});
		z2.attr({
			opacity: 0
		});
		z3.attr({
			opacity: 0
		});
		copy1.attr({
			opacity: 0
		});
		copy2.attr({
			opacity: 0
		});
		startBtn.attr({
			opacity: 0
		});
		backgroundFade.animate(animOut.delay(1000));
		copy1.animate(animIn.delay(2000));
		sleepMarks();
		copy2.animate(animIn.delay(5000));
		startBtn.animate(animIn.delay(7000));
		setTimeout(eventListenerStart, 7500);
	}

	function eventListenerStart() {
		startBtn.click(function() {
			timerVar = setInterval(function() {
				myTimer()
			}, 1000);
			sleepMarksOn = false;
			fadebackGroundIn();
		});
	}

	function sleepMarks() {
		z1.attr({
			"x": 690,
			"y": 359
		});
		z2.attr({
			"x": 690,
			"y": 359
		});
		z3.attr({
			"x": 690,
			"y": 359
		});
		z1.animate(Raphael.animation({
			"opacity": "1",
			"x": "720",
			"y": "329"
		}, 1000).delay(2000));
		z1.animate(Raphael.animation({
			"opacity": "0"
		}, 1000).delay(3000));
		z2.animate(Raphael.animation({
			"opacity": "1",
			"x": "720",
			"y": "329"
		}, 1000).delay(3000));
		z2.animate(Raphael.animation({
			"opacity": "0"
		}, 1000).delay(4000));
		z3.animate(Raphael.animation({
			"opacity": "1",
			"x": "720",
			"y": "329"
		}, 1000).delay(4000));
		z3.animate(Raphael.animation({
			"opacity": "0"
		}, 1000).delay(5000));
		if (sleepMarksOn == true) {
			setTimeout(sleepMarks, 6000);
		} else {}
	}

	function clearPaper(paper) {
		kitchenObjects = [];
		kitchenHit = [];
		viewObjects = [];
		viewHit = [];
		loungeHit = [];
		sofaObjects = [];
		fishHit = [];
		fishObjects = [];
		potHit = [];
		potObjects = [];
		loungeObjects = [];
		studyObjects = [];
		lockHit = [];
		puzzleObjects = [];
		paper.clear();
		initCurrent();
	}

	function addEventListeners(whichArray, whichCopy) {
		correctLoopCopy = whichArray.length - 1;
		for (a = 0; a <= correctLoopCopy; a++) {
			whichArray[a].mousedown(function() {
				switch (this.id) {
				case 0:
					$("#mainText p").text(fridgeCopy);
					break;
				case 1:
					$("#mainText p").text("Since when did you start cooking?!");
					console.log(this);
					break;
				case 2:
					$("#mainText p").text("Boiled egg? Yes please!");
					break;
				case 3:
					$("#mainText p").text("Ooohhh, what you making Paul?");
					break;
				case 4:
					$("#mainText p").text("You making tea? Yes please.");
					break;
				case 5:
					$("#mainText p").text("I’m too sweet for sugar thanks.");
					break;
				case 6:
					$("#mainText p").text("Should you be handling electrical goods while hungover?");
					break;
				case 7:
					$("#mainText p").text("Don’t go putting your fingers in there.");
					break;
				case 8:
					$("#mainText p").text("Ahhh my favourite mug.");
					break;
				case 9:
					$("#mainText p").text("I do love my tea.");
					break;
				case 10:
					$("#mainText p").text("Nothing in there.");
					break;
				case 11:
					$("#mainText p").text("");
					kitchenObjects[1].show();
					kitchenObjects[2].show();
					this.hide();
					break;
				case 12:
					currentPage = 7;
					arrowArray = [];
					fadebackGroundIn();
					break;
				case 13:
					$("#mainText p").text("I really need to tidy when I get back.");
					break;
				case 14:
					$("#mainText p").text("I hope he leaves me some floor cake");
					break;
				case 15:
					if (puzzlePiecesCollected == 7) {
						currentPage = 9;
						fadebackGroundIn();
					} else {
						$("#mainText p").text("You need to find more pieces.");
					}
					break;
				case 16:
					$("#mainText p").text("You better hurry up, you’re going to be late.");
					break;
				case 17:
					$("#mainText p").text("Ouch that’s hot!");
					break;
				case 18:
					break;
				case 19:
					$("#mainText p").text(blindCopy);
					viewObjects[0].hide();
					viewObjects[1].show();
					viewObjects[2].show();
					viewObjects[3].show();
					viewHit[4].show();
					blindCopy = "Nothing else here.";
					this.hide();
					break;
				case 20:
					$("#mainText p").text("What a lovely day.");
					break;
				case 21:
					if (armbandsCollected == true && flipFlopsCollected == true && PassportCollected == true && iPhoneCollected == true && sunGlassesCollected == true && sunScreenCollected == true && ToothBrushCollected == true) {
						$("#mainText p").text("Got all the items");
						clearInterval(timerVar);
						currentPage = 8;
						fadebackGroundIn();
					} else {
						$("#mainText p").text("Help me find these items please.");
					}
					break;
				case 22:
					$("#mainText p").text("The vector king.");
					break;
				case 23:
					$("#mainText p").text("Nothing in there.");
					break;
				case 24:
					$("#mainText p").text("Ahhh my man drawer.");
					break;
				case 25:
					$("#mainText p").text("Nothing in there.");
					break;
				case 26:
					arrowArray = [];
					currentPage = 6;
					fadebackGroundIn();
					break;
				case 27:
					arrowArray = [];
					currentPage = 4;
					fadebackGroundIn();
					break;
				case 28:
					arrowArray = [];
					currentPage = 5;
					$('#currentTime').css({
						'display': 'none'
					});
					fadebackGroundIn();
					break;
				case 29:
					$("#mainText p").text("Nothing here Paul, we’re watching sports. Yay sports ball!");
					break;
				case 30:
					$("#mainText p").text("I have too many mugs.");
					break;
				case 31:
					$("#mainText p").text("Have you seen my son Nemo?");
					break;
				case 32:
					$("#mainText p").text("Do I look like something you would take on holiday.");
					break;
				case 33:
					$("#mainText p").text("Why am I in the safe Paul?");
					break;
				case 34:
					var n1 = document.forms["myForm"]["quantity0"].value;
					var n2 = document.forms["myForm"]["quantity1"].value;
					var n3 = document.forms["myForm"]["quantity2"].value;
					if (n1 == 9 && n2 == 7 && n3 == 5) {
						for (i = 0; i <= 2; i++) {
							$('#field0').css({
								'display': 'none'
							});
							$('#field1').css({
								'display': 'none'
							});
							$('#field2').css({
								'display': 'none'
							});
						}
						$('#submit0').css({
							'display': 'none'
						});
						$("#mainText p").text("its unlocked!");
						padlock = 216;
						currentPage = 0;
						arrowArray = [];
						fadebackGroundIn();
					} else {
						console.log(n1);
						$("#mainText p").text("Not quite, maybe I should look at clues");
						document.forms["myForm"]["quantity0"].value = '';
						document.forms["myForm"]["quantity1"].value = '';
						document.forms["myForm"]["quantity2"].value = '';
					}
					document.activeElement.blur();
					break;
				case 215:
					$("#mainText p").text("It’s sambuca time.");
					break;
				}
			});
		}
	}

	function addEventListenerObjects(whichArray) {
		for (d = 0; d <= whichArray.length - 1; d++) {
			whichArray[d].mousedown(function() {
				console.log(this);
				switch (this.id) {
				case 201:
					puzzlePiecesCollected++;
					$("#mainText p").text("Hooray you found a puzzle piece! " + puzzlePiecesCollected + '/7');
					piece9ID = 401;
					this.remove();
					break;
				case 202:
					$("#mainText p").text("Nothing else here.");
					break;
				case 203:
					$("#mainText p").text("Yeah... you found my sunglasses!");
					sunGlassesCollected = true;
					sunglassesID = 403;
					this.remove();
					break;
				case 204:
					puzzlePiecesCollected++;
					$("#mainText p").text("Hooray you found a puzzle piece! " + puzzlePiecesCollected + '/7');
					piece4ID = 402;
					this.remove();
					break;
				case 205:
					$("#mainText p").text("Nothing else here.");
					break;
				case 206:
					$("#mainText p").text("You found my passport. Can’t go anywhere without that.");
					PassportCollected = true;
					passport = 404;
					this.remove();
					break;
				case 207:
					puzzlePiecesCollected++;
					$("#mainText p").text("Hooray you found a puzzle piece! " + puzzlePiecesCollected + '/7');
					piece6ID = 405;
					this.remove();
					break;
				case 208:
					$("#mainText p").text("You found my shoes, no more sandy feet for me.");
					flipFlopsCollected = true;
					flipflopID = 406;
					this.remove();
					break;
				case 209:
					$("#mainText p").text("Yeah my phone, I can now instagram my holiday pics!");
					iPhoneCollected = true;
					iphoneID = 407;
					this.remove();
					break;
				case 210:
					this.attr({
						"y": '-103'
					});
					sofaObjects[3].show();
					break;
				case 211:
					puzzlePiecesCollected++;
					$("#mainText p").text("Hooray you found a puzzle piece! " + puzzlePiecesCollected + '/7');
					sofaObjects[2].attr({
						"y": '-3'
					});
					sofaObjects[2].id = 999;
					supermanID = 408;
					this.remove();
					break;
				case 212:
					$("#mainText p").text("Close but not close enough");
					break;
				case 213:
					$("#mainText p").text("The exits are here, here and here.");
					break;
				case 214:
					$("#mainText p").text("Can’t go without my sun cream, i’ll look like a tomato.");
					sunScreenCollected = true;
					sunscreenID = 409;
					this.remove();
					break;
				case 215:
					puzzlePiecesCollected++;
					$("#mainText p").text("Hooray you found a puzzle piece! " + puzzlePiecesCollected + '/7');
					piece7ID = 410;
					this.remove();
					break;
				case 216:
					puzzlePiecesCollected++;
					$("#mainText p").text("Hooray you found a puzzle piece! " + puzzlePiecesCollected + '/7');
					piece2ID = 411;
					this.remove();
					break;
				case 217:
					$("#mainText p").text("You found my toothbrush.");
					ToothBrushCollected = true;
					toothbrushID = 413;
					this.remove();
					break;
				case 219:
					$("#mainText p").text("Phew! I can now swim on my holiday.");
					armbandsID = 414;
					armbandsCollected = true;
					this.remove();
					break;
				case 220:
					$("#mainText p").text("Nothing else here");
					studyObjects[1].show();
					studyObjects[2].show();
					this.remove();
					break;
				case 221:
					$("#mainText p").text("Time for some flashing!");
					break;
				case 222:
					puzzlePiecesCollected++;
					$("#mainText p").text("Hooray you found a puzzle piece! " + puzzlePiecesCollected + '/7');
					piece5ID = 412;
					this.remove();
					break;
				case 408:
					$("#mainText p").text("Nothing else here.");
					break;
				case 999:
					$("#mainText p").text("nothing else here.");
					break;
					return false;
				}
			});
		}
	}

	function initCurrent() {
		$('#textBox').css({
			'display': 'inline'
		});
		$("#mainText p").text("");
		console.log("currentPage" + currentPage);
		paper.image(pageUrl[currentPage], 0, 0, 960, 640);
		if (currentPage == 0) {
			drawRect(95, 43, 266, 541, 'red', 'black', kitchenHit, 0, 0);
			drawRect(499, 43, 45, 120, 'red', 'black', kitchenHit, 0, 1);
			drawRect(619, 43, 55, 100, 'red', 'black', kitchenHit, 0, 2);
			drawRect(779, 43, 75, 120, 'red', 'black', kitchenHit, 0, 3);
			drawRect(476, 262, 42, 80, 'red', 'black', kitchenHit, 0, 4);
			drawRect(526, 262, 45, 80, 'red', 'black', kitchenHit, 0, 5);
			drawRect(586, 222, 115, 130, 'red', 'black', kitchenHit, 0, 6);
			drawRect(709, 254, 65, 30, 'red', 'black', kitchenHit, 0, 7);
			drawRect(756, 303, 45, 50, 'red', 'black', kitchenHit, 0, 8);
			drawRect(450, 377, 187, 212, 'red', 'black', kitchenHit, 0, 9);
			drawRect(690, 368, 237, 50, 'red', 'black', kitchenHit, 0, 10);
			drawRect(690, 420, 237, 163, 'red', 'black', kitchenHit, 0, 11);
			drawObjects("assets/images/kitchen_chainAndLock.png", 150, 197, 56, 112, kitchenHit, padlock);
			drawObjects("assets/images/kitchen_SugarPuzzlePiece9.png", 563, 269, 33, 63, kitchenObjects, piece9ID);
			drawObjects("assets/images/kitchen_cupboardOpen.png", 696, 421, 262, 154, kitchenObjects, 202);
			drawObjects("assets/images/kitchen_sunGlasses.png", 719, 492, 79, 38, kitchenObjects, sunglassesID);
			drawObjects("assets/images/kitchen_PanPuzzlePiece4.png", 781, 99, 29, 53, kitchenObjects, piece4ID);
			drawObjects("assets/images/kitchen_fridgeOpen.png", 97, 33, 346, 221, kitchenObjects, 205);
			drawObjects("assets/images/kitchen_fridgeOpenPassport.png", 244, 173, 80, 53, kitchenObjects, passport);
			drawObjects("assets/images/kitchen_fridgePuzzlePiece6.png", 124, 163, 87, 63, kitchenObjects, piece6ID);
			kitchenHit[12].show();
			kitchenObjects[0].show();
			kitchenObjects[3].show();
			drawArrows();
			fadebackGroundOut();
			addEventListenerObjects(kitchenObjects);
			addEventListeners(kitchenHit, null);
			if (kitchenHit[12].id == 216) {
				kitchenHit[12].hide();
				kitchenObjects[4].show();
				kitchenObjects[5].show();
				kitchenObjects[6].show();
			}
			if (kitchenObjects[0].id == 401) {
				kitchenObjects[0].remove();
			}
			if (kitchenObjects[3].id == 402) {
				kitchenObjects[3].remove();
			}
			if (kitchenObjects[2].id == 403) {
				kitchenObjects[2].remove();
			}
			if (kitchenObjects[5].id == 404 && kitchenObjects[6].id == 405) {
				kitchenHit[12].remove();
			}
			if (kitchenObjects[6].id == 405 && kitchenObjects[5].id == 404) {
				kitchenObjects[4].hide();
				fridgeCopy = "Nothing else here."
			}
			if (kitchenObjects[5].id == 404) {
				kitchenObjects[5].remove();
			}
			if (kitchenObjects[6].id == 405) {
				kitchenObjects[6].remove();
			}
		}
		if (currentPage == 1) {
			drawRect(727, 437, 85, 68, 'red', 'black', loungeHit, 0, 13);
			drawRect(88, 517, 32, 38, 'red', 'black', loungeHit, 0, 14);
			drawRect(319, 41, 366, 248, 'red', 'black', loungeHit, 0, 15);
			drawRect(229, 330, 498, 263, 'red', 'black', loungeHit, 0, 27);
			drawRect(826, 400, 124, 100, 'red', 'black', loungeHit, 0, 29);
			drawRect(156, 546, 55, 50, 'red', 'black', loungeHit, 0, 30);
			drawObjects("assets/images/lounge_safeOpen.png", 148, -1, 535, 341, loungeObjects, safeID);
			drawObjects("assets/images/lounge_safeArmBands.png", 502, 154, 130, 62, loungeObjects, armbandsID);
			console.log(loungeObjects[1]);
			drawRect(363, 122, 83, 91, 'red', 'black', loungeHit, 0, 33);
			loungeHit[6].hide();
			drawArrows();
			fadebackGroundOut();
			addEventListeners(loungeHit, null);
			addEventListenerObjects(loungeObjects);
			if (loungeObjects[0].id == 415) {
				loungeObjects[0].show();
				loungeObjects[1].show();
				loungeHit[6].show();
			}
			if (loungeObjects[1].id == 414) {
				loungeObjects[1].remove();
			}
		}
		if (currentPage == 2) {
			$('#currentTime').css({
				'display': 'inline'
			});
			drawObjects("assets/images/view_blindClosed.png", 262, 58, 447, 307, viewObjects, 212);
			drawObjects("assets/images/view_blindOpen.png", 262, 58, 447, 307, viewObjects, 213);
			drawObjects("assets/images/view_sunScreen.png", 614, 258, 60, 108, viewObjects, sunscreenID);
			drawObjects("assets/images/view_windowPuzzlePiece7.png", 356, 288, 72, 74, viewObjects, piece7ID);
			drawRect(39, 89, 188, 124, 'red', 'black', viewHit, 0, 16);
			drawRect(311, 400, 335, 138, 'red', 'black', viewHit, 0, 17);
			drawRect(691, 59, 18, 144, 'red', 'black', viewHit, 0, 19);
			drawRect(745, 209, 188, 329, 'red', 'black', viewHit, 0, 28);
			drawRect(297, 289, 61, 74, 'red', 'black', viewHit, 0, 215);
			viewObjects[0].show();
			viewHit[4].hide();
			drawArrows();
			fadebackGroundOut();
			addEventListeners(viewHit, null);
			addEventListenerObjects(viewObjects);
			if (viewObjects[2].id == 409) {
				viewObjects[2].remove();
			}
			if (viewObjects[3].id == 410) {
				viewObjects[3].remove();
			}
		}
		if (currentPage == 3) {
			drawRect(387, 56, 346, 241, 'red', 'black', studyHit, 0, 20);
			drawRect(27, 30, 266, 531, 'red', 'black', studyHit, 0, 21);
			drawRect(377, 279, 79, 90, 'red', 'black', studyHit, 0, 22);
			drawRect(366, 395, 108, 41, 'red', 'black', studyHit, 0, 24);
			drawRect(702, 319, 48, 45, 'red', 'black', studyHit, 0, 25);
			drawRect(787, 133, 137, 151, 'red', 'black', studyHit, 0, 26);
			drawObjects("assets/images/study_LaptopClosed.png", 476, 331, 212, 44, studyObjects, 220);
			drawObjects("assets/images/study_LaptopOpen.png", 475, 237, 214, 137, studyObjects, 221);
			drawObjects("assets/images/study_LaptopPuzzlePiece5.png", 572, 324, 86, 31, studyObjects, piece5ID);
			drawObjects("assets/images/study_ChalkArmbands.png", 51, 436, 94, 48, studyObjects, 501);
			drawObjects("assets/images/study_ChalkFlipflops.png", 182, 386, 88, 38, studyObjects, 502);
			drawObjects("assets/images/study_ChalkPassport.png", 194, 177, 63, 45, studyObjects, 503);
			drawObjects("assets/images/study_ChalkPhone.png", 98, 218, 73, 50, studyObjects, 504);
			drawObjects("assets/images/study_ChalkSunGlasses.png", 52, 336, 89, 34, studyObjects, 505);
			drawObjects("assets/images/study_ChalkSunScreen.png", 192, 252, 37, 74, studyObjects, 506);
			drawObjects("assets/images/study_ChalkToothbrush.png", 192, 503, 82, 31, studyObjects, 507);
			if (armbandsCollected == true) {
				studyObjects[3].show();
			}
			if (flipFlopsCollected == true) {
				studyObjects[4].show();
			}
			if (PassportCollected == true) {
				studyObjects[5].show();
			}
			if (iPhoneCollected == true) {
				studyObjects[6].show();
			}
			if (sunGlassesCollected == true) {
				studyObjects[7].show();
			}
			if (sunScreenCollected == true) {
				studyObjects[8].show();
			}
			if (ToothBrushCollected == true) {
				studyObjects[9].show();
			}
			studyObjects[0].show();
			firstTimeStudy = false;
			drawArrows();
			addEventListeners(studyHit, null);
			addEventListenerObjects(studyObjects);
			fadebackGroundOut();
			if (studyObjects[2].id == 412) {
				studyObjects[2].remove();
			}
		}
		if (currentPage == 4) {
			drawObjects("assets/images/lounge_sofaFlipFlop.png", 82, 434, 186, 61, sofaObjects, flipflopID);
			drawObjects("assets/images/lounge_sofaPhone.png", 695, 353, 144, 41, sofaObjects, iphoneID);
			drawObjects("assets/images/lounge_superManCushion.png", 85, -3, 277, 234, sofaObjects, supermanID);
			drawObjects("assets/images/lounge_cushionPuzzlePiece3.png", 205, 97, 99, 80, sofaObjects, 211);
			sofaObjects[0].show();
			sofaObjects[1].show();
			sofaObjects[2].show();
			drawArrow();
			addEventListenerObjects(sofaObjects);
			fadebackGroundOut();
			if (sofaObjects[0].id == 406) {
				sofaObjects[0].remove();
			}
			if (sofaObjects[1].id == 407) {
				sofaObjects[1].remove();
			}
			if (sofaObjects[3].id == 408) {
				sofaObjects[3].remove();
			}
		}
		if (currentPage == 5) {
			drawObjects("assets/images/view_plantPotPuzzlePiece2.png", 363, 476, 66, 84, potObjects, piece2ID);
			drawRect(559, 261, 113, 32, 'red', 'black', potHit, 0, 32);
			drawArrow();
			potObjects[0].show();
			addEventListenerObjects(potObjects);
			addEventListeners(potHit);
			fadebackGroundOut();
			console.log("potObjects[0]" + potObjects[0]);
			if (potObjects[0].id == 411) {
				potObjects[0].remove();
			}
		}
		if (currentPage == 6) {
			drawObjects("assets/images/study_FishBowlCloseUpToothbrush.png", 363, 143, 248, 147, fishObjects, toothbrushID);
			drawRect(422, 269, 128, 242, 'red', 'black', fishHit, 0, 31);
			drawArrow();
			fishObjects[0].show();
			addEventListenerObjects(fishObjects);
			addEventListeners(fishHit, null)
			fadebackGroundOut();
			if (fishObjects[0].id == 413) {
				fishObjects[0].remove();
			}
		}
		if (currentPage == 7) {
			$('#field0').css({
				'display': 'inline'
			});
			$('#field0').css({
				'opacity': '1'
			});
			$('#field1').css({
				'display': 'inline'
			});
			$('#field1').css({
				'opacity': '1'
			});
			$('#field2').css({
				'display': 'inline'
			});
			$('#field2').css({
				'opacity': '1'
			});
			$('#submit0').css({
				'display': 'inline'
			});
			drawRect(472, 228, 128, 44, 'red', 'black', lockHit, 0, 34);
			addEventListeners(lockHit, null)
			drawArrow();
		}
		if (currentPage == 8) {
			var copy1 = paper.image("assets/images/endImage_copy.png", 310, 90, 347, 143);
			var tweetBtn = paper.image("assets/images/endImage_tweet.png", 859, 578, 74, 51);
			var hours = Math.floor(currentTime / (60 * 60));
			copy1.attr({
				opacity: 0
			});
			tweetBtn.attr({
				opacity: 0
			});
			var divisor_for_minutes = currentTime % (60 * 60);
			var minutes = Math.floor(divisor_for_minutes / 60);
			var divisor_for_seconds = divisor_for_minutes % 60;
			var seconds = Math.ceil(divisor_for_seconds);
			var obj = {
				"h": hours,
				"m": minutes,
				"s": seconds
			};
			$("#endTime").html(obj.m + " minutes " + obj.s + " seconds");
			$('#endTime').css({
				'display': 'inline'
			});
			$('#textBox').css({
				'display': 'none'
			});
			copy1.animate(animIn.delay(1000));
			tweetBtn.animate(animIn.delay(2000));
			$('#endTime').delay(1000).animate({
				opacity: 1
			}, 500);
			tweetBtn.click()
			tweetBtn.click(function() {
				window.open("http://twitter.com/home?status=I completed Escape the room in " + obj.m + ' minutes ' + obj.s + " seconds" + " See if you can beat my time! URL", '_blank');
			});
		}
		if (currentPage == 9) {
			drawObjects("assets/images/lounge_LargeMainPuzzlePiece2.png", 389, 133, 219, 148, puzzleObjects, 700);
			drawObjects("assets/images/lounge_LargeMainPuzzlePiece3.png", 568, 135, 184, 147, puzzleObjects, 701);
			drawObjects("assets/images/lounge_LargeMainPuzzlePiece4.png", 208, 213, 184, 147, puzzleObjects, 702);
			drawObjects("assets/images/lounge_LargeMainPuzzlePiece5.png", 355, 246, 219, 147, puzzleObjects, 703);
			drawObjects("assets/images/lounge_LargeMainPuzzlePiece6.png", 535, 244, 219, 147, puzzleObjects, 704);
			drawObjects("assets/images/lounge_LargeMainPuzzlePiece7.png", 209, 322, 219, 148, puzzleObjects, 705);
			drawObjects("assets/images/lounge_LargeMainPuzzlePiece9.png", 570, 357, 182, 114, puzzleObjects, 706);
			drawObjects("assets/images/lounge_LargeMainPuzzlePiece2.png", 706, 449, 219, 148, puzzleObjects, 800);
			drawObjects("assets/images/lounge_LargeMainPuzzlePiece3.png", 3, 403, 184, 147, puzzleObjects, 801);
			drawObjects("assets/images/lounge_LargeMainPuzzlePiece4.png", 213, 433, 184, 147, puzzleObjects, 802);
			drawObjects("assets/images/lounge_LargeMainPuzzlePiece5.png", 733, 173, 219, 147, puzzleObjects, 803);
			drawObjects("assets/images/lounge_LargeMainPuzzlePiece6.png", 3, 173, 219, 147, puzzleObjects, 804);
			drawObjects("assets/images/lounge_LargeMainPuzzlePiece7.png", 703, 3, 219, 148, puzzleObjects, 805);
			drawObjects("assets/images/lounge_LargeMainPuzzlePiece9.png", 463, 13, 182, 114, puzzleObjects, 806);
			var start = function() {
					this.odx = 0;
					this.ody = 0;
				},
				move = function(dx, dy) {
					this.translate(dx - this.odx, dy - this.ody);
					this.animate({
						"opacity": 0.8
					}, 250);
					this.odx = dx;
					this.ody = dy;
				},
				up = function() {
					this.animate({
						"opacity": 1
					}, 250);
					switch (this.id) {
					case 800:
						if (this.getBBox().x > 370 && this.getBBox().x < 400 && this.getBBox().y > 125 && this.getBBox().y < 144) {
							this.undrag();
							this.hide();
							puzzleCorrect++;
							puzzleObjects[0].show();
						}
						break;
					case 801:
						if (this.getBBox().x > 555 && this.getBBox().x < 580 && this.getBBox().y > 126 && this.getBBox().y < 147) {
							this.undrag();
							this.hide();
							puzzleCorrect++;
							puzzleObjects[1].show();
						}
						break;
					case 802:
						if (this.getBBox().x > 199 && this.getBBox().x < 220 && this.getBBox().y > 202 && this.getBBox().y < 223) {
							this.undrag();
							this.hide();
							puzzleCorrect++;
							puzzleObjects[2].show();
						}
						break;
					case 803:
						if (this.getBBox().x > 344 && this.getBBox().x < 366 && this.getBBox().y > 235 && this.getBBox().y < 255) {
							this.undrag();
							this.hide();
							puzzleCorrect++;
							puzzleObjects[3].show();
						}
						break;
					case 804:
						if (this.getBBox().x > 523 && this.getBBox().x < 546 && this.getBBox().y > 233 && this.getBBox().y < 254) {
							this.undrag();
							this.hide();
							puzzleCorrect++;
							puzzleObjects[4].show();
						}
						break;
					case 805:
						console.log(this.getBBox().x);
						console.log(this.getBBox().y);
						if (this.getBBox().x > 198 && this.getBBox().x < 214 && this.getBBox().y > 312 && this.getBBox().y < 325) {
							this.undrag();
							this.hide();
							puzzleCorrect++;
							puzzleObjects[5].show();
						}
						break;
					case 806:
						if (this.getBBox().x > 553 && this.getBBox().x < 581 && this.getBBox().y > 345 && this.getBBox().y < 367) {
							this.undrag();
							this.hide();
							puzzleCorrect++;
							puzzleObjects[6].show();
						}
						break;
					case 807:
						if (this.getBBox().x > 553 && this.getBBox().x < 581 && this.getBBox().y > 345 && this.getBBox().y < 367) {
							this.undrag();
							this.hide();
							puzzleCorrect++;
							puzzleObjects[7].show();
						}
						break;
					}
					if (puzzleCorrect == 7) {
						$("#mainText p").text("Complete");
						safeID = 415;
						currentPage = 1;
						arrowArray = [];
						fadebackGroundIn();
					}
				};
			for (t = 7; t <= 13; t++) {
				puzzleObjects[t].show();
				puzzleObjects[t].drag(move, start, up);
			}
			drawArrow();
		}
	}

	function fadebackGroundIn() {
		if (intro == false) {
			backgroundFade = paper.rect(1, 1, paper.width - 1, paper.height - 1);
			backgroundFade.attr({
				fill: 'black',
				stroke: 'black',
				opacity: 0
			});
			backgroundFade.id = 100;
			backgroundFade.animate({
				"opacity": "1"
			}, fadeAnimationSpeed);
			setTimeout(function() {
				clearPaper(paper)
			}, fadeAnimationSpeed);
		} else {
			backgroundFade = paper.rect(1, 1, paper.width - 1, paper.height - 1);
			backgroundFade.attr({
				fill: 'black',
				stroke: 'black',
				opacity: 0
			});
			backgroundFade.id = 100;
			backgroundFade.animate({
				"opacity": "1"
			}, fadeAnimationSpeed);
			setTimeout(function() {
				clearPaper(paper)
			}, fadeAnimationSpeed);
			intro = false;
		}
	}

	function fadebackGroundOut() {
		backgroundFade = paper.rect(1, 1, paper.width - 1, paper.height - 1);
		backgroundFade.attr({
			fill: 'black',
			stroke: 'black',
			opacity: 1
		});
		backgroundFade.id = 100;
		backgroundFade.animate({
			"opacity": "0"
		}, fadeAnimationSpeed);
		setTimeout(resetBackground, fadeAnimationSpeed);
	}

	function resetBackground() {
		backgroundFade.remove();
	}
	initAnimation();
	function secondsToTime(secs) {
		var hours = Math.floor(secs / (60 * 60));
		var divisor_for_minutes = secs % (60 * 60);
		var minutes = Math.floor(divisor_for_minutes / 60);
		var divisor_for_seconds = divisor_for_minutes % 60;
		var seconds = Math.ceil(divisor_for_seconds);
		var obj = {
			"h": hours,
			"m": minutes,
			"s": seconds
		};
		console.log(obj.h);
		console.log(obj.m);
		return obj;
	}
}