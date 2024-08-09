class ValidationError extends Error{
    constructor(message) {
        super(message)
        this.name = "ValidationError";
    }
}

class NoSuchAccountError extends Error{
    constructor() {
        super("입력하신 정보와 일치하는 계좌가 존재하지 않습니다.")
        this.name = "NoSuchAccountNumberError";
    }
}

class NoSuchMenuSelectError extends Error{
    constructor() {
        super("유효하지 않은 메뉴를 선택하셨습니다.")
        this.name = "NoSuchMenuSelectError";
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
    NoSuchMenuSelectError,
}