const { Account } = require("./Account");

/**
 * 마이너스 계좌 (대출 및 입출금) 클래스
 * 
 * 작성자: 조영우
 * 
 * 설명: 마이너스 계좌 (대출 및 입출금)을 정의하는 클래스 모듈입니다.
 */

class MinusAccount extends Account {
    #debt;

    constructor(name, password, asset, debt) {
        super(name, password, asset);
        this.#debt = debt;
    }

    // 부채를 조회하는 메서드
    getDebt() {
        return this.#debt;
    }

    // 부채를 설정하는 메서드
    setDebt(newDebt) {
        this.#debt = newDebt;
    }

    // 잔고를 조회하는 메서드 (오버라이드)
    getBalance() {
        return super.getBalance() - this.#debt;
    }

    toJSON() {
        return JSON.stringify({
            type: "MinusAccount",
            name: this.name,
            number: super.getAccountNumber(),
            password: super.getPassword(),
            asset: super.getAsset(),
            debt: this.getDebt(),
            balance: this.getBalance(),
        })
    }
};

module.exports = {
    MinusAccount,
};
