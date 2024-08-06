const { createInterface } = require("readline");

/**
 * asyncInput
 * 
 * 작성자: 조영우
 * 
 * 설명: readline 과정을 파이썬과 유사한 await input([...parameters]) 형태로 전환합니다.
 * 
 * 예시: 
 * (async () => {
    const result = await input("input something: ");
    console.log(result);
    })();
 */

const input = (() => {
    const consoleInterface = createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    const readLineAsync = function (message) {
        return new Promise((resolve, reject) => {
            try {
                consoleInterface.question(message, (userInput) => {
                    if (userInput) {
                        resolve(userInput);
                    } else {
                        reject(new Error("No input received"));
                    }
                });
            } catch (error) {
                reject(error);
            }
        });
    }

    const endConsoleInterface = function () {
        return new Promise((resolve, reject) => {
            try {
                consoleInterface.close();
                resolve("Console Closed Successfully.");
            } catch (error) {
                reject(error);
            }
        });
    }

    const changeToPrimitiveIfOnlyHaveOneValue = function () {
        return new Promise((resolve, reject) => {
            try {
                if (results.length === 1) {
                    results = results.pop();
                }
                resolve("Console Closed Successfully.");
            } catch (error) {
                reject(error);
            }
        });
    }

    /* Main Algorithm */
    let results = [];
    return async (firstParameter = "", ...otherParameters) => {
        //입력값이 아예 없을 때와 하나만 있을 때
        let result = await readLineAsync(firstParameter);
        results.push(result);
        //입력한 스트링 하나 마다 1번의 입력
        for (const parameter of otherParameters) {
            result = await readLineAsync(parameter);
            results.push(result);
        }
        await endConsoleInterface();
        await changeToPrimitiveIfOnlyHaveOneValue();

        return results;
    }
})();

module.exports = input;


//===================================
(async () => {
    const test = await input("ㅁㄴㅇㄹㄴㅁ","ㅁㄴㅇㄹ");
    console.log(test);
})();