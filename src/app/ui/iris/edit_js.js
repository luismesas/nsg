iris.ui(function(self) {

	self.create = function() {
		self.tmplMode(self.APPEND);

		var service = self.setting('service');

		var setupString = '';
		var saveString = '';
		var valuesString = '';

		//properties
		var keys = service.props;
		var k,K=keys.length;
		for(k=0;k<K;k++){
			//<td class="center" data-id="lblName">##name##</td>
			var key = keys[k];
			if(key === '_id') continue;
			var Key = key.substr(0,1).toUpperCase()+key.substr(1);
			setupString += '		setup(\''+Key+'\');\n';
			valuesString += '		self.get(\'lbl'+Key+'\').html('+service.acro+'.'+key+');\n';
			valuesString += '		self.get(\'txt'+Key+'\').val('+service.acro+'.'+key+');\n';
			valuesString += '		self.get(\'btn'+Key+'\').show();\n';
			saveString += '		_'+service.acro+'.'+key+' = self.get(\'txt'+Key+'\').val();\n';
		}

		service.setupString = setupString;
		service.saveString = saveString;
		service.valuesString = valuesString;

		self.tmpl(iris.path.ui.iris.edit_js.html, service);
		prettyPrint();
	};

	self.awake = function(){
	};

}, iris.path.ui.iris.edit_js.js);