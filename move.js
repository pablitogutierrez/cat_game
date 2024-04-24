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

let btn_p = document.getElementById('btn-p');
let btn_c = document.getElementById('btn-c');
let btn_s = document.getElementById('btn-s');
let title = document.getElementById('title');

btn_p.addEventListener('click', () => { 
    btn_p.classList.add('hide-down');
    btn_c.classList.add('hide-up');
    btn_s.classList.add('hide-up');
    title.classList.add('hide-up');
})