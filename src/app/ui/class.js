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
		var block = '';

		block += '		// ----------------\n';
		block += '		// '+obj.Name+'\n';
		block += '		// ----------------\n';
		block += '\n';
		block += '		// Gets all '+obj.names+' from database\n';
		block += '		self.getAll'+obj.Names+' = function(p_cbk){\n';
		block += '			'+obj.dbCol+'.find({}, {_id:0}).toArray(function(err, '+obj.acros+'){\n';
		block += '				if(!err){\n';
		block += '					f_cbk(err, '+obj.acros+');\n';
		block += '				}\n';
		block += '			});\n';
		block += '		};\n';
		block += '\n';
		block += '		// Creates a new '+obj.name+' and returns it\n';
		block += '		self.create'+obj.Name+' = function('+obj.acro+', p_cbk){\n';
		block += '			'+obj.dbCol+'.insert('+obj.acro+', {w:1}, function(err, '+obj.acros+'){\n';
		block += '				if(err || '+obj.acros+'.length === 0){\n';
		block += '					p_cbk(err, null);\n';
		block += '				} else {\n';
		block += '					p_cbk(null, '+obj.acros+'[0]);\n';
		block += '				}\n';
		block += '			});\n';
		block += '		}\n';
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
		block += '		self.update'+obj.Name+'FromId = function('+obj.acro+'Id, set, p_cbk){\n';
		block += '			var find = {\n';
		block += '				_id: ObjectID(String('+obj.acro+'Id))\n';
		block += '			};\n';
		block += '\n';
		block += '			'+obj.dbCol+'.update(find, set, function(err,'+obj.acro+'){\n';
		block += '				if(err || '+obj.acro+' === null){\n';
		block += '					p_cbk(err, null);\n';
		block += '				} else {\n';
		block += '					p_cbk(null, '+obj.acro+');\n';
		block += '				}\n';
		block += '			});\n';
		block += '		}\n';
		block += '\n';
		block += '		// Removes '+obj.name+' from its id\n';
		block += '		self.remove'+obj.Name+'FromId = function('+obj.acro+'Id, p_cbk){\n';
		block += '			var find = {\n';
		block += '				_id: ObjectID(String('+obj.acro+'Id))\n';
		block += '			};\n';
		block += '\n';
		block += '			'+obj.dbCol+'.remove(find, set, function(err,'+obj.acro+'){\n';
		block += '				if(err || '+obj.acro+' === null){\n';
		block += '					p_cbk(err, null);\n';
		block += '				} else {\n';
		block += '					p_cbk(null, '+obj.acro+');\n';
		block += '				}\n';
		block += '			});\n';
		block += '		}';

		return block;
	}

}, iris.path.ui.class.js);