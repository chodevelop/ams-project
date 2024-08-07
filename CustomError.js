class ValidationError extends Error{
    constructor() {
        super("입력하신 정보 중 유효하지 않은 값이 존재합니다.")
        this.name = "ValidationError";
    }
}

class NoSuchAccountError extends Error{
    constructor() {
        super("입력하신 정보와 일치하는 계좌가 존재하지 않습니다.")
        this.name = "NoSuchAccountNumberError";
    }
}

class WithdrawalBalanceError extends Error{
    constructor() {
        super("계좌 잔고가 출금 희망액보다 적습니다.")
        this.name = "NoSuchAccountNumberError";
    }
}

module.exports = {
    ValidationError,
    NoSuchAccountError,
    WithdrawalBalanceError,
}