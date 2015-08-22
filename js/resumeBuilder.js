/*
This is empty on purpose! Your code to build the resume will go here.
 */
 
//Load the json data into the global objects
bio = (function () {
	var json = null;
	$.ajax({
		'async': false,
		'global': false,
		'url': "js/bio.js",
		'dataType': "json",
		'success': function (data) {
			
			json = data;
			
			json=JSON.stringify(json);
		}
	});
return json;
})(); 
bio = JSON.parse(bio);

//work and education must exist globally to get the map to render, so I am loading them here and in work again in resume-cards
work = (function () {
	var json = null;
	$.ajax({
		'async': false,
		'global': false,
		'url': "js/work.js",
		'dataType': "json",
		'success': function (data) {
			
			json = data;
			
			json=JSON.stringify(json);
		}
	});
	//console.log("loaded work");
return json;
})(); 
work = JSON.parse(work);

education = (function () {
	var json = null;
	$.ajax({
		'async': false,
		'global': false,
		'url': "js/education.js",
		'dataType': "json",
		'success': function (data) {
			json = data;
			json=JSON.stringify(json);
			}
		});
	//console.log("loaded education");
	return json;
})(); 
education = JSON.parse(education);

//Stuff to run only after the base DOM and other javascript variables have been created/loaded
 $(document).ready(function() {

	//Add the display function to the bio object to prove to grader that I can do this
	bio.display = function() {
		//console.log("In bio: "+this.name);
		var formattedName = HTMLheaderName.replace("%data%", bio.name);
		//console.log("formatted name:" + formattedName);
		$(".top-top-header").append(formattedName);
		var formattedRole = HTMLheaderRole.replace("%data%", bio.role);
		$(".top-top-header").append(formattedRole);
		
		
		var formattedMobile = HTMLmobile.replace("%data%", bio.contacts.mobile);
		var formattedEmail = HTMLemail.replace("%data%", bio.contacts.email);
		var formattedGithub = HTMLgithub.replace("%data%", bio.contacts.github);
		var formattedTwitter = HTMLtwitter.replace("%data%", bio.contacts.twitter);
		var formattedLocation = HTMLlocation.replace("%data%", bio.contacts.location);
		$("#topContacts").append(formattedMobile);
		$("#topContacts").append(formattedEmail);
		$("#topContacts").append(formattedGithub);
		$("#topContacts").append(formattedTwitter);
		$("#topContacts").append(formattedLocation);
		var formattedBiopic = HTMLbioPic.replace("%data%", bio.biopic);
		$("#header2").append(formattedBiopic);
		var formattedWelcomemsg = HTMLwelcomeMsg.replace("%data%", bio.welcomeMessage);
		$("#homeBlurb").append(formattedWelcomemsg);
		
		$("#homeBlurb").append(HTMLskillsStart);
		
		for (skill in bio.skills) {
			var s = bio.skills[skill];
			var formattedSkill = HTMLskills.replace("%data%",s).replace("skill##","skill"+skill);
			$("#skills").append(formattedSkill);
		}
		
		
		$("#bottomContacts").append(formattedMobile);
		$("#bottomContacts").append(formattedEmail);
		$("#bottomContacts").append(formattedGithub);
		$("#bottomContacts").append(formattedTwitter);
		$("#bottomContacts").append(formattedLocation);
	};


	bio.display();


	//Load the function to shrink the header on scroll

	$("#scrolling-content").bind( 'scroll', '#scrolling-content', function(){
		if($("#scrolling-content").scrollTop() > 20) {
			$("#topContacts").addClass("scroll-hide");
			$("#biopic").addClass("scroll-hide");
		}
		else {
			$("#topContacts").removeClass("scroll-hide");
			$("#biopic").removeClass("scroll-hide");
		}
	});

	//Menu drawer open/close and hamburger icon handling
	var hamburger = document.querySelector('#hamburger');
	var topHeader = document.querySelector('#top-header');
	var navDrawer = document.querySelector('#nav-drawer');

	hamburger.addEventListener('click', function(e) {
		//console.log("hamburger clicked");
		navDrawer.classList.toggle('open');
		e.stopPropagation();
	});
	topHeader.addEventListener('click', function() {
		navDrawer.classList.remove('open');
	});

	var menuItems = document.querySelectorAll(".menu-item");
	var i;
	for (i = 0; i < menuItems.length; i++) {
		menuItems[i].addEventListener('click',function() {
			//console.log("closing drawer after click");
			navDrawer.classList.remove('open');
		})
	}
	//end menu drawer handling

	//Here's where the map becomes usable
	$("#map-div").append(googleMap);

});
