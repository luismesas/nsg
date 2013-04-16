iris.ui(function(self) {

	self.create = function() {
		self.tmplMode(self.APPEND);

		var service = self.setting('service');
		service.fn = 'update'+service.Name+'FromId';

		var dtoString = '';

		//properties
		var keys = service.props;
		var k,K=keys.length;
		for(k=0;k<K;k++){
			if(keys[k] == '_id') continue;
			dtoString += '	if(req.body.'+keys[k]+' !== undefined) new'+service.Acro+'.'+keys[k]+' = req.body.'+keys[k]+';\n';
		}

		//child arrays
		var childs = service.childs;
		var c,C=childs.length;
		for(c=0;c<C;c++){
			dtoString += '	if(req.body.'+childs[c].name+' !== undefined) new'+service.Acro+'.'+childs[c].name+' = req.body.'+childs[c].name+';\n';
		}

		service.dtoString = dtoString;

		self.tmpl(iris.path.ui.path.post.html, service);
		prettyPrint();
	};

	self.awake = function(){
	};

}, iris.path.ui.path.post.js);