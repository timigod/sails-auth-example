module.exports = {
  
  login(req, res) {
    const email = req.param('email');
    const password = req.param('password');

    verifyParams(res, email, password)

    User.findOne({email: email}).then(function (user) {
      if (!user) {
        return invalidEmailOrPassword(res);
      }
      signInUser(req, res, password, user)
    }).catch(function (err) {
      return invalidEmailOrPassword(res);
    })
  }

};


const signInUser = (req, res, password, user) => {
  User.comparePassword(password, user).then(
    function (valid) {
      if (!valid) {
        return this.invalidEmailOrPassword();
      } else {
        const responseData = {
          user: user,
          token: generateToken(user.id)
        }
        return ResponseService.json(200, res, "Successfully signed in", responseData)
      }
    }
  ).catch(function (err) {
    return ResponseService.json(403, res, "Forbidden")
  })
};


const invalidEmailOrPassword = (res) => {
  return ResponseService.json(401, res, "Invalid email or password")
};

const verifyParams = (res, email, password) => {
  if (!email || !password) {
    return ResponseService.json(401, res, "Email and password required")
  }
};


function generateToken(user_id) {
  return JwtService.issue({id: user_id})
};
