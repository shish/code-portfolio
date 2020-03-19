function cg1() {
	canvas.onclick = null;

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
			lv1();
		}
		function frame() {
			i += 2;
			if(i >= 260) {
				clearInterval(timer);
			}
			context.drawImage(bg, 0, 0);
			context.drawImage(mol, 200, 600-i);

			textBox(
				"Today, as every other day, you wake to a world of beauty",
				"and emotion. But how can you make it even better?",
				"Better take a notepad to write down any ideas.",
				next
			);
		}
		timer = setInterval(frame, 50);
	}

	bg.src = "data/cg1-bg.jpg";
	mol.src = "data/cg1-mol.png";
}
