function title() {
	canvas.onclick = null;
	score = 0;

	var bg = new Image();
	bg.onload = function() {go();}
	
	function go() {
		context.drawImage(bg, 0, 0);

		context.beginPath()
		context.rect(70, 200, 200, 300);
		context.fillStyle = "#AAA";
		context.fill();
		context.strokeWidth = 8;
		context.strokeStyle = "black";
		context.stroke();

		context.fillStyle = "#444";
		context.font = "10pt sans";
		context.fillText("High Scores", 130, 220);

		high_scores.sort(function(a, b) {return b.score - a.score});
		for(var i=0; i<high_scores.length; i++) {
			var hs = high_scores[i];
			context.fillText(hs.name, 80, 250 + i*20);
			context.fillText(hs.score, 220, 250 + i*20);
		}

		context.font = "20pt sans";
		context.fillText("Click to Experience", 120, 550);

		context.font = "15pt sans";
		context.fillText("(Controls = wasd + mouse)", 110, 570);

		setTimeout(function() {
			canvas.onclick = function() {
				cg1();
				//lv3();
			}
		}, 500);
	}

	bg.src = "data/title.jpg";
}
