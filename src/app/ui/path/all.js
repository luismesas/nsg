iris.ui(function(self) {

	self.create = function() {
		self.tmplMode(self.APPEND);

		var dto = self.setting('service');
		dto.fn = 'getAll'+dto.Names;

		self.tmpl(iris.path.ui.path.all.html, dto);
		prettyPrint();
	};

	self.awake = function(){
	};

}, iris.path.ui.path.all.js);