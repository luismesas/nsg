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

	function generateFunctionsBlock(obj){
		var p,prop;
		var block = '';

		block += '		// ----------------\n';
		block += '		// '+obj.Name+'\n';
		block += '		// ----------------\n';
		block += '\n';
		block += '		// Gets all '+obj.names+' from database\n';
		block += '		self.getAll'+obj.Names+' = function(p_cbk){\n';
		block += '			'+obj.dbCol+'.find({}).toArray(function(err, '+obj.acros+'){\n';
		block += '				if(!err){\n';
		block += '					p_cbk(err, '+obj.acros+');\n';
		block += '				}\n';
		block += '			});\n';
		block += '		};\n';
		block += '\n';
		block += '		// Creates a new '+obj.name+' and returns it\n';
		block += '		self.create'+obj.Name+' = function('+obj.acro+', p_cbk){\n';

		//auto generators
		for(p=0;p<obj.props.length;p++){
			prop = obj.props[p];
			switch(prop.auto){
				case 'random':
					block += '			'+obj.acro+'.'+prop.name+' = _createToken('+prop.length+');\n';
					break;
				case 'date':
					block += '			'+obj.acro+'.'+prop.name+' = (new Date()).getTime();\n';
					break;
			}
		}

		block += '			'+obj.dbCol+'.insert('+obj.acro+', {w:1}, function(err, '+obj.acros+'){\n';
		block += '				if(err || '+obj.acros+'.length === 0){\n';
		block += '					p_cbk(err, null);\n';
		block += '				} else {\n';
		block += '					p_cbk(null, '+obj.acros+'[0]);\n';
		block += '				}\n';
		block += '			});\n';
		block += '		};\n';
		block += '\n';
		block += '		// Gets one '+obj.name+' searching for its id\n';
		block += '		self.get'+obj.Name+'FromId = function('+obj.acro+'Id, p_cbk){\n';
		block += '			var find = {\n';
		block += '				_id: ObjectID(String('+obj.acro+'Id))\n';
		block += '			};\n';
		block += '\n';
		block += '			'+obj.dbCol+'.findOne(find, {}, function(err, '+obj.acro+'){\n';
		block += '				if(err || '+obj.acro+' === null){\n';
		block += '					p_cbk(err, null);\n';
		block += '				} else {\n';
		block += '					p_cbk(null, '+obj.acro+');\n';
		block += '				}\n';
		block += '			});\n';
		block += '		};\n';
		block += '\n';
		block += '		// Updates '+obj.names+' that matchs id\n';
		block += '		self.update'+obj.Name+'FromId = function(p_'+obj.acro+'Id, p_set, p_cbk){\n';
		//read only
		for(p=0;p<obj.props.length;p++){
			prop = obj.props[p];
			if(prop.readonly){
				block += '			delete p_set.'+prop.name+';\n';
			}
		}
		block += '			var find = {\n';
		block += '				_id: ObjectID(String(p_'+obj.acro+'Id))\n';
		block += '			};\n';
		block += '			var set = {\n';
		block += '				$set : p_set\n';
		block += '			};\n';
		block += '\n';
		block += '			'+obj.dbCol+'.findAndModify(find, [], set, {\'new\' : true}, function(err,'+obj.acro+'){\n';
		block += '				if(err || '+obj.acro+' === null){\n';
		block += '					p_cbk(err, null);\n';
		block += '				} else {\n';
		block += '					p_cbk(null, '+obj.acro+');\n';
		block += '				}\n';
		block += '			});\n';
		block += '		};\n';
		block += '\n';
		block += '		// Removes '+obj.name+' from its id\n';
		block += '		self.remove'+obj.Name+'FromId = function('+obj.acro+'Id, p_cbk){\n';
		block += '			var find = {\n';
		block += '				_id: ObjectID(String('+obj.acro+'Id))\n';
		block += '			};\n';
		block += '\n';
		block += '			'+obj.dbCol+'.remove(find, function(err,'+obj.acro+'){\n';
		block += '				if(err || '+obj.acro+' === null){\n';
		block += '					p_cbk(err, null);\n';
		block += '				} else {\n';
		block += '					p_cbk(null, '+obj.acro+');\n';
		block += '				}\n';
		block += '			});\n';
		block += '		};\n';
		block += '\n';

		//auto generators
		block += '		var fieldsLength = {};\n';
		for(p=0;p<obj.props.length;p++){
			prop = obj.props[p];
			if(prop.auto == 'random'){
				block += '		fieldsLength[\''+prop.name+'\'] = '+prop.length+';\n';
			}
		}
		block += '		// Generates a new value for field for given '+obj.name+'\n';
		block += '		self.generate = function ('+obj.acro+'Id, field, f_callback){\n';
		block += '			var find = {\n';
		block += '				_id : new ObjectID(String('+obj.acro+'Id))\n';
		block += '			};\n';
		block += '\n';
		block += '			var jSet = {};\n';
		block += '			jSet[field] = _createToken(fieldsLength[field]);\n';
		block += '			var set = {\n';
		block += '				$set : jSet\n';
		block += '			};\n';
		block += '\n';
		block += '			'+obj.dbCol+'.findAndModify(find,[],set,{\'new\' : true},f_callback);\n';
		block += '		};\n';


		return block;
	}

}, iris.path.ui.class.js);