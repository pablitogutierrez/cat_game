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

let hearts = document.getElementById('hearts');

// Obtener el canvas y su contexto
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// Ajustar el tamaño del canvas al tamaño de la ventana
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Crear una nueva imagen de pescado
const imgFish = new Image();
imgFish.src = './img/fish.png'; // Ruta de la imagen del pescado

const imgStone = new Image();
imgStone.src = './img/stone.jpg';

let objects = [];
let animationIDs = [];

function createObject(type){
    let width, height;
    
    switch(type){
        case 'fish':
            width = 80;
            height = 40;
            break;
        case 'stone':
            width = 90;
            height = 80;
    }
    return {
        x: Math.random() * canvas.width,
        y: -100,
        velocidad: 4,
        type: type,
        width: width,
        height: height,
    }
}

// Función para dibujar el pescado en una posición específica
function drawObject(img, object) {
    ctx.drawImage(img, object.x, object.y, object.width, object.height);
}

// Función para animar la caída del pescado
function animateObjects() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Limpiar el canvas

    objects.forEach((obj, index) => {
        // Actualizar posición del pescado
        obj.y += obj.velocidad;

        let img = obj.type  == 'fish' ? imgFish : imgStone;

        // Dibujar el pescado en su nueva posición
        drawObject(img, obj);

        // Si el pescado sale del canvas, reiniciar posición y posición X aleatoria
        if (obj.y > canvas.height) {
            obj.y = -100; // Reiniciar en la parte superior
            obj.x = Math.random() * canvas.width; // Posición aleatoria en el ancho del canvas
        }

        if(areImagesTouchingCat(obj)){
            switch(obj.type){
                case 'fish':
                    let coins = parseInt(document.getElementById('coins').textContent, 10);
                    coins += 100;
                    document.getElementById('coins').textContent = coins;
                    localStorage.setItem('coins', coins);
                    objects.splice(index, 1);
                    break;
                case 'stone':
                    let heartsImg = hearts.getElementsByTagName('img');
                    if(heartsImg.length > 0){
                        hearts.removeChild(heartsImg[heartsImg.length - 1]);
                        if(heartsImg.length == 0) {
                            stopGame();
                            showGameOver();
                        }
                    }
                    objects.splice(index, 1);
                    break;
            }
        }
    });

    let ID = requestAnimationFrame(animateObjects);
    animationIDs.push(ID);
}

function stopGame() {
    animationIDs.forEach(id => {
        cancelAnimationFrame(id);
    });

    animationIDs = []; // Limpia la lista de IDs almacenados
}

// Función para mostrar el mensaje de Game Over
function showGameOver() {
    Swal.fire({
        title: 'Has perdido',
        text: 'Perdiste todas tus vidas',
        icon: 'error',
        showCancelButton: true,
        confirmButtonText: 'Jugar de nuevo',
        cancelButtonText: 'Volver al inicio',
    }).then((result) => {
        if (result.isConfirmed) {
            location.reload(); 
        } else if (result.dismiss === Swal.DismissReason.cancel) {
            location.reload();
        }
    });
}

function areImagesTouchingCat(obj){
    // Obtener la imagen del gato desde el DOM
    let imgCatRect = document.getElementById(localStorage.getItem('cat-selected')).getBoundingClientRect();
    let objRect = {
        left: obj.x,
        right: obj.x,
        top: obj.y,
        bottom: obj.y
    };

    if(imgCatRect.right < objRect.left || imgCatRect.left > objRect.right || imgCatRect.bottom < objRect.top || imgCatRect.top > objRect.bottom) {
        return false;
    } else {
        return true;
    }
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

//Logica para comprar un gato
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

//Movimiento automático del gato para darle una animación
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
    var speed = 4000;

    btn_p.classList.add('hide_down');

    btn_c.classList.add('hide_up');
    btn_s.classList.add('hide_up');
    title.classList.add('hide_up');

    hearts.classList.add('show_hearts');
    
    if(localStorage.getItem('mute') === 'true'){
        audio.muted = true;
    } else {
        audio.muted = false;
        audio.play();
    }

    setInterval(() => {
        speed -= 1000;
    }, 16000)

    setInterval(() => {
        objects.push(createObject('fish'));
        objects.push(createObject('stone'));
    }, speed);

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

    animateObjects();
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
    btn_s.classList.toggle('hide_up');
    menu_c.classList.toggle('show_menu');
});

btn_skip_c.addEventListener('click', () => {
    btn_c.classList.remove('hide_up');
    btn_s.classList.remove('hide_up');
    menu_c.classList.remove('show_menu');
});

btn_s.addEventListener('click', () => {
    btn_c.classList.toggle('hide_up');
    menu_s.classList.toggle('show_menu');
});

btn_skip_s.addEventListener('click', () => {
    btn_c.classList.remove('hide_up');
    btn_s.classList.remove('hide_up');
    menu_s.classList.remove('show_menu');
});

