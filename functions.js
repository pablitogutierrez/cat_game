let btn_p = document.getElementById('btn-p');
let btn_c = document.getElementById('btn-c');
let btn_s = document.getElementById('btn-s');
let btn_mute = document.querySelector('.img-mute');

let title = document.getElementById('title');

let menu_c = document.getElementById('menu-c');
let btn_skip_c = document.getElementById('btn-skip-c');

let menu_s = document.getElementById('menu-s');
let btn_skip_s = document.getElementById('btn-skip-s');

let audio = document.getElementById('audio');

let cats = document.querySelectorAll('.skin-cat-1, .skin-cat-2');
let cats_screen = document.querySelectorAll('.cat-img');
let array_cats = ['cat-1'];

// Obtener el canvas y su contexto
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// Ajustar el tamaño del canvas al tamaño de la ventana
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Crear una nueva imagen de pescado
const imgPescado = new Image();
imgPescado.src = './img/fish.png'; // Ruta de la imagen del pescado

// Propiedades del pescado
let pescado = {
    x: Math.random() * canvas.width,    // Posición inicial en el centro horizontal
    y: -100,                // Posición inicial arriba del canvas
    velocidad: 4,           // Velocidad de caída del pescado      
};

// Función para dibujar el pescado en una posición específica
function drawFish() {
    ctx.drawImage(imgPescado, pescado.x, pescado.y, 80, 40);
}

// Función para animar la caída del pescado
function animateFish() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Limpiar el canvas

    // Actualizar posición del pescado
    pescado.y += pescado.velocidad;

    // Dibujar el pescado en su nueva posición
    drawFish();

    // Si el pescado sale del canvas, reiniciar posición y posición X aleatoria
    if (pescado.y > canvas.height) {
        pescado.y = -100; // Reiniciar en la parte superior
        pescado.x = Math.random() * canvas.width; // Posición aleatoria en el ancho del canvas
    }

    // Solicitar siguiente frame de animación
    requestAnimationFrame(animateFish);
}

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
                Swal.fire({
                    title: '¡Qué mal!',
                    text: 'No tienes suficientes monedas',
                    icon: 'error',
                    showConfirmButton: false,
                    timer: 2500,
                    background: '#111',
                    iconColor: '#FF3333',
                    color: '#fff',
                });
            } else {
                coins -= pValue;
                document.getElementById('coins').textContent = coins;
                localStorage.setItem('coins', coins);
    
                if(!array_cats.includes(e.id)){
                    array_cats.push(e.id);
                    localStorage.setItem('cats', JSON.stringify(array_cats));
                }

                Swal.fire({
                    title: '¡Felicidades!',
                    text: '¡Has obtenido un nuevo gato!',
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 2500,
                    background: '#111',
                    iconColor: '#33FF3F',
                    color: '#fff',
                });

                check_cats();
                check_selected();
            }
        } else {
            localStorage.setItem('cat-selected', e.id);
            
            check_selected();
        }
    });
});

//Al cargar el contenido de la pagina se debe setear todo para que funcione correctamente
document.addEventListener('DOMContentLoaded', () => {
    if(localStorage.getItem('coins') === null){
        localStorage.setItem('coins', 0);
        document.getElementById('coins').textContent = localStorage.getItem('coins');
    } else {
        document.getElementById('coins').textContent = localStorage.getItem('coins');
    }

    if(localStorage.getItem('cat-selected') === null){
        localStorage.setItem('cat-selected', 'cat-1');
        localStorage.setItem('cats', JSON.stringify(array_cats));
    } else {
        array_cats = JSON.parse(localStorage.getItem('cats'));
    }

    if(localStorage.getItem('mute') === null) {
        localStorage.setItem('mute', 'false');
    }

    if(localStorage.getItem('color') === null){
        localStorage.setItem('color', 'false');
    }

    if(localStorage.getItem('color') === 'true'){
        btn_mute.classList.add('color');
    } else {
        btn_mute.classList.remove('color');
    }

    check_cats();
    check_selected();

    // Ejecuta la función para iniciar el movimiento aleatorio del gato
    cat.startAutoMove();
});


const cat = {
    element: document.querySelector('.cat'),
    container: document.querySelector('.container-principal'),
    leftPosition: 0,
    step: 25,
    updateInterval: null, // Variable para almacenar el intervalo de actualización

    startAutoMove: function() {
        this.updateInterval = setInterval(() => {
            const randomNumber = Math.random(); // Genera un número aleatorio entre 0 y 1

            // Cambia la dirección del movimiento aleatoriamente
            if (randomNumber < 0.5) {
                this.move('right');
            } else {
                this.move('left');
            }
        }, 500); // Intervalo de actualización en milisegundos (ajusta según sea necesario)
    },

    stopAutoMove: function() {
        clearInterval(this.updateInterval);
    },

    move: function(direction) {
        const containerWidth = this.container.offsetWidth;
        const catWidth = this.element.offsetWidth;

        switch (direction) {
            case "right":
                if (this.leftPosition + this.step + catWidth <= containerWidth) {
                    this.leftPosition += this.step;
                    this.element.style.left = this.leftPosition + "px";
                    this.element.classList.remove('change-direction');
                }
                break;
            case "left":
                if (this.leftPosition - this.step >= 0) {
                    this.leftPosition -= this.step;
                    this.element.style.left = this.leftPosition + "px";
                    this.element.classList.add('change-direction');
                }
                break;
            default:
                break;
        }
    }
};

btn_p.addEventListener('click', () => { 
    btn_p.classList.add('hide-down');

    btn_c.classList.add('hide-up');
    btn_s.classList.add('hide-up');
    title.classList.add('hide-up');
    
    if(localStorage.getItem('mute') === 'true'){
        audio.muted = true;
    } else {
        audio.muted = false;
        audio.play();
    }

    cat.stopAutoMove();

    const cat_move = {
        element: document.querySelector('.cat'),
        leftPosition: cat.leftPosition,
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
                        this.element.classList.remove('change-direction');
                    }
                    break;
                case "ArrowLeft":
                case "KeyA":
                    if (this.leftPosition - this.step >= 0) {
                        this.leftPosition -= this.step;
                        this.element.style.left = this.leftPosition + "px";
                        this.element.classList.add('change-direction');
                    }
                    break;
                default:
                    break;
            }
        }
    };

    onkeydown = (key) => {
        cat_move.move(key.code);
    };

    animateFish();
});

btn_mute.addEventListener('click', () => {
    if (localStorage.getItem('mute') === 'false') {
        localStorage.setItem('color', 'true');
        localStorage.setItem('mute', 'true');
        btn_mute.classList.add('color');
    } else {
        localStorage.setItem('color', 'false');
        localStorage.setItem('mute', 'false');
        btn_mute.classList.remove('color');
    }
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

