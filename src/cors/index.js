(async function init() {
  const payload = {
    email: "admin@gmail.com",
    password: "123456",
  };
  const resp = await axios.post(
    "http://localhost:8080/api/v1/auth/login",
    payload
  );
  const data = await resp.json();
  console.log(data);
  return data;
})();
