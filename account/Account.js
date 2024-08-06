const { generateNumberModule } = require("../module/generate-number/generateNumber");

/**
 * 계좌 (입출금 전용) 클래스
 * 
 * 작성자: 조영우
 * 
 * 설명: 계좌 (입출금 전용) 을 정의하는 클래스 모듈입니다.
 */

class Account {
    #password;
    #number;
    #asset;

    constructor(name, password, asset) {
        this.name = name;
        this.#number = generateNumberModule(3, 4, 4, 3);
        this.#password = password; // 계좌 비밀번호
        this.#asset = asset;
    }

    getAccountNumber() {
        return this.#number;
    }

    checkPassword(password) {
        return this.#password === password;
    }

    changePassword(oldPassword, newPassword) {
        if (this.checkPassword(oldPassword)) {
            this.#password = newPassword;
            return true;
        } else {
            return false;
        }
    }
    getPassword() {
        return this.#password;
    }

    getBalance() {
        return this.#asset;
    }

    getAsset() {
        return this.#asset;
    }

    deposit(amount) {
        const newAsset = this.getAsset() + amount;
        this.protectedUpdateAsset(newAsset);
    }

    withdraw(amount) {
        if (this.getAsset() - amount >= 0) {
            const newAsset = this.getAsset() - amount;
            this.#protectedUpdateAsset(newAsset);
        } else {
            throw new Error("잔액 부족");
        }
    }

    // 잔고를 업데이트하는 보호된 메서드
    #protectedUpdateAsset(newAsset) {
        this.#asset = newAsset;
    }

    toJSON() {
        return JSON.stringify({
            type: "Account",
            name: this.name,
            number: this.getAccountNumber(),
            password: this.getPassword(),
            asset: this.getAsset(),
            debt: 0,
            balance: this.getBalance(),
        });
    }
}

module.exports = {
    Account,
}
