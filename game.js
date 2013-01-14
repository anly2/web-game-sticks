game = new Object(); //This is the global class object


game.param = new Object();
game.param.gridSize = 10; //default value, should be updated by .build_grid()
game.param.countSticks = 199; //default value for gridSize==10 (2s^2-1),  should be updated by .build_grid()

game.param.default = new Object();
game.param.default.gridSize = 10;


game.build_grid = function (size, sReturn){
   if (!size)
      size = game.param.default.gridSize;

   game.param.gridSize = size;
   game.param.countSticks = size*(size*2 - 2);

   var grid_code = '';
   var r, c;

   grid_code += ''+"\n";

   for (r=0; r<size; r++) {
      grid_code += "\n";

      for (c=0; c<size-1; c++) {
         grid_code += '<div id="'+r+':'+c+'" class="horizontal stick" name="stick"></div>'+"\n";
      }
      grid_code += ' <br /><!-- Complete horizontal row -->'+"\n";

      if (r < size-1) {
         for (c=0; c < size-1; c++) {
            grid_code += '<div id="'+r+'.5:'+c+'" class="vertical stick" name="stick"></div>'+"\n";
            grid_code += '<span id="'+r+'.5:'+c+'-o" class="owner"></span>'+"\n";
         }
         grid_code += '<div id="'+r+'.5:'+c+'" class="vertical stick" name="stick"><!-- Finishing --></div>'+"\n";
         grid_code += ' <br/><!-- Complete vertical row -->'+"\n";
      }
   }


   if (sReturn)
      return grid_code;


   var grid_container = document.getElementById("grid");

   grid_container.innerHTML = grid_code;
   grid_container.style.marginTop = '-'+(size/2)+'em';
}


game.handle = new Object();

game.handle.stickClicked = function (stick) {
   if (stick.className.indexOf("marked") != -1)
      return false;

   var coords = stick.id.split(":");

   var vertical = (coords[0].substr(-2) == '.5');

   if(vertical)
      coords[0] = Math.floor( coords[0] );


   stick.className += " marked";


   //Check if it completes a block and assign it to the owner
   var extraMove = false;

   var rep;
   for (rep=0; rep<2; rep++) {

      if (vertical) { // Vertical
         if (rep == 0) {
            var adj = [
               ( coords[0]       +":"+ (coords[1]-1)),
               ((coords[0]+".5") +":"+ (coords[1]-1)),
               ((coords[0]-(-1)) +":"+ (coords[1]-1))
            ];
            var iOwner = coords[0]+".5:"+(coords[1]-1)+"-o";
         }
         if (rep == 1) {
            var adj = [
               ( coords[0]       +":"+  coords[1]),
               ((coords[0]+".5") +":"+ (coords[1]-(-1))),
               ((coords[0]-(-1)) +":"+  coords[1])
            ];
            var iOwner = coords[0]+".5:"+(coords[1])+"-o";
         }
      } else { //Horizontal
         if (rep == 0) {
            var adj = [
               ((coords[0]-1)      +":"+  coords[1]),
               ((coords[0]-1)+".5" +":"+  coords[1]),
               ((coords[0]-1)+".5" +":"+ (coords[1]-(-1)))
            ];
            var iOwner = (coords[0]-1)+".5:"+(coords[1])+"-o";
         }
         if (rep == 1) {
            var adj = [
               ((coords[0]-(-1)) +":"+  coords[1]),
               ( coords[0] +".5" +":"+  coords[1]),
               ( coords[0] +".5" +":"+ (coords[1]-(-1)))
            ];
            var iOwner = (coords[0])+".5:"+(coords[1])+"-o";
         }
      }


      var cMarked = 0;

      var i;
      for (i=0; i<adj.length; i++) {
         var nStick = document.getElementById( adj[i] );

         if (!nStick)
            continue;

         if (nStick.className.indexOf("marked") != -1)
            cMarked++;
      }

      if (cMarked >= 3) {
         document.getElementById( iOwner ).innerHTML = game.current.player.mark;
         game.current.player.blocks++;
         extraMove = true;
      }
   }

   //Register the marking
   if (!extraMove)
      game.current.player = game.player( (game.current.player.turn-(-1)) % game.players.length );
   game.current.turn++;
   game.current.markedSticks++;

   //Update the notice
   game.notice(0, game.current.player); //.notice(0  -> Y's turn notice

   //Check if the game is over
   if (game.current.markedSticks >= game.param.countSticks) {
      game.notice(1, game.leadingPlayer()); //.notice(1  -> game over notice
   }
}


game.notice = function (msg_code) {
   if (msg_code == 0) {
      //Y's turn notice
      var pr = "<strong>"+arguments[1].name+"</strong>";
      var msg = "It is "+pr+"'s turn";
   }
   if (msg_code == 1) {
      //Y's turn notice
      var msg = "<em>Game Over!</em>"+"\n<br />";
      var pr = "<strong>"+arguments[1].name+"</strong>";
      msg += pr+" has won!";
   }

   document.getElementById("notice").innerHTML = msg;
   return msg;
}


game.players  = new Array();

game.current = new Object();

game.current.turn = 0; //default, should be reset by .initialize()
game.current.player = game.players[0]; //default, should be reset by .initialize()
game.current.markedSticks = 0;

game.player = function (turn) {
   return game.players[turn];
}
game.leadingPlayer = function () {
   var leading = null;
   var m = new Array(); // multitude array for holding equally-leading players

   var i;
   for (i=0; i<game.players.length; i++) {
      if (!leading) {
         leading = game.players[i];
         continue;
      }

      if (leading.blocks < game.players[i].blocks) {
         leading = game.players[i];

         m = new Array(); //clean multitude the array because those guys are not important anymore

         continue;
      }

      if (leading.blocks == game.players[i].blocks) {
         if (m.length == 0)
            m.push( leading );

         m.push( game.players[i] );
      }
   }

   if (m.length > 0)
      return m;

   return leading;
}

game.initialize = function (){
   var sticks = document.getElementsByName('stick');

   var i;
   for (i=0; i<sticks.length; i++) {
      sticks[i].onclick = function () {
         game.handle.stickClicked( eval('this') );
      }
   }

   game.current.player = game.player(0);
   game.current.turn = 0;

   game.notice(0, game.current.player);
}