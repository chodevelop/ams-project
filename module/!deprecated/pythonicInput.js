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
 * const result = input("input something: ");
 * console.log(result);
 */

const input = function (...parameters) {
    // JSON.stringify를 사용하여 매개변수를 문자열로 변환

    // 스크립트를 하나의 문자열로 작성하고 JSON.stringify로 문자열을 감쌈
    const script = `
    //적절한 문구를 넣어 동기를 구현
    `;

    // execSync 함수를 사용하여 자식 프로세스를 동기적으로 실행합니다.
    // node -e 옵션을 사용하여 Node.js가 문자열로 주어진 코드를 실행하게 합니다.
    // JSON.stringify로 script 문자열을 감싸서 안전하게 전달합니다.
}

module.exports = input;

// 테스트 코드
const result = input("input something: ");
console.log(result);
