import React, { Component, useState, useEffect, useRef, memo } from 'react';

// 두번째 인수 배열에 넣는 값
// (예제 imgCoord) 들이 바뀔때
// useEffect 가 발생합니다.
// 즉 imgCoord 가 바뀔때 마다 렌더링이 되기 때문에 ComponentDidUpdated
// componentDidMount,componentWillUnMount 와 다르다
// 코드에서는 setInterval 과 clareInterval 을 반복적으로 실행하는것이다
// 두번째 인수가 없는 경우에는 ComponentDidMount 처럼 처음 렌더링에만 관여를 하고
// 이후 렌더링에 대해서는 렌더링을 하지 않는다

// useEffect를 여러번 쓰는 경우도 있다
// 두번째 배열값에는 값을 다시 실행을 해야할것만 입력해야합니다.
//
const rspCoords = {
    바위: '0',
    가위: '-142px',
    보: '-284px',
};
const scores = {
    가위: 1,
    바위: 0,
    보: -1,
};

const computerChoice = (imagCoord) => {
    return Object.entries(rspCoords).find((v) => {
        return v[1] === imagCoord;
    })[0];
};

const RSP = memo(() => {
    const [result, setResult] = useState('');
    const [imgCoord, setImgCoord] = useState(rspCoords.바위);
    const [score, setScore] = useState(0);
    const interval = useRef();

    useEffect(() => {
        interval.current = setInterval(changeHand, 1000);
        return () => {
            clearInterval(interval.current);
        };
    }, [imgCoord]);

    const changeHand = () => {
        switch (imgCoord) {
            case rspCoords.바위:
                setImgCoord(rspCoords.가위);
                break;
            case rspCoords.가위:
                setImgCoord(rspCoords.보);
                break;
            case rspCoords.보:
                setImgCoord(rspCoords.바위);
                break;
        }
    };
    // choice onClickBtn에서 파라미터를 넣고자 할때 : 고차 함수
    // React 에서 자주 나오는 패턴
    const onClickBtn = (choice) => () => {
        const { imgCoord } = this.state;
        clearInterval(this.interval);
        const myScore = scores[choice];
        const cpuScore = scores[computerChoice(imgCoord)];
        const diff = myScore - cpuScore;

        if (diff === 0) {
            setResult('비겼습니다');
        } else if ([-1, 2].includes(diff)) {
            setScore((prevState) => prevState + 1);
            setResult('이겼습니다');
        } else {
            setScore((prevScore) => prevScore + 1);
            setResult('졌습니다.');
        }
        interval.current = setTimeout(changeHand, 2000);
    };
    return (
        <>
            <div id="compute" style={{ background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCoord} 0` }} />
            <div>
                <button id="rock" className="btn" onClick={onClickBtn('바위')}>
                    바위
                </button>
                <button id="scissor" className="btn" onClick={onClickBtn('가위')}>
                    가위
                </button>
                <button id="paper" className="btn" onClick={onClickBtn('보')}>
                    보
                </button>
            </div>
            <div>{result}</div>
            <div>현재 {score}점</div>
        </>
    );
});
export default RSP;
