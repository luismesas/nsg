iris.ui(function(self) {

	self.create = function() {
		self.tmplMode(self.APPEND);

		var service = self.setting('service');

		var loginServices = '';
		if(service.login){
			loginServices += '\n		self.signin = function(p_usr, p_pwd, f_ok, f_error){\n';
			loginServices += '			return self.post(\'/signin\', {u: p_usr,p: p_pwd}, function(data){\n';
			loginServices += '				iris.notify(iris.evts.usr.signin,data);\n';
			loginServices += '				f_ok(data);\n';
			loginServices += '			}, f_error);\n';
			loginServices += '		};\n';
			loginServices += '\n';
			loginServices += '		self.signout = function(f_ok, f_error){\n';
			loginServices += '			return self.post(\'/signout\', {}, f_ok, f_error);\n';
			loginServices += '		};\n';
		}

		service.loginServices = loginServices;

		self.tmpl(iris.path.ui.iris.resource.html, service);
		prettyPrint();
	};

	self.awake = function(){
	};

}, iris.path.ui.iris.resource.js);