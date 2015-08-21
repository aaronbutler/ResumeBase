/*

This file contains all of the code running in the background that makes resumeBuilder.js possible. We call these helper functions because they support your code in this course.

Don't worry, you'll learn what's going on in this file throughout the course. You won't need to make any changes to it until you start experimenting with inserting a Google Map in Problem Set 3.

Cameron Pittman
*/


/*
These are HTML strings. As part of the course, you'll be using JavaScript functions
replace the %data% placeholder text you see in them.
*/
var HTMLheaderName = '<div id="name" class="header-name">%data%</div>';
var HTMLheaderRole = '<div id="role" class="header-role">%data%</div>';

var HTMLcontactGeneric = '<li class="flex-item generic-contact"><span class="white-text">%data%</span></li>';
var HTMLmobile = '<li class="flex-item contact-item mobile-contact"><span class="white-text">%data%</span></li>';
var HTMLemail = '<li class="flex-item contact-item email-contact"><span class="white-text">%data%</span></li>';
var HTMLtwitter = '<li class="flex-item contact-item twitter-contact"><span class="white-text">%data%</span></li>';
var HTMLgithub = '<li class="flex-item contact-item github-contact"><span class="white-text">%data%</span></li>';
var HTMLblog = '<li class="flex-item contact-item blog-contact"><span class="white-text">%data%</span></li>';
var HTMLlocation = '<li class="flex-item contact-item location-contact"><span class="white-text">%data%</span></li>';

/*var HTMLcontactGeneric = '<li class="flex-item generic-contact"><span class="orange-text">%contact%</span><span class="white-text">%data%</span></li>';
var HTMLmobile = '<li id="mobile-contact" class="flex-item contact-item"><span class="orange-text">mobile</span><span class="white-text">%data%</span></li>';
var HTMLemail = '<li id="email-contact" class="flex-item contact-item"><span class="orange-text">email</span><span class="white-text">%data%</span></li>';
var HTMLtwitter = '<li id="twitter-contact" class="flex-item contact-item"><span class="orange-text">twitter</span><span class="white-text">%data%</span></li>';
var HTMLgithub = '<li id="github-contact" class="flex-item contact-item"><span class="orange-text">github</span><span class="white-text">%data%</span></li>';
var HTMLblog = '<li id="blog-contact" class="flex-item contact-item"><span class="orange-text">blog</span><span class="white-text">%data%</span></li>';
var HTMLlocation = '<li id="location-contact" class="flex-item contact-item"><span class="orange-text">location</span><span class="white-text">%data%</span></li>';*/

var HTMLbioPic = '<img src="%data%" class="biopic">';
var HTMLwelcomeMsg = '<span class="welcome-message">%data%</span>';

var HTMLskillsStart = '<h3 id="skills-h3">Skills at a Glance:</h3><ul id="skills" class="skills"></ul>';
/*var HTMLskillsStart = '<h3 id="skills-h3">Skills at a Glance:</h3><ul id="skills" class="flex-box"></ul>';*/
var HTMLskills = '<li id="skill##" class="flex-item"><span class="white-text">%data%</span></li>';

var HTMLworkStart = '<div id="work##" class="work-entry"></div>';
var HTMLworkEmployer = '<a href="#">%data%';
var HTMLworkTitle = ' - %data%</a>';
var HTMLworkDates = '<div class="date-text">%data%</div>';
var HTMLworkLocation = '<div class="location-text">%data%</div>';
var HTMLworkDescription = '<p><br>%data%</p>';

var HTMLprojectStart = '<div id="project##" class="project-entry"></div>';
var HTMLprojectTitle = '<a href="#">%data%</a>';
var HTMLprojectDates = '<div class="date-text">%data%</div>';
var HTMLprojectDescription = '<p><br>%data%</p>';
var HTMLprojectImage = '<img src="%data%">';

var HTMLschoolStart = '<div id="school##" class="education-entry"></div>';
var HTMLschoolName = '<a href="#">%data%';
var HTMLschoolDegree = ' -- %data%</a>';
var HTMLschoolDates = '<div class="date-text">%data%</div>';
var HTMLschoolLocation = '<div class="location-text">%data%</div>';
var HTMLschoolMajor = '<em><br>Major: %data%</em>';

var HTMLonlineClasses = '<h3>Online Classes</h3>';
var HTMLonlineTitle = '<a href="#">%data%';
var HTMLonlineSchool = ' - %data%</a>';
var HTMLonlineDates = '<div class="date-text">%data%</div>';
var HTMLonlineURL = '<br><a href="#">%data%</a>';

var internationalizeButton = '<button>Internationalize</button>';
var googleMap = '<div id="map"></div>';

function Location(name,location) {
	this.name = name;
	this.location = location;
	this.infoWindowText = this.name + "<br>" + this.location;
}
