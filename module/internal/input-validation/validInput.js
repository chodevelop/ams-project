const { ValidationError } = require("../error/CustomError.js");
const { input } = require("../../external/pythonic-input/pythonicInput.js");
const { generateNumberRegExp } = require("../../external/generate-number/generateNumber.js");

const validInput = function (inputMessage, regExp, errorMessage) {
    const checkInput = input(inputMessage);
    if (!regExp.test(checkInput)) {
        throw new ValidationError(errorMessage);
    }
    return checkInput;
}

const inputMessages = {
    number: "계좌 번호: ",
    password: "비밀번호 숫자 4자리: ",
}

const regExps = {
    number: generateNumberRegExp(3, 4, 4, 3),
    password: /^\d{4}$/,
    money: /^\d+$/i,
}

const errorMessage = {
    number: "본 은행의 계좌번호 양식과 일치하지 않는 입력값입니다.",
    password: "비밀번호 양식과 일치하지 않는 입력값입니다.",
    money: "희망 액수를 숫자 형태로 입력하십시오.",
}

const validNumberInput = () => validInput(inputMessages.number, regExps.number, errorMessage.number);
const validPasswordInput = () => validInput(inputMessages.password, regExps.password, errorMessage.password);
const validMoneyInput = (message) => validInput(message, regExps.money, errorMessage.money);

module.exports = {
    validNumberInput,
    validPasswordInput,
    validMoneyInput,
}