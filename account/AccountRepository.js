const { Account } = require("./Account");
const { MinusAccount } = require("./MinusAccount");
/**
 * 계좌 관리 객체
 * 
 * 작성자: 조영우
 * 
 * 설명: 계좌 생성 시 파일 입출력을 통해 계좌를 저장 및 관리합니다.
 */

const toString = function (accounts) {
    let accountValue = '';

    // 데이터 추가
    for (const account of accounts) {
        accountValue += `${account.name}\t${account.number}\t${account.asset}\t`;
        if (account.debt) {
            accountValue += `${account.debt}\t`;
        } else {
            accountValue += `\t`;
        }
        accountValue += `\t${account.getBalance()}\n`;
    }

    return accountValue;
}

//모든 계좌의 총 금액 반환(총예수금)//미수정
const totalBalance = function (...accountsType) {
    const total = 0;
    for (const accounts of accountsType) {
        for (const account of accounts) {
            total += account.getBalance();
        }
    }
    return total;
}

//계좌 잔액 중에서 최대값 반환
const balanceGlobalMax = function (...accountsType) {
    if (accounts.length === 0) return null;
    let extremum = accounts[0].balance;
    for (const accounts of accountsType) {
        for (const account of accounts) {
            if (from <= account.balance && account.balance < to) {
                extremum = Math.max(extremum, balance);
            }
        }
    }
    return extremum;
}

//계좌 잔액 중에서 최소값 반환
const balanceGlobalMin = function (...accountsType) {
    if (accounts.length === 0) return null;
    let extremum = accounts[0].balance;
    for (const accounts of accountsType) {
        for (const account of accounts) {
            if (from <= account.balance && account.balance < to) {
                extremum = Math.min(extremum, balance);
            }
        }
    }
    return extremum;
}

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
    const result = [];
    for (const accounts of accountsType) {
        for (const account of accounts) {
            if (number === account.number) {
                result.push(account);
            }
        }
    }
    return result;
}

//이름을 받아 계좌의 예금주명 수정(계좌 정보를 수정, 개명 등으로 인해 이름을 바꿔야하는 경우)//미수정
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
const deleteAccount = function (number, ...accountsType) {
    const deletedArray = [];
    for(accounts of accountsType)
    {
        accounts = accounts.filter(account => number !== account.number);
        deletedArray.push(accounts);
    }
    return deletedArray;
}

//입출금 계좌 생성
const addAccount = function (name, password, asset, accounts) {
    const account = new Account(name, undefined, password, asset);
    //오류 검출 함수
    accounts.push(account);
    return account;
}

//마이너스 계좌 생성
const addMinusAccount = function (name, password, asset, debt, minusAccounts) {
    const account = new MinusAccount(name, undefined, password, asset, debt);
    // 오류 검출 함수
    minusAccounts.push(account);
    return account;
}

module.exports = {
    toString,
    searchFromToBalance,
    searchByAll,
    searchByName,
    searchByNumber,
    changeName,
    deleteAccount,
    addAccount,
    addMinusAccount,
    totalBalance,
    balanceGlobalMax,
    balanceGlobalMin,
};


//입출금 계좌를 입출금 계좌대로
//마이너스 계좌는 마이너스 계좌대로
//다차원 배열을 이용해서 구현해봐라(선택).
//일단은 통합관리를 목표로 하라.