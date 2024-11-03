// PROJECT REQUIREMENTS SHORTLIST

// PROGRAMMED ANIMATION: COMPLETE----THE SCRATCH GAME

// 2 CUSTOM FUNCTIONS: COMPLETE----SEE BELOW

// LOOP: COMPLETE-----CALLING THE START MENU

// ARRAY: COMPLETE-----BUTTONS ON THE START MENU

// NESTED CONDITIONALS: IN PROGRESS------EXITING THE GAME (MUST HAVE BOTH KEYS)

// AT LEAST 3 TYPES OF VARIABLES
// BOOL: SUCCESS MESSAGE DISPLAYED AFTER WINNING CHESS GAME (TRUE-FALSE), TIMER ACTIVE (TRUE-FALSE)
// INTEGER: TIMER INCORPORATION (TOTAL TIME IN MINUTES)
// STRINGS: GAME STATE VARIABLE IS A STRING FOR 
// NUMBER VARIABLE: CLICK COUNT TRACKS NUMBER OF ATTEMPTS AT CHESS

// MUSIC AND SOUND FX: COMPLETE------MUSIC, AI VOICEOVER, FOOTSTEPS, RAIN

// RESETTABLE: COMPLETE-----WITH THE ESCAPE KEY

// LINK TO AN EXTERNAL WEBSITE: COMPLETE----------LINK TO GITHUB UPON ESCAPE

// PRELOADED IMAGES AND SOUNDS


// LET DEFINITIONS
let gameState = "start";  
let startImage;  
let GS1Button, GS1aButton, GS2Button, GS3Button, GS3aButton; 
let ExitButton;
let GS4Button;
let GS5Button; 
let IntroMusic;
let LobbyMusic;
let GS3Music;
let Level3Lobby, Level3West, gameOver1; 
let chessWinImage; 
let gameWon = "gameWon"; 
let topLayer;
let bottomImage;
let scratchButton;
let scratchButton2;
let scratchMusicPlayed = false; 
let hasKey1;
let hasKey2;
let hasBoltcutters
let hasKnob;
let gameOver3;
let BoltcutterButton;
let P3Button;
let chessDeathPlayed = false;
let Page3;
let rolled = false;
let rollAttempts = 0;
let maxRollAttempts = 4;
let targetRoll = 15
let escapeMusicPlayed = false;
let boltcutterExitMusicPlayed = false;
let knobExitMusicPlayed = false;


// ARRAY FOR BUTTONS ON THE START MENU (WANT SOME BACKSTORY + CLICK HERE)
const startMenuButtons = [
  {
    label: 'Click Here to Enter the Library',  // TEXT
    position: [650, 680],                      // POSITION ON SCREEN
    action: () => {                            // DEFINES WHAT HAPPENS WHEN THE BUTTON IS CLICKED
      gameState = "level3lobby";
      IntroMusic.stop();
      LobbyMusic.play();
      createGS2Button();
      createGS3Button();
      if (!timerActive) {
        startTimer();
      }
    }
  },
  {
    label: 'Want Some Backstory?',
    position: [100, 680],
    action: () => {
      IntroMusic.loop();
    }
  }
];


// DEFINE THE COUNTDOWN TIMER FOR GAME COMPLETION
let totalTime = 10 * 60;
let timer;
let timerActive = false;

// DEFINES THE NUMBER OF CLICKS ON THE CHESS GAME
let clickCount = 0; 


// SUCCESSFUL COMPLETION OF THE CHESS GAME
let successMessage = "As You Move the Knight to G6, \n You Hear a Click. \n A Drawer Opens Below \n A Key is Revealed!"; 
let showSuccessMessage = false; 

// NUMBER OF ATTEMPTS AT THE CHESS GAME BEFORE DYING (INCORRECT)
let maxAttempts = 4; 
let message = "Choose the Correct Square Where Your White Piece Must Move to Force Checkmate in 1."; 

// PRELOAD
  function preload() {
  startImage = loadImage('How to Play.jpg'); 
  Level3Lobby = loadImage('L3L.png'); 
  gameOver1 = loadImage('gameOverStab.jpg');
  gameOver2 = loadImage('deathbychess.jpg');
  IntroMusic = loadSound('Intro Music.mp3');
  LobbyMusic = loadSound('Level3Audio.mp3');
  GS3Music = loadSound('chess_audio.mp3');
  GS4Music = loadSound('eastwing.mp3');
  DeathKnobMusic = loadSound('deathbyknob.mp3');
  scratchMusic = loadSound('dustybook2.aac');
  Level3West = loadImage('l3west.jpg');
  Level3East = loadImage('l3east.jpg');
  chessBoard = loadImage('rescaledboard.png');
  chessWinImage = loadImage('chesssuccess.png'); 
  bottomImage = loadImage('booknokey.jpg');
  scratchWin = loadImage('booknokey.jpg');
  Exitstate = loadImage('Escapedoor.jpg');
  ExitSuccess = loadImage('exitsuccess.jpg');
  boltcutters = loadImage('boltcuttersclose.jpg');
  chessdeathMusic = loadSound('chessdeath.mp3');
  Page1Music = loadSound('topbook.mp3');
  Page2I = loadImage('Page2.jpg');
  Page2Music = loadSound('Page2.mp3');
  KeyPage = loadImage('keybook.jpg');
  KeyFoundMusic = loadSound('keyfound.mp3');
  YouEscapeMusic = loadSound('youescape.mp3');
  ChessSuccess = loadSound('chesssuccess.mp3');
  BoltcuttersClose = loadImage('boltcuttersclose.jpg');
  LibAnnex = loadImage('LibAnnex.jpg');
  AnnexDeathMusic = loadSound('huntingbow.mp3');
  BoltcutterExitMusic = loadSound('boltcutterexit.mp3');
}


// SETUP FUNCTION NOTE-START BUTTONS ARE CREATED HERE
function setup() {
  createCanvas(1000, 800);
  textFont("Chiller");
  textSize(35);
  createStartMenuButtons();
  topLayer = createGraphics(width, height);  // FOR THE SCRATCH GAME
  topLayer.background(150);  
  topLayer.noStroke();
}


// FUNCTION TO RESET THE GAME
function resetGame() {
  gameState = "start";
  showStartMenuButtons();
  DeathKnobMusic.stop();
  GS3Music.stop();
  if (ExitButton) ExitButton.hide();
  if (GS2Button) GS2Button.hide();
  if (GS3Button) GS3Button.hide();
  if (GS3aButton) GS3aButton.hide();
  GS4Music.stop();
  Page2Music.stop();
  LobbyMusic.stop();
  if (BoltcutterButton) BoltcutterButton.hide();
  if (scratchButton) scratchButton.hide();
  if (scratchButton2) scratchButton2.hide();
  if (GS4Button) GS4Button.hide();
  scratchMusic.stop();
  chessdeathMusic.stop();
  DeathKnobMusic.stop();
  AnnexDeathMusic.stop();
}

// LOOP FOR MANAGING THE START MENU BUTTONS 
function createStartMenuButtons() {
  startMenuButtons.forEach((buttonInfo) => {   
    // FOR EACH BUTTON (2 I DEFINED EARLIER, THEY WILL HAVE THESE CHARACTERISTICS BELOW)
    let button = createButton(buttonInfo.label);
    button.position(...buttonInfo.position);
    button.size(300, 100);
    button.style('font-size', '32px');
    button.style('font-family', 'CHILLER');
    button.style('background-color', 'orange');
    button.mousePressed(buttonInfo.action);
    button.show(); 
    buttonInfo.button = button; 
  });
}

// HIDING THE START MENU BUTTONS IN OTHER MENUS
function hideStartMenuButtons() {
  startMenuButtons.forEach((buttonInfo) => {
    if (buttonInfo.button) buttonInfo.button.hide();
  });
}

// SHOW THE START MENU BUTTONS-I USED THIS FOR THE ESCAPE FUNCTION TO RESET
function showStartMenuButtons() {
  startMenuButtons.forEach(buttonInfo => buttonInfo.button.show());
}

// BUTTON TO ENTER THE LIBRARY
function createGS1Button() {
  GS1Button = createButton('Click Here to Enter the Library');
  GS1Button.position(650, 680); 
  GS1Button.size(300, 100);
  GS1Button.style('font-size', '32px');
  GS1Button.style('font-family', 'CHILLER');
  GS1Button.style('background-color', 'orange');
  GS1Button.mousePressed(() => {
  hideStartMenuButtons();
  gameState = "level3lobby";
  ExternalLinkButton.hide();
  LobbyMusic.stop();
  GS2Music.play();
  GS1Button.hide(); 
  GS1aButton.hide(); 
  createGS2Button(); 
  createGS3Button(); 
  if (!timerActive) {
  startTimer(); 
    }
  });
}

// BACKSTORY BUTTON
function createGS1aButton() {
  GS1aButton = createButton('Want Some Backstory?');
  GS1aButton.position(100, 680); 
  GS1aButton.size(300, 100); 
  GS1aButton.style('font-size', '32px');
  GS1aButton.style('font-family', 'CHILLER');
  GS1aButton.style('background-color', 'orange');
  GS1aButton.mousePressed(() => {
  GS1Music.loop();
  });
}

// LEVEL 3 EXPLORE THE EAST WING
function createGS2Button() {
  GS2Button = createButton('Click Here to Explore the East Wing');
  GS2Button.position(650, 400); 
  GS2Button.size(300, 100);
  GS2Button.style('font-size', '32px');
  GS2Button.style('font-family', 'CHILLER');
  GS2Button.style('background-color', 'orange');
  GS2Button.mousePressed(() => {
  gameState = "level3East";
  GS4Music.play();
  GS2Button.hide();
  GS3Button.hide();
  });
}

// LEVEL 3 EXPLORE THE WEST WING
function createGS3Button() {
  GS3Button = createButton('Click Here to Explore the West Wing');
  GS3Button.position(100, 400); 
  GS3Button.size(300, 100);
  GS3Button.style('font-size', '32px');
  GS3Button.style('font-family', 'CHILLER');
  GS3Button.style('background-color', 'orange');
  
  GS3Button.mousePressed(() => {
  ExitButton.hide();
  GS3Music.play();
  gameState = "level3West"; 
  LobbyMusic.stop();
  GS2Button.hide(); 
  GS3Button.hide();
  createGS3aButton(); 
  });
}

// EXIT BUTTON TO ATTEMPT ESCAPE
function createExitButton() {
  ExitButton = createButton('Attempt to Exit');
  ExitButton.position(400, 600); 
  ExitButton.size(300, 100);
  ExitButton.style('font-size', '32px');
  ExitButton.style('font-family', 'CHILLER');
  ExitButton.style('background-color', 'orange');
  ExitButton.mousePressed(() => {
  GS2Button.hide();
  GS3Button.hide(); 
  LobbyMusic.stop();

// REQUIREMENTS TO ESCAPE THE LEVEL
    if (hasKey1 && hasKey2) {
      console.log("Both Keys Have Been Retrieved");
      gameState = "Exit"; 
      if (!escapeMusicPlayed) { 
        YouEscapeMusic.play();
        escapeMusicPlayed = true;
      }

    } else if (hasBoltcutters) { 
      gameState = "BoltcutterExit";

      if (!boltcutterExitMusicPlayed) {             
        BoltcutterExitMusic.play();
        boltcutterExitMusicPlayed = true;
      }

    } else {
      gameState = "KnobExit";

      if (!knobExitMusicPlayed) {
        DeathKnobMusic.play();
        knobExitMusicPlayed = true;
      }
    }
  }); 
}

// LEVEL 3 EXAMINE THE CHESS BOARD
function createGS3aButton() {
  GS3aButton = createButton('Examine the Chess Board');
  GS3aButton.position(200, 470); 
  GS3aButton.size(300, 100);
  GS3aButton.style('font-size', '32px');
  GS3aButton.style('font-family', 'CHILLER');
  GS3aButton.style('background-color', 'orange');
  
  GS3aButton.mousePressed(() => {
  ExitButton.hide();
  gameState = "chessGame"; 
  });
  GS3aButton.hide(); 
}

// BUTTON TO EXAMINE THE STACK OF BOOKS

function createGS4Button() {
  GS4Button = createButton('Examine Stacked Books');
  GS4Button.position(130, 400); 
  GS4Button.size(300, 100);
  GS4Button.style('font-size', '32px');
  GS4Button.style('font-family', 'CHILLER');
  GS4Button.style('background-color', 'orange');
  
  GS4Button.mousePressed(() => {
  ExitButton.hide();
  gameState = "scratchGame"; 
  });
}

// BUTTON TO EXAMINE THE BOLTCUTTERS
function createBoltcutterButton() {
  BoltcutterButton = createButton('Examine the Boltcutters');
  BoltcutterButton.position(600, 400); 
  BoltcutterButton.size(300, 100);
  BoltcutterButton.style('font-size', '32px');
  BoltcutterButton.style('font-family', 'CHILLER');
  BoltcutterButton.style('background-color', 'orange');

BoltcutterButton.mousePressed(() => {
        gameState = "Boltcutter";
    });
}


// BUTTON TO TURN THE PAGE TO INITIATE THE SCRATCH GAME
function createscratchButton() {
  scratchButton = createButton('Turn the Page?');
  scratchButton.position(130, 400); 
  scratchButton.size(300, 100);
  scratchButton.style('font-size', '32px');
  scratchButton.style('font-family', 'CHILLER');
  scratchButton.style('background-color' , 'orange');
 scratchButton.mousePressed(() => {
  Page1Music.stop();
  ExitButton.hide();
  scratchButton.hide();
  scratchButton2.hide();
  scratchMusic.stop();
  gameState = "Page2"; 
  Page2Music.play();  
  });
}

// BUTTON THAT RETURNS TO THE LOBBY FROM THE BOOK AREA
function createscratchButton2() {
  scratchButton2 = createButton('Return to the Lobby to Try the Brass Piece');
  scratchButton2.position(600, 400); 
  scratchButton2.size(300, 100);
  scratchButton2.style('font-size', '32px');
  scratchButton2.style('font-family', 'CHILLER');
  scratchButton2.style('background-color' , 'orange');
  scratchButton2.mousePressed(() => {
  gameState = "level3lobby"; 
  scratchButton.hide();
  scratchButton2.hide();
  scratchMusic.stop();
  IntroMusic.stop();
  LobbyMusic.stop();
  Page1Music.stop(); 
 });
}  

// BUTTON FOR TURNING TO THE THIRD PAGE
function createP3Button() {
  P3Button = createButton('Turn to a Random Page?');
  P3Button.position(600, 400); 
  P3Button.size(300, 100);
  P3Button.style('font-size', '32px');
  P3Button.style('font-family', 'CHILLER');
  P3Button.style('background-color' , 'orange');  
  P3Button.mousePressed(() => {
  gameState = "Page3";
  hasKey2 = true;
  P3Button.hide();
  Page2Music.stop();
 }); 
}

// FUNCTION TO START TIMER
function startTimer() {
  timer = totalTime; 
  timerActive = true;
}

// DICE ROLL FOR ATTEMPTING TO OPEN THE BOLTCUTTERS
function RollBoltcutter() {
  if (rollAttempts < maxRollAttempts) {
    diceResult = int(random(1, 20)); 
    gameState = "diceRolled"; 
    displayTimer();
    rolled = true;                  
    rollAttempts++;                 
  } else {
    gameState = "diceFail";
    AnnexDeathMusic.play();
  }

// IF YOUR ROLL IS BETTER THAN THE TARGET, YOU RETRIEVE THE BOLTCUTTERS AND WIN
  if (diceResult >= targetRoll) {
      fill(0, 255, 0);  
      textSize(32);
      textAlign(CENTER, CENTER);
      text("You Won!", width / 2, height / 2 + 100);
      gameState = "diceWin";
      hasBoltcutter = true
    }
  }

// FUNCTIONS TO HANDLE KEY PRESSES DURING THE GAME
function keyPressed() {
  if (keyCode === ESCAPE) {
    resetGame();
  }
  
// PRESS L TO RETURN TO THE LOBBY (FROM THE CHESS GAME)
  if (gameState === gameWon && key === 'l') {
    gameState = "level3lobby"; 
    GS2Button.show(); 
    GS3Button.show();
    ChessSuccess.stop();
  }
  
// EXTERNAL LINK TO GITHUB
  
    if (gameState === "Exit" && key === 'o') {
  window.open('https://github.com/NatureBoyJsou/Library-Escape-Game');
} 
  if (gameState === "BoltcutterExit" && key === 'o') {
  window.open('https://github.com/NatureBoyJsou/Library-Escape-Game');

}
// PRESS L TO RETURN TO THE LOBBY (FROM THE SCRATCH GAME)
  if (gameState === "Page3" && key === 'l') {
  gameState = "level3lobby"; 
  GS2Button.show(); 
  GS3Button.show();
  KeyFoundMusic.stop();
}

// ALLOWS FOR REROLLING THE DICE IN THE BOLTCUTTER GAME
if (gameState === "Boltcutter" && key === 'u') {
  RollBoltcutter();
  displayTimer();
}

if (gameState === "diceRolled" && key === 'u') {
  RollBoltcutter();
  displayTimer();

// ALLOWS THE PLAYER TO MOVE BACK TO THE LOBBY DURING THE BOLTCUTTER GAME
} else if (gameState === "diceRolled" && key === 'l') {
  gameState = "level3lobby";
} else if (gameState === "diceWin" && key === 'l') { 
  gameState = "level3lobby";
}
}
// FUNCTION TO DISPLAY TIMER 
function displayTimer() {
  let minutes = Math.floor(timer / 60);
  let seconds = Math.floor(timer % 60);
  let timerString = nf(minutes, 2) + ':' + nf(seconds, 2); 
  fill(255); 
  textSize(32);
  textAlign(CENTER);
  text(timerString, width / 2, height - 30); 
}

// FUNCTION TO HANDLE MOUSE PRESSED 
function mousePressed() {
  if (gameState === "chessGame") {
    clickCount++;
    GS3aButton.hide();
    
    if (clickCount > maxAttempts) {
      gameState = "gameOver2"; 
      GS3aButton.hide();
      clickCount = 0; 
    }

// CHECK TO SEE IF THE PLAYER CLICKED THE CORRECT CHESS SQUARE AND IS AWARDED KEY
    if (mouseX >= 693 && mouseX <= 783 && mouseY >= 233 && mouseY <= 307) {
      showSuccessMessage = true; 
      ChessSuccess.play();
      hasKey1 = true;
      gameState = gameWon; 
      clickCount = 0; 
    }
  }
  
function scratch(x, y, radius) {
  topLayer.erase();  
  topLayer.ellipse(x, y, radius);  
  topLayer.noErase();  
}

function createScratchGameButton() {
  let scratchButton = createButton('Scratch Game');
  scratchButton.position(200, 300);
  scratchButton.size(300, 100);
  scratchButton.style('font-size', '32px');
 }  
}

// DRAW FUNCTION
function draw() {
  background(0);
 
// START MENU
  
  if (gameState === "start") {
    image(startImage, 0, 0, width, height); 
   
  }    

// IF THE TIMER IS ACTIVE IN THE SCENE, KEEP UPDATING IT
  if (timerActive) {
    timer -= deltaTime / 1000; 
    if (timer <= 0) {
      timer = 0; 
      timerActive = false; 
      gameState = "gameOver"; 
    }
  }
  
// EXITING THE GAME WITH BOTH KEYS
if (gameState === "Exit") {
  image(ExitSuccess, 0, 0, width, height);
    timerActive = false;
    GS3Button.hide();
    GS2Button.hide();
    GS4Button.hide();
    ExitButton.hide(); 
    textSize(40);
    textAlign(CENTER);
    fill('orange');
    text("Thanks for Playing! Press o for Github Project Info", 500, 500);
    
} else if (gameState === "diceRolled") {
    displayTimer();
    image(BoltcuttersClose, 0, 0, width, height);
    fill(255);
    textSize(40);
    textAlign(CENTER, CENTER);
    text(
        `You Failed to Pry the Boltcutters Open \n Dice Roll Result: ${diceResult} \n Attempts Left: ${maxRollAttempts - rollAttempts} \n Press L to Return to the Lobby or U to Attempt Again`,
        width / 2,
        height / 2
    );
} else if (gameState === "gameOver1") {
    image(gameOver1, 0, 0, width, height);
    
// GAME ENDING FOR FAILING THE CHESS GAME    
} else if (gameState === "gameOver2") {
    image(gameOver2, 0, 0, width, height);
    GS3Music.stop();
    if (!chessDeathPlayed) {
        chessdeathMusic.play();
        chessDeathPlayed = true;
    }

// CONDITIONALS FOR THE LOBBY    
} else if (gameState === "level3lobby") {
    image(Level3Lobby, 0, 0, width, height); 
    hideStartMenuButtons();

    if (!ExitButton) {
        createExitButton(); 
    }
    ExitButton.show();
    GS2Button.show(); 
    GS3Button.show(); 
    displayTimer(); 

// CONDITIONALS FOR LEVEL 3 WEST    
} else if (gameState === "level3West") {
    image(Level3West, 0, 0, width, height); 
    displayTimer(); 
    GS3aButton.show(); 
    
// CONDITIONALS FOR LEVEL 3 EAST    
} else if (gameState === "level3East") {
    image(Level3East, 0, 0, width, height); 
    displayTimer(); 
    LobbyMusic.stop();
    ExitButton.hide();
    
    if (!GS4Button) {   
        createGS4Button(); 
    }
    GS4Button.show();
    
    if (!BoltcutterButton) {   
        createBoltcutterButton(); 
    }
    BoltcutterButton.show();   

// CONDITIONALS FOR THE CHESS GAME    
} else if (gameState === "chessGame") {
    image(chessBoard, 0, 0, width, height); 
    displayTimer(); 
    fill(255); 
    textSize(20);
    textAlign(LEFT);
    text(message, 10, 40); 
    text(`Attempts left: ${maxAttempts - clickCount}`, 10, 60); 

// GAME STATE FOR WINNING THE CHESS GAME    
} else if (gameState === "gameWon") {
    image(chessWinImage, 0, 0, width, height); 
    GS3Music.stop();
    displayTimer();
    fill(255);
    textSize(32);
    textAlign(CENTER);
    text("Press L to Return to the Lobby", width / 2, height / 2 + 40); 

// CLEARING THE DUST OFF THE BOOK 
} else if (gameState === "scratchWin") {
    image(scratchWin, 0, 0, width, height);
    displayTimer();
    if (!scratchButton) {
        createscratchButton();  
        createscratchButton2();
        scratchButton.show();  
        scratchButton2.show();
    }
    if (!scratchMusic.isPlaying()) {
        scratchMusic.play();
        scratchMusicPlayed = true;
    } else {
        if (scratchMusic.isPlaying()) {
            scratchMusic.stop();
        }
    }

// SCRATCH GAME
} else if (gameState === "scratchGame") {
    image(bottomImage, 0, 0, width, height);
    image(topLayer, 0, 0);
    textSize(32);
    textAlign(CENTER);
    text("Clear the Dust from the Book", width / 2, height / 2 + 40);   
    BoltcutterButton.hide();
    GS4Button.hide();
    displayTimer();   
    GS4Music.stop();
    if (mouseIsPressed) {
        scratch(mouseX, mouseY, 50);  
    }
    function scratch(x, y, radius) {
        topLayer.erase();  
        topLayer.ellipse(x, y, radius);  
        topLayer.noErase();  
    }
    // If you uncover the brass knob at the lower left, you win
    if (mouseX >= 50 && mouseX <= 100 && mouseY >= 490 && mouseY <= 550) {
        gameState = "scratchWin";
        Page1Music.play();
        showSuccessMessage = true; 
    }

// KNOB EXIT
} else if (gameState === "KnobExit") {
    image(Exitstate, 0, 0, width, height);
    displayTimer();
    GS2Button.hide();
    GS3Button.hide();
    ExitButton.hide();
   

// PAGE 2 
} else if (gameState === "Page2") {
    image(Page2I, 0, 0, width, height);
    textSize(32);
    textAlign(RIGHT);
    fill('white');
    text("Marcey Liggins", 800 , 200); 
    text("Daniel Seelander", 830 , 250);
    text("Judith Mayers", 870 , 300);
    text("Tommy Fairbanks", 900 , 340);
    scratchMusic.stop();
    displayTimer();
    if (!Page2Music.isPlaying()) {
        Page2Music.play();
    }
    if (!P3Button) {
        createP3Button(); 
    }
    P3Button.show();

// PAGE 3
} else if (gameState === "Page3") {
    displayTimer();
    image(KeyPage, 0, 0, width, height);
    textSize(50);
    textAlign(CENTER);
    fill('orange');
    text("Press L to return to the lobby", 500 , 500); 
    if (!KeyFoundMusic.isPlaying()) {
        KeyFoundMusic.play();
    }



// BOLTCUTTER ATTEMPT
} else if (gameState === "Boltcutter") {
    image(BoltcuttersClose, 0, 0, width, height);
    GS4Button.hide();
    GS4Music.stop();
    BoltcutterButton.hide();
    displayTimer();
    textSize(50);
    textAlign(CENTER);
    fill('orange');
    text("Press U to Attempt to Unlock the Boltcutters", 500 , 500); 

// DICE WIN
} else if (gameState === "diceWin") {
    image(BoltcuttersClose, 0, 0, width, height);
    displayTimer();
    hasBoltcutters = true;
    textSize(50);
    textAlign(CENTER);
    fill('orange');
    text("You Successfully Pry Open the Boltcutters \n Press L to Return to the Lobby", 500 , 500); 

// DICE FAIL
} else if (gameState === "diceFail") {
    image(LibAnnex, 0, 0, width, height);
    displayTimer();
    textSize(40);
    textAlign(CENTER);
    fill('orange');
    text("Unfortunately, the Boltcutters Appear to Be Welded Shut. \n You Notice a Hidden Doorway and Slip Inside. \n An Even Longer Hallway is Before You. Clearly this is a Secret Annex.", 500, 500);

// BOLTCUTTER EXIT
} else if (gameState === "BoltcutterExit") {
    image(ExitSuccess, 0, 0, width, height);
    timerActive = false;
    displayTimer();
    GS2Button.hide();
    GS3Button.hide();
    GS4Button.hide();
    ExitButton.hide();
    textSize(40);
    textAlign(CENTER);
    fill('orange');
    text("Thanks for Playing! Press o for Github Project Info", 500, 500);
  }
}


                                    
