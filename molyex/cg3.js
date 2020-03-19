function cg3() {
	canvas.onclick = null;
	active_ideas = [];

	var bg = new Image();
	var mol = new Image();
	var loaded=0, toload=2;
	var timer;

	function goWhenReady() {if(++loaded == toload) go();}
	bg.onload = goWhenReady();
	mol.onload = goWhenReady();

	function go() {
		var i = 0;
		function next() {
			clearInterval(timer);
			lv3();
		}
		function frame() {
			i += 2;
			if(i >= 260) {
				clearInterval(timer);
			}
			context.drawImage(bg, 0, 0);
			context.drawImage(mol, 200, 600-i);

			textBox(
				"You got to work safely!",
				"Time for a day of brilliance.",
				"Need to get to your office!",
				next
			);
		}
		timer = setInterval(frame, 50);
	}

	bg.src = "data/cg3-bg.jpg";
	mol.src = "data/cg1-mol.png";
}
