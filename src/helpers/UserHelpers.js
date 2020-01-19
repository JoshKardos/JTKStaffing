
export const validateEmail = (inputText) => {
  // eslint-disable-next-line no-useless-escape
  const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (inputText.match(mailformat)) {
    return true
  }
  return false
} // src: https://www.w3resource.com/javascript/form/email-validation.php

export default null
