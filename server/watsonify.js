'use strict';
var path = require("path");

//impliment Watson conversation API code here
if (process.env.npm_config_model){
  var model_name = process.env.npm_config_model;
  console.log(model_name);
}
else{
  throw new Error("Enter 'model' parameter");
}

var fs = require('fs');
//var obj = JSON.parse(fs.readFileSync('/../common/models/'+model_name+".json", 'utf8'));
var obj = JSON.parse(fs.readFileSync(path.join(__dirname, '/../common/models/'+model_name+".json"), "utf8"));

console.log(obj);
/*
var watson = require("watson-developer-cloud");

var conversation = new watson.ConversationV1({
  username: process.env.npm_config_username,
  password: process.env.npm_config_password,
  version_date: '2017-09-08'
});

var params = {
  workspace_id: '9978a49e-ea89-4493-b33d-82298d3db20d',
  entity: model_name,
  values: [    
  ]
};

conversation.createEntity(params, function(err, response) {
  if (err) {
    console.error(err);
  } else {
    console.log(JSON.stringify(response, null, 2));
  }

});
*/

function replaceAll(str, find, replace) {
    return str.replace(new RegExp(find, 'g'), replace);
}

var watson = require("watson-developer-cloud");

var conversation = new watson.ConversationV1({
  username: process.env.npm_config_username,
  password: process.env.npm_config_password,
  version_date: '2017-09-08'
});

if(model_name.indexOf("_") != -1){  
  var examples = [
    {
      text: model_name,
    },
    {
      text: replaceAll(model_name, "_", " ")
    }
  ];
}
else{
  var examples = [
    {
      text: model_name,
    }
  ];

}

var params = {
  workspace_id: 'ad7e5d93-86a0-4372-a6b2-a86ed7e31234',
  intent: model_name,
  examples: examples
};

conversation.createIntent(params, function(err, response) {
  if (err) {
    console.error(err);
  } else {
    console.log(JSON.stringify(response, null, 2));
  }

});