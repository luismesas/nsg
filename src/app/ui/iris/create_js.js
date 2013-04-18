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
			//<td class="center" data-id="lblName">##name##</td>
			var key = keys[k];
			if(key === '_id') continue;
			var Key = key.substr(0,1).toUpperCase()+key.substr(1);
			//name : self.get('txtName').val(),
			dtoString += '			'+key+' : self.get(\'txt'+Key+'\').val()';
			resetString += '		self.get(\'txt'+Key+'\').val(\'\');\n';
			if(k<K-1) dtoString+=',';
			dtoString+='\n';
		}

		service.dtoString = dtoString;
		service.resetString = resetString;

		self.tmpl(iris.path.ui.iris.create_js.html, service);
		prettyPrint();
	};

	self.awake = function(){
	};

}, iris.path.ui.iris.create_js.js);