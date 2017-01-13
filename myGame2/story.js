/*global game phaser game_state */
game_state.story = function() {};

game_state.story.prototype = {
    
    preload: function(){
        game.load.spritesheet('astronaut', 'assets/astronaut.png', 96, 96);
        game.load.image('flag', 'assets/flag.png');
        game.load.image('ship', 'assets/ship.png');
        game.load.image('moon', 'assets/moon.png');
    },
    
    
    create: function(){
        this.moon = game.add.sprite(0, 0, 'moon');
        this.astronaut = game.add.sprite(150, 350, 'astronaut');
        this.flag = game.add.sprite(50, 350, 'flag');
        this.ship = game.add.sprite(600, 400, 'ship');
        
        game.add.text(16, 16, 'Congratulations!!!!! You have \nsuccessfully landed on the moon', {
            fontSize: '32px',
            fill: '#30a5ff'
            });
            setTimeout(function(){
             game.state.start("main");
         }, 8000);
    },
   
   
    update: function(){
    }
    
};

game.state.add('story', game_state.story);
// game.state.start('story');