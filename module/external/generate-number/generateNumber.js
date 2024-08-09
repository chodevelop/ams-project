/**
 * 계좌번호 자동 생성기
 * 
 * 작성자: 조영우
 * 
 * 설명: 계좌번호 자동 생성기, 함수형 프로그래밍으로 구현
 */
const generateNumberSegment = (length) => {
    if (length <= 0) {
        throw new Error("InterHypen의 갯수로 자연수가 아닌 값을 입력하셨습니다.");
    }
    return Array.from({ length }, () => Math.floor(Math.random() * 10)).join('');
};

const generateNumberModule = (...interHypens) => {
    const segments = interHypens.map(generateNumberSegment);
    return segments.join('-');
};

const generateNumberRegExp = (...interHypens) => {
    let regExp = "";
    for (const interHypen of interHypens) {
        regExp += `\\d{${interHypen}}-`
    }
    regExp = regExp.slice(0, -1);

    return new RegExp(regExp);
}

module.exports = {
    generateNumberModule,
    generateNumberRegExp
};