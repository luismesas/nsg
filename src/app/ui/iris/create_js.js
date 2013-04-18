iris.ui(function(self) {

	self.create = function() {
		self.tmplMode(self.APPEND);

		var service = self.setting('service');

		var dtoString = '';
		var resetString = '';

		//properties
		var keys = service.props;
		var k,K=keys.length;
		for(k=0;k<K;k++){
			var prop = keys[k];
			if(prop.readonly) continue;
			if(prop.auto !== 'none') continue;

			var key = prop.name;
			if(key === '_id') continue;
			var Key = key.substr(0,1).toUpperCase()+key.substr(1);

			dtoString += '			'+key+' : self.get(\'txt'+Key+'\').val(),\n';
			resetString += '		self.get(\'txt'+Key+'\').val(\'\');\n';
		}
		dtoString = dtoString.substr(0,dtoString.length-2) + '\n';


		service.dtoString = dtoString;
		service.resetString = resetString;

		self.tmpl(iris.path.ui.iris.create_js.html, service);
		prettyPrint();
	};

	self.awake = function(){
	};

}, iris.path.ui.iris.create_js.js);