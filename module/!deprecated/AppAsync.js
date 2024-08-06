/**
 * 은행 직원용 계좌 관리 애플리케이션
 * 
 * 작성자 : 조영우
 */

// const { createInterface } = require("readline");
// const { symbolCapsulizaiton } = require("./module/symbolCapsulizaiton");
const { Account } = require("../Account");
const { MinusAccount } = require("../MinusAccount");
const { accountRepository } = require("../accountRepository")
const { input } = require("../pythonic-input/pythonicInput");

// 메뉴 출력
const printMenu = function () {
    console.log("--------------------------------------------------------------------");
    console.log("1.계좌등록 | 2.계좌목록 | 3.예금 | 4.출금 | 5.검색 | 6.삭제 | 7.종료");
    console.log("--------------------------------------------------------------------");
}

const app = async function () {
    console.log(`====================================================================`);
    console.log(`--------------     KOSTA 은행 계좌 관리 프로그램     ---------------`);
    console.log(`====================================================================`);

    let running = true;
    while (running) {
        printMenu();
        let menuNum = parseInt(await readLine("> "));
        switch (menuNum) {
            case 1:
                console.log("■ 등록 계좌 종류 선택");
                const header =
                    "--------------------------------\n" +
                    "1. 입출금계좌 | 2. 마이너스 계좌\n" +
                    "--------------------------------";

                console.log(header);

                const accountInputInfo = null;
                const account = null;
                const no = await input("");
                if (no === 1) {
                    accountInputInfo = await input("이름: ", "비밀번호: ", "초기 자산: ");
                    account = new Account(...accountInputInfo);
                    console.log(account.name, account.getAccountNumber(), account.getAsset(), account.getBalance());
                } else {
                    accountInputInfo = await input("이름: ", "비밀번호: ", "초기 자산: ", "대출금: ",);
                    console.log(account.name, account.getAccountNumber(), account.getAsset(), account.getDebt(), account.getBalance());
                }
                // 신규 계좌 등록
                console.log("신규 계좌 등록이 정상적으로 완료되었습니다.");
                break;//이것까지 클리어-------------------------------------------------------------------------------------------------------


            case 2: // 전체계좌 목록 출력
                console.log("-------------------------------------------------------");
                console.log("계좌구분 \t 계좌번호 \t 예금주 \t 잔액");
                console.log("-------------------------------------------------------");
                console.log("계좌 목록 출력~~~~");
                break;
            case 3: // 입금
                // 계좌번호와 입금액 입력 받아 입금 처리
                let inputNo = await readLine("- 계좌번호 : ");
                let inputMoney = parseInt(await readLine("- 입금액 : "));
                console.log(inputNo, inputMoney);
                console.log("입금에 따른 메시지 출력");
                break;
            case 4: // 출금
                // 계좌번호와 출금액 입력 받아 출금 처리
                let outputNo = await readLine("- 계좌번호 : ");
                let outputMoney = parseInt(await readLine("- 출금액 : "));
                console.log(outputNo, outputMoney);
                console.log("출금에 따른 메시지 출력");
                break;
            case 5: // 계좌번호로 검색
                // 계좌 번호 입력 받아 계좌 정보 출력
                let searchNum = await readLine("- 계좌번호 : ");
                console.log(searchNum);
                console.log("검색 결과 출력");
                break;
            case 6:
                console.log("계좌 삭제");
                // 계좌 번호 입력 받아 계좌 해당 계좌 삭제
                let deleteNum = await readLine("- 계좌번호 : ");
                console.log(deleteNum);
                console.log("삭제 결과 출력");
                break;
            case 7:
                console.log(">>> 프로그램을 종료합니다.");
                consoleInterface.close();
                running = false;
                break;
            default: console.log("잘못 선택하셨습니다.");
        }
    }
}

app();