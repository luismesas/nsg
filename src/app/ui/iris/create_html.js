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
			var key = keys[k];
			if(key === '_id') continue;
			var Key = key.substr(0,1).toUpperCase()+key.substr(1);

			dtoString +='			<p>\n';
			dtoString +='				<small>'+Key+'</small><br/>\n';
			dtoString +='				<input data-id="txt'+Key+'" type="text" placeholder="'+Key+'">\n';
			dtoString +='			</p>\n';
		}

		service.dtoString = dtoString;

		self.tmpl(iris.path.ui.iris.create_html.html, service);
		prettyPrint();
	};

	self.awake = function(){
	};

}, iris.path.ui.iris.create_html.js);