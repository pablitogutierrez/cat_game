let btn_p = document.getElementById('btn-p');
let btn_c = document.getElementById('btn-c');
let btn_s = document.getElementById('btn-s');
let title = document.getElementById('title');

let menu_c = document.getElementById('menu-c');
let btn_skip_c = document.getElementById('btn-skip-c');

let menu_s = document.getElementById('menu-s');
let btn_skip_s = document.getElementById('btn-skip-s');

let audio = document.getElementById('audio');

let btn_mute = document.querySelector('.img-mute');

window.addEventListener('DOMContentLoaded', () => {
    if(localStorage.getItem('music') === null) {
        localStorage.setItem('music', 'true');
    }

    if(localStorage.getItem('color') === null){
        localStorage.setItem('color', 'false');
    }

    if(localStorage.getItem('color') === 'true'){
        btn_mute.classList.add('color');
    } else {
        btn_mute.classList.remove('color');
    }
});

btn_mute.addEventListener('click', () => {
    if (localStorage.getItem('music') === 'true') {
        localStorage.setItem('color', 'true');
        localStorage.setItem('music', 'false');
        btn_mute.classList.add('color');
    } else {
        localStorage.setItem('color', 'false');
        localStorage.setItem('music', 'true');
        btn_mute.classList.remove('color');
    }
});

btn_p.addEventListener('click', () => { 
    btn_p.classList.add('hide-down');
    btn_c.classList.add('hide-up');
    btn_s.classList.add('hide-up');
    title.classList.add('hide-up');
    
    if(localStorage.getItem('music') === 'false'){
        audio.muted = true;
    } else {
        audio.muted = false;
        audio.play();
    }

    const cat = {
        element: document.getElementById('cat'),
        leftPosition: 0,
        step: 15,
        move: function(direction) {
            switch (direction) {
                case "ArrowRight":
                case "KeyD":
                    this.leftPosition += this.step;
                    this.element.style.left = this.leftPosition + "px";
                    break;
                case "ArrowLeft":
                case "KeyA":
                    this.leftPosition -= this.step;
                    this.element.style.left = this.leftPosition + "px";
                    break;
                default:
                    break;
            }
        }
    };

    onkeydown = (key) => {
        cat.move(key.code);
    };
});

btn_c.addEventListener('click', () => {
    btn_s.classList.toggle('hide-up');
    menu_c.classList.toggle('show-menu');
});

btn_skip_c.addEventListener('click', () => {
    btn_c.classList.remove('hide-up');
    btn_s.classList.remove('hide-up');
    menu_c.classList.remove('show-menu');
});

btn_s.addEventListener('click', () => {
    btn_c.classList.toggle('hide-up');
    menu_s.classList.toggle('show-menu');
});

btn_skip_s.addEventListener('click', () => {
    btn_c.classList.remove('hide-up');
    btn_s.classList.remove('hide-up');
    menu_s.classList.remove('show-menu');
});