const { createInterface } = require("readline");
const { execSync } = require('child_process');

/**
 * pythonicInput(syncInput)
 * 
 * 작성자: 조영우
 * 
 * 설명: readline 과정을 파이썬과 유사한 동기 형태의 input([...parameters])으로 사용할 수 있게 전환합니다.
 * 
 * 예시: 
    const result = await input("input something: ");
    console.log(result);
 */

const input = function (...parameters) {

    const script = `
    const asyncInput = (() => {
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

    (async () => {
        const result = await asyncInput(${ parameters });
        console.log(result);
    })();`
    
    // execSync 함수를 사용하여 자식 프로세스를 동기적으로 실행합니다.
    // node -e 옵션을 사용하여 Node.js가 문자열로 주어진 코드를 실행하게 합니다.
    // script.replace(/\n/g, '')는 스크립트에서 모든 줄 바꿈 문자를 제거합니다.
    // 이는 자식 프로세스가 코드를 제대로 인식하고 실행할 수 있도록 하기 위함입니다.
    execSync(`node -e "${script.replace(/\n/g, '')}"`);
}



module.exports = input;


//===================================
const result = input();
console.log(result);