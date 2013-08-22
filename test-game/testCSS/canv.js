var usr = "";
var pass = "";
var canW = 600;
var canH = 450;
var iterator = 0;

var canvas,ctx;

var mPos = "";

var canObj = '<canvas  id="canvas" width="'+canW+'" height='+canH+'></canvas>';
var welcObj = '<div class="welcome"><p>Welcome to Word Roulette a multiplayer game designed to practice English language.To play simply register/login and try to guess the hidden word your partner has.</p><p>Word Roulette is compatible with most major browsers both on PC and mobile devices.</p></div>'
var loginObj = '<ul><li>Username</li><li><input type="text" id="username" name="username" size="15" maxlength="15"></li><li>Password</li><li><input type="password" name="password" id="password" size="15" maxlength="15"></li><li><button type="button" onclick="login()">Login</button></li></ul><p>Don`t have an account?<button type="button" id="regButton" onclick="register()">Register</button></p>';
var regisObj = '<ul>To register please enter:<li>Username</li><li><input type="text" id="username" name="username" size="15" maxlength="15"></li><li>Password</li><li><input type="password" name="password" id="password" size="15" maxlength="15"></li><li><li>Email</li><li><input type="text" name="email" id="email" size="15" maxlength="15"></li><li><button type="button" onclick="submitRegister()">Register</button><button type="button" onclick="loadLogin()">Back</button></li></ul><p>';
var sendAnswerObj = '<ul><li>Send Clue</li><li><input type="text" name="user" size="15"></li><li><button type="button">Submit</button></li></ul></div>';



$( document ).ready(function() {
    $('#content').html(welcObj);
    $('#userPanel').html(loginObj); 

  
});
var counter = Session.get("counter") || {
	visits: 0,
	time: []
};

window.onload = function() {

//alert(session.original_session.visits);

	// update previous visits
	var d = new Date();
	counter.visits++;
	counter.time.push(Pad(d.getHours()) + ":" + Pad(d.getMinutes()) + ":" + Pad(d.getSeconds()));
	if (counter.time.length > 10) counter.time = counter.time.slice(1);

	// update page
	//document.getElementById("visits").firstChild.nodeValue = counter.visits + " time" + (counter.visits == 1 ? "" : "s");
	var t = "";
	for (var i = counter.time.length-1; i >= 0; i--) t += counter.time[i] + "\n";
	//document.getElementById("times").firstChild.nodeValue = t;
        
        if(Session.get("login"))
        {
            usr = Session.get("login");
            var panelObj = '<div id="playerInfo"><div><button type="button" onclick="logout()">Logout</button><div>Logged in as '+usr+'</div></div><button type="button" id="play" onclick="play()">Play</button></div>';
            $('#userPanel').html(panelObj);
        }
        //alert(counter.visits);
	// store value in session
        
        
	
}

/* Good conversion hours to 00:00 format
function Pad(n) {
	n = "00" + n;
	return n.substr(n.length-2);
}*/

function login()
{
    usr = $('#username').val();
    pass = $('#password').val();
    var panelObj = '<div id="playerInfo"><div><button type="button" onclick="logout()">Logout</button><div>Logged in as '+usr+'</div></div><button type="button" id="play" onclick="play()">Play</button></div>';

    Session.set("login", usr);
    Session.set("pass", pass);
    
    $('#userPanel').html(panelObj);
}

function logout()
{
    Session.set("login", "");
    Session.set("pass", "");
    usr = pass = ""; 
    $('#userPanel').html(loginObj);
    $('#content').html(welcObj);
}

function play()
{
    $('#content').html(canObj);
    $('#play').remove();
    $('#playerInfo').append('<button type="button" onclick="nextRoom()">Change room</button>');
    $('#userPanel').append(sendAnswerObj);
    
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    
    canvas.addEventListener('mousemove', function(evt) {
        var mousePos = getMousePos(canvas, evt);
        mPos =  mousePos.x + ',' + mousePos.y;
        
      }, false);
    
   setInterval(redraw, 300);
}

 function getMousePos(canvas, evt) {
        var rect = canvas.getBoundingClientRect();
        return {
          x: evt.clientX - rect.left,
          y: evt.clientY - rect.top
        };
      }

function register()
{
     $('#userPanel').html(regisObj);

}

function submitRegister()
{
    
}

function nextRoom()
{
    
}

function loadLogin()
{
    $("#userPanel").html(loginObj);
}

/*
                            
 */
// initialize application defaults



function redraw(degs){
    ctx.save();
    ctx.clearRect(0, 0, canW, canH);
    ctx.globalAlpha=1;                

    draw();
    ctx.restore();
}

function draw() {
  
  drawPlayer(20,350,"rgb(200,0,0)");
  drawPlayer(220,350,"rgb(200,200,0)");
  drawPlayer(420,350,"rgb(200,0,200)");
  
  ctx.fillStyle = "rgba(0, 0, 200, 0.5)";
  ctx.fillRect (50, 30, 55, 50);
  
  ctx.font = "15px Arial";
  ctx.fillText("Mouse " + mPos, 450, 60);
  ctx.font = "20px Arial";
  ctx.fillText("Visits " + (iterator), 450, 30);

  
  ctx.fillText("Dog", 200, 50);
  
  ctx.fillText("1. Has tail", 200, 100);
  
  ctx.fillText("2. ?", 200, 150);
  
  ctx.fillText("3. ?", 200, 200);
  
  ctx.fillText("4. ?", 200, 250);
}

function drawPlayer(x,y,col)
{
    
    ctx.fillStyle = col;
    ctx.fillRect (x, y, 60, 60);
    
    ctx.font = "10pt Arial";
    ctx.fillText("Name 1", x, y+80);
    ctx.fillText("250 Points", x, y-10);
    
    ctx.fillText("Guesses", x+80, y-10);
    ctx.fillText("1: ", x+80, y+20);
    ctx.fillText("2: ", x+80, y+45);
    ctx.fillText("3: ", x+80, y+70);
}

