/* rendering */
var canvas = document.getElementById("c");
var context = canvas.getContext("2d");

/* high score management */
var high_scores = [
	//{name:"Test", score:100},
	//{name:"Test", score:0},
	//{name:"Test", score:50},
];
var score = 0;
var lv_score = 0;
function hs_prompt() {
	var name = prompt("You scored "+score+"! What is your name?");
	high_scores.push({"name":name, "score":score});
	// TODO: save cookie
	// TODO: load from cookie
	title();
}

/* input management */
var keys = {};
window.onkeydown = function(evt) {keys[String.fromCharCode((evt||window.event).keyCode)] = true;}
window.onkeyup = function(evt) {keys[String.fromCharCode((evt||window.event).keyCode)] = false;}

function relMouseCoords(event){
    var totalOffsetX = 0;
    var totalOffsetY = 0;
    var canvasX = 0;
    var canvasY = 0;
    var currentElement = this;

    do{
        totalOffsetX += currentElement.offsetLeft - currentElement.scrollLeft;
        totalOffsetY += currentElement.offsetTop - currentElement.scrollTop;
    }
    while(currentElement = currentElement.offsetParent)

    canvasX = event.pageX - totalOffsetX;
    canvasY = event.pageY - totalOffsetY;

    return {x:canvasX, y:canvasY}
}
HTMLCanvasElement.prototype.relMouseCoords = relMouseCoords;

var _nextevent = null;
function textBox(l1, l2, l3, next) {
	context.beginPath()
	context.rect(200, 100, 400, 100);
	context.fillStyle = "#AAA";
	context.fill();
	context.strokeWidth = 8;
	context.strokeStyle = "black";
	context.stroke();

	context.fillStyle = "#444";
	context.font = "10pt sans";
	context.fillText(l1, 210, 120);
	context.fillText(l2, 210, 140);
	context.fillText(l3, 210, 160);
	context.fillText("(Click to continue)", 450, 180);

	if(next != _nextevent) {
		canvas.onclick = null;
		_nextevent = next;
		setTimeout(function() {
			canvas.onclick = function(evt) {
				var xy = canvas.relMouseCoords(evt);
				if(xy.x > 200 && xy.x < 600 && xy.y > 100 && xy.y < 200) {
					next();
				}
			};
		}, 500);
	}
}

/* idea creation / removal */
var active_ideas = [];
function have_idea() {
	var idea = idea_list[Math.floor(Math.random() * idea_list.length)]
	active_ideas.push(
		[
			idea, -30 + Math.random()*500, 50+Math.random()*400, 350, 100,
			"rgb("+
				Math.floor(100+Math.random()*100)+","+
				Math.floor(100+Math.random()*100)+","+
				Math.floor(100+Math.random()*100)+")"
		]
	);
}
function collect_idea(evt) {
	for(var i=0; i<active_ideas.length; ) {
		var id = active_ideas[i];
		var xy = canvas.relMouseCoords(evt);
		if(xy.x > id[1] && xy.x < id[1]+id[3] && xy.y > id[2] && xy.y < id[2]+id[4]) {
			active_ideas.splice(i, 1);
			score++;
			lv_score++;
		}
		else {
			// if we removed the current element, then the next
			// element to check has the same index that we're
			// currently looking at
			i++;
		}
	}
}
function draw_ideas() {
	for(var i=0; i<active_ideas.length; i++) {
		var id = active_ideas[i];

		context.beginPath()
		context.rect(id[1], id[2], id[3], id[4]);
		context.fillStyle = id[5];
		context.fill();
		context.strokeWidth = 8;
		context.strokeStyle = "black";
		context.stroke();

		context.fillStyle = "#444";
		context.font = "10pt sans";
		// TODO: better wrapping (wrap at idea creation time, to match width?)
		context.fillText(id[0].substr(0, 60), id[1] + 10, id[2] + 20);
		context.fillText(id[0].substr(60, 60), id[1] + 10, id[2] + 40);
		context.fillText(id[0].substr(120, 60), id[1] + 10, id[2] + 60);
		context.fillText("(Click to write down!)", id[1] + 60, id[2] + 80);
	}
}
