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
