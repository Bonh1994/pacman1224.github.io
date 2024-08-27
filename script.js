const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const canvasWidth = canvas.width = canvas.offsetWidth;
const canvasHeight = canvas.height = canvas.offsetHeight;
const upButton = document.getElementById('up');
const downButton = document.getElementById('down');
const leftButton = document.getElementById('left');
const rightButton = document.getElementById('right');
const blockSize = Math.min(canvasWidth, canvasHeight) / 26; // Ajusta blockSize basado en el tamaño del canvas



// Tamaño de los bloques del laberinto

// Carga las imágenes
const energyGummyImg = new Image();
const gamerGoddessImg = new Image();
const gamingCookieImg = new Image();
const levelUpImg = new Image();
const redPotionImg = new Image();
const redGhostImg = new Image();
const pinkGhostImg = new Image();
const cyanGhostImg = new Image();
const orangeGhostImg = new Image();
const scaredGhostImg = new Image(); // Imagen del fantasma asustado
const pacmanIconImg = new Image(); // Imagen del icono de Pac-Man
const img1 = new Image();
const img2 = new Image();
const img4 = new Image();
const img5 = new Image();
const img6 = new Image();
const img7 = new Image();
const img8 = new Image();

energyGummyImg.src = 'Energy gummy.png';
gamerGoddessImg.src = 'Gamer Goddess.png';
gamingCookieImg.src = 'Gaming cookie.png';
levelUpImg.src = 'level up.png';
redPotionImg.src = 'Red Potion.png';
redGhostImg.src = 'Red Ghost.png';
pinkGhostImg.src = 'Pink Ghost.png';
cyanGhostImg.src = 'Cyan Ghost.png';
orangeGhostImg.src = 'Orange Ghost.png';
scaredGhostImg.src = 'ghost5.png'; // Carga la imagen del fantasma asustado
pacmanIconImg.src = 'pacman_icon.png'; // Carga la imagen del icono de Pac-Man
img1.src = '1.png';
img2.src = '2.png';
img4.src = '4.png';
img5.src = '5.png';
img6.src = '6.png';
img7.src = '7.png';
img8.src = '8.png';

// Laberinto (0: punto, 1: pared, -1: punto comido, 3: Energy gummy, 4: Gamer Goddess, 5: Gaming cookie, 6: Level up, 7: Red Potion)
const maze = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0,0, 0, 0, 1, 1, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 1],
    [1, 0, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 1, 0, 0, 0, 0, 1, 1, 14, 1, 1, 1, 0, 1, 1, 0, 1, 1, 12, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 0, 0, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 11, 0, 0, 0, 1, 0, 1],
    [1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 1],
    [1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1],
    [1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 1, 1, 1, 13, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1],
    [1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 1, 5, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 1],
    [1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1],
    [1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1],
    [1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 0, 1],
    [1, 0, 1, 0, 0, 0, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 10, 0, 0, 0, 1],
    [1, 0, 1, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1],
    [1, 0, 1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1],
    [1, 4, 0, 0, 0, 0, 8, 1, 1, 1, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
  ];


// Configuración de Pac-Man
const startX = 2.5 * blockSize;
const startY = 2.5 * blockSize;
let pacman = { x: startX, y: startY, size: blockSize / 2, color: 'yellow', dx: 0, dy: 0 };

// Calcula el centro del tablero
const centerX = Math.floor(canvasWidth / 2 / blockSize) * blockSize + blockSize / 2;
const centerY = Math.floor(canvasHeight / 2 / blockSize) * blockSize + blockSize / 2;

// Configuración de los fantasmas
let ghosts = [
    { x: centerX - blockSize / 2, y: centerY - blockSize / 2, size: blockSize / 1.5, image: redGhostImg, dx: blockSize / 5, dy: 0, vulnerable: false },
    { x: centerX - blockSize / 2, y: centerY + blockSize / 2, size: blockSize / 1.5, image: pinkGhostImg, dx: 0, dy: blockSize / 5, vulnerable: false },
    { x: centerX + blockSize / 2, y: centerY - blockSize / 2, size: blockSize / 1.5, image: cyanGhostImg, dx: -blockSize / 5, dy: 0, vulnerable: false },
    { x: centerX + blockSize / 2, y: centerY + blockSize / 2, size: blockSize / 1.5, image: orangeGhostImg, dx: 0, dy: -blockSize / 5, vulnerable: false }
];


// Manejadores de eventos para botones
function handleButtonClick(direction) {
    switch (direction) {
        case 'up':
            pacman.dx = 0;
            pacman.dy = -blockSize / 10;
            break;
        case 'down':
            pacman.dx = 0;
            pacman.dy = blockSize / 10;
            break;
        case 'left':
            pacman.dx = -blockSize / 10;
            pacman.dy = 0;
            break;
        case 'right':
            pacman.dx = blockSize / 10;
            pacman.dy = 0;
            break;
    }
}

// Asignar eventos a los botones
upButton.addEventListener('click', () => handleButtonClick('up'));
downButton.addEventListener('click', () => handleButtonClick('down'));
leftButton.addEventListener('click', () => handleButtonClick('left'));
rightButton.addEventListener('click', () => handleButtonClick('right'));
function movePacman(dx, dy) {
    let newX = pacman.x + dx;
    let newY = pacman.y + dy;

    // Verifica si la nueva posición está dentro de los límites del canvas
    if (newX >= 0 && newY >= 0 && newX < canvas.width && newY < canvas.height) {
        pacman.x = newX;
        pacman.y = newY;

        // Redibuja el juego
        drawGame();
    }
}
function drawGame() {
    // Aquí puedes agregar todo el código necesario para dibujar en el canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Limpia el canvas antes de dibujar

    // Ejemplo: Dibuja un rectángulo en el centro del canvas
    ctx.fillStyle = 'blue';
    ctx.fillRect(50, 50, 100, 100);

    // Ejemplo: Dibuja un círculo en el canvas
    ctx.beginPath();
    ctx.arc(200, 200, 50, 0, Math.PI * 2, true);
    ctx.fillStyle = 'red';
    ctx.fill();
}

window.addEventListener('load', () => {
    const dpr = window.devicePixelRatio || 1;
    const width = canvas.offsetWidth * dpr;
    const height = canvas.offsetHeight * dpr;
    canvas.width = width;
    canvas.height = height;
    ctx.scale(dpr, dpr);
    drawGame(); // Dibuja el juego al cargar la página
});

// Remover puntos alrededor del área central donde están los fantasmas
const ghostAreaRadius = 2; // Radio de 2 casillas a la redonda
const centerCol = Math.floor(centerX / blockSize);
const centerRow = Math.floor(centerY / blockSize);

for (let row = centerRow - ghostAreaRadius; row <= centerRow + ghostAreaRadius; row++) {
    for (let col = centerCol - ghostAreaRadius; col <= centerCol + ghostAreaRadius; col++) {
        if (maze[row] && maze[row][col] === 0) {
            maze[row][col] = -1; // Marca los puntos en esta área como comidos
        }
    }
}

let score = 0;
let powerPelletActive = false;
let powerPelletTimer = 0;
const powerPelletDuration = 10000; // Duración en milisegundos

// Configuración de vidas
let lives = 3;
const livesImgSize = 15; // Tamaño del icono de Pac-Man

document.addEventListener('keydown', (e) => {
    switch (e.key) {
        case 'ArrowUp':
            pacman.dx = 0;
            pacman.dy = -blockSize / 10;
            break;
        case 'ArrowDown':
            pacman.dx = 0;
            pacman.dy = blockSize / 10;
            break;
        case 'ArrowLeft':
            pacman.dx = -blockSize / 10;
            pacman.dy = 0;
            break;
        case 'ArrowRight':
            pacman.dx = blockSize / 10;
            pacman.dy = 0;
            break;
    }
});



function drawMaze() {
    ctx.fillStyle = '#E5530E';
    for (let row = 0; row < maze.length; row++) {
        for (let col = 0; col < maze[row].length; col++) {
            if (maze[row][col] === 1) { // Paredes
                ctx.fillRect(col * blockSize, row * blockSize, blockSize, blockSize);
            }
        }
    }

    // Dibuja los puntos y los elementos especiales
    ctx.fillStyle = 'white'; // Color de los puntos
    for (let row = 0; row < maze.length; row++) {
        for (let col = 0; col < maze[row].length; col++) {
            if (maze[row][col] === 0) { // Puntos blancos
                ctx.beginPath();
                ctx.arc(col * blockSize + blockSize / 2, row * blockSize + blockSize / 2, blockSize / 8, 0, 2 * Math.PI);
                ctx.fill();
                ctx.closePath();
            } else if (maze[row][col] === 3) { // Energy gummy
                ctx.drawImage(energyGummyImg, col * blockSize, row * blockSize, blockSize, blockSize);
            } else if (maze[row][col] === 4) { // Gamer Goddess
                ctx.drawImage(gamerGoddessImg, col * blockSize, row * blockSize, blockSize, blockSize);
            } else if (maze[row][col] === 5) { // Gaming cookie
                ctx.drawImage(gamingCookieImg, col * blockSize, row * blockSize, blockSize, blockSize);
            } else if (maze[row][col] === 6) { // Level up
                ctx.drawImage(levelUpImg, col * blockSize, row * blockSize, blockSize, blockSize);
            } else if (maze[row][col] === 7) { // Red Potion
                ctx.drawImage(redPotionImg, col * blockSize, row * blockSize, blockSize, blockSize);
            } else if (maze[row][col] === 8) { // 1.png
                ctx.drawImage(img1, col * blockSize, row * blockSize, blockSize, blockSize);
            } else if (maze[row][col] === 9) { // 2.png
                ctx.drawImage(img2, col * blockSize, row * blockSize, blockSize, blockSize);
            } else if (maze[row][col] === 10) { // 4.png
                ctx.drawImage(img4, col * blockSize, row * blockSize, blockSize, blockSize);
            } else if (maze[row][col] === 11) { // 5.png
                ctx.drawImage(img5, col * blockSize, row * blockSize, blockSize, blockSize);
            } else if (maze[row][col] === 12) { // 6.png
                ctx.drawImage(img6, col * blockSize, row * blockSize, blockSize, blockSize);
            } else if (maze[row][col] === 13) { // 7.png
                ctx.drawImage(img7, col * blockSize, row * blockSize, blockSize, blockSize);
            } else if (maze[row][col] === 14) { // 8.png
                ctx.drawImage(img8, col * blockSize, row * blockSize, blockSize, blockSize);
            }
        }
    }
}


function drawPacman() {
    ctx.beginPath();
    ctx.arc(pacman.x, pacman.y, pacman.size, 0.2 * Math.PI, 1.8 * Math.PI); // Dibuja a Pac-Man
    ctx.lineTo(pacman.x, pacman.y); // Cierra el triángulo de Pac-Man
    ctx.fillStyle = pacman.color;
    ctx.fill();
    ctx.closePath();
}



function drawGhosts() {
    for (let ghost of ghosts) {
        // Usa la imagen de fantasma asustado si está en estado vulnerable
        const ghostImage = ghost.vulnerable ? scaredGhostImg : ghost.image;
        ctx.drawImage(ghostImage, ghost.x - ghost.size, ghost.y - ghost.size, ghost.size * 2, ghost.size * 2); // Dibuja el fantasma
    }
}

function drawLives() {
    ctx.fillStyle = 'black';
    ctx.font = '14px Arial';
    ctx.fillText(`Score: ${score}`, 10, 20); // Muestra el puntaje en texto

    ctx.fillText(`Lives:`, 10, 35); // Etiqueta para vidas
    ctx.font = '14px Arial';
    for (let i = 0; i < lives; i++) {
        ctx.drawImage(pacmanIconImg, 50 + i * (livesImgSize + 10), 25, livesImgSize, livesImgSize); // Dibuja los iconos de Pac-Man
    }
}



function isWall(x, y) {
    let col = Math.floor(x / blockSize);
    let row = Math.floor(y / blockSize);
    return maze[row] && maze[row][col] === 1;
}

// Función para mostrar el popup de victoria o derrota
function showPopup(message, score) {
    const popup = document.createElement('div');
    popup.style.position = 'absolute';
    popup.style.left = '50%';
    popup.style.top = '50%';
    popup.style.transform = 'translate(-50%, -50%)';
    popup.style.padding = '20px';
    popup.style.background = 'white';
    popup.style.border = '2px solid black';
    popup.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.5)';
    popup.style.zIndex = '1000';

    const messageText = document.createElement('p');
    messageText.innerText = `${message}\nPuntuación: ${score}`;
    popup.appendChild(messageText);

    const button = document.createElement('button');
    button.innerText = 'Aceptar';
    button.onclick = () => {
        document.body.removeChild(popup);
        document.location.reload(); // Reinicia la página para reiniciar el juego
    };
    popup.appendChild(button);

    document.body.appendChild(popup);
}

// Función para comprobar si el juego ha terminado
function checkGameOver() {
    // Verifica si se han comido todos los puntos blancos
    let allPointsEaten = true;
    for (let row = 0; row < maze.length; row++) {
        for (let col = 0; col < maze[row].length; col++) {
            if (maze[row][col] === 0) {
                allPointsEaten = false;
                break;
            }
        }
        if (!allPointsEaten) break;
    }

    if (allPointsEaten) {
        showPopup('¡You Win!', score);
        return true;
    }

    if (lives <= 0) {
        showPopup('¡Game Over!', score);
        return true;
    }

    return false;
}

function updateGame() {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    let newX = pacman.x + pacman.dx;
    let newY = pacman.y + pacman.dy;

    if (!isWall(newX, newY)) {
        pacman.x = newX;
        pacman.y = newY;

        let col = Math.floor(pacman.x / blockSize);
        let row = Math.floor(pacman.y / blockSize);
        if (maze[row] && maze[row][col] === 0) {
            maze[row][col] = -1;
            score += 100;
        } else if ([3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14].includes(maze[row][col])) {
            maze[row][col] = -1;
            powerPelletActive = true;
            powerPelletTimer = Date.now();
            for (let ghost of ghosts) {
                ghost.vulnerable = true;
            }
            score += 1000;
        }

        for (let ghost of ghosts) {
            let distance = Math.hypot(pacman.x - ghost.x, pacman.y - ghost.y);
            if (distance < pacman.size + ghost.size) {
                if (ghost.vulnerable) {
                    ghost.x = centerX;
                    ghost.y = centerY;
                    ghost.vulnerable = false;
                    score += 2000;
                } else {
                    lives--;
                    if (lives <= 0) {
                        showPopup('¡Game Over!', score);
                        return;
                    } else {
                        pacman.x = startX;
                        pacman.y = startY;
                    }
                }
            }
        }
    }

    if (powerPelletActive && Date.now() - powerPelletTimer > powerPelletDuration) {
        powerPelletActive = false;
        for (let ghost of ghosts) {
            ghost.vulnerable = false;
        }
    }

    for (let ghost of ghosts) {
        let newGhostX = ghost.x + ghost.dx;
        let newGhostY = ghost.y + ghost.dy;

        if (!isWall(newGhostX, newGhostY)) {
            ghost.x = newGhostX;
            ghost.y = newGhostY;
        } else {
            if (Math.random() < 0.5) {
                ghost.dx = (Math.random() - 0.5) * blockSize / 10;
                ghost.dy = 0;
            } else {
                ghost.dx = 0;
                ghost.dy = (Math.random() - 0.5) * blockSize / 10;
            }
        }

        ghost.x = Math.max(ghost.size, Math.min(canvasWidth - ghost.size, ghost.x));
        ghost.y = Math.max(ghost.size, Math.min(canvasHeight - ghost.size, ghost.y));
    }

    drawMaze();
    drawPacman();
    drawGhosts();
    drawLives();

    if (checkGameOver()) return;

    requestAnimationFrame(updateGame);
}

updateGame();
