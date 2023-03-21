const getEnvironment = () => {
    return process.env.ENVIRONMENT || "Undefined";
  };
  
  module.exports = getEnvironment;