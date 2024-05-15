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

let menu_c = document.getElementById('menu-c');
let btn_skip_c = document.getElementById('btn-skip-c');

let menu_s = document.getElementById('menu-s');
let btn_skip_s = document.getElementById('btn-skip-s');

btn_p.addEventListener('click', () => { 
    btn_p.classList.add('hide-down');
    btn_c.classList.add('hide-up');
    btn_s.classList.add('hide-up');
    title.classList.add('hide-up');
})

btn_c.addEventListener('click', () => {
    btn_s.classList.toggle('hide-up');
    menu_c.classList.toggle('show-menu');
})

btn_skip_c.addEventListener('click', () => {
    btn_c.classList.remove('hide-up');
    btn_s.classList.remove('hide-up');
    menu_c.classList.remove('show-menu');
})

btn_s.addEventListener('click', () => {
    btn_c.classList.toggle('hide-up');
    menu_s.classList.toggle('show-menu');
})

btn_skip_s.addEventListener('click', () => {
    btn_c.classList.remove('hide-up');
    btn_s.classList.remove('hide-up');
    menu_s.classList.remove('show-menu');
})
