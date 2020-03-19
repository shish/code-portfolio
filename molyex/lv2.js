function lv2() {
	canvas.onclick = null;
	lv_score = 0;
	active_ideas = [];

	var bg = new Image();
	var fail = new Image();
	var mol = new Image();
	var car = new Image();
	var loaded=0, toload=4;
	var left = 210, right = 480;

	var timer;
	var x = 250, y = 300;
	var cars = [];
	for(var i=0; i<10; i++) {
		cars.push(left + 30 + Math.random() * ((right - 30) - (left + 30)));
	}
	var frameNum = 0;

	function goWhenReady() {if(++loaded == toload) go();}
	bg.onload = goWhenReady();
	fail.onload = goWhenReady();
	mol.onload = goWhenReady();
	car.onload = goWhenReady();

	function carY(i) {
		return -300 + (-550 * i) + (frameNum * 5);
	}

	function draw_main() {
		var fnm = frameNum * 10;
		context.drawImage(bg, 0, -200 + fnm%200);
		context.drawImage(bg, 0,    0 + fnm%200);
		context.drawImage(bg, 0,  200 + fnm%200);
		context.drawImage(bg, 0,  400 + fnm%200);

		context.drawImage(mol, x, y);

		for(var i=0; i<cars.length; i++) {
			context.drawImage(car, cars[i], carY(i));
		}
	}

	function isOnRoad() {
		return (left < x && x < right);
	}
	function isNotCrashed() {
		for(var i=0; i<cars.length; i++) {
			var ax1 = x + 10, ax2 = x + 70;
			var ay1 = y + 5, ay2 = y + 180;
			var bx1 = cars[i], bx2 = cars[i] + 75;
			var by1 = carY(i), by2 = carY(i) + 180;
			if(ax1 < bx2 && ax2 > bx1 && ay1 < by2 && ay2 > by1) {
				return false;
			}
		}
		return true;
	}

	function gameOverOffroad() {
		clearInterval(timer);
		context.drawImage(fail, 0, 0);
		if(frameNum <= 400) {
			textBox(
				"You swerve off the road and hit a child.",
				"That child had a life, a future.",
				"Now it has nothing, and its family just have pain.",
				hs_prompt
			);
		}
		else {
			textBox(
				"Don't think and drive. You always thought it was 'drink',",
				"but clearly being a genius is much more dangerous.",
				"Time to quit your job, so this never happens again.",
				hs_prompt
			);
		}
	}
	function gameOverCrashed() {
		clearInterval(timer);
		context.drawImage(fail, 0, 0);
		if(frameNum <= 400) {
			textBox(
				"You crash into another car.",
				"That car was carrying medical supplies for puppies.",
				"You can't live with yourself any more.",
				hs_prompt
			);
		}
		else {
			textBox(
				"Don't think and drive. You always thought it was 'drink',",
				"but clearly being a genius is much more dangerous.",
				"Time to quit your job, so this never happens again.",
				hs_prompt
			);
		}
	}

	function go() {
		// this should be fine to go immediately, since it is
		// called when onload() is triggered - but doing it
		// immediately doesn't draw the images (text box is
		// drawn fine though)
		setTimeout(function() {
			draw_main();
			textBox(
				"Second job: get to work.",
				"Drive safely!",
				"(A/D to move left/right)",
				function() {
					canvas.onclick = collect_idea;
					timer = setInterval(frame, 50);
				}
			);
		}, 100);

		function frame() {
			draw_main();
			draw_ideas();

			if(keys["A"]) x = x - 5;
			if(keys["D"]) x = x + 5;

			if(isOnRoad()) {
				if(isNotCrashed()) {
				}
				else {
					gameOverCrashed();
				}
			}
			else {
				gameOverOffroad();
			}

			if(frameNum >= 200 && frameNum < 400 && frameNum % 6 == 0) {
				have_idea();
			}
			if(frameNum >= 400 && frameNum < 600 && frameNum % 3 == 0) {
				have_idea();
			}
			if(frameNum == 600) {
				canvas.onclick = null;
				clearInterval(timer);
				draw_main();
				textBox(
					"You made it!",
					"Not just to work safely.",
					"You also wrote down " + lv_score + " awesome ideas!",
					cg3
				);
			}

			frameNum++;
		}
	}
	
	bg.src = "data/lv2-bg.jpg";
	fail.src = "data/lv1-fail.jpg";
	mol.src = "data/lv2-mol.png";
	car.src = "data/lv2-car.png";
}
