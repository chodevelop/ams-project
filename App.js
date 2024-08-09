/**
 * 은행 직원용 계좌 관리 애플리케이션
 * 
 * 작성자 : 조영우
 */

const { toString, showAccountInfo, searchFromToBalance, searchByAll, searchByName, searchByNumber, deleteAccount, addAccount, addMinusAccount } = require("./module/internal/account/AccountRepository.js");
const { input } = require("./module/external/pythonic-input/pythonicInput.js");
const { databaseInitialize, databaseTerminate } = require("./database/databaseControl.js");
const { printInit, printMenu, printSearchBy, printAccountType, printAccountList, } = require("./module/internal/interface/interface.js");
const { NoSuchAccountError, WithdrawalBalanceError, NoSuchMenuSelectError } = require("./module/internal/error/CustomError.js");
const { validNumberInput, validPasswordInput, validMoneyInput } = require("./module/internal/input-validation/validInput.js")

const [REGISTERACCOUNT, LOGACCOUNT, DEPOSIT, WITHDRAW, SEARCH, DELETEACCOUNT, TERMINATE] = [1, 2, 3, 4, 5, 6, 7];
const [BYNAME, BYNUMBER, BYBALANCE] = [1, 2, 3];
const [ACCOUNT, MINUSACCOUNT] = [1, 2];
const PREVIOUSMENU = 0;

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
            case REGISTERACCOUNT:
                printAccountType();//계좌 타입 출력
                no = parseInt(input());
                //PREVIOUSMENU 선택 시 이전 화면으로 돌아감
                if (no === PREVIOUSMENU) break;

                try {
                    switch (no) {
                        //ACCOUNT 선택 시 계좌 생성 및 결과 출력
                        case ACCOUNT:
                            const account = addAccount(input("이름: "), validPasswordInput(), validMoneyInput("예수금: "), accounts);
                            console.log(showAccountInfo(account));
                            break;
                        //MINUSACCOUNT 선택 시 마이너스 계좌 생성 및 결과 출력
                        case MINUSACCOUNT:
                            const minusAccount = addMinusAccount(input("이름: "), validPasswordInput(), validMoneyInput("예수금: "), validMoneyInput("대출금: "), minusAccounts);
                            console.log(showAccountInfo(minusAccount));
                            break;
                        //유효하지 않은 선택지를 고를 땐 NoSuchMenuSelectError 에러
                        default:
                            throw new NoSuchMenuSelectError();
                    }

                    console.log("신규 계좌 등록이 정상적으로 완료되었습니다.");

                } catch (error) {
                    console.error(error.message);
                    continue;
                }

                break;//REGISTERACCOUNT 끝

            case LOGACCOUNT: // 전체계좌 목록 출력
                try {
                    console.log(accounts);
                    console.log(minusAccounts);
                    printAccountList(toString(searchByAll(...allAccounts)));
                } catch (error) {
                    console.error(error.message);
                }
                break;//LOGACCOUNT 끝

            case DEPOSIT: // 입금
                try {
                    let inputNo = validNumberInput();
                    let inputMoney = validMoneyInput("입금액: ");
                    let depositResults = searchByNumber(inputNo, ...allAccounts);

                    if (depositResults) {
                        depositResults.asset += inputMoney;
                        console.log("입금이 성공적으로 완료되었습니다.");
                    } else {
                        throw new NoSuchAccountError();
                    }
                } catch (error) {
                    console.error(error.message);
                }
                break;//DEPOSIT 끝

            case WITHDRAW: // 출금
                try {
                    let outputNo = validNumberInput();
                    let outputMoney = validMoneyInput("출금액: ");
                    let withdrawResults = searchByNumber(outputNo, ...allAccounts);

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
                }
                break;//WITHDRAW 끝

            case SEARCH:
                printSearchBy();
                no = parseInt(input());
                //PREVIOUSMENU 선택 시 이전 화면으로 돌아감
                if (no === PREVIOUSMENU) break;

                try {
                    let resultAccount = null;
                    if (no === BYNAME) {
                        resultAccount = searchByName(input("- 이름 : "), ...allAccounts);
                    } else if (no === BYNUMBER) {
                        resultAccount = searchByNumber(validNumberInput(), ...allAccounts);//테스트 validNumberInput
                    } else if (no === BYBALANCE) {
                        resultAccount = searchFromToBalance(validMoneyInput("시작 잔고: "), validMoneyInput("끝 잔고: "), ...allAccounts);
                    } else {
                        throw new NoSuchMenuSelectError();
                    }

                    if (resultAccount) {
                        console.log(toString(resultAccount));
                    } else {
                        throw new NoSuchAccountError();
                    }
                } catch {
                    console.error(error.message);
                    break;
                }
                break;//SEARCH 끝

            case DELETEACCOUNT:
                try {
                    let deleteNum = validNumberInput();
                    console.log(deleteNum);

                    // deleteAccount를 호출하여 업데이트된 배열들을 가져옴
                    const updatedAccountsList = deleteAccount(deleteNum, ...allAccounts);

                    // allAccounts 내의 각 배열의 원본 참조를 업데이트된 내용으로 덮어씀
                    for (let i = 0; i < updatedAccountsList.length; i++) {
                        // 원본 배열의 내용을 빈 배열로 만듦
                        allAccounts[i].length = 0;
                        // 업데이트된 내용을 원본 배열에 다시 추가
                        allAccounts[i].push(...updatedAccountsList[i]);
                    }
                    console.log("계좌 삭제가 성공적으로 완료되었습니다.");
                } catch (error) {
                    console.error(error.message);
                }
                break;//DELETEACCOUNT 끝

            case TERMINATE:
                console.log(">>> 프로그램을 종료합니다.");
                databaseTerminate(accounts, minusAccounts);
                running = false;
                break; //TERMINATE 끝

            default: console.log("잘못 선택하셨습니다.");
        }
    }
}

app();