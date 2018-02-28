let data = {
    //store the values to be edited some place other than the default value for easy reset.
    init: function(){
        this.squares = this.default
    },
    //loop through and set the defaults back to normal
    reset: function(){
        for(let i = 0; i < this.default.length; i++){
            for(let e = 0; e < this.default[i].length; e++){
                this.default[i][e].checked[0] = false;
                this.default[i][e].checked[1] = undefined;
            }
        }
    },
    //sets the current player. false are O's and true is X's
    currentPlayer: false,
    //first value is whether the box is check or not, second value is who has checked the box which is set in the handler.placeMove function. This array below repressents 3 throws, and the three boxes inside each.
    default: [
        [{checked: [false, undefined]},
         {checked: [false, undefined]},
         {checked: [false, undefined]}
        ],

        [{checked: [false, undefined]},
         {checked: [false, undefined]},
         {checked: [false, undefined]}
        ],

        [{checked: [false, undefined]},
         {checked: [false, undefined]},
         {checked: [false, undefined]}
        ]
    ],
}

let handler = {
    //initalize all the things
    init: function(){
        data.init();
        view.init();
    },
    reset: function(){
        data.reset();
        view.init();
    },
    placeMove: function(){
        //check to make sure it hasnt been selected
        if (data.currentSelection.checked[0] === false){
            let player = {};
            //store the values needed for the currentPlayer depending on who's turn it is
            if (data.currentPlayer === false){
                player.class = "o"
                player.boolean = false
            } else {
                player.class = "x"
                player.boolean = true
            }
            //set the currently selected square to a checked value of true and the player who checked it to the value of who's turn it is.
            data.currentSelection.checked[0] = true;
            data.currentSelection.checked[1] = player.boolean;
            //add the class X or O to the selected element
            data.currentSelection.section.classList.add(player.class);
            //toggle the boolean of the current player so that it switches turns each time
            data.currentPlayer = !data.currentPlayer;
            this.CheckForWin();
        } else{
            //if the box has already been clicked log out which element your clicking
            console.log(data.currentSelection.section.id)
        }
    },
    CheckForStreak: function(){
        //check for (false = O's)
        let checkFor = false
        //loop over and check for false streaks, then at the end, if nothing matches, switch and test for true
        for(let e = 0; e <= 1; e++){
            for(let i = 0; i < 3; i++){
                console.log(i)
                //tests for row streaks, then column streaks
                if(data.squares[i][0].checked[1] === checkFor &&
                   data.squares[i][1].checked[1] === checkFor &&
                   data.squares[i][2].checked[1] === checkFor ){
                    //return a true and which player we are checking for.
                    return [true, checkFor, "row"];
                } else if(data.squares[0][i].checked[1] === checkFor &&
                          data.squares[1][i].checked[1] === checkFor &&
                          data.squares[2][i].checked[1] === checkFor){
                    return [true, checkFor, "column"];
                    //this else below checks for diagonal
                } else if((data.squares[0][0].checked[1] === checkFor) &&
                          (data.squares[1][1].checked[1] === checkFor) &&
                          (data.squares[2][2].checked[1] === checkFor) ||
                          (data.squares[0][2].checked[1] === checkFor) &&
                          (data.squares[1][1].checked[1] === checkFor) &&
                          (data.squares[2][0].checked[1] === checkFor)){
                    return [true, checkFor, "diagonal"];
                }
            }
            checkFor = !checkFor
        }
    },

    totalChecked: function(){
        let total = 0
        //run through the data.squares array and count how many squares have been checked
        for(let i = 0; i < data.squares.length; i++){
            data.squares[i].forEach(function(item){
            if (item.checked[0] === true){
                total++
            }
        })}
        return total
    },
    CheckForWin: function(){
        //make sure we dont try comparing to undefined
        if (this.CheckForStreak() === undefined && this.totalChecked() === 9){
            setTimeout(function(){
                    alert(`The cat won! better luck next time!`)
                    handler.reset();
                }, 150)
                console.log(this.totalChecked())
        }else if (this.CheckForStreak() === undefined){
            return
        }else if (this.CheckForStreak()[0]){
            let self = this
            //if checkForStreak returns as false then alert and reset game. Anything for a win can be done here. Maybe add some actual graphics?
            if (!this.CheckForStreak()[1]){
                setTimeout(function(){
                    alert(`O's won with a ${self.CheckForStreak()[2]}! Congrats!`)
                    handler.reset();
                }, 150)
                console.log(this.CheckForStreak())
            }
            if (this.CheckForStreak()[1]){
                setTimeout(function(){
                    alert(`X's won with a ${self.CheckForStreak()[2]}! Congrats!`)
                    handler.reset();
                }, 150)
                console.log(this.CheckForStreak())
            }
        }
    }
}

let view = {
    init: function(){
        let gameContainer = document.querySelector("#gameContainer");
        gameContainer.innerHTML = "";
        //store how many loops have passed in order to set specific id's for each item
        let loopCount = 0;
        let rows = document.createDocumentFragment();
        //create rows equal to the amount of rows present in the data array
        for (let i = 0; i < data.squares.length; i++){
            let row = document.createElement("section");
            row.className = "game-rows flex-container";
            row.id = `gameRow${i}`;
            //create each box and add them to the row
            for (let e = 0; e < data.squares[i].length; e++){
                let box = document.createElement("section");
                box.className = "game-boxes flex-container";
                box.id = `gameBox${loopCount}`;
                loopCount++;
                //when the box is clicked set it to the currently selected item in the data object. Store which item in the array it is as well as what the element on page it represents.
                box.addEventListener("click", function(event){
                    return function(){
                        data.currentSelection = data.squares[i][e];
                        data.currentSelection.section = box;
                        handler.placeMove();
                    }
                }())
                row.appendChild(box);
            }
            rows.appendChild(row);
        }
        //add all the things to the dom
        gameContainer.appendChild(rows)
    }
}

//Make everything start
handler.init()

//data.squares[0][2].checked[1] === checkFor
//data.squares[2][0].checked[1] === checkFor
