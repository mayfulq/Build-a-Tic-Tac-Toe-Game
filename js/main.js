$(function () {

    var playerMove = "X";
    var compMove = "O";
    var boxid, i, j;
    var game = true;
    var firstCompMove = true;
    var boxes = [" ", " ", " ", " ", " ", " ", " ", " ", " "];
    // all winning combinations
    var win = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    //where computer makes its first move
    var firstArr = [0, 2, 4, 6, 8];
 

    $("#playX").click(function () { //click on X button
        playerMove = "X";
        compMove = "O";
        $("#playX").hide();
        $("#playO").hide();
        $('#reset').show();

    });

    $("#playO").click(function () { //click on O button
        playerMove = "O";
        compMove = "X";
        $("#playX").hide();
        $("#playO").hide();
        $('#reset').show();

        compsTurn();

    });


    $(".box").click(function () { //click on a box      
        boxid = $(this).attr("id");
        if (game && boxes[boxid] == " ") {
            playersTurn(boxid, playerMove);
            compsTurn();
        }
    });
    $('#reset').click(function () {
        resetGame();
    })

    //FUNCTIONS

    //player's move – put X or O in a box
    function playersTurn(n, sign) {
        boxes[n] = sign;
        $("#" + n).text(sign);
        checkWin();
        checkTie();
    }


    //computer's move
    function compsTurn() {

        if (game) {
            //check if it's the first computer move and put O (compMove) in the center
            if (firstCompMove) {
                if (boxes[4] == " ") {
                    boxes[4] = compMove;
                    $("#4").text(compMove);
                    firstCompMove = false;
                    return;
                } else { //if center is occupied, put O (compMove) in a random corner
                    do {
                        var a = firstArr[Math.floor((Math.random() * 4) + 1)];
                    }
                    while (boxes[a] == playerMove);
                    boxes[a] = compMove;
                    $("#" + a).text(compMove);
                    firstCompMove = false;
                    return;
                }
            }

            //looking for string with two Os (compMove's) – trying to win
            for (i = 0; i < 8; i++) {
                var winstr = boxes[win[i][0]] + boxes[win[i][1]] + boxes[win[i][2]];
                if (winstr == " " + compMove + compMove) {
                    boxes[win[i][0]] = compMove;
                    $("#" + win[i][0]).text(compMove);
                    checkWin();
                    return;
                } else if (winstr == compMove + " " + compMove) {
                    boxes[win[i][1]] = compMove;
                    $("#" + win[i][1]).text(compMove);
                    checkWin();
                    return;
                } else if (winstr == compMove + compMove + " ") {
                    boxes[win[i][2]] = compMove;
                    $("#" + win[i][2]).text(compMove);
                    checkWin();
                    return;
                }
            }

            //looking for string with two Xs (playerMove's) - prevent player from winning
            for (i = 0; i < 8; i++) {
                var winstr = boxes[win[i][0]] + boxes[win[i][1]] + boxes[win[i][2]];
                if (winstr == " " + playerMove + playerMove) {
                    boxes[win[i][0]] = compMove;
                    $("#" + win[i][0]).text(compMove);
                    checkWin();
                    checkTie();
                    return;
                } else if (winstr == playerMove + " " + playerMove) {
                    boxes[win[i][1]] = compMove;
                    $("#" + win[i][1]).text(compMove);
                    checkWin();
                    checkTie();
                    return;
                } else if (winstr == playerMove + playerMove + " ") {
                    boxes[win[i][2]] = compMove;
                    $("#" + win[i][2]).text(compMove);
                    checkWin();
                    checkTie();
                    return;
                }
            }

            //check if there is row where there is O compMove but no X playerMove
            for (i = 0; i < 8; i++) {
                var winstr = boxes[win[i][0]] + boxes[win[i][1]] + boxes[win[i][2]];
                if (winstr.indexOf(playerMove) == -1 && winstr.indexOf(compMove) != -1) {
                    for (j = 0; j < 3; j++) {
                        if (boxes[win[i][j]] == " ") {
                            boxes[win[i][j]] = compMove;
                            $("#" + win[i][j]).text(compMove);
                            checkWin();
                            checkTie();
                            return;
                        }
                    }
                }
            }

            //check if empty row or column and put O (comp Move) there
            for (i = 0; i < 8; i++) {
                var winstr = boxes[win[i][0]] + boxes[win[i][1]] + boxes[win[i][2]];
                if (winstr == "   ") {
                    boxes[win[i][0]] = compMove;
                    $("#" + win[i][0]).text(compMove);
                    checkWin();
                    checkTie();
                    return;
                }
            }

            // put O (compMove) in a first available empty box
            for (i = 0; i < 8; i++) {
                if (boxes[i] == " ") {
                    boxes[i] = compMove;
                    $("#" + i).text(compMove);
                    checkWin();
                    checkTie();
                    return;
                }
            }
        }
    }


    // reset game
    function resetGame() {
        boxes.fill(" ");
        $(".box").removeClass("win");
        $(".box").text(" ");
        $('.result').text(" ");
        $("#playX").show();
        $("#playO").show();
        $("#reset").hide();

        game = true;
    }


    //check if win
    function checkWin() {
        for (i = 0; i < 8; i++) {
            var winstr = boxes[win[i][0]] + boxes[win[i][1]] + boxes[win[i][2]];
            if (winstr == playerMove + playerMove + playerMove) { //if player won

                $("#" + win[i][0]).addClass('win');
                $("#" + win[i][1]).addClass('win');
                $("#" + win[i][2]).addClass('win');

                $('.result').text('You win!');

                game = false;
                firstCompMove = true;

            } else if (winstr == compMove + compMove + compMove) { //if computer won

                $("#" + win[i][0]).addClass('win');
                $("#" + win[i][1]).addClass('win');
                $("#" + win[i][2]).addClass('win');

                $('.result').text('Computer win!');

                game = false;
                firstCompMove = true;

            }
        }
    }

    //check if tie
    function checkTie() {
        var tieflag = true;
        for (i = 0; i < 8; i++) {
            var winstr = boxes[win[i][0]] + boxes[win[i][1]] + boxes[win[i][2]];
            if (winstr.indexOf("X") == -1 || winstr.indexOf("O") == -1) {
                tieflag = false;
            }
        }
        if (tieflag) {
            $('.result').text("It's a tie!");
            game = false;
            firstCompMove = true;

        }

    }

});