// функция, которая управляет слайдером
let sliderWork = function () {
	const slider = 	$(".slider");
	let allSlides = $(".slider__slide");
	let currentActive;


	slider.append('<button class="slider__button slider__prev"> < </button>');
	slider.prepend('<button class="slider__button slider__next"> > </button>');

	const buttonPrev = 	$(".slider__prev");
	const buttonNext = 	$(".slider__next");

	function findCurrentActive () {
		for (let i = 0; i < allSlides.length; i++) {
			if (allSlides[i].classList.contains('active')) {
				currentActive = i;
			};
		}
	}

	buttonPrev.on("click", function(){
		findCurrentActive();
		
		allSlides[currentActive].classList.toggle('active');
		if ((currentActive - 1) < 0) {
			currentActive = (allSlides.length - 1);
		} else {
			currentActive -= 1;
		}
		allSlides[currentActive].classList.toggle('active');
	});

	buttonNext.on("click", function(){
		findCurrentActive();

		allSlides[currentActive].classList.toggle('active');
		if ((currentActive + 1) >= allSlides.length) {
			currentActive = 0;
		} else {
			currentActive += 1;
		}
		allSlides[currentActive].classList.toggle('active');
	});

	
}

// функция, которая управляет постами в теге .posts и переключением 
// страниц там же
let launchPosts = function () {
	let currentActivePost = document.querySelector('.post.active');
	const postsContainer = document.querySelector('.posts');
	let activePage;


	let selectPageButtons = document.querySelectorAll('.pages__link');
	for (let i = 0; i < selectPageButtons.length; i++) {
		selectPageButtons[i].onclick = function (e) {
			e.preventDefault();

			for (let j = 0; j < selectPageButtons.length; j++) {
				if (selectPageButtons[j].classList.contains('active')) {
					activePage = selectPageButtons[j];
				}
			}


			function switchPage () {
				let postsForSwitch = document.querySelectorAll('.post');
				
				currentActivePost = document.querySelector('.post.active');


				activePage.classList.toggle('active');
				currentActivePost.classList.toggle('active')
				selectPageButtons[i].classList.toggle('active');
				postsForSwitch[i].classList.toggle('active');
			}


			// activePage.classList.toggle('active');
			// selectPageButtons[i].classList.toggle('active');
			switchPage();
			killClones();
			clonePost();
		}
	}


	function clonePost () {
		// клонирование узла currentActivePost со всеми детьми и 
		// вставка в postsContainer
		currentActivePost = document.querySelector('.post.active')
		for (let i = 1; i <= 3; i++) {
			let clonedPost = currentActivePost.cloneNode(true);
			clonedPost.classList.add('clone');
			postsContainer.appendChild(clonedPost);
		}


	}

	function killClones () {
		let clonesList = document.querySelectorAll('.clone');
		for (let i = 0; i < clonesList.length; i++) {
			clonesList[i].remove();
		}
	}

	clonePost();
}

// функция, которая собирает и отправляет сообщение в чат
let sendMessage = function (messageContent) {

	function createMessage (messageContent) {
		let newMessage = document.createElement('div');
		newMessage.classList.add('message', 'your__message');
		// newMessage.innerHTML += `<h1>${messageContent}</h1>`;
		newMessage.innerHTML += `
		<h3 class="message__nickname">You</h3>
		<p class="message__text">${messageContent}</p>
		<span class="message__time">14:01</span>`;
		return newMessage;
	}
	let newMessage = createMessage(messageContent);
	
	let chatContainer = document.querySelector('.chat__messages');
	chatContainer.appendChild(newMessage);
}

// нахожу кнопку "отправить сообщение"
const buttonSendMessage = document.querySelector('.chat__send-message');
// привязываю к кнопке обработку клика - отправку сообщения
buttonSendMessage.onclick = function (e) {
	e.preventDefault();

	// объявляю переменные
	const inputElement = document.getElementById('send-message');
	let inputValue = inputElement.value;

	// запрещаю отправлять пустое сообщение в чат

	if (inputValue.length <= 3 || !inputValue) {
		alert('Ваше сообщение слишком короткое. Введите более трёх символов.');
		clearInput();
		return;
	}
	
	// функция для перемещения скрытого скролла вниз контента в теге 
	// .chat__messages
	function updateScroll() {
    let chatContainer = document.querySelector('.chat__messages');
    chatContainer.scrollTop = chatContainer.scrollHeight;
	}

	// формирую разметку сообщения и добавляю его в html с текстом из инпута
	sendMessage(inputValue);

	function clearInput () {
		inputElement.value = '';
	}

	// очищаю поле ввода
	clearInput();
	// перемещаю скрытый скролл к последнему сообщению
	updateScroll();
}

// запускаем слайдер
sliderWork();

// запускаем posts
launchPosts();