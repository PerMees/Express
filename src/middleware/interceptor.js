const responseInterceptor = (req, res, next) => {
  const originalJson = res.json;

  res.json = (code, payload) => {
    originalJson.apply(res);
  };
};

module.exports = { responseInterceptor };
