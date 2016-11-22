class SnakeGame extends AGame {
    awake() {
        this._hideStartMenu();
        this._showCanvas();


        this.snake = new Snake();
        this.food = new Food();
        this.food.respawn(this.snake);
    }


    _showStartMenu() {
        const startMenu = document.getElementById("startMenu");
        startMenu.style.display = "block";
    }


    _hideStartMenu() {
        const startMenu = document.getElementById("startMenu");
        startMenu.style.display = "none";
    }


    _showCanvas() {
        const canvas = document.getElementById("canvas");
        canvas.style.opacity = "1";
    }


    _hideCanvas() {
        const canvas = document.getElementById("canvas");
        canvas.style.opacity = "0";
    }


    // Appeler la bonne fonction pour tourner à gauche ou
    // à droite en fonction de la touche appuyée
    keyDown(keyCode){
        if(keyCode === 39)
            this.snake.turnRight();

        if(keyCode === 37)
            this.snake.turnLeft();
    }


    update() {
        this.snake.forward();

        // Faire grandir le serpent et bouger la pomme
        if (this.snake.isPointOnHead(this.food.pos)) {
            this.snake.grow();
            this.food.respawn(this.snake);
            console.log("miam");
        }
    }


    draw() {
        this.context.clearRect(0, 0, canvas.width, canvas.height);
        this.snake.renderTo(this.context);
        this.food.renderTo(this.context);
    }
}