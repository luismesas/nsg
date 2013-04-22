iris.ui(function(self) {

	self.create = function() {
		self.tmplMode(self.APPEND);

		var service = self.setting('service');

		var signinScreen = '';
		var signinEvents = '';
		if(service.login) {
			signinScreen += 'iris.path.screens.signin = {js: \'screen/signin.js\', html: \'screen/signin.html\'};\n';
			signinEvents += '	signin : \'SIGNED_IN\',\n';
			signinEvents += '	signout : \'SIGNED_OUT\',\n';
		}
		service.signinScreen = signinScreen;
		service.signinEvents = signinEvents;

		self.tmpl(iris.path.ui.iris.init.html, service);
		prettyPrint();
	};

	self.awake = function(){
	};

}, iris.path.ui.iris.init.js);