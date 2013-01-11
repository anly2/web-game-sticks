<html>
<head>
   <title>Sticks Game</title>

   <script type="text/javascript" src="game.js"></script>
   <link rel="stylesheet" href="game.css" />

   <style type="text/css">
   #grid{
      position: absolute;
      top: 50%;
      left: 0%;
      width: 100%;
      text-align: center;

      font-size: 22px;
   }
   #grid{
      margin-top: -6em;
   }
   </style>
</head>
<body>

   <div id="grid"></div>

   <div id="notice"></div>

</body>

<script type="text/javascript">
game.build_grid();
game.initialize();
</script>

</html>