iris.ui(function(self) {

	self.create = function() {
		self.tmplMode(self.APPEND);

		var service = self.setting('service');

		var loginPaths = '';
		if(service.login){
			loginPaths += '	{ method : \'POST\', path : \'/signin\', handler : require(\'./path/signin_post\') },\n';
			loginPaths += '	{ method : \'POST\', path : \'/signout\', handler : require(\'./path/signout_post\') },';
		}
		service.loginPaths = loginPaths;

		self.tmpl(iris.path.ui.paths.html, service);
		prettyPrint();
	};

	self.awake = function(){
	};

}, iris.path.ui.paths.js);