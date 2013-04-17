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

	function generateDto(){
		var dtoString = self.get('txtDto').val();
		if(dtoString !== '') {
			try{
				service.dto = $.extend({}, JSON.parse(dtoString));
				service.props = [];
				service.childs = [];
				$.map(service.dto, function(value,key){
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
						service.props.push(key);
					}
					return;
				});

				self.get('txtDto').val(JSON.stringify(service.dto, null, 4));
			} catch (err) {
				console.log(err);
			}
		}
	}

	function onBtnGenerateClick(e){
		e.preventDefault();
		service = {};

		generateDto();

		//Service Name
		service.name = self.get('txtName').val().toLowerCase();
		service.acro = self.get('txtAcronym').val().toLowerCase();

		service.Name = service.name.substr(0,1).toUpperCase() + service.name.substr(1);
		service.Acro = service.acro.substr(0,1).toUpperCase() + service.acro.substr(1);
		service.names = service.name + 's';
		service.Names = service.Name + 's';
		service.acros = service.acro + 's';

		var param = {service:service};
		self.get('tabs').show();

		self.get('title-class').html(service.name + '.js');
		self.destroyUIs('tab-class');
		self.ui('tab-class', iris.path.ui.class.js, param);

		self.get('title-iris-resource').html('resource/'+service.name + '.js');
		self.destroyUIs('tab-iris-resource');
		self.ui('tab-iris-resource', iris.path.ui.iris.resource.js, param);

		self.destroyUIs('tab-paths');
		self.ui('tab-paths', iris.path.ui.paths.js, param);

		pathBlockCount = 0;
		generatePathBlock('all', iris.path.ui.path.all);
		generatePathBlock('put', iris.path.ui.path.put);
		generatePathBlock('get', iris.path.ui.path.get);
		generatePathBlock('post', iris.path.ui.path.post);
		generatePathBlock('delete', iris.path.ui.path.delete);
	}

	var pathBlockCount = 0;
	function generatePathBlock(name, ui){
		pathBlockCount++;
		var param = {
			service: service
		};

		var found = false;
		try{
			self.get('tab-path_'+pathBlockCount);
			found = true;
		} catch(err){
			found = false;
		}

		if(!found){
			self.get('tabs-titles').append('<li><a href="#tab-path_'+pathBlockCount+'" data-toggle="tab">path/'+service.name+'_'+name+'.js</a></li>');
			self.get('tabs-content').append('<div id="tab-path_'+pathBlockCount+'" class="tab-pane"><div class="code" data-id="tab-path_'+pathBlockCount+'"></div></div>');
		}

		self.destroyUIs('tab-path_'+pathBlockCount);
		self.ui('tab-path_'+pathBlockCount, ui.js, param);
	}


}, iris.path.screen.home.js);