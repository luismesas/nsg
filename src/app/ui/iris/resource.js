iris.ui(function(self) {

	self.create = function() {
		self.tmplMode(self.APPEND);

		var dto = self.setting('service');

		self.tmpl(iris.path.ui.iris.resource.html, dto);
		prettyPrint();
	};

	self.awake = function(){
	};

}, iris.path.ui.iris.resource.js);