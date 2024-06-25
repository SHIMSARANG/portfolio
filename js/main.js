window.addEventListener("load", function(){
	AOS.init({
		easing: "ease-in-out-sine",
		once: true
	});

	function randomText(str, dom){
		let fake="abcdefghijklmnopqrstuvwxyz#%&^+=-";
		let text=str;
		let speed=50;
		let increment=2;

		let length=text.length;
		let si=0;
		let stri=0;
		let block="";
		let fixed="";

		(function rustle(i){
			setTimeout(function(){
				if(--i){
					rustle(i);
				}

				nextFrame(i);
				si=si+1;
			}, speed);
		})(length*increment+1);

		function nextFrame(pos){
			for(let i=0; i<length-stri; i++){
				let num=Math.floor(fake.length * Math.random());
				let letter=fake.charAt(num);
				block=block+letter;
			}

			if(si == (increment-1)){
				stri++;
			}

			if(si == increment){
				fixed=fixed+text.charAt(stri-1);
				si=0;
			}

			dom.innerHTML=fixed+block;

			block="";
		}
	}

	let title=document.querySelector(".slider .title span");
	let subTitle=document.querySelector(".slider .title p");

	randomText("WEB PUBLISHING", title);

	setTimeout(function(){
		randomText("FrontEnd Developer", title);
		subTitle.classList.add("visible");
	}, 2500);

	const mainSwiper=new Swiper(".mainSwiper", {
		slidesPerView: 1,
		spaceBetween: 0,
		pagination: {
			el: ".swiper-pagination",
			type: "progressbar"
		},
		breakpoints: {
			575: {
				slidesPerView: 2,
				spaceBetween: 40
			},
			900: {
				slidesPerView: 2.5,
				spaceBetween: 40
			},
			1200: {
				slidesPerView: 3,
				spaceBetween: 40
			},
			1440: {
				slidesPerView: 3.5,
				spaceBetween: 100
			}
		}
	});

	let sectionList=[];

	sectionList[0]=document.getElementById("start");

	let section=document.querySelectorAll("section");

	for(let i=0; i<section.length; i++){
		sectionList.push(section[i]);
	}

	let start=document.getElementById("start");
	let gnbList=document.querySelectorAll("#desktop > ul > li");
	let mobileTab=document.getElementById("tab");
	let mobileMenu=document.getElementById("menu");
	let mobileList=mobileMenu.lastElementChild.children;
	let control=document.querySelector(".control");
	let controlList=control.firstElementChild.children;
	let scrolly=document.querySelector("#start .scroll");

	let winh;
	let t=0;
	let n=0;
	let targety=0;

	function scrollTrigger(){
		t=window.scrollY;
		winh=window.innerHeight;

		if(t < sectionList[1].offsetTop){
			n=0;
		}
		else if(t < sectionList[2].offsetTop){
			n=1;
		}
		else if(t < sectionList[3].offsetTop){
			n=2;
		}
		else if(t < sectionList[4].offsetTop){
			n=3;

			if(window.innerHeight + t === document.body.scrollHeight){
				n=4;
			}
		}
		else {
			n=4;
		}

		if(n === 0 | n === 1 | n === 3 || n === 4){
			if(document.body.classList.contains("dark") == false){
				document.body.classList.add("dark");
			}
		}
		else {
			if(document.body.classList.contains("dark") == true){
				document.body.classList.remove("dark");
			}
		}

		if(n === 4){
			if(start.classList.contains("invisible") === false){
				start.classList.add("invisible");
				scrolly.classList.add("invisible");
			}
		}
		else{
			if(start.classList.contains("invisible") === true){
				start.classList.remove("invisible");
				scrolly.classList.remove("invisible");
			}
		}

		for(let i=0; i<gnbList.length; i++){
			if(i == n){
				if(!gnbList[i].classList.contains("active")){
					gnbList[i].classList.add("active");
					mobileList[i].classList.add("active");
					controlList[i].classList.add("active");
				}
			}
			else {
				if(gnbList[i].classList.contains("active")){
					gnbList[i].classList.remove("active");
					mobileList[i].classList.remove("active");
					mobileList[i].classList.add("active");
					controlList[i].classList.remove("active");
				}
			}
		}
	};

	scrollTrigger();

	window.addEventListener("scroll", scrollTrigger);

	mobileTab.addEventListener("click", function(e){
		e.preventDefault();

		if(!e.currentTarget.classList.contains("open")){
			e.currentTarget.classList.add("open");
			document.body.classList.add("fixed");
			
			gsap.fromTo(mobileMenu, {display: "block", opacity:0}, {opacity:1, duration: 0.3});
		}
		else {
			e.currentTarget.classList.remove("open");
			document.body.classList.add("fixed");

			gsap.to(mobileMenu, {opacity:0, duration: 0.3, onComplete: function(){
				mobileMenu.removeAttribute("style");
			}});
		}
	});

	for(let i=0; i<gnbList.length; i++){
		gnbList[i].addEventListener("click", function(e){
			e.preventDefault();

			targety=sectionList[i].offsetTop+20;
			gsap.to(window, {scrollTo: targety, duration: 0.7});
		});

		controlList[i].addEventListener("click", function(e){
			e.preventDefault();

			targety=sectionList[i].offsetTop+20;
			gsap.to(window, {scrollTo: targety, duration: 0.7});
		});

		mobileList[i].addEventListener("click", function(e){
			e.preventDefault();

			targety=sectionList[i].offsetTop+20;

			if(mobileTab.classList.contains("open")){
				mobileTab.classList.remove("open");
				document.body.classList.remove("fixed");
				mobileMenu.removeAttribute("style");
				gsap.to(window, {scrollTo: targety, duration: 0.7, delay: 0.5});
			}
		});
	}


	let btnTop = document.querySelector('.btn_top');
	let currentPosition = window.scrollY; // currentPosition : 현재 위치

	window.addEventListener('scroll', function() {
		let newPosition = window.scrollY;

		if (newPosition > currentPosition) {
			btnTop.classList.add('active');
		}
		else {
			btnTop.classList.remove('active');
		}

		currentPosition = newPosition;
	});

	btnTop.addEventListener('click', function(e) {
		e.preventDefault();
		window.scrollTo({
			top: 0,
			behavior: 'smooth'
		});
	});
});