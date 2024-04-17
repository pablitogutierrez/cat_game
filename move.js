window.onload = () =>{
    const cat = {
        element : document.getElementById('cat'),
        leftPosition : 0,
        step : 15,
        move : function(direction){
            switch(direction){
                case "ArrowRight":
                    this.leftPosition += this.step;
                    this.element.style.left = this.leftPosition + "px"; // Update left position
                    break;
                case "KeyD":
                    this.leftPosition += this.step;
                    this.element.style.left = this.leftPosition + "px"; // Update left position
                    break;
                case "ArrowLeft":
                    this.leftPosition -= this.step;
                    this.element.style.left = this.leftPosition + "px"; // Update left position
                    break;
                case "KeyA":
                    this.leftPosition -= this.step;
                    this.element.style.left = this.leftPosition + "px"; // Update left position
                    break;
                default:
                    break;
            }
        }
    };

    onkeydown = (key) => {
        cat.move(key.code);
    };
};
