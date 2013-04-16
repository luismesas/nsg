iris.screen(function(self) {
	self.create = function() {
		self.tmpl(iris.path.screen.welcome.html);

		self.screens('screens',
			[
			[ 'home', iris.path.screen.home.js]
			]
			);

		self.on(iris.evts.screen.change, screenChange);

		self.on(iris.RESOURCE_ERROR, resourceError);

		if ( !document.location.hash ) {
			iris.navigate('#/home');
		}
	};

	function screenChange(screenPath){
	}

	function resourceError(p_params){
		if(p_params.request.status == 401){
			iris.navigate('#/home');
		}
	}

}, iris.path.screen.welcome.js);