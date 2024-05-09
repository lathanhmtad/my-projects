const validateEmail = (email) => {
  if (!email) return "Vui lòng nhập địa chỉ email.";
  const isEmail = String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  if (!isEmail) return "Địa chỉ email không đúng định dạng.";
  return "";
};

const validatePassword = (password) => {
  if (!password) return "Vui lòng nhập mật khẩu.";
  if (password.length < 8) return "Mật khẩu phải chứa ít nhất 8 kí tự.";
  return "";
};

const handleChangeEmail = (e, setEmail, emailError, setEmailError) => {
  setEmail(e.target.value);
  const validateEmailRes = validateEmail(e.target.value);
  if (emailError && !validateEmailRes) setEmailError("");
  if (emailError && validateEmailRes) setEmailError(validateEmailRes);
};
const handleChangePassword = (
  e,
  setPassword,
  passwordError,
  setPasswordError
) => {
  setPassword(e.target.value);
  const validatePasswordRes = validatePassword(e.target.value);
  if (passwordError && !validatePasswordRes) setPasswordError("");
  if (passwordError && validatePasswordRes)
    setPasswordError(validatePasswordRes);
};

export {
  validateEmail,
  validatePassword,
  handleChangeEmail,
  handleChangePassword,
};
