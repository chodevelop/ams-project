/**
 * 은행 직원용 계좌 관리 애플리케이션
 * 
 * 작성자 : 조영우
 */

const { toString, totalDeposits, searchFromToBalance, searchByAll, searchByName, searchByNumber, changeName, deleteAccount, addAccount, addMinusAccount } = require("./account/AccountRepository");
const { input } = require("./module/pythonic-input/pythonicInput");
const { databaseInitialize, databaseTerminate } = require("./database/databaseControl");
const { printMenu, printSearchBy, printAccountType, printAccountList, } = require("./interface");

// // 메뉴 출력
// const printMenu = function () {
//     console.log("--------------------------------------------------------------------");
//     console.log("1.계좌등록 | 2.계좌목록 | 3.예금 | 4.출금 | 5.검색 | 6.삭제 | 7.종료");
//     console.log("--------------------------------------------------------------------");
// }

// /** 
//  * printAccountType
//  * ================
//  * 
//  * 설명: 계좌 종류를 아래와 같이 프린트합니다.
//  * 
//  * --------------------------------
//  * 
//  * ```
//  * 
//  * --------------------------------
//  * 1. 입출금계좌 | 2. 마이너스 계좌
//  * --------------------------------
//  * 
//  * ```
//  */
// const printAccountType = function () {
//     console.log("■ 등록 계좌 종류 선택");
//     console.log("--------------------------------");
//     console.log("1. 입출금계좌 | 2. 마이너스 계좌");
//     console.log("--------------------------------");
// }


// /** 
//  * printSearchBy
//  * =============
//  * 설명: 계좌 검색 기준을 아래와 같이 프린트합니다.
//  * 
//  * --------------------------------
//  * ```
//  * 
//  * ■ 등록 계좌 종류 선택
//  * ---------------------
//  * 1. 이름 | 2. 계좌번호
//  * ---------------------
//  * 
//  * ```
//  */
// const printSearchBy = function () {
//     console.log("■ 등록 계좌 종류 선택");
//     console.log("---------------------");
//     console.log("1. 이름 | 2. 계좌번호");
//     console.log("---------------------");
// }

// /**
//  * printAccountType
//  * ================
//  * 설명: 파라미터의 결과값에 따라 예금주, 계좌번호, 예수금, 부채, 잔고를 순차적으로 ```console.log()``` 합니다.
//  * 
//  * --------------------------------
//  * 
//  * ```
//  * 
//  * -----------------------------------------------------
//  * 예금주        계좌번호        예수금   부채     잔고 
//  * 엄준식    123-4567-7898-76    10000            10000
//  * 김찬호    987-6543-2123-45    1000    10000    -9000
//  * -----------------------------------------------------
//  * 
//  * ```
//  */
// const printAccountList = function (targetAccount) {
//     console.log("-------------------------------------------------------");
//     console.log(" 예금주 \t 계좌번호 \t 예수금 \t 부채 \t 잔고 ");
//     console.log(targetAccount);
//     console.log("-------------------------------------------------------");
// }

const app = function () {
    const { accounts, minusAccounts } = databaseInitialize();
    let allAccounts = [accounts, minusAccounts];

    console.log(`====================================================================`);
    console.log(`--------------     KOSTA 은행 계좌 관리 프로그램     ---------------`);
    console.log(`====================================================================`);

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
                        throw new Error("계좌번호가 일치하지 않습니다.");
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
                            throw new Error("계좌 잔고가 출금 희망액보다 적습니다.");
                        }
                    } else {
                        throw new Error("계좌번호가 일치하지 않습니다.");
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
                if (no === 1){
                    let searchName = input("- 이름 : ");
                    resultAccount = searchByName(searchName, ...allAccounts);
                } else {
                    let searchNo = input("- 계좌번호 : ");
                    resultAccount = searchByNumber(searchNo, ...allAccounts);
                }
                try {
                    if (resultAccount) {
                        console.log(toString(resultAccount));
                    } else {
                        throw new Error("일치하는 계좌가 없습니다.");
                    }
                } catch (error) {
                    console.error(error.message);
                } finally {
                    console.log("계좌번호 검색 기능이 종료되었습니다.");
                }
                break;

            case 6:
                console.log("계좌 삭제");
                // 계좌 번호 입력 받아 계좌 해당 계좌 삭제
                let deleteNum = input("- 계좌번호 : ");
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