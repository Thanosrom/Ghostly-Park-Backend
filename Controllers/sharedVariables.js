let verificationCode;

function setVerificationCode(code) {
  verificationCode = code;
}

function getVerificationCode() {
  return verificationCode;
}

module.exports = {
  setVerificationCode,
  getVerificationCode,
};
