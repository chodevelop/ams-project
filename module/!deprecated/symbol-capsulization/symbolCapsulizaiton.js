/**
 * symbolCapsulizaiton (Deprecated)
 * 
 * 작성자: 조영우
 * 
 * 설명: symbol을 이용해 객체의 엄밀한 캡슐화 및 은닉화를 보장하기 위해 만든 모듈입니다.
 * 상위호환 개념인 Closure를 배우 전에 구상한 모듈입니다.
 * Closure 개념을 알고 있는 현재는 사용하지 않습니다.
 */
const symbolCapsulizaiton = {
    set(factor) {
        capsuledFactor = {};
        capsuledFactor[Symbol("factor")] = factor;
        return capsuledFactor;
    },
    get(capsuledFactorInContainer) {
        if (!capsuledFactorInContainer) {
            return null;
        }
        const keys = Object.getOwnPropertySymbols(capsuledFactorInContainer);
        return capsuledFactorInContainer[keys[0]];
    }
}

module.exports = {
    symbolCapsulizaiton,
};


/* Hard-Coded Version */

// set number(number) {
//     this.capsuledNumber = {};
//     this.capsuledNumber[Symbol("number")] = number;
// }
// get number() {
//     const symbols = Object.getOwnPropertySymbols(this.capsuledNumber);
//     const retrivedPassword = this.capsuledNumber[symbols[0]];
//     return retrivedPassword;
// }

// set password(password) {
//     this.capsuledNumber = {};
//     this.capsuledNumber[Symbol("password")] = password;
// }