const { ValidationError } = require("./CustomError.js");
const { input } = require("./module/pythonic-input/pythonicInput");
const { generateNumberRegExp } = require("./module/generate-number/generateNumber.js");

const validNumberInput = function () {
    const numberInput = input("계좌 번호: ");
    if (!generateNumberRegExp(3, 4, 4, 3).test(numberInput)) {
        throw new ValidationError("본 은행의 계좌번호 양식과 일치하지 않는 입력값입니다.");
    }
    return numberInput;
}

const validPasswordInput = function () {
    const passwordInput = input("비밀번호 숫자 4자리: ");
    if (!/^\d{4}$/.test(passwordInput)) {
        throw new ValidationError("비밀번호 양식과 일치하지 않는 입력값입니다.");
    }
    return parseInt(passwordInput);
}

const validMoneyInput = function (message) {
    const moneyInput = input(message);
    if (!/^\d+$/i.test(moneyInput)) {
        throw new ValidationError("희망 액수를 숫자 형태로 입력하십시오.");
    }
    return parseInt(moneyInput);
}

module.exports = {
    validNumberInput,
    validPasswordInput,
    validMoneyInput,
}