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

const toString = function (accounts) {
    let accountValue = '';
    if (accounts.length === 0) {
        return accountValue;
    }
    // 데이터 추가
    for (const account of accounts) {
        accountValue += `${account.name}\t${account.number}\t${account.asset}\t`
        if (account.debt) {
            accountValue += `${account.debt}\t`;
        } else {
            accountValue += `\t\t`
        }
        accountValue += `${account.getBalance()}\n`
    }
    return accountValue;
}

//모든 계좌의 총 금액 반환(총예수금)//미수정
const totalDeposits = (function () {
    const total = 0;
    return function () {
        accounts.forEach(total,)
        total += account["balance"];
        return total;
    }
})();

//미수정
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


const searchFromToBalance = function (from, to, ...accountsType) {
    const results = [];
    for (const accounts of accountsType) {
        for (const account of accounts) {
            if (from <= account.balance && account.balance < to) {
                results.push(account);
            }
        }
    }
    return results;
}
const searchByAll = function (...accountsType) {
    const results = [];
    for (const accounts of accountsType) {
        for (const account of accounts) {
            results.push(account);
        }
    }
    return results;
}
const searchByName = function (name, ...accountsType) {
    const results = [];
    for (const accounts of accountsType) {
        for (const account of accounts) {
            if (name === account.name) {
                results.push(account);
            }
        }
    }
    return results;
}
const searchByNumber = function (number, ...accountsType) {
    let result = [];
    for (const accounts of accountsType) {
        for (const account of accounts) {
            if (number === account.number) {
                result.push(account);
            }
        }
    }
    result = result.pop();
    return result;
}

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
const deleteAccount = function (accounts, number) {
    for (let i = 0; i < accounts.length; i++) {
        if (accounts[i]["number"] === number) {
            array.splice(i, 1);
        } else {
            throw new error("삭제할 계좌의 계좌번호가 유효하지 않습니다.")
        }
    }
}

//계좌 생성
const addAccount = function (name, password, asset, accounts) {
    const account = new Account(name, undefined, password, asset);
    //오류 검출 함수
    accounts.push(account);
    return account;
}

//계좌 생성
const addMinusAccount = function (name, password, asset, debt, minusAccounts) {
    const account = new MinusAccount(name, undefined, password, asset, debt);
    // 오류 검출 함수
    minusAccounts.push(account);
    return account;
}

module.exports = {
    toString,
    totalDeposits,
    searchFromToBalance,
    searchByAll,
    searchByName,
    searchByNumber,
    changeName,
    deleteAccount,
    addAccount,
    addMinusAccount,
};


//입출금 계좌를 입출금 계좌대로
//마이너스 계좌는 마이너스 계좌대로
//다차원 배열을 이용해서 구현해봐라(선택).
//일단은 통합관리를 목표로 하라.