let data = {
    //store the values to be edited some place other than the default value for easy reset.
    init: function(){
        this.squares = this.default
    },
    //sets the current player. false are O's and true is X's
    currentPlayer: false,
    default: [
        //first value is whether the box is check or not, second value is who has checked the box which is set in the handler.placeMove function. This array below repressents 3 throws, and the three boxes inside each.
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

        } else{
            //if the box has already been clicked log out which element your clicking
            console.log(data.currentSelection.section.id)
        }
        //toggle the boolean of the current player so that it switches turns each time
        data.currentPlayer = !data.currentPlayer;
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
