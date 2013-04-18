iris.ui(function(self) {

	self.create = function() {
		self.tmplMode(self.APPEND);

		var service = self.setting('service');

		var dtoString = '';

		//properties
		var keys = service.props;
		var k,K=keys.length;
		for(k=0;k<K;k++){
			var prop = keys[k];

			var key = prop.name;
			if(key === '_id') continue;
			var Key = key.substr(0,1).toUpperCase()+key.substr(1);

			var icon = 'icon-edit';
			if(prop.auto == 'random'){
				icon = 'icon-refresh';
			}

			dtoString +='			<p>\n';
			dtoString +='				<small>'+Key+'</small>';
			if(!prop.readonly) dtoString +='&nbsp;<i class="'+icon+' hand" data-id="btn'+Key+'" style="display:none;"></i>';
			dtoString +='<br/>\n';
			dtoString +='				<strong data-id="lbl'+Key+'" style="word-wrap:break-word;">--</strong>\n';
			dtoString +='				\n';
			dtoString +='				<div data-id="cnt'+Key+'" class="input-append" style="display:none;">\n';
			dtoString +='					<input data-id="txt'+Key+'" type="text" placeholder="'+Key+'">\n';
			dtoString +='					<span class="add-on hand" data-id="save'+Key+'"><i class="icon-ok"></i></span>\n';
			dtoString +='					<span class="add-on hand" data-id="refresh'+Key+'" style="display:none;"><i class="icon-spinner icon-spin" style="display:block;"></i></span>\n';
			dtoString +='					<span class="add-on hand" data-id="cancel'+Key+'"><i class="icon-remove"></i></span>\n';
			dtoString +='				</div>\n';
			dtoString +='			</p>\n';
		}

		service.dtoString = dtoString;

		self.tmpl(iris.path.ui.iris.edit_html.html, service);
		prettyPrint();
	};

	self.awake = function(){
	};

}, iris.path.ui.iris.edit_html.js);