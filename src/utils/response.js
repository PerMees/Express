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
  let errors = [];
  if (code) {
    result.statusCode = code;
  }
  if (Array.isArray(err) && err.length > 0) {
    errors = err.map((e) => e.message);
  } else if (typeof err === "object" && err.message) {
    errors = [err.message];
  } else errors = [err];

  res.status(code).json({ error: errors, ...result });
};

module.exports = { ReS, ReE };
