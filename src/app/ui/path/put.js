iris.ui(function(self) {

	self.create = function() {
		self.tmplMode(self.APPEND);

		var service = self.setting('service');
		service.fn = 'create'+service.Name;

		var dtoString = '';

		//properties
		var keys = service.props;
		var k,K=keys.length;
		for(k=0;k<K;k++){
			var key = keys[k].name;
			if(key == '_id') continue;
			dtoString += '	if(req.body.'+key+' !== undefined) new'+service.Acro+'.'+key+' = req.body.'+key+';\n';
		}

		//child arrays
		var childs = service.childs;
		var c,C=childs.length;
		for(c=0;c<C;c++){
			dtoString += '	new'+service.Acro+'.'+childs[c].name+' = [];\n';
		}

		service.dtoString = dtoString;

		self.tmpl(iris.path.ui.path.put.html, service);
		prettyPrint();
	};

	self.awake = function(){
	};

}, iris.path.ui.path.put.js);