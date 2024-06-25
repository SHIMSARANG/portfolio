window.addEventListener("load", function(){
	AOS.init({
		easing: "ease-in-out-sine",
		duration: 1200,
		once: true
	});

	let sectionList=[];
	let section=document.querySelectorAll("section");

	for(let i=0; i<section.length; i++){
		sectionList.push(section[i]);
	}

	let gnbList=document.querySelectorAll("#desktop > ul > li");
	let mobileTab=document.getElementById("tab");
	let mobileMenu=document.getElementById("menu");
	let mobileList=mobileMenu.lastElementChild.children;
	let closeBtn=mobileMenu.querySelector(".close");
	let control=document.querySelector(".control");
	let controlList=control.firstElementChild.children;

	let t, winh=0;

	function menuActive(n){
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
	}

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

		if((t > sectionList[2].offsetTop && t < sectionList[3].offsetTop-winh/2) || t > sectionList[4].offsetTop-winh/2){
			if(document.body.classList.contains("dark") == false){
				document.body.classList.add("dark");
			}
		}
		else {
			if(document.body.classList.contains("dark") == true){
				document.body.classList.remove("dark");
			}
		}

		switch(n){
			case gnbList.length-1 :
				menuActive(gnbList.length-1);
				break;
			default :
				menuActive(3);
				break;
		}
	};

	scrollTrigger();

	window.addEventListener("scroll", scrollTrigger);

	mobileTab.addEventListener("click", function(e){
		e.preventDefault();
		e.currentTarget.classList.add("open");
		document.body.classList.add("fixed");

		gsap.fromTo(mobileMenu, {display: "block", opacity: 0}, {opacity: 1, duration: 0.3});
	});

	closeBtn.addEventListener("click", function(e){
		e.preventDefault();
		e.currentTarget.classList.add("open");
		document.body.classList.remove("fixed");

		gsap.to(mobileMenu, {opacity: 0, duration: 0.3, onComplete: function(){
			mobileMenu.removeAttribute("style");
		}});
	});

	let subswiper=new Swiper(".subSwiper", {
		// loop: true,
		slidesPerView: 1,
		spaceBetween: 20,
		centeredSlides: true,
		initialSlide: 1,
		navigation: {
			nextEl: ".swiper-button-next",
			prevEl: ".swiper-button-prev",
		},
		breakpoints: {
			320: {
				slidesPerView: 3
			}
		}
	});

	let tab=document.querySelector("#section8 .content ul");
	let tabList=tab.children;

	for(let i=0; i<tabList.length; i++){
		tabList[i].addEventListener("click", function(e){
			if(e.target.tagName !== "H2"){
				e.preventDefault();

				if(e.currentTarget.classList.contains("active") === false){
					for(let j=0; j<tabList.length; j++){
						if(j === i){
							tabList[j].classList.add("active");
						}
						else{
							tabList[j].classList.remove("active");
						}
					}
				}
				else{
					e.currentTarget.classList.remove("active");
				}
			}
		});
	}

	let track=document.querySelector(".track");
	let trackText=track.firstElementChild;

	let clone=trackText.cloneNode(true);
	track.appendChild(clone);

	TweenMax.to(track, 30, {
		x: -1*trackText.clientWidth,
		ease: Linear.easeNone,
		repeat: -1
	});

	let targety;

	for(let i=0; i<gnbList.length; i++){
		gnbList[i].addEventListener("click", function(e){
			switch(i){
				case 3 :
					e.preventDefault();
					targety=0;
					break;
				case gnbList.length-1 :
					e.preventDefault();
					targety=sectionList[i].offsetTop+20;
					break;
				default:
					break;
			}

			if(targety !== undefined){
				gsap.to(window, {scrollTo: targety, duration: 0.7});
			}
		});

		controlList[i].addEventListener("click", function(e){
			e.preventDefault();

			switch(i){
				case 3 :
					targety=0;
					break;
				case gnbList.length-1 :
					targety=sectionList[i].offsetTop+20;
					break;
				default:
					break;
			}

			if(targety !== undefined){
				gsap.to(window, {scrollTo: targety, duration: 0.7});
			}
		});

		mobileList[i].addEventListener("click", function(e){
			e.preventDefault();

			if(mobileTab.classList.contains("open")){
				mobileTab.classList.remove("open");
				document.body.classList.remove("fixed");
				mobileMenu.removeAttribute("style");

				setTimeout(function(){
					switch(i){
						case 3 :
							targety=0;
							break;
						case gnbList.length-1 :
							targety=sectionList[i].offsetTop+20;
							break;
						default:
							break;
					}

					if(targety !== undefined){
						gsap.to(window, {scrollTo: targety, duration: 0.7});
					}
				}, 1000);
			}
		});
	}
});