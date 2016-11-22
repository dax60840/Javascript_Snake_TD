class SnakeGame extends AGame {
    awake() {
        this._hideStartMenu();
        this._showCanvas();


        this.snake = new Snake();
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


    update() {
        this.snake.forward();
    }


    draw() {
        this.context.clearRect(0, 0, canvas.width, canvas.height);
        this.snake.renderTo(this.context);
    }
}