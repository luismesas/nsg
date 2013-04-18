iris.screen(function(self) {
	self.create = function() {
		self.tmpl(iris.path.screen.home.html);

		self.get('btnGenerate').click(onBtnGenerateClick);

		generateDto();
	};

	self.awake = function(){
		self.notify(iris.evts.screen.change, iris.path.screen.home);
	};

	var service = {};

	var defaultProp = {
		readonly : false,
		length : 10,
		auto : "none"
	};

	function generateDto(){
		self.get('alertContainer').hide();
		var dtoString = self.get('txtDto').val();
		if(dtoString !== '') {
			try{
				service.dto = $.extend({}, JSON.parse(dtoString));
				service.props = [];
				service.childs = [];
				$.map(service.dto, function(value,key){
					var prop = {
						name : key
					};

					if (value instanceof Array){
						var child = {};
						child.name = key;
						child.Name = child.name.substr(0,1).toUpperCase() + child.name.substr(1);
						child.names = child.name + 's';
						child.Names = child.Name + 's';
						child.acro = child.name;
						child.acros = child.acro + 's';
						service.childs.push(child);
					} else {
						$.extend(prop, defaultProp, value);
						console.log(key, prop);
						service.props.push(prop);
					}
					return;
				});

				self.get('txtDto').val(JSON.stringify(service.dto, null, 4));
			} catch (err) {
				self.get('alertText').html(err.message);
				self.get('alertContainer').show();
			}
		}
	}

	function onBtnGenerateClick(e){
		e.preventDefault();
		service = {};

		generateDto();

		// Prepares service object
		service.name = self.get('txtName').val().toLowerCase();
		service.acro = self.get('txtAcronym').val().toLowerCase();

		service.NAME = service.name.toUpperCase();
		service.Name = service.NAME.substr(0,1) + service.name.substr(1);
		service.ACRO = service.acro.toUpperCase();
		service.Acro = service.ACRO.substr(0,1) + service.acro.substr(1);
		service.names = service.name + 's';
		service.Names = service.Name + 's';
		service.acros = service.acro + 's';

		// nodejs files
		generateTab('class', 'app/'+service.name + '.js', iris.path.ui.class.js);
		generateTab('paths', 'app/paths.js', iris.path.ui.paths.js);
		generateTab('path-all', 'app/path/'+service.name+'_get.js', iris.path.ui.path.all.js);
		generateTab('path-put', 'app/path/'+service.name+'_put.js', iris.path.ui.path.put.js);
		generateTab('path-get', 'app/path/'+service.name+'_'+service.name+'id_get.js', iris.path.ui.path.get.js);
		generateTab('path-post', 'app/path/'+service.name+'_'+service.name+'id_post.js', iris.path.ui.path.post.js);
		generateTab('path-delete', 'app/path/'+service.name+'_'+service.name+'id_delete.js', iris.path.ui.path.delete.js);

		// Iris files
		generateTab('init', 'www/app/init.js', iris.path.ui.iris.init.js);
		generateTab('lang', 'www/app/lang/en-us.js', iris.path.ui.iris.lang.js);
		generateTab('iris-resource', 'www/app/resource/'+service.name + '.js', iris.path.ui.iris.resource.js);
		// Iris - Screen
		generateTab('iris-screen-html', 'www/app/screen/'+service.name + '.html', iris.path.ui.iris.screen_html.js);
		generateTab('iris-screen-js', 'www/app/screen/'+service.name + '.js', iris.path.ui.iris.screen_js.js);
		// Iris - UIs
		generateTab('iris-ui-list-html', 'www/app/ui/'+service.name + '/list.html', iris.path.ui.iris.list_html.js);
		generateTab('iris-ui-list-js', 'www/app/ui/'+service.name + '/list.js', iris.path.ui.iris.list_js.js);
		generateTab('iris-ui-item-html', 'www/app/ui/'+service.name + '/item.html', iris.path.ui.iris.item_html.js);
		generateTab('iris-ui-item-js', 'www/app/ui/'+service.name + '/item.js', iris.path.ui.iris.item_js.js);
		generateTab('iris-ui-create-html', 'www/app/ui/'+service.name + '/create.html', iris.path.ui.iris.create_html.js);
		generateTab('iris-ui-create-js', 'www/app/ui/'+service.name + '/create.js', iris.path.ui.iris.create_js.js);
		generateTab('iris-ui-edit-html', 'www/app/ui/'+service.name + '/edit.html', iris.path.ui.iris.edit_html.js);
		generateTab('iris-ui-edit-js', 'www/app/ui/'+service.name + '/edit.js', iris.path.ui.iris.edit_js.js);

		// Show tabs
		self.get('tabs').show();
	}

	function generateTab(dataId, title, ui, param){
		try{
			self.get('tab-'+dataId);
			self.destroyUIs('tab-'+dataId);
		} catch(err){
			self.get('tabs-titles').append('<li><a href="#tab-'+dataId+'" data-toggle="tab">'+title+'</a></li>');
			self.get('tabs-content').append('<div id="tab-'+dataId+'" class="tab-pane"><div class="code" data-id="tab-'+dataId+'"></div></div>');
		}
		self.ui('tab-'+dataId, ui, {service:service});
	}


}, iris.path.screen.home.js);