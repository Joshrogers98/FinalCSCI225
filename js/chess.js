//this creates the board for the game
const lettersArray = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']
const piecesArray = ['WP', 'WR', 'WN', 'WB', 'WQ', 'WK', 'BP', 'BR', 'BN', 'BB', 'BQ', 'BK', 'empty'];


function newGame() {
    var turnCounter = 1;
    console.log(turnCounter + " White's turn");
    document.getElementById('chessBoard').innerHTML = "";
    var makeBoard = "";
    //set the board
    for (var i = 0; i < 8; i++) {
        //create the rows
        makeBoard += '<tr id="rank' + (8 - i) + '" class="rank' + (i + 1) + '">';
        for (var j = 0; j < 8; j++) {
            //create the files(columns)
            makeBoard += '<td class="file' + lettersArray[j] + '" id="' + lettersArray[j] + (8 - i) + '" name=""><button class="chessPiece"  id="' + lettersArray[j] + (8 - i) + 'button"></button></td>';
        }
        makeBoard += '</tr>'
    }
    //event to set board
    document.getElementById('chessBoard').innerHTML = makeBoard;

    //Assign names to buttons

    //White pieces
    document.getElementById('A1button').setAttribute('name', 'WR');
    document.getElementById('B1button').setAttribute('name', 'WN');
    document.getElementById('C1button').setAttribute('name', 'WB');
    document.getElementById('D1button').setAttribute('name', 'WQ');
    document.getElementById('E1button').setAttribute('name', 'WK');
    document.getElementById('F1button').setAttribute('name', 'WB');
    document.getElementById('G1button').setAttribute('name', 'WN');
    document.getElementById('H1button').setAttribute('name', 'WR');

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
    document.getElementById('A8button').setAttribute('name', 'BR');
    document.getElementById('B8button').setAttribute('name', 'BN');
    document.getElementById('C8button').setAttribute('name', 'BB');
    document.getElementById('D8button').setAttribute('name', 'BQ');
    document.getElementById('E8button').setAttribute('name', 'BK');
    document.getElementById('F8button').setAttribute('name', 'BB');
    document.getElementById('G8button').setAttribute('name', 'BN');
    document.getElementById('H8button').setAttribute('name', 'BR');

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

    //function to highlight a piece
    var unselectedPiece = document.getElementsByClassName('chessPiece')
    var selectedPiece = document.getElementsByClassName('chessPiece-selected');
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

    //event for highlighting a piece
    for (var i = 0; i < unselectedPiece.length; i++) {
        document.getElementsByClassName('chessPiece')[i].addEventListener('click', highlightPiece, false);
    }

    //function to show where a piece can move
    var pieceIndex = null;
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

            //function to move a piece

            var pieceColor = document.getElementsByClassName('chessPiece-selected')[0].getAttribute('name').charAt(0);
            var pieceID = document.getElementsByClassName('chessPiece-selected')[0].getAttribute('id');
            var pieceName = document.getElementsByClassName('chessPiece-selected')[0].getAttribute('name');
            
            for (var i = 0; i < piecesArray.length; i++) {
                if (pieceName == piecesArray[i]) {
                    pieceIndex = i;
                }
            }

            //document coordinates
            var y = parseInt((selectedPiece[0].getAttribute('id')).charAt(1));
            var x = lettersArray.indexOf((selectedPiece[0].getAttribute('id')).charAt(0));
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
            
            function doMove() {
                var destination = pieceName.charAt(1) + this.getAttribute('id').charAt(0) + this.getAttribute('id').charAt(1);
                    console.log(destination);

                if ((turnCounter + 2) % 2 != 0 && pieceColor == 'W') {
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
                    turnCounter++;
                    console.log(turnCounter + " Black's Turn");
                }else if((turnCounter + 2) % 2 == 0 && pieceColor == 'B'){
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
                    turnCounter++;
                    console.log(turnCounter + " White's Turn");
                }
                currentPiece = '';
                currentPieceColor ='';
                currentPieceID = '';
            }

            for (var i = 0; i < document.getElementsByClassName('chessPiece-move').length; i++) {
                document.getElementsByClassName('chessPiece-move')[i].addEventListener('click', doMove, false);
            }
        }
    }
    for (var i = 0; i < unselectedPiece.length; i++) {
        document.getElementsByClassName('chessPiece')[i].addEventListener('click', pieceMoves, false);
    }

    //add images to named pieces
    for (var i = 0; i < 12; i++) {
        var addImg = document.querySelectorAll('[name="' + piecesArray[i] + '"');
        for (var j = 0; j < addImg.length; j++) {
            addImg[j].innerHTML = '<img src="../img/' + piecesArray[i] + '.png">';
        }
    }

}
document.getElementById('resetBoard').addEventListener('click', newGame, false);
window.onload = newGame;