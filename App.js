/**
 * 은행 직원용 계좌 관리 애플리케이션
 * 
 * 작성자 : 조영우
 */

const { toString,
    totalDeposits,
    searchFromToBalance,
    searchByAll,
    searchByName,
    searchByNumber,
    changeName,
    deleteAccount,
    addAccount,
    addMinusAccount} = require("./account/AccountRepository");
const { input } = require("./module/pythonic-input/pythonicInput");
const { databaseInitialize, databaseTerminate } = require("./database/databaseControl");
1

// 메뉴 출력
const printMenu = function () {
    console.log("--------------------------------------------------------------------");
    console.log("1.계좌등록 | 2.계좌목록 | 3.예금 | 4.출금 | 5.검색 | 6.삭제 | 7.종료");
    console.log("--------------------------------------------------------------------");
}

const app = function () {
    const { accounts, minusAccounts } = databaseInitialize();
    // console.log(accounts, minusAccounts);

    console.log(`====================================================================`);
    console.log(`--------------     KOSTA 은행 계좌 관리 프로그램     ---------------`);
    console.log(`====================================================================`);

    let running = true;
    while (running) {
        printMenu();
        let menuNum = parseInt(input("> "));
        let targetAccount = null;
        switch (menuNum) {
            case 1:
                console.log("■ 등록 계좌 종류 선택");
                const header =
                    "--------------------------------\n" +
                    "1. 입출금계좌 | 2. 마이너스 계좌\n" +
                    "--------------------------------";

                console.log(header);


                // let account = null;
                const no = parseInt(input());

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
            //완료

            case 2: // 전체계좌 목록 출력
                console.log("-------------------------------------------------------");
                console.log(" 예금주 \t 계좌번호 \t 예수금 \t 부채 \t 잔고 ");
                console.log(toString(searchByAll(accounts, minusAccounts)));
                console.log("-------------------------------------------------------");
                break;

            case 3: // 입금
                let inputNo = input("- 계좌번호 : ");
                let inputMoney = parseInt(input("- 입금액 : "));
                let depositResults = searchByNumber(inputNo, accounts, minusAccounts);

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
                let withdrawResults = searchByNumber(outputNo, accounts, minusAccounts);

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
                let searchNo = input("- 계좌번호 : ");
                targetAccount = accountRepository.search.byNumber(searchNo);
                try {
                    if (targetAccount) {
                        console.log(targetAccount);
                    } else {
                        throw new Error("일치하는 계좌가 없습니다.");
                    }
                } catch (error) {
                    console.error(error.message);
                } finally {
                    console.log("계좌번호 검색 기능이 종료되었습니다.");
                }
            case 6:
                console.log("계좌 삭제");
                // 계좌 번호 입력 받아 계좌 해당 계좌 삭제
                let deleteNum = input("- 계좌번호 : ");
                console.log(deleteNum);
                console.log("삭제 결과 출력");
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