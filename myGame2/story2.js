/* global game phaser game_state */
game_state.story2 = function() {};
game_state.story2.prototype = {

    preload: function(){
        
      game.load.image('sky', 'assets/rocketLaunch.png');
        
    },
    create: function(){
        this.sky = game.add.sprite(0, 0, 'sky');
        
        this.text1 = game.add.text(16, 60, 'Welcome to \n Meteorite Mania', {
            fontSize: '32px',
            fill: '#ffffff'
        });
      
    var _this = this;

        // Create objects over time
        setTimeout(function() {
            _this.text1.text = "Welcome to \n Meteorite Mania";
            _this.text2.text = ""
        }, 3000) // 1000 = 1000ms = 1 second 

        setTimeout(function() {
            _this.text1.text = "NASA is in need of samples from the moon\n and needs your help to safely get to the moon \n and return home with samples of the moon.\n Good Luck!!!!! ";
            _this.text2.text = "";
        }, 12000) // 1000 = 1000ms = 1 second 

        setTimeout(function() {
            game.state.start("main");
        }, 12000) // 1000 = 1000ms = 1 second 
    
    
      
    },
    update: function(){
        
    }
}


game.state.add('story2', game_state.story2);
game.state.start('story2');