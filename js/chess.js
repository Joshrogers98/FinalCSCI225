//establish constants
const lettersArray = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']
const piecesArray = ['WP', 'WR', 'WN', 'WB', 'WQ', 'WK', 'BP', 'BR', 'BN', 'BB', 'BQ', 'BK', 'empty'];
const startFormation = ['R' , 'N' , 'B' , 'Q' , 'K' , 'B' , 'N' , 'R']
const scoreBoard = document.getElementById('moves');

//establish "global" variables to be used later in local functions
var pieceIndex = null;
var pieceColor = '';
var pieceID = '';
var pieceName = '';
var unselectedPiece = document.getElementsByClassName('chessPiece')
var selectedPiece = document.getElementsByClassName('chessPiece-selected');
var origin = '';
var destination = '';

//this creates the board for the game and contains all the rules for the game in separate funtions
function newGame() {

    //reset scoreboard
    scoreBoard.innerHTML = '<thead><tr><th>Move</th><th>Origin</th><th>Destination</th></tr></thead>';

    //establish turn counter / reset to 1
    var turnCounter = 1;

    //set the variable "make board" to table content
    var makeBoard = "";
    for (var i = 0; i < 8; i++) {
        //create the rows
        makeBoard += '<tr id="rank' + (8 - i) + '" class="rank' + (i + 1) + '">';
        for (var j = 0; j < 8; j++) {
            //create the files(columns)
            makeBoard += '<td class="file' + lettersArray[j] + '" id="' + lettersArray[j] + (8 - i) + '" name=""><button class="chessPiece"  id="' + lettersArray[j] + (8 - i) + 'button"></button></td>';
        }
        makeBoard += '</tr>'
    }
    //fill table with variable "make board"
    document.getElementById('chessBoard').innerHTML = makeBoard;

/*=====Start Formation Pieces=====*/

    //White pieces
    for(var i = 0; i < startFormation.length; i++){
        document.getElementById(lettersArray[i] + 1 + 'button').setAttribute('name' , 'W'+startFormation[i]);
    }
    //White pawns
    for (var i = 0; i < 8; i++) {
        document.getElementById(lettersArray[i] + '2button').setAttribute('name', 'WP');
    }
    //empty spaces
    for (var i = 2; i < 6; i++) {
        for (var j = 0; j < 8; j++) {
            document.getElementById(lettersArray[j] + (i + 1) + 'button').setAttribute('name', 'empty');
        }
    }
    //Black pawns
    for (var i = 0; i < 8; i++) {
        document.getElementById(lettersArray[i] + '7button').setAttribute('name', 'BP');
    }
    //Black pieces
    for(var i = 0; i < startFormation.length; i++){
        document.getElementById(lettersArray[i] + 8 + 'button').setAttribute('name' , 'B'+startFormation[i]);
    }

    //checkerboard pattern
    for (var i = 0; i < 8; i++) {
        var rank = document.getElementsByClassName('rank' + (i + 1));
        for (var j = 0; j < 8; j++) {
            var square = document.getElementById(lettersArray[j] + (i + 1));
            if ((i + j + 2) % 2 == 0) {
                square.setAttribute('name', 'dark');
            } else {
                square.setAttribute('name', 'light')
            }
        }
    }

    //function to select a piece
    function highlightPiece() {
        var classname = this.getAttribute('class');
        for (var i = 0; i < selectedPiece.length; i++) {
            selectedPiece[i].setAttribute('class', 'chessPiece')
        }
        if (classname == 'chessPiece') {
            this.setAttribute('class', 'chessPiece-selected');
        } else {
            this.setAttribute('class', 'chessPiece');
        }

    }

    //event for selecting a piece
    for (var i = 0; i < unselectedPiece.length; i++) {
        document.getElementsByClassName('chessPiece')[i].addEventListener('click', highlightPiece, false);
    }

    //function to show where a piece can move
    function pieceMoves() {

        //reset movable squares
        var movableSquares = document.querySelectorAll('.chessPiece-move');

        //remove highlights on lost focus
        if (movableSquares.length) {
            for (var i = 0; i < movableSquares.length; i++) {
                movableSquares[i].setAttribute('class', 'chessPiece');
            }
        }

        if (document.getElementsByClassName('chessPiece-selected').length) {

            //find selected piece
            pieceColor = document.getElementsByClassName('chessPiece-selected')[0].getAttribute('name').charAt(0);
            pieceID = document.getElementsByClassName('chessPiece-selected')[0].getAttribute('id');
            pieceName = document.getElementsByClassName('chessPiece-selected')[0].getAttribute('name');

            for (var i = 0; i < piecesArray.length; i++) {
                if (pieceName == piecesArray[i]) {
                    pieceIndex = i;
                }
            }

            //document coordinates
            var y = parseInt((selectedPiece[0].getAttribute('id')).charAt(1));
            var x = lettersArray.indexOf((selectedPiece[0].getAttribute('id')).charAt(0));

            //shows where pieces can move by selected piece
            switch (pieceIndex) {

                //white pawns
                case 0:

                    var oneSpace = document.getElementById(lettersArray[x] + (y + 1) + 'button');
                    var twoSpace = document.getElementById(lettersArray[x] + (y + 2) + 'button');
                    var diagRight = document.getElementById(lettersArray[x - 1] + (y + 1) + 'button');
                    var diagLeft = document.getElementById(lettersArray[x + 1] + (y + 1) + 'button');
                    if (x != 0 && diagRight.getAttribute('name') != piecesArray[12] && diagRight.getAttribute('name').charAt(0) != 'W') {
                        diagRight.setAttribute('class', 'chessPiece-move');
                    }
                    if (x != 7 && diagLeft.getAttribute('name') != piecesArray[12] && diagLeft.getAttribute('name').charAt(0) != 'W') {
                        diagLeft.setAttribute('class', 'chessPiece-move');
                    }
                    if (document.getElementById('rank2').contains(selectedPiece[0])) {
                        if (twoSpace.getAttribute('name') == piecesArray[12] && oneSpace.getAttribute('name') == piecesArray[12]) {
                            oneSpace.setAttribute('class', 'chessPiece-move');
                            twoSpace.setAttribute('class', 'chessPiece-move');
                        } else if (oneSpace.getAttribute('name') == piecesArray[12]) {
                            oneSpace.setAttribute('class', 'chessPiece-move');
                        }
                    } else if (oneSpace.getAttribute('name') == piecesArray[12]) {
                        oneSpace.setAttribute('class', 'chessPiece-move');
                    }
                    break;

                //white rooks
                case 1:

                    //move right
                    for (var i = 1; i < 8; i++) {
                        if (x == 7) { break; }
                        var right = x;
                        right += i;
                        if ((document.getElementById(lettersArray[right] + y + 'button').getAttribute('name').charAt(0) == 'W')) {
                            break;
                        } else if ((document.getElementById(lettersArray[right] + y + 'button').getAttribute('name').charAt(0) == 'B')) {
                            document.getElementById(lettersArray[right] + y + 'button').setAttribute('class', 'chessPiece-move');
                            break;
                        } else if ((document.getElementById(lettersArray[right] + y + 'button').getAttribute('name') == piecesArray[12])) {
                            document.getElementById(lettersArray[right] + y + 'button').setAttribute('class', 'chessPiece-move')
                        }
                        if (right == 7) { break; }
                    }

                    //move left
                    for (var i = 1; i < 8; i++) {
                        if (x == 0) { break; }
                        var left = x;
                        left -= i;
                        if ((document.getElementById(lettersArray[left] + y + 'button').getAttribute('name').charAt(0) == 'W')) {
                            break;
                        } else if ((document.getElementById(lettersArray[left] + y + 'button').getAttribute('name').charAt(0) == 'B')) {
                            document.getElementById(lettersArray[left] + y + 'button').setAttribute('class', 'chessPiece-move');
                            break;
                        } else if ((document.getElementById(lettersArray[left] + y + 'button').getAttribute('name') == piecesArray[12])) {
                            document.getElementById(lettersArray[left] + y + 'button').setAttribute('class', 'chessPiece-move')
                        }
                        if (left == 0) { break; }
                    }

                    //move down 
                    for (var i = 1; i < 8; i++) {
                        if (y == 1) { break; }
                        var down = y;
                        down -= i;
                        if ((document.getElementById(lettersArray[x] + down + 'button').getAttribute('name').charAt(0) == 'W')) {
                            break;
                        } else if ((document.getElementById(lettersArray[x] + down + 'button').getAttribute('name').charAt(0) == 'B')) {
                            document.getElementById(lettersArray[x] + down + 'button').setAttribute('class', 'chessPiece-move');
                            break;
                        } else if ((document.getElementById(lettersArray[x] + down + 'button').getAttribute('name') == piecesArray[12])) {
                            document.getElementById(lettersArray[x] + down + 'button').setAttribute('class', 'chessPiece-move')
                        }
                        if (down == 1) { break; }
                    }

                    //move up 
                    for (var i = 1; i < 8; i++) {
                        if (y == 8) { break; }
                        var up = y;
                        up += i;
                        if ((document.getElementById(lettersArray[x] + up + 'button').getAttribute('name').charAt(0) == 'W')) {
                            break;
                        } else if ((document.getElementById(lettersArray[x] + up + 'button').getAttribute('name').charAt(0) == 'B')) {
                            document.getElementById(lettersArray[x] + up + 'button').setAttribute('class', 'chessPiece-move');
                            break;
                        } else if ((document.getElementById(lettersArray[x] + up + 'button').getAttribute('name') == piecesArray[12])) {
                            document.getElementById(lettersArray[x] + up + 'button').setAttribute('class', 'chessPiece-move')
                        }
                        if (up == 8) { break; }
                    }

                    break;

                //white knights
                case 2:

                    //jump angles number is degrees
                    var jump30 = document.getElementById(lettersArray[x + 1] + (y - 2) + 'button');
                    var jump60 = document.getElementById(lettersArray[x + 2] + (y - 1) + 'button');
                    var jump120 = document.getElementById(lettersArray[x + 2] + (y + 1) + 'button');
                    var jump150 = document.getElementById(lettersArray[x + 1] + (y + 2) + 'button');
                    var jump210 = document.getElementById(lettersArray[x - 1] + (y + 2) + 'button');
                    var jump240 = document.getElementById(lettersArray[x - 2] + (y + 1) + 'button');
                    var jump300 = document.getElementById(lettersArray[x - 2] + (y - 1) + 'button');
                    var jump330 = document.getElementById(lettersArray[x - 1] + (y - 2) + 'button');
                    var jumpArray = [jump30, jump60, jump120, jump150, jump210, jump240, jump300, jump330];

                    for (var i = 0; i < jumpArray.length; i++) {
                        if (jumpArray[i] != null) {
                            if (jumpArray[i].getAttribute('name') == piecesArray[12]) {
                                jumpArray[i].setAttribute('class', 'chessPiece-move');
                            } else if (jumpArray[i].getAttribute('name').charAt(0) == 'B') {
                                jumpArray[i].setAttribute('class', 'chessPiece-move');
                            }
                        }
                    }
                    break;

                //white bishops
                case 3:

                    //up right
                    for (var i = 1; i < 8; i++) {
                        if (x == 7 || y == 8) { break; }
                        var horizontal = x;
                        var vertical = y;
                        horizontal += i;
                        vertical += i;
                        var bishopMove = document.getElementById(lettersArray[horizontal] + (vertical) + 'button');
                        if (bishopMove.getAttribute('name').charAt(0) == 'W') {
                            break;
                        } else if ((bishopMove.getAttribute('name').charAt(0) == 'B')) {
                            bishopMove.setAttribute('class', 'chessPiece-move');
                            break;
                        } else if (bishopMove.getAttribute('name') == piecesArray[12]) {
                            bishopMove.setAttribute('class', 'chessPiece-move')
                        }
                        if (horizontal == 7 || vertical == 8) { break; }

                    }

                    //down right
                    for (var i = 1; i < 8; i++) {
                        if (x == 7 || y == 1) { break; }
                        var horizontal = x;
                        var vertical = y;
                        horizontal += i;
                        vertical -= i;
                        var bishopMove = document.getElementById(lettersArray[horizontal] + (vertical) + 'button');
                        if (bishopMove.getAttribute('name').charAt(0) == 'W') {
                            break;
                        } else if (bishopMove.getAttribute('name').charAt(0) == 'B') {
                            bishopMove.setAttribute('class', 'chessPiece-move');
                            break;
                        } else if (bishopMove.getAttribute('name') == piecesArray[12]) {
                            bishopMove.setAttribute('class', 'chessPiece-move')
                        }
                        if (horizontal == 7 || vertical == 1) { break; }
                    }

                    //down left
                    for (var i = 1; i < 8; i++) {
                        if (x == 0 || y == 1) { break; }
                        var horizontal = x;
                        var vertical = y;
                        horizontal -= i;
                        vertical -= i;
                        var bishopMove = document.getElementById(lettersArray[horizontal] + (vertical) + 'button');
                        if (bishopMove.getAttribute('name').charAt(0) == 'W') {
                            break;
                        } else if (bishopMove.getAttribute('name').charAt(0) == 'B') {
                            bishopMove.setAttribute('class', 'chessPiece-move');
                            break;
                        } else if (bishopMove.getAttribute('name') == piecesArray[12]) {
                            bishopMove.setAttribute('class', 'chessPiece-move')
                        }
                        if (horizontal == 0 || vertical == 1) { break; }
                    }

                    //up left
                    for (var i = 1; i < 8; i++) {
                        if (x == 0 || y == 8) { break; }
                        var horizontal = x;
                        var vertical = y;
                        horizontal -= i;
                        vertical += i;
                        var bishopMove = document.getElementById(lettersArray[horizontal] + (vertical) + 'button');
                        if (bishopMove.getAttribute('name').charAt(0) == 'W') {
                            break;
                        } else if (bishopMove.getAttribute('name').charAt(0) == 'B') {
                            bishopMove.setAttribute('class', 'chessPiece-move');
                            break;
                        } else if (bishopMove.getAttribute('name') == piecesArray[12]) {
                            bishopMove.setAttribute('class', 'chessPiece-move')
                        }
                        if (horizontal == 0 || vertical == 8) { break; }
                    }

                    break;

                //white queen
                case 4:

                    //copied from rook
                    //move right
                    for (var i = 1; i < 8; i++) {
                        if (x == 7) { break; }
                        var right = x;
                        right += i;
                        if ((document.getElementById(lettersArray[right] + y + 'button').getAttribute('name').charAt(0) == 'W')) {
                            break;
                        } else if ((document.getElementById(lettersArray[right] + y + 'button').getAttribute('name').charAt(0) == 'B')) {
                            document.getElementById(lettersArray[right] + y + 'button').setAttribute('class', 'chessPiece-move');
                            break;
                        } else if ((document.getElementById(lettersArray[right] + y + 'button').getAttribute('name') == piecesArray[12])) {
                            document.getElementById(lettersArray[right] + y + 'button').setAttribute('class', 'chessPiece-move')
                        }
                        if (right == 7) { break; }
                    }

                    //move left
                    for (var i = 1; i < 8; i++) {
                        if (x == 0) { break; }
                        var left = x;
                        left -= i;
                        if ((document.getElementById(lettersArray[left] + y + 'button').getAttribute('name').charAt(0) == 'W')) {
                            break;
                        } else if ((document.getElementById(lettersArray[left] + y + 'button').getAttribute('name').charAt(0) == 'B')) {
                            document.getElementById(lettersArray[left] + y + 'button').setAttribute('class', 'chessPiece-move');
                            break;
                        } else if ((document.getElementById(lettersArray[left] + y + 'button').getAttribute('name') == piecesArray[12])) {
                            document.getElementById(lettersArray[left] + y + 'button').setAttribute('class', 'chessPiece-move')
                        }
                        if (left == 0) { break; }
                    }

                    //move down 
                    for (var i = 1; i < 8; i++) {
                        if (y == 1) { break; }
                        var down = y;
                        down -= i;
                        if ((document.getElementById(lettersArray[x] + down + 'button').getAttribute('name').charAt(0) == 'W')) {
                            break;
                        } else if ((document.getElementById(lettersArray[x] + down + 'button').getAttribute('name').charAt(0) == 'B')) {
                            document.getElementById(lettersArray[x] + down + 'button').setAttribute('class', 'chessPiece-move');
                            break;
                        } else if ((document.getElementById(lettersArray[x] + down + 'button').getAttribute('name') == piecesArray[12])) {
                            document.getElementById(lettersArray[x] + down + 'button').setAttribute('class', 'chessPiece-move')
                        }
                        if (down == 1) { break; }
                    }

                    //move up 
                    for (var i = 1; i < 8; i++) {
                        if (y == 8) { break; }
                        var up = y;
                        up += i;
                        if ((document.getElementById(lettersArray[x] + up + 'button').getAttribute('name').charAt(0) == 'W')) {
                            break;
                        } else if ((document.getElementById(lettersArray[x] + up + 'button').getAttribute('name').charAt(0) == 'B')) {
                            document.getElementById(lettersArray[x] + up + 'button').setAttribute('class', 'chessPiece-move');
                            break;
                        } else if ((document.getElementById(lettersArray[x] + up + 'button').getAttribute('name') == piecesArray[12])) {
                            document.getElementById(lettersArray[x] + up + 'button').setAttribute('class', 'chessPiece-move')
                        }
                        if (up == 8) { break; }
                    }

                    //copied from bishop
                    //up right
                    for (var i = 1; i < 8; i++) {
                        if (x == 7 || y == 8) { break; }
                        var horizontal = x;
                        var vertical = y;
                        horizontal += i;
                        vertical += i;
                        var bishopMove = document.getElementById(lettersArray[horizontal] + (vertical) + 'button');
                        if (bishopMove.getAttribute('name').charAt(0) == 'W') {
                            break;
                        } else if ((bishopMove.getAttribute('name').charAt(0) == 'B')) {
                            bishopMove.setAttribute('class', 'chessPiece-move');
                            break;
                        } else if (bishopMove.getAttribute('name') == piecesArray[12]) {
                            bishopMove.setAttribute('class', 'chessPiece-move')
                        }
                        if (horizontal == 7 || vertical == 8) { break; }

                    }

                    //down right
                    for (var i = 1; i < 8; i++) {
                        if (x == 7 || y == 1) { break; }
                        var horizontal = x;
                        var vertical = y;
                        horizontal += i;
                        vertical -= i;
                        var bishopMove = document.getElementById(lettersArray[horizontal] + (vertical) + 'button');
                        if (bishopMove.getAttribute('name').charAt(0) == 'W') {
                            break;
                        } else if (bishopMove.getAttribute('name').charAt(0) == 'B') {
                            bishopMove.setAttribute('class', 'chessPiece-move');
                            break;
                        } else if (bishopMove.getAttribute('name') == piecesArray[12]) {
                            bishopMove.setAttribute('class', 'chessPiece-move')
                        }
                        if (horizontal == 7 || vertical == 1) { break; }
                    }

                    //down left
                    for (var i = 1; i < 8; i++) {
                        if (x == 0 || y == 1) { break; }
                        var horizontal = x;
                        var vertical = y;
                        horizontal -= i;
                        vertical -= i;
                        var bishopMove = document.getElementById(lettersArray[horizontal] + (vertical) + 'button');
                        if (bishopMove.getAttribute('name').charAt(0) == 'W') {
                            break;
                        } else if (bishopMove.getAttribute('name').charAt(0) == 'B') {
                            bishopMove.setAttribute('class', 'chessPiece-move');
                            break;
                        } else if (bishopMove.getAttribute('name') == piecesArray[12]) {
                            bishopMove.setAttribute('class', 'chessPiece-move')
                        }
                        if (horizontal == 0 || vertical == 1) { break; }
                    }

                    //up left
                    for (var i = 1; i < 8; i++) {
                        if (x == 0 || y == 8) { break; }
                        var horizontal = x;
                        var vertical = y;
                        horizontal -= i;
                        vertical += i;
                        var bishopMove = document.getElementById(lettersArray[horizontal] + (vertical) + 'button');
                        if (bishopMove.getAttribute('name').charAt(0) == 'W') {
                            break;
                        } else if (bishopMove.getAttribute('name').charAt(0) == 'B') {
                            bishopMove.setAttribute('class', 'chessPiece-move');
                            break;
                        } else if (bishopMove.getAttribute('name') == piecesArray[12]) {
                            bishopMove.setAttribute('class', 'chessPiece-move')
                        }
                        if (horizontal == 0 || vertical == 8) { break; }
                    }
                    break;

                //white king
                case 5:

                    //set vars
                    var up = document.getElementById(lettersArray[x] + (y + 1) + 'button');
                    var upLeft = document.getElementById(lettersArray[x - 1] + (y + 1) + 'button');
                    var left = document.getElementById(lettersArray[x - 1] + y + 'button');
                    var downLeft = document.getElementById(lettersArray[x - 1] + (y - 1) + 'button');
                    var down = document.getElementById(lettersArray[x] + (y - 1) + 'button');
                    var downRight = document.getElementById(lettersArray[x + 1] + (y - 1) + 'button');
                    var right = document.getElementById(lettersArray[x + 1] + y + 'button');
                    var upRight = document.getElementById(lettersArray[x + 1] + (y + 1) + 'button');
                    var kingMoveArray = [up, upLeft, left, downLeft, down, downRight, right, upRight]

                    for (var i = 0; i < kingMoveArray.length; i++) {
                        if (kingMoveArray[i] != null) {
                            if (kingMoveArray[i].getAttribute('name') == piecesArray[12]) {
                                kingMoveArray[i].setAttribute('class', 'chessPiece-move');
                            } else if (kingMoveArray[i].getAttribute('name').charAt(0) == 'B') {
                                kingMoveArray[i].setAttribute('class', 'chessPiece-move');
                            }
                        }
                    }

                    break;

                //black pawns
                case 6:

                    //copy from white(reverse capture target & direction)
                    var oneSpace = document.getElementById(lettersArray[x] + (y - 1) + 'button');
                    var twoSpace = document.getElementById(lettersArray[x] + (y - 2) + 'button');
                    var diagRight = document.getElementById(lettersArray[x - 1] + (y - 1) + 'button');
                    var diagLeft = document.getElementById(lettersArray[x + 1] + (y - 1) + 'button');
                    if (x != 0 && diagRight.getAttribute('name') != piecesArray[12] && diagRight.getAttribute('name').charAt(0) == 'W') {
                        diagRight.setAttribute('class', 'chessPiece-move');
                    }
                    if (x != 7 && diagLeft.getAttribute('name') != piecesArray[12] && diagLeft.getAttribute('name').charAt(0) == 'W') {
                        diagLeft.setAttribute('class', 'chessPiece-move');
                    }
                    if (document.getElementById('rank7').contains(selectedPiece[0])) {
                        if (twoSpace.getAttribute('name') == piecesArray[12] && oneSpace.getAttribute('name') == piecesArray[12]) {
                            oneSpace.setAttribute('class', 'chessPiece-move');
                            twoSpace.setAttribute('class', 'chessPiece-move');
                        } else if (oneSpace.getAttribute('name') == piecesArray[12]) {
                            oneSpace.setAttribute('class', 'chessPiece-move');
                        }
                    } else if (oneSpace.getAttribute('name') == piecesArray[12]) {
                        oneSpace.setAttribute('class', 'chessPiece-move');
                    }
                    break;

                //black rooks
                case 7:

                    //copy from white
                    //move right
                    for (var i = 1; i < 8; i++) {
                        if (x == 7) { break; }
                        var right = x;
                        right += i;
                        if ((document.getElementById(lettersArray[right] + y + 'button').getAttribute('name').charAt(0) == 'B')) {
                            break;
                        } else if ((document.getElementById(lettersArray[right] + y + 'button').getAttribute('name').charAt(0) == 'W')) {
                            document.getElementById(lettersArray[right] + y + 'button').setAttribute('class', 'chessPiece-move');
                            break;
                        } else if ((document.getElementById(lettersArray[right] + y + 'button').getAttribute('name') == piecesArray[12])) {
                            document.getElementById(lettersArray[right] + y + 'button').setAttribute('class', 'chessPiece-move')
                        }
                        if (right == 7) { break; }
                    }

                    //move left
                    for (var i = 1; i < 8; i++) {
                        if (x == 0) { break; }
                        var left = x;
                        left -= i;
                        if ((document.getElementById(lettersArray[left] + y + 'button').getAttribute('name').charAt(0) == 'B')) {
                            break;
                        } else if ((document.getElementById(lettersArray[left] + y + 'button').getAttribute('name').charAt(0) == 'W')) {
                            document.getElementById(lettersArray[left] + y + 'button').setAttribute('class', 'chessPiece-move');
                            break;
                        } else if ((document.getElementById(lettersArray[left] + y + 'button').getAttribute('name') == piecesArray[12])) {
                            document.getElementById(lettersArray[left] + y + 'button').setAttribute('class', 'chessPiece-move')
                        }
                        if (left == 0) { break; }
                    }

                    //move down 
                    for (var i = 1; i < 8; i++) {
                        if (y == 1) { break; }
                        var down = y;
                        down -= i;
                        if ((document.getElementById(lettersArray[x] + down + 'button').getAttribute('name').charAt(0) == 'B')) {
                            break;
                        } else if ((document.getElementById(lettersArray[x] + down + 'button').getAttribute('name').charAt(0) == 'W')) {
                            document.getElementById(lettersArray[x] + down + 'button').setAttribute('class', 'chessPiece-move');
                            break;
                        } else if ((document.getElementById(lettersArray[x] + down + 'button').getAttribute('name') == piecesArray[12])) {
                            document.getElementById(lettersArray[x] + down + 'button').setAttribute('class', 'chessPiece-move')
                        }
                        if (down == 1) { break; }
                    }

                    //move up 
                    for (var i = 1; i < 8; i++) {
                        if (y == 8) { break; }
                        var up = y;
                        up += i;
                        if ((document.getElementById(lettersArray[x] + up + 'button').getAttribute('name').charAt(0) == 'B')) {
                            break;
                        } else if ((document.getElementById(lettersArray[x] + up + 'button').getAttribute('name').charAt(0) == 'W')) {
                            document.getElementById(lettersArray[x] + up + 'button').setAttribute('class', 'chessPiece-move');
                            break;
                        } else if ((document.getElementById(lettersArray[x] + up + 'button').getAttribute('name') == piecesArray[12])) {
                            document.getElementById(lettersArray[x] + up + 'button').setAttribute('class', 'chessPiece-move')
                        }
                        if (up == 8) { break; }
                    }

                    break;

                //black knights
                case 8:

                    //copy from white 
                    //jump angles number is degrees
                    var jump30 = document.getElementById(lettersArray[x + 1] + (y - 2) + 'button');
                    var jump60 = document.getElementById(lettersArray[x + 2] + (y - 1) + 'button');
                    var jump120 = document.getElementById(lettersArray[x + 2] + (y + 1) + 'button');
                    var jump150 = document.getElementById(lettersArray[x + 1] + (y + 2) + 'button');
                    var jump210 = document.getElementById(lettersArray[x - 1] + (y + 2) + 'button');
                    var jump240 = document.getElementById(lettersArray[x - 2] + (y + 1) + 'button');
                    var jump300 = document.getElementById(lettersArray[x - 2] + (y - 1) + 'button');
                    var jump330 = document.getElementById(lettersArray[x - 1] + (y - 2) + 'button');
                    var jumpArray = [jump30, jump60, jump120, jump150, jump210, jump240, jump300, jump330];

                    for (var i = 0; i < jumpArray.length; i++) {
                        if (jumpArray[i] != null) {
                            if (jumpArray[i].getAttribute('name') == piecesArray[12]) {
                                jumpArray[i].setAttribute('class', 'chessPiece-move');
                            } else if (jumpArray[i].getAttribute('name').charAt(0) == 'W') {
                                jumpArray[i].setAttribute('class', 'chessPiece-move');
                            }
                        }
                    }
                    break;

                //black bishops
                case 9:

                    //copy from white
                    //up right
                    for (var i = 1; i < 8; i++) {
                        if (x == 7 || y == 8) { break; }
                        var horizontal = x;
                        var vertical = y;
                        horizontal += i;
                        vertical += i;
                        var bishopMove = document.getElementById(lettersArray[horizontal] + (vertical) + 'button');
                        if (bishopMove.getAttribute('name').charAt(0) == 'B') {
                            break;
                        } else if ((bishopMove.getAttribute('name').charAt(0) == 'W')) {
                            bishopMove.setAttribute('class', 'chessPiece-move');
                            break;
                        } else if (bishopMove.getAttribute('name') == piecesArray[12]) {
                            bishopMove.setAttribute('class', 'chessPiece-move')
                        }
                        if (horizontal == 7 || vertical == 8) { break; }

                    }

                    //down right
                    for (var i = 1; i < 8; i++) {
                        if (x == 7 || y == 1) { break; }
                        var horizontal = x;
                        var vertical = y;
                        horizontal += i;
                        vertical -= i;
                        var bishopMove = document.getElementById(lettersArray[horizontal] + (vertical) + 'button');
                        if (bishopMove.getAttribute('name').charAt(0) == 'B') {
                            break;
                        } else if (bishopMove.getAttribute('name').charAt(0) == 'W') {
                            bishopMove.setAttribute('class', 'chessPiece-move');
                            break;
                        } else if (bishopMove.getAttribute('name') == piecesArray[12]) {
                            bishopMove.setAttribute('class', 'chessPiece-move')
                        }
                        if (horizontal == 7 || vertical == 1) { break; }
                    }

                    //down left
                    for (var i = 1; i < 8; i++) {
                        if (x == 0 || y == 1) { break; }
                        var horizontal = x;
                        var vertical = y;
                        horizontal -= i;
                        vertical -= i;
                        var bishopMove = document.getElementById(lettersArray[horizontal] + (vertical) + 'button');
                        if (bishopMove.getAttribute('name').charAt(0) == 'B') {
                            break;
                        } else if (bishopMove.getAttribute('name').charAt(0) == 'W') {
                            bishopMove.setAttribute('class', 'chessPiece-move');
                            break;
                        } else if (bishopMove.getAttribute('name') == piecesArray[12]) {
                            bishopMove.setAttribute('class', 'chessPiece-move')
                        }
                        if (horizontal == 0 || vertical == 1) { break; }
                    }

                    //up left
                    for (var i = 1; i < 8; i++) {
                        if (x == 0 || y == 8) { break; }
                        var horizontal = x;
                        var vertical = y;
                        horizontal -= i;
                        vertical += i;
                        var bishopMove = document.getElementById(lettersArray[horizontal] + (vertical) + 'button');
                        if (bishopMove.getAttribute('name').charAt(0) == 'B') {
                            break;
                        } else if (bishopMove.getAttribute('name').charAt(0) == 'W') {
                            bishopMove.setAttribute('class', 'chessPiece-move');
                            break;
                        } else if (bishopMove.getAttribute('name') == piecesArray[12]) {
                            bishopMove.setAttribute('class', 'chessPiece-move')
                        }
                        if (horizontal == 0 || vertical == 8) { break; }
                    }

                    break;

                //black queen
                case 10:

                    //move right
                    for (var i = 1; i < 8; i++) {
                        if (x == 7) { break; }
                        var right = x;
                        right += i;
                        if ((document.getElementById(lettersArray[right] + y + 'button').getAttribute('name').charAt(0) == 'B')) {
                            break;
                        } else if ((document.getElementById(lettersArray[right] + y + 'button').getAttribute('name').charAt(0) == 'W')) {
                            document.getElementById(lettersArray[right] + y + 'button').setAttribute('class', 'chessPiece-move');
                            break;
                        } else if ((document.getElementById(lettersArray[right] + y + 'button').getAttribute('name') == piecesArray[12])) {
                            document.getElementById(lettersArray[right] + y + 'button').setAttribute('class', 'chessPiece-move')
                        }
                        if (right == 7) { break; }
                    }

                    //move left
                    for (var i = 1; i < 8; i++) {
                        if (x == 0) { break; }
                        var left = x;
                        left -= i;
                        if ((document.getElementById(lettersArray[left] + y + 'button').getAttribute('name').charAt(0) == 'B')) {
                            break;
                        } else if ((document.getElementById(lettersArray[left] + y + 'button').getAttribute('name').charAt(0) == 'W')) {
                            document.getElementById(lettersArray[left] + y + 'button').setAttribute('class', 'chessPiece-move');
                            break;
                        } else if ((document.getElementById(lettersArray[left] + y + 'button').getAttribute('name') == piecesArray[12])) {
                            document.getElementById(lettersArray[left] + y + 'button').setAttribute('class', 'chessPiece-move')
                        }
                        if (left == 0) { break; }
                    }

                    //move down 
                    for (var i = 1; i < 8; i++) {
                        if (y == 1) { break; }
                        var down = y;
                        down -= i;
                        if ((document.getElementById(lettersArray[x] + down + 'button').getAttribute('name').charAt(0) == 'B')) {
                            break;
                        } else if ((document.getElementById(lettersArray[x] + down + 'button').getAttribute('name').charAt(0) == 'W')) {
                            document.getElementById(lettersArray[x] + down + 'button').setAttribute('class', 'chessPiece-move');
                            break;
                        } else if ((document.getElementById(lettersArray[x] + down + 'button').getAttribute('name') == piecesArray[12])) {
                            document.getElementById(lettersArray[x] + down + 'button').setAttribute('class', 'chessPiece-move')
                        }
                        if (down == 1) { break; }
                    }

                    //move up 
                    for (var i = 1; i < 8; i++) {
                        if (y == 8) { break; }
                        var up = y;
                        up += i;
                        if ((document.getElementById(lettersArray[x] + up + 'button').getAttribute('name').charAt(0) == 'B')) {
                            break;
                        } else if ((document.getElementById(lettersArray[x] + up + 'button').getAttribute('name').charAt(0) == 'W')) {
                            document.getElementById(lettersArray[x] + up + 'button').setAttribute('class', 'chessPiece-move');
                            break;
                        } else if ((document.getElementById(lettersArray[x] + up + 'button').getAttribute('name') == piecesArray[12])) {
                            document.getElementById(lettersArray[x] + up + 'button').setAttribute('class', 'chessPiece-move')
                        }
                        if (up == 8) { break; }
                    }

                    //up right
                    for (var i = 1; i < 8; i++) {
                        if (x == 7 || y == 8) { break; }
                        var horizontal = x;
                        var vertical = y;
                        horizontal += i;
                        vertical += i;
                        var bishopMove = document.getElementById(lettersArray[horizontal] + (vertical) + 'button');
                        if (bishopMove.getAttribute('name').charAt(0) == 'B') {
                            break;
                        } else if ((bishopMove.getAttribute('name').charAt(0) == 'W')) {
                            bishopMove.setAttribute('class', 'chessPiece-move');
                            break;
                        } else if (bishopMove.getAttribute('name') == piecesArray[12]) {
                            bishopMove.setAttribute('class', 'chessPiece-move')
                        }
                        if (horizontal == 7 || vertical == 8) { break; }

                    }

                    //down right
                    for (var i = 1; i < 8; i++) {
                        if (x == 7 || y == 1) { break; }
                        var horizontal = x;
                        var vertical = y;
                        horizontal += i;
                        vertical -= i;
                        var bishopMove = document.getElementById(lettersArray[horizontal] + (vertical) + 'button');
                        if (bishopMove.getAttribute('name').charAt(0) == 'B') {
                            break;
                        } else if (bishopMove.getAttribute('name').charAt(0) == 'W') {
                            bishopMove.setAttribute('class', 'chessPiece-move');
                            break;
                        } else if (bishopMove.getAttribute('name') == piecesArray[12]) {
                            bishopMove.setAttribute('class', 'chessPiece-move')
                        }
                        if (horizontal == 7 || vertical == 1) { break; }
                    }

                    //down left
                    for (var i = 1; i < 8; i++) {
                        if (x == 0 || y == 1) { break; }
                        var horizontal = x;
                        var vertical = y;
                        horizontal -= i;
                        vertical -= i;
                        var bishopMove = document.getElementById(lettersArray[horizontal] + (vertical) + 'button');
                        if (bishopMove.getAttribute('name').charAt(0) == 'B') {
                            break;
                        } else if (bishopMove.getAttribute('name').charAt(0) == 'W') {
                            bishopMove.setAttribute('class', 'chessPiece-move');
                            break;
                        } else if (bishopMove.getAttribute('name') == piecesArray[12]) {
                            bishopMove.setAttribute('class', 'chessPiece-move')
                        }
                        if (horizontal == 0 || vertical == 1) { break; }
                    }

                    //up left
                    for (var i = 1; i < 8; i++) {
                        if (x == 0 || y == 8) { break; }
                        var horizontal = x;
                        var vertical = y;
                        horizontal -= i;
                        vertical += i;
                        var bishopMove = document.getElementById(lettersArray[horizontal] + (vertical) + 'button');
                        if (bishopMove.getAttribute('name').charAt(0) == 'B') {
                            break;
                        } else if (bishopMove.getAttribute('name').charAt(0) == 'W') {
                            bishopMove.setAttribute('class', 'chessPiece-move');
                            break;
                        } else if (bishopMove.getAttribute('name') == piecesArray[12]) {
                            bishopMove.setAttribute('class', 'chessPiece-move')
                        }
                        if (horizontal == 0 || vertical == 8) { break; }
                    }

                    break;

                //black king
                case 11:

                    //copy from white king
                    //set vars
                    var up = document.getElementById(lettersArray[x] + (y + 1) + 'button');
                    var upLeft = document.getElementById(lettersArray[x - 1] + (y + 1) + 'button');
                    var left = document.getElementById(lettersArray[x - 1] + y + 'button');
                    var downLeft = document.getElementById(lettersArray[x - 1] + (y - 1) + 'button');
                    var down = document.getElementById(lettersArray[x] + (y - 1) + 'button');
                    var downRight = document.getElementById(lettersArray[x + 1] + (y - 1) + 'button');
                    var right = document.getElementById(lettersArray[x + 1] + y + 'button');
                    var upRight = document.getElementById(lettersArray[x + 1] + (y + 1) + 'button');
                    var kingMoveArray = [up, upLeft, left, downLeft, down, downRight, right, upRight]

                    for (var i = 0; i < kingMoveArray.length; i++) {
                        if (kingMoveArray[i] != null) {
                            if (kingMoveArray[i].getAttribute('name') == piecesArray[12]) {
                                kingMoveArray[i].setAttribute('class', 'chessPiece-move');
                            } else if (kingMoveArray[i].getAttribute('name').charAt(0) == 'W') {
                                kingMoveArray[i].setAttribute('class', 'chessPiece-move');
                            }
                        }
                    }

                    break;

                //case 12: (empty) does not move

                default: //see case 12
                    break;
            }

            //doMove event
            for (var i = 0; i < document.querySelectorAll('.chessPiece-move').length; i++) {
                document.querySelectorAll('.chessPiece-move')[i].addEventListener('click', doMove, false);
            }
            //remove old listeners
            for (var i = 0; i < document.getElementsByClassName('chessPiece').length; i++) {
                document.getElementsByClassName('chessPiece')[i].removeEventListener('click', doMove);
            }
        }
    }

    //event to show movable squares
    for (var i = 0; i < unselectedPiece.length; i++) {
        document.getElementsByClassName('chessPiece')[i].addEventListener('click', pieceMoves, false);
    }

    //funtion to move a piece
    function doMove() {
        origin = pieceName.charAt(1) + pieceID.charAt(0) + pieceID.charAt(1);
        destination = pieceName.charAt(1) + this.getAttribute('id').charAt(0) + this.getAttribute('id').charAt(1);

        //White's Turn
        if ((turnCounter + 2) % 2 != 0 && pieceColor == 'W') {

            //special case for Queen Promotion
            if (pieceName.charAt(1) == 'P' && destination.charAt(2) == 8) {
                this.setAttribute('name', 'WQ');
                destination = 'Q' + this.getAttribute('id').charAt(0) + this.getAttribute('id').charAt(1);
                document.getElementById(pieceID).setAttribute('name', 'empty');
                for (var i = 0; i <= 12; i++) {
                    var addImg = document.querySelectorAll('[name="' + piecesArray[i] + '"');
                    for (var j = 0; j < addImg.length; j++) {
                        if (i != 12) {
                            addImg[j].innerHTML = '<img src="../img/' + piecesArray[i] + '.png">';
                        } else {
                            addImg[j].innerHTML = "";
                        }
                    }
                }
            }

            //all other cases as normal
            else {
                this.setAttribute('name', pieceName);
                document.getElementById(pieceID).setAttribute('name', 'empty');
                for (var i = 0; i <= 12; i++) {
                    var addImg = document.querySelectorAll('[name="' + piecesArray[i] + '"');
                    for (var j = 0; j < addImg.length; j++) {
                        if (i != 12) {
                            addImg[j].innerHTML = '<img src="../img/' + piecesArray[i] + '.png">';
                        } else {
                            addImg[j].innerHTML = "";
                        }
                    }
                }
            }
            scoreBoard.innerHTML += '<tr><td>(' + turnCounter + ') White: ' + Math.round(turnCounter / 2) + '</td><td>' + origin + '</td><td>' + destination + '</td></tr>';
            document.getElementById('turnColor').textContent = "Black's Turn";
            turnCounter++;
        }

        //Black's Turn
        else if ((turnCounter + 2) % 2 == 0 && pieceColor == 'B') {

            //special case for Queen Promotion
            if (pieceName.charAt(1) == 'P' && destination.charAt(2) == 1) {
                this.setAttribute('name', 'BQ');
                destination = 'Q' + this.getAttribute('id').charAt(0) + this.getAttribute('id').charAt(1);
                document.getElementById(pieceID).setAttribute('name', 'empty');
                for (var i = 0; i <= 12; i++) {
                    var addImg = document.querySelectorAll('[name="' + piecesArray[i] + '"');
                    for (var j = 0; j < addImg.length; j++) {
                        if (i != 12) {
                            addImg[j].innerHTML = '<img src="../img/' + piecesArray[i] + '.png">';
                        } else {
                            addImg[j].innerHTML = "";
                        }
                    }
                }
            }

            //all other cases as normal
            else {
                this.setAttribute('name', pieceName);
                document.getElementById(pieceID).setAttribute('name', 'empty');
                for (var i = 0; i <= 12; i++) {
                    var addImg = document.querySelectorAll('[name="' + piecesArray[i] + '"');
                    for (var j = 0; j < addImg.length; j++) {
                        if (i != 12) {
                            addImg[j].innerHTML = '<img src="../img/' + piecesArray[i] + '.png">';
                        } else {
                            addImg[j].innerHTML = "";
                        }
                    }
                }
            }
            scoreBoard.innerHTML += '<tr><td>(' + turnCounter + ') Black: ' + Math.round(turnCounter / 2) + '</td><td>' + origin + '</td><td>' + destination + '</td></tr>';
            turnCounter++;
            document.getElementById('turnColor').textContent = "White's Turn";
        }

        //remove old event listeners
        this.removeEventListener('click', doMove);
        for (var i = 0; i < document.getElementsByClassName('chessPiece').length; i++) {
            document.getElementsByClassName('chessPiece')[i].removeEventListener('click', doMove);
        }
    }

    //add images to named pieces
    for (var i = 0; i < 12; i++) {
        var addImg = document.querySelectorAll('[name="' + piecesArray[i] + '"');
        for (var j = 0; j < addImg.length; j++) {
            addImg[j].innerHTML = '<img src="../img/' + piecesArray[i] + '.png">';
        }
    }
}

//events to create a new game
document.getElementById('resetBoard').addEventListener('click', newGame, false);
window.onload = newGame;

//function to hide scoreboard
function toggleScoreBoard() {

    //var for scoreboard
    var score = document.getElementById('moves');

    //if showing hide
    if (score.getAttribute('class') == 'show') {
        score.setAttribute('class', 'hide');
    }

    //if hiding show
    else if (score.getAttribute('class') == 'hide') {
        score.setAttribute('class', 'show');
    }
}

//event to hide scoreboard
document.getElementById('hideScore').addEventListener('click', toggleScoreBoard, false);