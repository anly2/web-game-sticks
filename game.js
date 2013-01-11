game = new Object(); //This is the global class object


game.param = new Object();
game.param.default = new Object();
game.param.default.gridSize = 10;


game.build_grid = function (size, sReturn){
   if (!size)
      size = game.param.default.gridSize;

   var grid_code = '';
   var r, c;

   grid_code += '<table class="game grid">'+"\n";

   for (r=0; r<size; r++){
      grid_code += '   '+'<tr>'+"\n";

      for (c=0; c<size; c++){
         grid_code += '      '+'<td id="'+r+':'+c+'" class="block">'+"\n";
         grid_code += '         '+'<div class="owner"></div>'+"\n";
         grid_code += '         '+'<span class="top    ghost stick" name="stick"></span>'+"\n";
         grid_code += '         '+'<span class="right  ghost stick" name="stick"></span>'+"\n";
         grid_code += '         '+'<span class="bottom ghost stick" name="stick"></span>'+"\n";
         grid_code += '         '+'<span class="left   ghost stick" name="stick"></span>'+"\n";
         grid_code += '      '+'</td>'+"\n";
      }

      grid_code += '   '+'</tr>'+"\n";
   }

   grid_code += '</table>'+"\n";


   if (sReturn)
      return grid_code;


   var grid_container = document.getElementById("grid");

   grid_container.innerHTML = grid_code;
   grid_container.style.marginTop = '-'+(size/2)+'em';
}


game.handle = new Object();

game.handle.stickClicked = function (stick) {
   var si = stick.parentNode.id;
   var coords = si.split(":");

   var sc = stick.className;
   var pos;
   if (sc.indexOf("top")    != -1) pos = 'top';
   if (sc.indexOf("right")  != -1) pos = 'right';
   if (sc.indexOf("bottom") != -1) pos = 'bottom';
   if (sc.indexOf("left")   != -1) pos = 'left';

   stick.className += " marked";

   if (pos=='top') {
      var nsi = ( (coords[0]-1)+":"+(coords[1]) );
      var opositePos = 'bottom';
   }
   if (pos=='right') {
      var nsi = ( (coords[0])+":"+(coords[1]-(-1)) );
      var opositePos = 'left';
   }
   if (pos=='bottom') {
      var nsi = ( (coords[0]-(-1))+":"+(coords[1]) );
      var opositePos = 'top';
   }
   if (pos=='left') {
      var nsi = ( (coords[0])+":"+(coords[1]-1) );
      var opositePos = 'right';
   }

   var nBlock = document.getElementById(nsi);
   if (nBlock) {
      var sticks = nBlock.getElementsByTagName("*");

      var i;
      for (i=0; i<sticks.length; i++) {
         if (sticks[i].className.indexOf("stick") != -1)
            if (sticks[i].className.indexOf(opositePos) != -1)
               sticks[i].className += " marked";
      }
   }

   //Check if it completes a block and assign it to the owner
   game.checkBlock( stick.parentNode );
   if (nBlock)
      game.checkBlock( nBlock );

   //Register the marking
   game.current.player = game.player( (game.current.player.turn-(-1)) % game.players.length );
   game.current.turn++;
}

game.checkBlock = function (block) {
   var sticks = block.getElementsByTagName("*");
   var ms = 0;

   var i;
   for (i=0; i<sticks.length; i++) {
      if (sticks[i].className.indexOf("stick") != -1) {
         if (sticks[i].className.indexOf("marked") != -1)
            ms++;
      } else
      if (sticks[i].className.indexOf("owner") != -1)
         var bOwner = sticks[i];
   }

   if(ms==4 && bOwner) {
      bOwner.innerHTML = game.current.player.mark;

      //LOLOLOL compensation
      block.style.position = 'relative';
      block.style.top = '-0.5em';
   }
}


game.players  = new Array();
game.marks = ['x', 'o', 'z', 'n', 'v', 'f', 'a', 's', 'k']; //and so on

game.players.push(
   {
      mark: game.marks[game.players.length],
      turn: game.players.length,
      name: 'Player '+game.players.length
   }
);
game.players.push(
   {
      mark: game.marks[game.players.length],
      turn: game.players.length,
      name: 'Player '+game.players.length
   }
);


game.current = new Object();

game.current.turn = 0; //default, should be reset by .initialize()
game.current.player = game.players[0]; //default, should be reset by .initialize()

game.player = function (turn) {
   return game.players[turn];
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
}