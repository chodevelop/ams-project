const { showAccountInfo, addAccount, addMinusAccount } = require("./account/AccountRepository");
const { input } = require("./module/pythonic-input/pythonicInput");
const { printAccountType } = require("./interface");
const { NoSuchMenuSelectError } = require("./CustomError.js");
const { validPasswordInput, validMoneyInput } = require("./validInput.js")

const [ACCOUNT, MINUSACCOUNT, PREVIOUSMENU] = [1, 2, 0];

const registerAccount = function (...allAccounts) {
    while (true) {
        printAccountType();//계좌 타입 출력
        no = parseInt(input());
        try {
            switch (no) {
                case ACCOUNT:
                    return ACCOUNT;

                case MINUSACCOUNT:
                    return MINUSACCOUNT;
                    break;

                case PREVIOUSMENU:
                    return PREVIOUSMENU;

                default:
                    throw new NoSuchMenuSelectError();
            }
            console.log("신규 계좌 등록이 정상적으로 완료되었습니다.");
            return no;
        } catch (error) {
            console.error(error.message);
            continue;
        }
    }
    // while (true) {
    //     printAccountType();//계좌 타입 출력
    //     no = parseInt(input());
    //     try {
    //         switch (no) {
    //             case ACCOUNT:
    //                 const account = addAccount(input("이름: "), validPasswordInput(), validMoneyInput("예수금: "), allAccounts[ACCOUNT - 1]);
    //                 console.log(showAccountInfo(account));
    //                 break;

    //             case MINUSACCOUNT:
    //                 const minusAccount = addMinusAccount(input("이름: "), validPasswordInput(), validMoneyInput("예수금: "), validMoneyInput("대출금: "), allAccounts[MINUSACCOUNT - 1]);
    //                 console.log(showAccountInfo(minusAccount));
    //                 break;

    //             case PREVIOUSMENU:
    //                 return PREVIOUSMENU;

    //             default:
    //                 throw new NoSuchMenuSelectError();
    //         }
    //         console.log("신규 계좌 등록이 정상적으로 완료되었습니다.");
    //         return no;
    //     } catch (error) {
    //         console.error(error.message);
    //         continue;
    //     }
    // }
}

module.exports = {
    registerAccount,
}