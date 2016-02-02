/* node UPNP port forwarding PoC

This is a simple way to forward ports on NAT routers with UPNP.

This is a not-for-production hack that I found useful when testing apps
on my home network behind ny NAT router.

-satori / edited by smolleyes for freebox v6

usage: (install/clone node-ip from https://github.com/indutny/node-ip)

================================================================================
*/
var upnp = require("./upnp.js");
var myIp = require("./node-modules/ip/lib/ip.js").address();

var gui = window.require('nw.gui');
if (process.platform === "darwin") {
  var mb = new gui.Menu({type: 'menubar'});
  mb.createMacBuiltin('Forwardus');
  gui.Window.get().menu = mb;
}

var timeout = 15000; //ms
var lastValue = '';
$("#portLocal").on('change keyup paste mouseup', function() {
  if($('#lock-ports').is(":checked"))
  $("#portExternal").val($(this).val());
});
$("#portExternal").on('change keyup paste mouseup', function() {
  if($('#lock-ports').is(":checked"))
  $("#portLocal").val($(this).val());
});
$("#lock-ports").on('change keyup paste mouseup', function() {
  if($('#lock-ports').is(":checked"))
  $("#portExternal").val($("#portLocal").val());
});
function createToast(message) {
  var snackbar = document.createElement('div'),
      text = document.createElement('div');
  snackbar.classList.add('mdl-snackbar');
  text.classList.add('mdl-snackbar__text');
  text.innerText = message;
  snackbar.appendChild(text);
  document.body.appendChild(snackbar);
  // Remove after 10 seconds
  setTimeout(function(){
    snackbar.remove();
  }, 10000);
}

$( "#applyButton" ).click(function() {
  forward();
});

function forward() {
  var notification = document.querySelector('.mdl-js-snackbar');
  notification.MaterialSnackbar.showSnackbar(
    {
      message: 'Forwarding...'
    }
  );
  upnp.searchGateway(timeout, function(err, gateway) {

    if (err) throw err;


    gateway.getExternalIP(function(err, ip) {

      if (err) throw err;

      console.log(ip);
      console.log("Mapping port 8888->"+myIp+":8888 ... ");

      gateway.AddPortMapping(
          "TCP"               // or "UDP"
        , parseInt($("#portExternal").val(), 10)                  // External port
        , parseInt($("#portInternal").val(), 10)               // Internal Port
        , myIp       // Internal Host (ip address of your pc)
        , $("#description").val()     // Description.
        , function(err) {

        if (err) {
          var notification = document.querySelector('.mdl-js-snackbar');
          notification.MaterialSnackbar.showSnackbar(
            {
              message: 'An error occured.'
            }
          );
          console.log (err);
          return;
        }
        var notification = document.querySelector('.mdl-js-snackbar');
        notification.MaterialSnackbar.showSnackbar(
          {
            message: 'Forwarded port successfully.'
          }
        );

      });


    });

  });
}
