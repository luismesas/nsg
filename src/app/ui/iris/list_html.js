iris.ui(function(self) {

	self.create = function() {
		self.tmplMode(self.APPEND);

		var service = self.setting('service');

		var dtoString = '';

		//properties
		var props = service.props;
		var p,P=props.length;
		for(p=0;p<P;p++){
			var key = props[p].name;
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