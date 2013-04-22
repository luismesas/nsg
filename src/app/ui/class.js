iris.ui(function(self) {

	self.create = function() {
		self.tmplMode(self.APPEND);

		var sintax = self.setting('service');
		sintax.db = 'db' + sintax.Name;
		sintax.dbCol = 'col' + sintax.Name;
		sintax.fn = generateFunctionsBlock(sintax);

		self.tmpl(iris.path.ui.class.html, sintax);
		prettyPrint();
	};

	self.awake = function(){
	};

	function generateFunctionsBlock(service){
		var p,prop;
		var block = '';

		block += '		// ----------------\n';
		block += '		// '+service.Name+'\n';
		block += '		// ----------------\n';
		block += '\n';
		block += '		// Gets all '+service.names+' from database\n';
		block += '		self.getAll'+service.Names+' = function(p_cbk){\n';
		block += '			'+service.dbCol+'.find({}).toArray(function(err, '+service.acros+'){\n';
		block += '				if(!err){\n';
		block += '					p_cbk(err, '+service.acros+');\n';
		block += '				}\n';
		block += '			});\n';
		block += '		};\n';
		block += '\n';
		block += '		// Creates a new '+service.name+' and returns it\n';
		block += '		self.create'+service.Name+' = function('+service.acro+', p_cbk){\n';

		//auto generators
		for(p=0;p<service.props.length;p++){
			prop = service.props[p];
			switch(prop.auto){
				case 'random':
					block += '			'+service.acro+'.'+prop.name+' = _createToken('+prop.length+');\n';
					break;
				case 'date':
					block += '			'+service.acro+'.'+prop.name+' = (new Date()).getTime();\n';
					break;
			}
		}

		block += '			'+service.dbCol+'.insert('+service.acro+', {w:1}, function(err, '+service.acros+'){\n';
		block += '				if(err || '+service.acros+'.length === 0){\n';
		block += '					p_cbk(err, null);\n';
		block += '				} else {\n';
		block += '					p_cbk(null, '+service.acros+'[0]);\n';
		block += '				}\n';
		block += '			});\n';
		block += '		};\n';
		block += '\n';
		block += '		// Gets one '+service.name+' searching for its id\n';
		block += '		self.get'+service.Name+'FromId = function('+service.acro+'Id, p_cbk){\n';
		block += '			var find = {\n';
		block += '				_id: ObjectID(String('+service.acro+'Id))\n';
		block += '			};\n';
		block += '\n';
		block += '			'+service.dbCol+'.findOne(find, {}, function(err, '+service.acro+'){\n';
		block += '				if(err || '+service.acro+' === null){\n';
		block += '					p_cbk(err, null);\n';
		block += '				} else {\n';
		block += '					p_cbk(null, '+service.acro+');\n';
		block += '				}\n';
		block += '			});\n';
		block += '		};\n';

		//login services
		if(service.login){
			block += '\n		// Gets one '+service.name+' searching for its user/pwd\n';
			block += '		self.getFromUserPass = function(p_usr, p_pwd, f_cbk) {\n';
			block += '			'+service.dbCol+'.findOne(\n';
			block += '				{ '+service.userProp.name+' : p_usr, '+service.passProp.name+' : p_pwd },\n';
			block += '				{ '+service.passProp.name+':0 },\n';
			block += '				f_cbk\n';
			block += '			);\n';
			block += '		}\n';
		}

		block += '\n		// Updates '+service.names+' that matchs id\n';
		block += '		self.update'+service.Name+'FromId = function(p_'+service.acro+'Id, p_set, p_cbk){\n';
		//read only
		for(p=0;p<service.props.length;p++){
			prop = service.props[p];
			if(prop.readonly){
				block += '			delete p_set.'+prop.name+';\n';
			}
		}
		block += '			var find = {\n';
		block += '				_id: ObjectID(String(p_'+service.acro+'Id))\n';
		block += '			};\n';
		block += '			var set = {\n';
		block += '				$set : p_set\n';
		block += '			};\n';
		block += '\n';
		block += '			'+service.dbCol+'.findAndModify(find, [], set, {\'new\' : true}, function(err,'+service.acro+'){\n';
		block += '				if(err || '+service.acro+' === null){\n';
		block += '					p_cbk(err, null);\n';
		block += '				} else {\n';
		block += '					p_cbk(null, '+service.acro+');\n';
		block += '				}\n';
		block += '			});\n';
		block += '		};\n';
		block += '\n';
		block += '		// Removes '+service.name+' from its id\n';
		block += '		self.remove'+service.Name+'FromId = function('+service.acro+'Id, p_cbk){\n';
		block += '			var find = {\n';
		block += '				_id: ObjectID(String('+service.acro+'Id))\n';
		block += '			};\n';
		block += '\n';
		block += '			'+service.dbCol+'.remove(find, function(err,'+service.acro+'){\n';
		block += '				if(err || '+service.acro+' === null){\n';
		block += '					p_cbk(err, null);\n';
		block += '				} else {\n';
		block += '					p_cbk(null, '+service.acro+');\n';
		block += '				}\n';
		block += '			});\n';
		block += '		};\n';
		block += '\n';

		//auto generators
		block += '		var fieldsLength = {};\n';
		for(p=0;p<service.props.length;p++){
			prop = service.props[p];
			if(prop.auto == 'random'){
				block += '		fieldsLength[\''+prop.name+'\'] = '+prop.length+';\n';
			}
		}
		block += '		// Generates a new value for field for given '+service.name+'\n';
		block += '		self.generate = function ('+service.acro+'Id, field, f_callback){\n';
		block += '			var find = {\n';
		block += '				_id : new ObjectID(String('+service.acro+'Id))\n';
		block += '			};\n';
		block += '\n';
		block += '			var jSet = {};\n';
		block += '			jSet[field] = _createToken(fieldsLength[field]);\n';
		block += '			var set = {\n';
		block += '				$set : jSet\n';
		block += '			};\n';
		block += '\n';
		block += '			'+service.dbCol+'.findAndModify(find,[],set,{\'new\' : true},f_callback);\n';
		block += '		};\n';

		return block;
	}

}, iris.path.ui.class.js);