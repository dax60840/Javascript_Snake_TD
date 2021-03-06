class SnakeGame extends AGame {
    awake() {
        this._hideStartMenu();
        this._showCanvas();


        this.snake = new Snake();
        this.food = new Food();
        this.score = new ScoreText();

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
        if(!this.snake.forward())
            this.destroy();

        // Faire grandir le serpent et bouger la pomme
        if (this.snake.isPointOnHead(this.food.pos)) {
            this.snake.grow();
            this.food.respawn(this.snake);
            this.score.inc();
        }
    }

   onDestroy() {
        const lastScore = this.score.getScore();
        localStorage.setItem("last_score", lastScore);
        StartScreenManager.updateLastScore(lastScore);


        // Enregistrer le meilleur score dans le localStorage de
        // la même manière que pour le dernier score ci dessus.
        // Appeler l'element "best_score" dans le localStorage.
        // Pensez également à mettre à jour le StartScreenManager.

        const bestScore = localStorage.getItem("best_score");
        //console.log("lastScore:" + lastScore + " bestScore:" + bestScore);

        if(lastScore > bestScore){
            var newBestScore = lastScore;
            localStorage.setItem("best_score", newBestScore);
        }
        StartScreenManager.updateBestScore(newBestScore);

        this._hideCanvas();
        this._showStartMenu();
   }

    draw() {
        this.context.clearRect(0, 0, canvas.width, canvas.height);
        this.snake.renderTo(this.context);
        this.food.renderTo(this.context);
        this.score.renderTo(this.context);
    }
}