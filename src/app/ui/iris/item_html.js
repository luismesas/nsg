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
			dtoString += '	<td class="center" data-id="lbl'+Key+'">##'+key+'##</td>\n';
		}

		//child arrays
		var childs = service.childs;
		var c,C=childs.length;
		for(c=0;c<C;c++){
			var child = childs[c].name;
			var Child = child.substr(0,1).toUpperCase()+child.substr(1);
			dtoString += '	<td class="center" data-id="lbl'+Child+'">--</td>\n';
		}

		service.dtoString = dtoString;

		self.tmpl(iris.path.ui.iris.item_html.html, service);
		prettyPrint();
	};

	self.awake = function(){
	};

}, iris.path.ui.iris.item_html.js);