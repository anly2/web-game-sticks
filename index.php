<html>
<head>
   <title>Sticks Game</title>

   <script type="text/javascript" src="game.js"></script>
   <link rel="stylesheet" href="game.css" />

   <style type="text/css">
   .container{
      position: absolute;
      top: 50%;
      left: 0%;
      width: 100%;
      text-align: center;
   }
   #grid{
      font-size: 20px;
      margin-top: -6em;
   }
   </style>
</head>
<body>

<div class="container">

   <div id="grid">
      <div id="0:0" class="horizontal stick"></div>
      <div id="0:1" class="horizontal stick"></div>
      <div id="0:2" class="horizontal stick"></div>
      <div id="0:3" class="horizontal stick"></div>
      <div id="0:4" class="horizontal stick"></div>
      <br /><!-- Line Break and rotate -->
      <div id="0.5:0" class="vertical stick"></div>
      <span id="1.5:0-o" class="owner"></span>
      <div id="0.5:1" class="vertical stick"></div>
      <span id="1.5:1-o" class="owner"></span>
      <div id="0.5:2" class="vertical stick"></div>
      <span id="1.5:2-o" class="owner"></span>
      <div id="0.5:3" class="vertical stick"></div>
      <span id="1.5:3-o" class="owner"></span>
      <div id="0.5:4" class="vertical stick"></div>
      <span id="1.5:4-o" class="owner"></span>
      <div id="0.5:5" class="vertical stick"><!-- Finishing --></div>
      <br/><!-- Line Break and reset -->

      <div id="1:0" class="horizontal stick"></div>
      <div id="1:1" class="horizontal stick"></div>
      <div id="1:2" class="horizontal stick"></div>
      <div id="1:3" class="horizontal stick"></div>
      <div id="1:4" class="horizontal stick"></div>
      <br /><!-- Line Break and rotate -->
      <div id="1.5:0" class="vertical stick"></div>
      <span id="1.5:0-o" class="owner">x</span>
      <div id="1.5:1" class="vertical stick"></div>
      <span id="1.5:1-o" class="owner">o</span>
      <div id="1.5:2" class="vertical stick"></div>
      <span id="1.5:2-o" class="owner">x</span>
      <div id="1.5:3" class="vertical stick"></div>
      <span id="1.5:3-o" class="owner">o</span>
      <div id="1.5:4" class="vertical stick"></div>
      <span id="1.5:4-o" class="owner">x</span>
      <div id="1.5:5" class="vertical stick"><!-- Finishing --></div>
      <br /><!-- Line Break and reset -->

      <div id="1:0" class="horizontal stick"></div>
      <div id="1:1" class="horizontal stick"></div>
      <div id="1:2" class="horizontal stick"></div>
      <div id="1:3" class="horizontal stick"></div>
      <div id="1:4" class="horizontal stick"></div>
      <!-- Finishing -->
   </div>

   <div id="notice"></div>

</div>

</body>

<script type="text/javascript">
//The below should be PHP generated
game.marks = ['x', 'o', 'z', 'n', 'v', 'f', 'a', 's', 'k']; //and so on
game.players.push(
   {
      mark: game.marks[game.players.length],
      turn: game.players.length,
      name: 'Player '+(game.players.length+1)+' ('+game.marks[game.players.length]+')',
      blocks: 0
   }
);
game.players.push(
   {
      mark: game.marks[game.players.length],
      turn: game.players.length,
      name: 'Player '+(game.players.length+1)+' ('+game.marks[game.players.length]+')',
      blocks: 0
   }
);
</script>

<script type="text/javascript">
game.build_grid(7);
game.initialize();
</script>

</html>