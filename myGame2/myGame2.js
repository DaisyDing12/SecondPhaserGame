/*global Phaser*/

var game = new Phaser.Game(800, 600, Phaser.AUTO, '');
var game_state = {};

game_state.main = function() {};
game_state.main.prototype = {

    preload: function() {
        game.load.spritesheet('player', 'assets/player.png', 96, 96);
        game.load.image('object', 'assets/object.png');
        game.load.image('sky', 'assets/sky.png');
        game.load.image('meteoroid', 'assets/meteoroids.png');

    },

    create: function() {
        game.add;
        // Start the Arcade system function (for movements and collision)
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.add.sprite(0, 0, 'sky');
        // Add the player at the bottem of the screen
        this.player = game.add.sprite(200, 400, 'player');
        // We need to enable the physics on this.player
        game.physics.arcade.enable(this.player);
        // Enable body on player
        this.player.enableBody = true;
        
        this.player.body.setSize(70, 100, 13, 0);
        
        // Make sure your player won't move if it hits the ball
        this.player.body.immovable = true;
        // Create the left/right arrow keys
        this.left = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
        this.right = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
        // Create the up arrow key
        this.up = game.input.keyboard.addKey(Phaser.Keyboard.UP);
        // Create the down arrow key
        this.down = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
        // Create object group
        this.objects = game.add.group();
        //Enable body for all objects in this group
        this.objects.enableBody = true;
        // Anchorthis object to_this varible
        var _this = this;
        // Create objects over time
        setInterval(function() {
            // Create an object at the top of the screen at a random x
            var object = _this.objects.create(Math.random() * 800, -64, 'object');
            // Let gravity do its thing
            object.body.gravity.y = 300;
        }, 1000); // 1000 = 1000ms = 1 second
        this.scoreText = game.add.text(16, 16, 'Score: 0', {
            fontSize: '32px',
            fill: '#ffffff'
        });
        this.score = 0;

        this.meteoroids = game.add.group();
        this.meteoroids.enableBody = true;
        for (var i = 0; i < 12; i++) {
            var meteoroid = this.meteoroids.create(i * 180, 0, 'meteoroid');
            meteoroid.body.gravity.y = 90;
            meteoroid.body.bounce.y = 0.7 + Math.random() * 0.2;
            this.player.body.collideWorldBounds = true;
            
            this.player.body.setSize(40, 20, 0, 0);
            

        }



    },

    update: function() {
        // game.debug.body(this.player)
         this.meteoroids.forEach(function(item){
            // game.debug.body(item);
        })
        
        
        // Move the player left/right when an arrow key is pressed
        if (this.left.isDown) {
            this.player.body.velocity.x = -300;
        }
        else if (this.right.isDown) {
            this.player.body.velocity.x = 300;
        }
        else if (this.up.isDown) {
            this.player.body.velocity.y = -300;
        }
        else if (this.down.isDown) {
            this.player.body.velocity.y = 300;
        }
        // Stop the player when no key is pressed
        else {
            this.player.body.velocity.x = 0;
            this.player.body.velocity.y = 0;
        }
        // Collisions between the player and the object
        game.physics.arcade.overlap(this.player, this.objects, this.hitobject, null, this);
        game.physics.arcade.overlap(this.player, this.meteoroids, this.hitMeteor, null, this);

        // game.physics.arcade.overlap(this.player, this.meteoroids, this.avoidmeteoroids, null, this);
        // game.physics.arcade.overlap(this.player, this.meteoroids, this.avoidmeteoroids, null, this);
    
        if (this.score >= 46){
          game.state.start('story');      
        }
        if (this.score <= -50){
              game.state.start('story3');
        }
        

    },
    hitMeteor: function(player, meteor) {
        meteor.kill();
        for (var i = 0; i < 12; i++) {
            var meteoroid = this.meteoroids.create(i * 160, 0, 'meteoroid');
            meteoroid.body.gravity.y = 90;
            meteoroid.body.bounce.y = 0.7 + Math.random() * 0.2;
        }


        this.score--;
        this.scoreText.text = "Points" + this.score;





    },
    hitobject: function(player, object) {
        object.kill();
        this.score++;
        this.scoreText.text = "Points " + this.score;
        if (this.score % 5 === 0) {
            for (var i = 0; i < 12; i++) {
                var meteoroid = this.meteoroids.create(i * 160, 0, 'meteoroid');
                meteoroid.body.gravity.y = 90;
                meteoroid.body.bounce.y = 0.7 + Math.random() * 0.2;
            }
        }
    },
    //scoreText.text = game.add.text( 16, 16, 'score: 0',{ fontSize: '32px',fill: '#000' });


    avoidmeteoroids: function(player, meteoroids) {
        meteoroids.kill();

    }
};

game.state.add('main', game_state.main);
// game.state.start('main');