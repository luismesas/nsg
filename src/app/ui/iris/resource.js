iris.ui(function(self) {

	self.create = function() {
		self.tmplMode(self.APPEND);

		var service = self.setting('service');

		self.tmpl(iris.path.ui.iris.resource.html, service);
		prettyPrint();
	};

	self.awake = function(){
	};

}, iris.path.ui.iris.resource.js);