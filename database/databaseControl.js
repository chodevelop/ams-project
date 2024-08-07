const fs = require("fs");
const path = require("path");
const { Account } = require("../account/Account");
const { MinusAccount } = require("../account/MinusAccount");
const databasePath = path.resolve(__dirname, "ams.json");

const databaseInitialize = function () {
    try {
        fs.readFileSync(databasePath, 'utf8');
    } catch {
        const initJSON = { Account: [], MinusAccount: [] };
        fs.writeFileSync(databasePath, JSON.stringify(initJSON), 'utf8');
    }
    const result = JSON.parse(fs.readFileSync(databasePath, 'utf8'));
    let accounts = result.Account;
    let minusAccounts = result.MinusAccount;
    accounts = accounts.map(account => new Account(account.name, account.number, account.password, account.asset));
    minusAccounts = minusAccounts.map(account => new MinusAccount(account.name, account.number, account.password, account.asset, account.debt));

    return { accounts, minusAccounts };
}

const databaseTerminate = function (accounts, minusAccounts) {
    const initJSON = { Account: accounts, MinusAccount: minusAccounts };
    fs.writeFileSync(databasePath, JSON.stringify(initJSON), 'utf8');
}


module.exports = {
    databaseInitialize,
    databaseTerminate,
}