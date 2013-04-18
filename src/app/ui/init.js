iris.ui(function(self) {

	self.create = function() {
		self.tmplMode(self.APPEND);

		var sintax = self.setting('service');

		self.tmpl(iris.path.ui.init.html, sintax);
		prettyPrint();
	};

	self.awake = function(){
	};

}, iris.path.ui.init.js);