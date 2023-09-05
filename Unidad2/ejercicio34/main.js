class Rectangulo {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  detectarColision (rectangulo) {
    if (
      this.x + this.width >= rectangulo.x &&
      this.x <= rectangulo.x + rectangulo.width &&
      this.y + this.height >= rectangulo.y &&
      this.y <= rectangulo.y + rectangulo.height
    ) {
      return true;
    }
    return false;
  }

  detectarColisionMuros (muros)  {
    const colisiones = {
      'UP': false,
      'LEFT': false,
      'DOWN': false,
      'RIGHT': false,
      'PAUSE': false,
    };
    for (const muro of muros) {
      if (this.detectarColision(muro)) {
        if (this.y <= muro.y + muro.height) {
          colisiones['UP'] = true;
        }
        if (this.x <= muro.x + muro.width) {
          colisiones['LEFT'] = true;
        }
        if (this.y + this.height >= muro.y) {
          colisiones['DOWN'] = true;
        }
        if (this.x + this.width >= muro.x) {
          colisiones['RIGHT'] = true;
        }
      }
    }
    return colisiones;
  }
}

class GameLoop {
  constructor (player, comida, muros, canvas) {
    this.player = player;
    this.comida = comida;
    this.muros = muros;
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.canvasWidth = canvas.width;
    this.canvasHeight = canvas.height;
    this.dir = 0;
    this.pause = false;
    this.velocidad = 1;
    this.puntaje = 0;
    this.musicaFondo = document.getElementById('musicaFondo');
    this.sonidoComida = document.getElementById('sonidoComida');
    document.addEventListener("keydown", (e) => {
      switch (e.keyCode) {
        case 87:
          if (!this.pause) { this.dir = e.keyCode; }
          break;
        case 83:
          if (!this.pause) { this.dir = e.keyCode; }
          break;
        case 68:
          if (!this.pause) { this.dir = e.keyCode; }
          break;
        case 65:
          if (!this.pause) { this.dir = e.keyCode; }
          break;
        case 32:
          this.pause = !this.pause;
          break;
      }
      this.musicaFondo.style.display = 'block';
      this.musicaFondo.play();
    });
  }

  static DIRECCIONES = {
    UP: 87,
    DOWN: 83,
    RIGHT: 68,
    LEFT: 65,
    PAUSE: 32,
  }

  static generarColorAleatorio () {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    const a = Math.random();
    return `rgba(${r}, ${g}, ${b}, ${a})`;
  };

  dibujarRectangulo (rectangulo, colorRectangulo, borde = false, colorBorde = '') {
    this.ctx.fillStyle = colorRectangulo;
    this.ctx.fillRect(rectangulo.x, rectangulo.y, rectangulo.width, rectangulo.height);
    if (borde) {
      this.ctx.strokeStyle = colorBorde;
      this.ctx.strokeRect(rectangulo.x, rectangulo.y, rectangulo.width, rectangulo.height);
    }
  }

  generarCuadradoAleatorio (generateNuevo, color = 'transparent') {
    if (generateNuevo) {
      this.comida.x = Math.abs(Math.floor(Math.random() * this.canvasWidth - this.comida.width));
      this.comida.y = Math.abs(Math.floor(Math.random() * this.canvasHeight - this.comida.height));
      this.aumentarScore();
      this.obtuvoComida();
    }
    this.dibujarRectangulo(this.comida, color);
  }

  aumentarScore () {
    this.velocidad++;
    this.puntaje += 10;
  }

  mostrarScore () {
    this.ctx.fillStyle = 'red';
    this.ctx.font = '40px bold Roboto';
    this.ctx.fillText(`Puntuación: ${this.puntaje}`, 20, 40);
  }

  pausar () {
    this.musicaFondo.pause();
    this.ctx.fillStyle = 'red';
    this.ctx.font = '60px bold Roboto';
    this.ctx.fillText('Pausado', (this.canvasWidth / 2) - 'pausado'.length * 10, this.canvasHeight / 2);
    this.ctx.fillStyle = 'rgba(255, 255, 255, 0.01)';
    this.ctx.fillRect(0, 0, this.canvasWidth, this.canvasHeight);
  }

  pintarJugador () {
    const spritePlayer = new Image();
    spritePlayer.src = './popeye.png';
    spritePlayer.onload = (() =>{
      this.ctx.drawImage(spritePlayer, this.player.x, this.player.y, this.player.width, this.player.height);
      this.dibujarRectangulo(this.player, 'transparent', true, 'transparent');
    })();
  }

  pintarComida () {
    const comidaSpite = new Image();
    comidaSpite.src = './espinacas.png';
    comidaSpite.onload = (() => {
      this.ctx.drawImage(comidaSpite, this.comida.x, this.comida.y, this.comida.width, this.comida.height);
      this.generarCuadradoAleatorio(this.player.detectarColision(this.comida));
    })();
  }

  obtuvoComida () {
    this.sonidoComida.style.display = 'block';
    this.sonidoComida.play();
    this.sonidoComida.style.display = 'none';
  }

  repaint () {
    this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
    this.muros.forEach(muro => this.dibujarRectangulo(muro, '#053B50'));
    this.pintarComida();
    this.pintarJugador();
    this.mostrarScore();
  }

  update () {
    let nextX = this.player.x;
    let nextY = this.player.y;

    if (this.pause) {
      if (this.pause) { this.pausar() }
      window.requestAnimationFrame(this.update.bind(this));
      return;
    } else {
      this.musicaFondo.play();
    }

    switch (this.dir) {
      case GameLoop.DIRECCIONES.UP:
        nextY -= this.velocidad;
        break;
      case GameLoop.DIRECCIONES.DOWN:
        nextY += this.velocidad;
        break;
      case GameLoop.DIRECCIONES.RIGHT:
        nextX += this.velocidad;
        break;
      case GameLoop.DIRECCIONES.LEFT:
        nextX -= this.velocidad;
        break;
    }

    const nextPlayer = new Rectangulo(nextX, nextY, this.player.width, this.player.height);
    const colisionesMuro = nextPlayer.detectarColisionMuros(this.muros);

    if (!colisionesMuro.UP && this.dir === GameLoop.DIRECCIONES.UP) {
      this.player.y = nextY;
    }
    if (!colisionesMuro.DOWN && this.dir === GameLoop.DIRECCIONES.DOWN) {
      this.player.y = nextY;
    }
    if (!colisionesMuro.LEFT && this.dir === GameLoop.DIRECCIONES.LEFT) {
      this.player.x = nextX;
    }
    if (!colisionesMuro.RIGHT && this.dir === GameLoop.DIRECCIONES.RIGHT) {
      this.player.x = nextX;
    }

    if (this.player.x > this.canvasWidth) {
      this.player.x = -1 * this.player.width;
    } else if (this.player.x < (-1 * this.player.width)) {
      this.player.x = this.canvasWidth;
    }
    if (this.player.y > this.canvasHeight) {
      this.player.y = -1 * this.player.height;
    } else if (this.player.y < (-1 * this.player.height)) {
      this.player.y = this.canvasHeight;
    }

    this.repaint();
    window.requestAnimationFrame(this.update.bind(this));
  }
}

const canvas = document.getElementById('canvas');
const jugador = new Rectangulo(255, 255, 50, 50);
const comida = new Rectangulo(0, 0, 50, 50);
const muros = [
  new Rectangulo(200, 100, 200, 30),
  new Rectangulo(600, 300, 100, 30),
];

const Game = new GameLoop(jugador, comida, muros, canvas);
Game.update();