'use strict';

//impliment Watson conversation API code here
if process.env.npm_config_model{
  model_name = process.env.npm_config_model
}
else{
  throw new Error("Enter 'model' parameter");
}
