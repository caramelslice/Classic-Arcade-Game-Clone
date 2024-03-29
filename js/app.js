// Enemies our player must avoid
var Enemy = function(yPos) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';

    // start position of Enemy - x
    this.x = Math.floor(Math.random() * 505);


    //select a random value from yArr above
    // this.y = this.yArr[Math.floor(Math.random() * this.yArr.length)];
    this.y = yPos;
    //set enemy speed 
    this.speed = Math.floor(Math.random()*1000);

};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    this.x += this.speed * dt;

    // reset enemy position when it reaches the right edge
    if (this.x > 505) {
        this.x = -100
        // this.y = this.yArr[Math.floor(Math.random() * this.yArr.length)];
        this.speed = 20;
    }



    if ((this.x > player.x - 30) && (this.x < player.x + 30)  && (this.y < player.y + 30) && (this.y > player.y - 30)) {
        //reset player position after the collision becomes visible
        setTimeout(function() {
            alert("Rest in peace, char boy.");
            player.x = 200;
            player.y = 320;
        }, 5);
    } 
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

const Player = function() {
    // set player initial position
    this.x = 200;
    this.y = 320;
}

Player.prototype.update = function() {
    if (player.y < 40) {
        document.getElementById("congratulations").innerHTML = "Char boy of the day!";
        document.body.style.backgroundImage = "url('images/cheering.gif')";
        player.sprite = 'images/char-boy-king.png';
    } else {
        document.getElementById("congratulations").innerHTML = "";
        document.body.style.backgroundImage = "";
        this.sprite = 'images/char-boy.png';
    }
}

Player.prototype.render = function() {
    // Render the player object on screen
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Player.prototype.handleInput = function(e) {
    // ensure the player does not walk off the sreen
    switch(e) {
        case 'up':
            this.y -= 83;
            if(this.y <= 0) {
                this.y = 0;
            }
            break;
        case 'down':
            this.y += 83;
            if(this.y >= 400) {
                this.y = 400;
            }
            break;
        case 'left':
            this.x -= 70;
            if(this.x <= 0 ) {
                this.x = 0;
            }
            break;
        case 'right':
            this.x += 70;
            if(this.x >= 400) {
                this.x = 400;
            }
            break;
    }


}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

const yArr = [60, 145, 230];
// let allEnemies = [new Enemy(), new Enemy(), new Enemy()];
let allEnemies = [];
const player = new Player();
let enemy;

//ensure the enemies crawl on three seperate lanes
yArr.forEach(function(posY){
    enemy = new Enemy(posY);
    allEnemies.push(enemy);
});

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
