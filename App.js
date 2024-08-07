/**
 * 은행 직원용 계좌 관리 애플리케이션
 * 
 * 작성자 : 조영우
 */

const { toString, totalDeposits, searchFromToBalance, searchByAll, searchByName, searchByNumber, changeName, deleteAccount, addAccount, addMinusAccount } = require("./account/AccountRepository");
const { input } = require("./module/pythonic-input/pythonicInput");
const { databaseInitialize, databaseTerminate } = require("./database/databaseControl");
const { printInit, printMenu, printSearchBy, printAccountType, printAccountList, } = require("./interface");
const { ValidationError, NoSuchAccountError, WithdrawalBalanceError } = require("./CustomError.js");

const app = function () {
    const { accounts, minusAccounts } = databaseInitialize();
    let allAccounts = [accounts, minusAccounts];

    printInit();

    let running = true;
    while (running) {
        printMenu();
        let menuNum = parseInt(input("> "));
        let no = null;
        switch (menuNum) {
            case 1:
                // <예시>
                // --------------------------------
                // 1. 입출금계좌 | 2. 마이너스 계좌
                // --------------------------------
                printAccountType();//계좌 타입 출력
                no = parseInt(input());

                let registerInfo = [];
                registerInfo.push(input("이름: "));
                registerInfo.push(parseInt(input("비밀번호: ")));
                registerInfo.push(parseInt(input("예수금: ")));
                if (no !== 1) {
                    registerInfo.push(parseInt(input("대출금: ")));
                }

                if (no === 1) {
                    const account = addAccount(...registerInfo, accounts);
                    console.log(account.name, account.number, account.asset, account.getBalance());
                } else {
                    const minusAccount = addMinusAccount(...registerInfo, minusAccounts);
                    console.log(minusAccount.name, minusAccount.number, minusAccount.asset, minusAccount.debt, minusAccount.getBalance());
                }

                // 신규 계좌 등록
                console.log("신규 계좌 등록이 정상적으로 완료되었습니다.");
                break;

            case 2: // 전체계좌 목록 출력
                // <예시>
                // -----------------------------------------------------
                // 예금주        계좌번호        예수금   부채     잔고 
                // 엄준식    123-4567-7898-76    10000            10000
                // 김찬호    987-6543-2123-45    1000    10000    -9000
                // -----------------------------------------------------
                printAccountList(toString(searchByAll(...allAccounts)));
                break;

            case 3: // 입금
                let inputNo = input("- 계좌번호 : ");
                let inputMoney = parseInt(input("- 입금액 : "));
                let depositResults = searchByNumber(inputNo, ...allAccounts);

                try {
                    if (depositResults) {
                        depositResults.asset += inputMoney;
                        console.log("입금이 성공적으로 완료되었습니다.");
                    } else {
                        throw new NoSuchAccountError();
                    }
                } catch (error) {
                    console.error(error.message);
                } finally {
                    console.log("입금 기능이 종료되었습니다.");
                }
                break;

            case 4: // 출금
                let outputNo = input("- 계좌번호 : ");
                let outputMoney = parseInt(input("- 출금액 : "));
                let withdrawResults = searchByNumber(outputNo, ...allAccounts);

                try {
                    if (withdrawResults) {
                        if (withdrawResults.getBalance() - outputMoney >= 0) {
                            withdrawResults.asset -= outputMoney;
                            console.log("출금이 성공적으로 완료되었습니다.");
                        } else {
                            throw new WithdrawalBalanceError();
                        }
                    } else {
                        throw new NoSuchAccountError();
                    }
                } catch (error) {
                    console.error(error.message);
                } finally {
                    console.log("출금 기능이 종료되었습니다.");
                }
                break;

            case 5: // 계좌번호로 검색
                // <예시>
                // ---------------------
                // 1. 이름 | 2. 계좌번호
                // --------------------- 
                printSearchBy();

                no = parseInt(input());
                let resultAccount = null;
                if (no === 1) {
                    let searchName = input("- 이름 : ");
                    resultAccount = searchByName(searchName, ...allAccounts);
                } else if (no === 2) {
                    let searchNo = input("- 계좌번호 : ");
                    resultAccount = searchByNumber(searchNo, ...allAccounts);
                } else {
                    let from = parseInt(input("- 시작 잔고: "));
                    let to = parseInt(input("- 끝 잔고: "));
                    resultAccount = searchFromToBalance(from, to, ...allAccounts);
                }

                try {
                    if (resultAccount) {
                        console.log(toString(resultAccount));
                    } else {
                        throw new NoSuchAccountError();
                    }
                } catch (error) {
                    console.error(error.message);
                } finally {
                    console.log("계좌번호 검색 기능이 종료되었습니다.");
                }
                break;

            case 6:
                let deleteNum = input("- 삭제할 계좌번호 : ");
                console.log(deleteNum);
                console.log("삭제 결과 출력");
                allAccounts = deleteAccount(deleteNum, ...allAccounts);
                break;

            case 7:
                console.log(">>> 프로그램을 종료합니다.");
                databaseTerminate(accounts, minusAccounts);
                running = false;
                break;
            default: console.log("잘못 선택하셨습니다.");
        }
    }
}

app();