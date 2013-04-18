iris.ui(function(self) {

	self.create = function() {
		self.tmplMode(self.APPEND);

		var sintax = self.setting('service');

		self.tmpl(iris.path.ui.iris.init.html, sintax);
		prettyPrint();
	};

	self.awake = function(){
	};

}, iris.path.ui.iris.init.js);