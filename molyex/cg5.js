function cg5() {
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
			lv5();
		}
		function frame() {
			i += 2;
			if(i >= 260) {
				clearInterval(timer);
			}
			context.drawImage(bg, 0, 0);
			context.drawImage(mol, 200, 600-i);

			textBox(
				"Well, that was a refreshing break. Now all that's",
				"left to do is get into bed, kiss the wife, and",
				"dream up some more brilliant game ideas.",
				next
			);
		}
		timer = setInterval(frame, 50);
	}

	bg.src = "data/cg5-bg.jpg";
	mol.src = "data/cg1-mol.png";
}
