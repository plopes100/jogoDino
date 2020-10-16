const dino = document.querySelector('.dino');
const background = document.querySelector('.background');
const elePtos = document.getElementById("ptos");

let isJumping = false;
let isGameOver = false;
let position = 0;
let ptos = 0;

function handleKeyUp(event) {
  if (event.keyCode === 32) {
    if (!isJumping) {
      jump();
    }
  }
}

function jump() {
  isJumping = true;

  let upInterval = setInterval(() => {
    if (position >= 210) {
      // Descendo
      clearInterval(upInterval);

      let downInterval = setInterval(() => {
        if (position <= 0) {
          clearInterval(downInterval);
          isJumping = false;
        } else {
          position -= 20;
          dino.style.bottom = position + 'px';
        }
      }, 20);
    } else {
      // Subindo
      position += 20;
      dino.style.bottom = position + 'px';
    }
  }, 20);
}

function createCactus() {
  const cactus = document.createElement('div');
  let cactusPosition = 1000;
  let randomTime = Math.random() * 6000;
  let indCatc = 0;
  let cact = 'cactus1';

  //
  let cactusInfo = [[30,60,20],[60,60,40],[60,90,70]]


  let tpCact = Math.trunc(Math.random() * 10);

  if (tpCact >= 8 ) {
    indCact = 2;
    cact = 'cactusA';
  }
  else {
     if (tpCact >= 5) {
        indCact = 1;
        cact = 'cactus2';
     }
     else {
       indCact = 0;
       cact = 'cactus1';

     }
   }

  if (isGameOver) return;

  cactus.classList.add(cact);
  background.appendChild(cactus);
  cactus.style.left = cactusPosition + 'px';

  let leftTimer = setInterval(() => {
    if (cactusPosition < ((-1)*cactusInfo[indCact][0])) {
      // Saiu da tela
      clearInterval(leftTimer);
      background.removeChild(cactus);
      ptos += cactusInfo[indCact][2];
      elePtos.innerHTML = "Total de Pontos => "+ptos;
      //document.body.innerHTML = '<h1 class="ptos">Pontos => '+ptos+'</h1>';

    } else if ( (cactusPosition > 0) && (cactusPosition < cactusInfo[indCact][0]) && (position < cactusInfo[indCact][1]) ) {
      // Game over
      clearInterval(leftTimer);
      isGameOver = true;
      document.body.innerHTML = '<h1 class="game-over">Fim de jogo. Total de Ptos => '+ptos+'</h1>';
    } else {
      cactusPosition -= 8;
      cactus.style.left = cactusPosition + 'px';
    }
  }, 20);

  setTimeout(createCactus, randomTime);
}

createCactus();
document.addEventListener('keyup', handleKeyUp);
