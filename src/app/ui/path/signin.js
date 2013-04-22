iris.ui(function(self) {

	self.create = function() {
		self.tmplMode(self.APPEND);

		var service = self.setting('service');

		self.tmpl(iris.path.ui.path.signin.html, service);
		prettyPrint();
	};

	self.awake = function(){
	};

}, iris.path.ui.path.signin.js);