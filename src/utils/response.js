//? Format data để trả về client
const ReS = (res, data, code) => {
  let result = { success: true };
  if (code) {
    result.statusCode = code;
  }
  res.status(code).json({ data, ...result });
};

const ReE = (res, err, code) => {
  let result = { success: false };
  if (typeof err === "object" && err.message) {
    err = err.message;
  }
  if (code) {
    result.statusCode = code;
  }
  res.status(code).json({ error: err, ...result });
};

module.exports = { ReS, ReE };
