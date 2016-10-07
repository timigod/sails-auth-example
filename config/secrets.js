module.exports.secrets = {

  jwtSecret: function(){
    return process.env.TOKEN_SECRET || "randomstring"
  }

};
