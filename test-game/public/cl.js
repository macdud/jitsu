var socket = null;

window.onload = function () {
    // Connect to socket.io
    socket = io.connect();

    // React to a received message
    socket.on('ping', function (data) {

    var dat = data.msg;
    var output = document.getElementById("roomList").innerHTML;
    output = "<p class='smallHeader'>Room list</p>";
    
    if(data.db == "Not connected")
       alert("Db error");

      // Modify the DOM to show the message

      for(var i=0;i<dat.length;i++)
                        output += "<p class='item-list' name='Room_"+i.toString()+"' onclick='clickRoom()'>" + "Room " + i + ": " + dat[i].id + " " + dat[i].players.length + " players." + "</p>" ;

      document.getElementById("roomList").innerHTML = output;
      // Send a message back to the server
      sendMessage("handshake","");
    });
};
          
function clickRoom()
{
  var a = event.target;
  alert(a.getAttribute("name"));
}

function sendMessage(t,d)
{
    socket.emit('clientMessage', {type: t,inf:d});
}