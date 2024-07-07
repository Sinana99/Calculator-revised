const bode = document.querySelector("body")

const screen = document.querySelector(".screen")

const controls = document.querySelector(".pad")

console.log(bode);

bode.addEventListener("mousedown", changeColor)

bode.addEventListener("mouseup", changeColor)

bode.addEventListener("mouseout", changeColor)

var operands = []

var operating = false



function changeColor(eve) {
    
    eve.stopPropagation()

  if(eve.type === "mousedown" && eve.target.tagName === "BUTTON") {
  } else if (eve.type === "mouseup" && eve.target.tagName === "BUTTON" ||
     eve.type === "mouseout" && eve.target.tagName === "BUTTON") {
  
  }

  
  
}

controls.addEventListener("click", dialScreen)



function dialScreen(eve) {
    eve.stopPropagation()

    if (screen.textContent === "Infinity") {
      screen.textContent = 0;
    }

    if(operands.length == 2 && eve.target.classList[0] === "numbers"
      && operating === true && eve.target.textContent != "."
    ) {
      screen.textContent = ""


    } else if(eve.target.classList[0] === "operator") {
      operands = [screen.textContent];
      operands[1] = eve.target.textContent;
      operating = true;
      
    } else if(eve.target.classList[0] === "result" &&
      operands.length === 2
    ) {
         
        operands[2] = screen.textContent;
        if(operands.length == 3) {
            screen.textContent = calculate(operands)
            if (screen.textContent === "Infinity") {
              operands = [0]
         } else  {
          operands[0] = screen.textContent
         }
        }
             
    } else if (eve.target.classList[0] === "deletes") {
       operands = [0]
    } else if (eve.target.textContent === "+/-" && operating === false
    ) {
      screen.textContent = -1.00 * screen.textContent;
    }
    
    if (eve.target.classList[0] === "deletes" ||
         eve.target.classList[0] === "back") {
          removeFromScreen(screen,eve)
    
         }


    if (eve.target.tagName === "BUTTON" 
        && (eve.target.classList[0] === "numbers" )
    && screen.textContent.length < 14) {


        type(screen,eve)

    }
}

function type(screen, eve) {

  operating = false

  switch (true) {


    case screen.textContent == "0" && eve.target.textContent != ".":
      screen.textContent = eve.target.textContent;
      break;
  
    case 
         !screen.textContent.includes("."):
         screen.textContent += eve.target.textContent;
         break;

    case screen.textContent.includes(".") &&
         eve.target.textContent != ".":
         screen.textContent += eve.target.textContent;
         break;
    

    case eve.target.classList[0] === "deletes":
         
         screen.textContent = 0
         break; 
     
  }
  


}

function removeFromScreen(screen,eve) {
  
  if (eve.target.classList[0] === "deletes") {
    screen.textContent = 0

  } else if (eve.target.classList[0] === "back" &&
             screen.textContent != "0"
  ) {
    screen.textContent = screen.textContent
                        .substring(0, screen.textContent.length - 1)
    if(screen.textContent.length === 0  || screen.textContent === "-") {
      screen.textContent = 0
    } 
  }

}


function calculate(array) {
  var equals = 0
  console.log(array);
  array[0] = array[0]*1.0
  array[2] = array[2]*1.0
  

  switch(array[1]) {

    case "+":
        equals = add(array[0], array[2]);
        break;

    case "-":
        equals = subtract(array[0], array[2]);
       break;

    case "*":
        equals =  multiply(array[0], array[2]);
        break;
    case "/":
        equals = divide(array[0], array[2]);
        break;
    
  
  }
  console.log(equals);
  
  if (equals > 10**100) {
    equals = "Infinity"
    console.log("here");
    return equals
  }

  if (equals.toString().length > 15) {
     return (Math.round(equals * 1000) /1000);
  } 
  
  

  return equals

}

function add(a,b) {
  return a+b
};

function subtract(a,b) {
  return a-b
};

function multiply(a,b) {
  return a*b
};

function divide(a,b) {
  return a/b
}