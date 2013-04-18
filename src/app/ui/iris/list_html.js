iris.ui(function(self) {

	self.create = function() {
		self.tmplMode(self.APPEND);

		var service = self.setting('service');

		var dtoString = '';

		//properties
		var keys = service.props;
		var k,K=keys.length;
		for(k=0;k<K;k++){
			var key = keys[k];
			if(key === '_id') key = 'id';
			var Key = key.substr(0,1).toUpperCase()+key.substr(1);

			dtoString += '						<th>'+Key+'</th>\n';
		}

		//child arrays
		var childs = service.childs;
		var c,C=childs.length;
		for(c=0;c<C;c++){
			var child = childs[c].name;
			if(child === '_id') child = 'id';
			var Child = child.substr(0,1).toUpperCase()+child.substr(1);
			dtoString += '						<th>'+Child+'\'s</th>\n';
		}

		service.dtoString = dtoString;

		self.tmpl(iris.path.ui.iris.list_html.html, service);
		prettyPrint();
	};

	self.awake = function(){
	};

}, iris.path.ui.iris.list_html.js);