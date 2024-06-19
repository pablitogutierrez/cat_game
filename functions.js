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

let cats = document.querySelectorAll('.skin-cat-1, .skin-cat-2');

let cats_screen = document.querySelectorAll('.cat-img');

let first_cat = document.querySelector('.skin-cat-1');

let array_cats = [];

let btn_money = document.getElementById('btn-money');

btn_money.addEventListener('click', () => {
    localStorage.setItem('coins', parseInt(localStorage.getItem('coins'), 10) + 1000);
    console.log(localStorage.getItem('coins'));
});

function check_cats(){
    cats.forEach(e => {
        if(localStorage.getItem('cats').includes(e.id)){
            e.querySelector('span').style.display = 'none';
            e.classList.add('color');
        }
    });
}

function check_selected(){
    cats.forEach(e => {
        if(e.id != localStorage.getItem('cat-selected')){
            e.querySelector('.fingerprint').style.display = 'none';
            
        } else {
            e.querySelector('.fingerprint').style.display = 'block';
        }
    });

    cats_screen.forEach(e => {
        if(localStorage.getItem('cat-selected') != e.id){
            e.style.display = 'none';
        } else {
            e.style.display = 'block';  
        }
    });
}

cats.forEach(e =>{
    e.addEventListener('click', () => {
        if(!localStorage.getItem('cats').includes(e.id)){
            let coins = parseInt(document.getElementById('coins').textContent, 10);
            let pValue = parseInt(e.querySelector('p').textContent, 10);
    
            if(coins < pValue){
                alert('No tiene dinero suficiente.');
            } else {
                coins -= pValue;
                document.getElementById('coins').textContent = coins;
                localStorage.setItem('coins', coins);
    
                if(!array_cats.includes(e.id)){
                    array_cats.push(e.id);
                    localStorage.setItem('cats', JSON.stringify(array_cats));
                }

                check_cats();
                check_selected();
            }
        } else {
            localStorage.setItem('cat-selected', e.id);
            
            check_selected();
        }
    });
});

window.addEventListener('DOMContentLoaded', () => {
    check_cats();
    check_selected();

    if(localStorage.getItem('coins') == null){
        localStorage.setItem('coins', 0);
        document.getElementById('coins').textContent = localStorage.getItem('coins');
    } else {
        document.getElementById('coins').textContent = localStorage.getItem('coins');
    }

    if(localStorage.getItem('cat-selected') == null){
        localStorage.setItem('cat-selected', first_cat.id);
        array_cats.push(first_cat.id);
        localStorage.setItem('cats', JSON.stringify(array_cats));
    }

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
        element: document.querySelector('.cat'),
        leftPosition: 0,
        step: 15,
        move: function(direction) {
            const container = document.querySelector('.container-principal');
            const containerWidth = container.offsetWidth;
            const catWidth = this.element.offsetWidth;

            switch (direction) {
                case "ArrowRight":
                case "KeyD":
                    if (this.leftPosition + this.step + catWidth <= containerWidth) {
                        this.leftPosition += this.step;
                        this.element.style.left = this.leftPosition + "px";
                    }
                    break;
                case "ArrowLeft":
                case "KeyA":
                    if (this.leftPosition - this.step >= 0) {
                        this.leftPosition -= this.step;
                        this.element.style.left = this.leftPosition + "px";
                    }
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

