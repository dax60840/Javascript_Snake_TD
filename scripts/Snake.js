class Snake {
    constructor() {
        this.body = [{x: (300 / TILE_SIZE) / 2, y: 2}, {x: (300 / TILE_SIZE) / 2, y: 1}];
        this.angle = 0;
    }


    _popOldTail() {
        this.body.pop();
    }


    _spawnNewHead(head) {
        this.body.unshift(head);
    }


    _getHead() {
        return this.body[0];
    }


   // Modifier l'angle de 90° à gauche
   turnLeft() {
       this.angle -= Math.PI/2;
   }


   // Modifier l'angle de 90° à droite
   turnRight() {
       this.angle += Math.PI/2;
   }


    forward() {
        const delta = {
            x: Math.round(-MOVEMENT_SPEED * Math.sin(this.angle)),
            y: Math.round(MOVEMENT_SPEED * Math.cos(this.angle))
        };
        const head = this._getHead();
        const newHead = {x: head.x + delta.x, y: head.y + delta.y};

        if(this.isPointOnBody(newHead))
            console.log("perdu");

        this._spawnNewHead(newHead);
        this._popOldTail();
    }


    // Grandir le serpent d'une case
    grow() {
        var growHead = {
            x: this.body[0].x,
            y: this.body[0].y
        };
        this._spawnNewHead(growHead);
    }


    // Le point est-il sur la tête du serpent ?
    isPointOnHead(point) {
        //console.log("foodx=" + point.x + " foody=" + point.y + " headx=" + this._getHead().x + " heady=" + this._getHead().y);
        if(point.x === this._getHead().x && point.y === this._getHead().y)
            return true;
        return false;
    }


    // Le point est-t-il n'importe où sur le serpent (y compris la tête) ?
    isPointOnBody(point) {
        for(var i =0; i<this.body.length; i++){
            if(this.body[i].x === point.x && this.body[i].y === point.y)
                return true;
        }
        return false;
    }


    renderTo(context) {
        context.save();
        context.fillStyle = `#ffffff`;
        this.body.forEach((node) => {
            context.fillRect(node.x * TILE_SIZE, node.y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
    });
        context.restore();
    }
}