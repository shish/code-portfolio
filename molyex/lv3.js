function lv3() {
	canvas.onclick = null;
	lv_score = 0;
	active_ideas = [];

	var bg = new Image();
	var fail = new Image();
	var mol = new Image();
	var dude = new Image();
	var loaded=0, toload=4;

	var timer;
	var x = 20, y = 270;
	var frameNum = 0;
	var hits = 0;
	var dudes = [];
	for(var i=0; i<10; i++) {
		dudes.push(
			{x: 200+Math.random()*500, y: 100+Math.random()*300, dx: 1-Math.random()*2, dy: 1-Math.random()*2}
		);
	}

	function goWhenReady() {if(++loaded == toload) go();}
	bg.onload = goWhenReady();
	fail.onload = goWhenReady();
	mol.onload = goWhenReady();
	dude.onload = goWhenReady();

	function draw_main() {
		context.drawImage(bg, 0, 0);
		context.drawImage(mol, x, y);
		for(var i=0; i<dudes.length; i++) {
			var dd = dudes[i];
			dd.x = dd.x + dd.dx;
			dd.y = dd.y + dd.dy;
			if(dd.x < 100 && dd.dx < 0) dd.dx = Math.random();
			if(dd.y < 100 && dd.dy < 0) dd.dy = Math.random();
			if(dd.x > 600 && dd.dx > 0) dd.dx = -Math.random();
			if(dd.y > 460 && dd.dy > 0) dd.dy = -Math.random();
			context.drawImage(dude, dd.x, dd.y);
		}
	}

	function isNotCrashed() {
		for(var i=0; i<dudes.length; i++) {
			var ax1 = x, ax2 = x + 32;
			var ay1 = y, ay2 = y + 64;
			var bx1 = dudes[i].x, bx2 = dudes[i].x + 32;
			var by1 = dudes[i].y, by2 = dudes[i].y + 64;
			if(ax1 < bx2 && ax2 > bx1 && ay1 < by2 && ay2 > by1) {
				return false;
			}
		}
		return true;
	}

	function gameOver() {
		clearInterval(timer);
		context.drawImage(fail, 0, 0);
		if(frameNum <= 400) {
			textBox(
				"You bump into one of your minions, and they start",
				"telling you about some terrible game idea. Hearing",
				"this drivel causes your own imagination to shrivel.",
				hs_prompt
			);
		}
		else {
			textBox(
				"In an inspirational daydream, you bump into one of your",
				"workers. They have so many forms for you to fill in, you",
				"just can't imagine anything any more.",
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
				"Just need to get to your office without bumping into",
				"any distractions, and you can get to work!",
				"(WASD to move)",
				function() {
					canvas.onclick = collect_idea;
					timer = setInterval(frame, 50);
				}
			);
		}, 100);

		function frame() {
			draw_main();
			draw_ideas();

			if(keys["A"]) x = x - 2;
			if(keys["W"]) y = y - 2;
			if(keys["D"]) x = x + 2;
			if(keys["S"]) y = y + 2;

			if(x < 10) x = 10;
			if(y < 70) y = 70;
			if(y > 550 - 64) y = 550 - 64;

			if(frameNum >= 200 && frameNum < 400 && frameNum % 6 == 0) {
				have_idea();
			}
			if(frameNum >= 400 && frameNum < 600 && frameNum % 3 == 0) {
				have_idea();
			}

			if(!isNotCrashed()) {
				gameOver();
			}

			if(x > 700) {
				canvas.onclick = null;
				clearInterval(timer);
				draw_main();
				textBox(
					"You made it!",
					"A wonderful day of brilliance awaits!",
					"You also wrote down " + lv_score + " awesome ideas!",
					cg4
				);
			}
	
			frameNum++;
		}
	}
	
	bg.src = "data/lv3-bg.jpg";
	fail.src = "data/lv1-fail.jpg";
	mol.src = "data/lv3-mol.png";
	dude.src = "data/lv3-dude.png";
}
