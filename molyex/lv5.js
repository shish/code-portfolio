function lv5() {
	canvas.onclick = null;
	lv_score = 0;
	active_ideas = [];

	var bg = new Image();
	var fail = new Image();
	var mol1 = new Image();
	var mol2 = new Image();
	var wife = new Image();
	var arrow = new Image();
	var loaded=0, toload=6;

	var timer;
	var x = 400, y = 400;
	var frameNum = 0;
	var hits = 0;
	var targets = [
		{x: 159, y: 153},
		{x: 266, y: 142},
		{x: 214, y: 178},
		{x: -1000, y: -1000}
	];

	function goWhenReady() {if(++loaded == toload) go();}
	bg.onload = goWhenReady();
	fail.onload = goWhenReady();
	mol1.onload = goWhenReady();
	mol2.onload = goWhenReady();
	wife.onload = goWhenReady();
	arrow.onload = goWhenReady();

	function wifeX(n) {
		var rest = 150;
		return rest + Math.sin(frameNum / 100 * Math.PI) * 100;
	}
	function wifeY(n) {
		var rest = 200;
		return rest + Math.sin(frameNum / 50 * Math.PI) * 25;
	}
	function lipSep() {
		return Math.min(16, 200 - (frameNum % 200));
	}

	function draw_main() {
		context.drawImage(bg, 0, 0);
		context.drawImage(wife, wifeX(frameNum), wifeY(frameNum));
		context.drawImage(arrow, wifeX(frameNum) + targets[hits].x, wifeY(frameNum) + targets[hits].y);
		context.drawImage(mol1, x-16, y-lipSep());
		context.drawImage(mol2, x-16, y+lipSep());
	}

	function isHit() {
		return ((x - 20) < px && px < (x + 20));
	}

	function gameOver() {
		clearInterval(timer);
		context.drawImage(fail, 0, 0);
		if(frameNum <= 400) {
			textBox(
				"You can't even kiss your wife at night.",
				"How can you even love yourself?.",
				"Time to give up on life.",
				hs_prompt
			);
		}
		else {
			textBox(
				"Your wife realises that your work is more important",
				"to you than she is. She leaves, and never comes back.",
				"Loneliness.",
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
				"You arrive home, ready for some intimacy with the wife.",
				"Now would be a terrible time for an inspirational idea!.",
				"(WASD to move, keep the crosshairs over the target)",
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
			if(keys["W"]) y = y - 5;
			if(keys["D"]) x = x + 5;
			if(keys["S"]) y = y + 5;

			if(frameNum == 0) {
				pdx = -(Math.random() + 2);
			}
			if(frameNum >= 200 && frameNum < 400 && frameNum % 6 == 0) {
				have_idea();
			}
			if(frameNum >= 400 && frameNum < 600 && frameNum % 3 == 0) {
				have_idea();
			}
			if(frameNum == 200 || frameNum == 400 || frameNum == 600) {
				var dist = Math.sqrt(
					Math.pow(x - (wifeX() + targets[hits].x), 2) +
					Math.pow(y - (wifeY() + targets[hits].y), 2)
				);
				if(dist < 20) {
					hits++;
					if(hits == 3) {
						canvas.onclick = null;
						clearInterval(timer);
						draw_main();
						textBox(
							"You made it!",
							"Your wife loves you!",
							"You also wrote down " + lv_score + " awesome ideas!",
							cg6
						);
					}
				}
				else {
					gameOver();
				}
			}
	
			frameNum++;
		}
	}
	
	bg.src = "data/lv5-bg.jpg";
	fail.src = "data/lv1-fail.jpg";
	mol1.src = "data/lv5-mol1.png";
	mol2.src = "data/lv5-mol2.png";
	wife.src = "data/lv5-wife.png";
	arrow.src = "data/lv5-arrow.png";
}
