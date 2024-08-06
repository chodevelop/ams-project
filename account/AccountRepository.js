const { Account } = require("./Account");
const { MinusAccount } = require("./MinusAccount");
const fs = require('fs');

/**
 * 계좌 관리 객체
 * 
 * 작성자: 조영우
 * 
 * 설명: 계좌 생성 시 파일 입출력을 통해 계좌를 저장 및 관리합니다.
 */
const accountRepository = (function () {
    accounts = JSON.parse(fs.readFileSync("./database/ams.json", 'utf8'));

    const toString = (function () {
        return function (searchResults) {

            let accountValue = '';
            if (searchResults.length === 0) {
                return accountValue;
            }
            // 데이터 추가
            for (const account of searchResults) {
                accountValue += `${account.type}\t${account.name}\t${account.number}\t${account.asset}\t${account.debt}\t${account.balance}\n`
            }
            return accountValue;
        };
    })();

    //모든 계좌의 총 금액 반환(총예수금)
    const totalDeposits = (function () {
        const total = 0;
        return function () {
            accounts.forEach(total,)
            total += account["balance"];
            return total;
        }
    })();

    //계좌 잔액 중에서 전역 극값(최대값/최소값 등등...) 반환
    const balanceGlobalExtrema = (function () {
        const globalExtrema = function (fn) {
            if (accounts.length === 0) return null;
            let extremum = accounts[0].balance;
            for (const account of accounts) {
                extremum = fn(extremum, account.balance);
            }
            return extremum;
        };

        const max = () => globalExtrema((extremum, balance) => Math.max(extremum, balance));
        const min = () => globalExtrema((extremum, balance) => Math.min(extremum, balance));

        return {
            max,
            min,
        };
    })();

    //검색 기능 구현(개선 가능성 있어보임)
    const search = (function () {
        const searchAlgorithm = function (searchMethod, ...parameters) {
            const results = [];
            for (const account of accounts) {
                if (searchMethod(...parameters)) {
                    results.push(account);
                }
            }
            return results;
        }

        const fromToBalance = (from = -Infinity, to = Infinity) => searchAlgorithm((account, from, to) => from <= account.balance && account.balance < to, from, to);
        const byAll = () => searchAlgorithm(() => true);
        const byName = name => searchAlgorithm((account, name) => name === account.name, name);
        const byNumber = number => searchAlgorithm((account, number) => number === account.number, number);

        return {
            fromToBalance,
            byAll,
            byName,
            byNumber,
        };
    })();

    //이름을 받아 계좌의 예금주명 수정(계좌 정보를 수정, 개명 등으로 인해 이름을 바꿔야하는 경우)
    const changeName = function (name, number, newName) {
        for (let i = 0; i < accounts.length; i++) {
            if (accounts[i]["name"] === name && accounts[i]["number"] === number) {
                accounts[i]["name"] = newName;
            } else {
                throw new error("삭제할 계좌의 이름 혹은 계좌번호가 유효하지 않습니다.")
            }
        }
    }

    //계좌번호를 입력받아 해당 계좌 삭제(작성중)
    const deleteAccount = function (number) {
        for (let i = 0; i < accounts.length; i++) {
            if (accounts[i]["number"] === number) {
                array.splice(i, 1);
            } else {
                throw new error("삭제할 계좌의 계좌번호가 유효하지 않습니다.")
            }
        }
    }

    //계좌 생성
    const addAccount = function (name, password, asset) {
        account = new Account(name, password, asset);
        //오류 검출 함수
        accounts.push(JSON.parse(account.toJSON()));
        return account;
    }

    //계좌 생성
    const addMinusAccount = function (name, password, asset, debt) {
        account = new MinusAccount(name, password, asset, debt);
        // 오류 검출 함수
        // accounts.push(JSON.stringify(account));
        accounts.push(JSON.parse(account.toJSON()));
        return account;
    }

    const terminate = function () {
        fs.writeFileSync('./database/ams.json', JSON.stringify(accounts));
    }

    return {
        toString,
        totalDeposits,
        balanceGlobalExtrema,
        changeName,
        search,
        deleteAccount,
        addAccount,
        addMinusAccount,
        terminate,
    };

})();

//입출금 계좌를 입출금 계좌대로
//마이너스 계좌는 마이너스 계좌대로
//다차원 배열을 이용해서 구현해봐라(선택).
//일단은 통합관리를 목표로 하라.

module.exports = {
    accountRepository,
}