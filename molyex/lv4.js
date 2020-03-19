function lv4() {
	canvas.onclick = null;
	lv_score = 0;
	active_ideas = [];

	var bg = new Image();
	var fail = new Image();
	var mol = new Image();
	var pint = new Image();
	var loaded=0, toload=4;

	var timer;
	var x = 0, y = 100;
	var px = 700;
	var pdx = 0;
	var frameNum = 0;
	var hits = 0;

	function goWhenReady() {if(++loaded == toload) go();}
	bg.onload = goWhenReady();
	fail.onload = goWhenReady();
	mol.onload = goWhenReady();
	pint.onload = goWhenReady();

	function pintY(n) {
		var rest = 385;
		return rest + Math.sin(frameNum / 50 * Math.PI) * 50;
	}

	function draw_main() {
		context.drawImage(bg, 0, 0);
		context.drawImage(mol, x, y);
		context.drawImage(pint, px, pintY(frameNum));
		px = px + pdx;
	}

	function isHit() {
		return ((x - 20) < px && px < (x + 20));
	}

	function gameOver() {
		clearInterval(timer);
		context.drawImage(fail, 0, 0);
		if(frameNum <= 400) {
			textBox(
				"You spilled your drink.",
				"An embarassment in front of your minions.",
				"Time to give up on life.",
				hs_prompt
			);
		}
		else {
			textBox(
				"Go home Molyneux, you are drunk.",
				"Shame.",
				"So much shame.",
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
				"Arriving at the pub, the atmosphere is wonderful.",
				"Let's have a pint.",
				"(Get the tip of the pint to your mouth, WASD to move)",
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
			if(px < x + 357) {
				if(pintY() > y + 240 && pintY() < y + 330) {
					hits++;
					if(hits == 3) {
						canvas.onclick = null;
						clearInterval(timer);
						draw_main();
						textBox(
							"You made it!",
							"Not just a great night out.",
							"You also wrote down " + lv_score + " awesome ideas!",
							cg5
						);
					}
					else {
						x = 0;
						px = 700;
					}
				}
				else {
					gameOver();
				}
			}
	
			frameNum++;
		}
	}
	
	bg.src = "data/lv4-bg.jpg";
	fail.src = "data/lv1-fail.jpg";
	mol.src = "data/lv4-mol.png";
	pint.src = "data/lv4-pint.png";
}
