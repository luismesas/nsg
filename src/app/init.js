// register iris components
//   - welcome.js are the initial screen and welcome.html its template
iris.path = {
	screen : {
		welcome : { js: 'screen/welcome.js', html: 'screen/welcome.html' },
		home : {js:'screen/home.js', html: 'screen/home.html'}
	} ,
	ui : {
		class : {js: 'ui/class.js', html: 'ui/class.html'},
		paths : {js: 'ui/paths.js', html: 'ui/paths.html'},
		path : {
			all: {js: 'ui/path/all.js', html: 'ui/path/all.html'},
			put: {js: 'ui/path/put.js', html: 'ui/path/put.html'},
			get: {js: 'ui/path/get.js', html: 'ui/path/get.html'},
			post: {js: 'ui/path/post.js', html: 'ui/path/post.html'},
			delete: {js: 'ui/path/delete.js', html: 'ui/path/delete.html'}
		}
	}
};

iris.evts = {
	screen : {
		change : 'SCREEN_CHANGE'
	}
};

$(document).ready(
	function () {
		iris.baseUri('./app/');

		// initialize application
		iris.welcome( iris.path.screen.welcome.js );
	}
);
