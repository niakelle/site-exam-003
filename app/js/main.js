// import "slick-carousel";

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

sliderWork();
launchPosts();