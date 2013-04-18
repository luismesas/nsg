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
		},
		iris : {
			init : {js: 'ui/iris/init.js', html: 'ui/iris/init.html'},
			resource: {js: 'ui/iris/resource.js', html: 'ui/iris/resource.html'},
			lang: {js: 'ui/iris/lang.js', html: 'ui/iris/lang.html'},
			screen_html: {js: 'ui/iris/screen_html.js', html: 'ui/iris/screen_html.html'},
			screen_js: {js: 'ui/iris/screen_js.js', html: 'ui/iris/screen_js.html'},
			list_html: {js: 'ui/iris/list_html.js', html: 'ui/iris/list_html.html'},
			list_js: {js: 'ui/iris/list_js.js', html: 'ui/iris/list_js.html'},
			item_html: {js: 'ui/iris/item_html.js', html: 'ui/iris/item_html.html'},
			item_js: {js: 'ui/iris/item_js.js', html: 'ui/iris/item_js.html'},
			create_html: {js: 'ui/iris/create_html.js', html: 'ui/iris/create_html.html'},
			create_js: {js: 'ui/iris/create_js.js', html: 'ui/iris/create_js.html'},
			edit_html: {js: 'ui/iris/edit_html.js', html: 'ui/iris/edit_html.html'},
			edit_js: {js: 'ui/iris/edit_js.js', html: 'ui/iris/edit_js.html'}
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
