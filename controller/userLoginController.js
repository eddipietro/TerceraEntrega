const userLogin = (req, res) => {
    const { aliasName } = req.body;
  
    return res.redirect(`/chat?userName=${aliasName}`);
  };
  
  module.exports = {
    userLogin,
  };