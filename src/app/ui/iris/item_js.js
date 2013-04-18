iris.ui(function(self) {

	self.create = function() {
		self.tmplMode(self.APPEND);

		var service = self.setting('service');

		var dtoString = '';

		//properties
		var keys = service.props;
		var k,K=keys.length;
		for(k=0;k<K;k++){
			//<td class="center" data-id="lblName">##name##</td>
			var key = keys[k].name;
			var Key = key.substr(0,1).toUpperCase()+key.substr(1);
			//self.get('lblName').html(app.name);
			dtoString += '		self.get(\'lbl'+Key+'\').html('+service.acro+'.'+key+');\n';
		}

		//child arrays
		var childs = service.childs;
		var c,C=childs.length;
		for(c=0;c<C;c++){
			var child = childs[c].name;
			var Child = child.substr(0,1).toUpperCase()+child.substr(1);
			dtoString += '		if('+service.acro+'.'+child+' !== undefined) self.get(\'lbl'+Child+'\').html('+service.acro+'.'+child+'.length);\n';
		}

		service.dtoString = dtoString;

		self.tmpl(iris.path.ui.iris.item_js.html, service);
		prettyPrint();
	};

	self.awake = function(){
	};

}, iris.path.ui.iris.item_js.js);