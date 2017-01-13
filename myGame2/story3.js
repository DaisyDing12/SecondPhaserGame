/*global game phaser game_state3 */
game_state.story3 = function() {};

game_state.story3.prototype = {
    preload: function(){
        game.load.image('crash', 'assets/crash.png');
    },
    create: function(){
        this.crash = game.add.sprite(0, 0, 'crash');
        this.text1 = game.add.text(16, 60, 'Oh no! \n You crashed into too many meteriods.\n Maybe next time.', {
            fontSize: '32px',
            fill: '#ffffff'
        });
        
        setTimeout(function(){
         game.state.start("main");
         }, 8000);
    },
    update: function(){
        
    },
    
};

game.state.add('story3', game_state.story3);
// game.state.start('story3');