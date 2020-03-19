function cg4() {
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
			lv4();
		}
		function frame() {
			i += 2;
			if(i >= 260) {
				clearInterval(timer);
			}
			context.drawImage(bg, 0, 0);
			context.drawImage(mol, 200, 600-i);

			textBox(
				"You got to the office! You work hard all day;",
				"when it comes to leaving time, you think it",
				"best to first stop off at the pub.",
				next
			);
		}
		timer = setInterval(frame, 50);
	}

	bg.src = "data/cg4-bg.jpg";
	mol.src = "data/cg1-mol.png";
}
