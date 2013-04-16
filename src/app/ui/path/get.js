iris.ui(function(self) {

	self.create = function() {
		self.tmplMode(self.APPEND);

		var dto = self.setting('service');
		dto.fn = 'get'+dto.Name+'FromId';

		self.tmpl(iris.path.ui.path.get.html, dto);
		prettyPrint();
	};

	self.awake = function(){
	};

}, iris.path.ui.path.get.js);