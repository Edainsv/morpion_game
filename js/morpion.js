window.onload = function() {
	var app = document.getElementById('app');
	var modal = document.getElementById('modal');
	var game = document.getElementById('game');
	var cases = [];
	var player = 1;
	var mark = 'X';
	var hit = 0;
	var win = false;


	for (let x = 0; x < 3; x++) {
		cases[x] = new Array();

		for (let y = 0; y < 3; y++) {
			cases[x][y] = document.createElement('div');
			cases[x][y].classList.add('case');

			game.appendChild(cases[x][y]);


			cases[x][y].addEventListener('click', function() {	
				mark = changeMark();	

				if (cases[x][y].innerText == '') {
					cases[x][y].innerText = mark;

					hit++ // Add 1 per mark
					conditionWin(cases, player, hit); // Verify the condition win
					player = changePlayer();
				} else {
					var message = 'This case is already use !';
					openModal(message);
				}
			});
		}
	}

	function openModal(message, winner) {
		var closeModal = document.getElementById('closeModal');
		var main = document.getElementsByTagName('main')[0];
		var new_message = document.createElement('p');
		var ok_button = document.createElement('button');

		app.classList.add('blur');
		modal.classList.add('active');

		ok_button.classList.add('ok_button');

		new_message.innerHTML = message;
		main.appendChild(new_message);

		if (winner === true) {
			ok_button.innerText = 'Play Again';

			win = true;
			main.appendChild(ok_button);
		} else {
			ok_button.innerText = 'Ok';
			main.appendChild(ok_button);
		}

		ok_button.addEventListener('click', function() {
			closeMyModal();

			if (winner == true) {
				reloadGame();
			}
		});
	}

	function closeMyModal() {
		var main = document.getElementsByTagName('main')[0];

		app.classList.remove('blur');
		modal.classList.remove('active');
		main.innerHTML = '';
	}


	function changePlayer() {
		if (player == 1) {
			return 2;
		} else {
			return 1;
		}
	}

	function changeMark() {
		if (player == 1) {
			return 'X';
		} else {
			return 'O';
		}
	}

	function conditionWin(cases, player, hit) {
		if (
			// Condition horizontal
			cases[0][0].innerText != '' && cases[0][0].innerText == cases[0][1].innerText && cases[0][1].innerText == cases[0][2].innerText ||
			cases[1][0].innerText != '' && cases[1][0].innerText == cases[1][1].innerText && cases[1][1].innerText == cases[1][2].innerText ||
			cases[2][0].innerText != '' && cases[2][0].innerText == cases[2][1].innerText && cases[2][1].innerText == cases[2][2].innerText ||

			// Condition in height
			cases[0][0].innerText != '' && cases[0][0].innerText == cases[1][0].innerText && cases[1][0].innerText == cases[2][0].innerText ||
			cases[0][1].innerText != '' && cases[0][1].innerText == cases[1][1].innerText && cases[1][1].innerText == cases[2][1].innerText ||
			cases[0][2].innerText != '' && cases[0][2].innerText == cases[1][2].innerText && cases[1][2].innerText == cases[2][2].innerText ||

			// Condition in vertical
			cases[0][0].innerText != '' && cases[0][0].innerText == cases[1][1].innerText && cases[1][1].innerText == cases[2][2].innerText ||
			cases[2][0].innerText != '' && cases[2][0].innerText == cases[1][1].innerText && cases[1][1].innerText == cases[0][2].innerText
			) {

			var message = '<span class="playerWin">Player ' + player + '</span>' + ' win the game !';
			openModal(message, true);
		}

		if (hit == 9 && win == false) {
			var message = 'Egality !!!';
			openModal(message, true);
		}
	}

	function reloadGame() {
		player = 1;
		mark = 'X';
		hit = 0;
		win = false;

		for (let x = 0; x < 3; x++) {
			for (let y = 0; y < 3; y++) {
				cases[x][y].innerText = '';
			}
		}
	}
}