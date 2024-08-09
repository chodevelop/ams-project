const { generateNumberModule } = require("../../external/generate-number/generateNumber");
/**
 * 계좌 (입출금 전용) 클래스
 * 
 * 작성자: 조영우
 * 
 * 설명: 계좌 (입출금 전용) 을 정의하는 클래스 모듈입니다.
 */

class Account {

    constructor(name, number = generateNumberModule(3, 4, 4, 3), password, asset) {
        this.name = name;
        this.number = number;
        this.password = password;
        this.asset = asset;
    }

    deposit(amount) {
        this.asset += amount;
    }

    withdraw(amount) {
        if (this.asset - amount >= 0) {
            const newAsset = this.getAsset() - amount;
        } else {
            throw new Error("잔액 부족");
        }
    }
    getBalance() {
        return this.asset;
    }
}

module.exports = {
    Account,
}
