window.onload = function() {
	var app = document.getElementById('app');
	var modal = document.getElementById('modal');
	var game = document.getElementById('game');
	var rules = document.getElementById('rules');
	var player_score = document.getElementsByClassName('player_score');
	var cases = [];
	var player = 1;
	var mark = 'X';
	var hit = 0;
	var win = false;
	var points = {
		'player_1':0,
		'player_2':0
	};

	rules.addEventListener('click', function() {
		var content = `
			<div>
				<p>Options in coming...</p>

				<button id="reset_score">Reset scores</button>
			</div>
		`;
		openModal(content, 'rules');
	});

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

	function openModal(message, type) {
		var closeModal = document.getElementById('closeModal');
		var main = document.getElementsByTagName('main')[0];
		var new_message = document.createElement('p');
		var ok_button = document.createElement('button');

		app.classList.add('blur');
		modal.classList.add('active');

		ok_button.classList.add('ok_button');

		new_message.innerHTML = message;
		main.appendChild(new_message);

		if (type === true) {
			ok_button.innerText = 'Rejouer';

			win = true;
			main.appendChild(ok_button);
		} else {
			ok_button.innerText = 'Ok';
			main.appendChild(ok_button);
		}

		if (type === 'rules') {
			var reset_scores = document.getElementById('reset_score');

			reset_scores.addEventListener('click', function () {
				resetScore();
				reloadGame();
			});
		}

		ok_button.addEventListener('click', function() {
			closeMyModal();

			if (type == true) {
				reloadGame();
			}
		});
	}

	function resetScore() {
		points.player_1 = 0;
		points.player_2 = 0;

		player_score[0].innerText = 0;
		player_score[1].innerText = 0;

		closeMyModal();
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

			var message = '<span class="playerWin">Le joueur ' + player + '</span>' + ' a gagné la partie !';
			addScore(player);
			openModal(message, true);
		}

		if (hit == 9 && win == false) {
			var message = 'Egalité';
			openModal(message, true);
		}
	}

	function addScore(player) {
		if (player == 1) {
			points.player_1++;
		}

		if (player == 2) {
			points.player_2++;
		}

		player_score[0].innerText = points.player_1;
		player_score[1].innerText = points.player_2;
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