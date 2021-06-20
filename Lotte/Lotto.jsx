import React, { useEffect, useState, useRef, useMemo, useCallback } from 'react';
import Ball from './Ball';

function getWinNumbers() {
    console.log('getWinNumbers');
    const candidate = Array(45)
        .fill()
        .map((v, i) => i + 1);
    const shuffle = [];
    while (candidate.length > 0) {
        shuffle.push(candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0]);
    }
    const bonusNumber = shuffle[shuffle.length - 1];
    const winNumbers = shuffle.slice(0, 6).sort((p, c) => p - c);
    return [...winNumbers, bonusNumber];
}
// hook 에서 getWinNumbers 가 계속 실행을 하는것은
// rendering될때마다 전채 함수를 실행하기 때문에 getWinNumbers가
// 계속 실행이 된다
// 이때 재실행을 막으려면 useMemo를 사용한다
// useMemo : 복잡한 함수 결과값을 기억
// useRef : 일반 값을 기억
// useCallback : 함수 자체를 기억
// 함수 생성 자체가 비용이 너무 크다면
// useCallback으로 함수를 재실행하지 않게 한다

/**
 * 조건문 안에 hook을 절대 넣으면 안되고
 * 함수나 반복문 안에도 웬만하면 넣지 않는것이 좋다
 * if () {
 *  const [value,setValue] = useState('')
 * }
 * useEffect() 안에 useState를 사용하면 안됨
 */
const Lotto = () => {
    const [winBalls, setWinBalls] = useState([]);
    const lottoNumbers = useMemo(() => getWinNumbers(), [winBalls]);
    const [winNumbers, setWinNumbers] = useState(lottoNumbers);
    const [bonus, setBonus] = useState(null);
    const [redo, setRedo] = useState(false);
    const timeout = useRef([]);

    const runTimeout = () => {
        console.log('runTimeout');
        for (let i = 0; i < winNumbers.length - 1; i++) {
            timeout.current[i] = setTimeout(() => {
                setWinBalls((prevWinBalls) => {
                    return [...prevWinBalls, winNumbers[i]];
                });
            }, (i + 1) * 1000);
        }
        timeout.current[6] = setTimeout(() => {
            setBonus(winNumbers[6]);
            setRedo(true);
        }, 7000);
    };

    useEffect(() => {
        runTimeout();
        return () => {
            timeout.current.forEach((v) => {
                clearTimeout(v);
            });
        };
    }, [timeout.current]); // 빈 배열이면 componentDidMount 와 동일
    // 배열에 요소가 있으면 ComponentDidMount 와 componentDidUpdate 둘다 수행
    // useEffect를 여러번 쓸수 있고 componentDidUpdate에서 조건문에 의해 분기가 되어지는거랑 같다

    useEffect(() => {
        console.log('로또 숫자 생상');
    }, [winNumbers]);
    // 두번쩨 배열 인수에꼬 변화를 인지할 값을 넣어주어야 한다
    // 만약 componentDidUpdate 만 실행을 하고 싶다고 하면
    // 우회적으로 useRef 값을 넣어서 처리를 해줄수가 있다
    const mounted = useRef(false);
    useEffect(() => {
        if (!mounted.current) {
            mounted.current = true;
        } else {
            //ajax
        }
    }, ['바뀌는값']); // componentDidUpdate만 실행 componentDidMount X

    const onClickRedo = useCallback(() => {
        console.log('useCallback');
        console.log(winNumbers);
        setWinNumbers(getWinNumbers());
        setWinBalls([]);
        setBonus(null);
        timeout.current = [];
    }, [winNumbers]);
    return (
        <>
            <div>당첨 숫자</div>
            <div id="결과창">
                {winBalls.map((v) => (
                    <Ball key={v} number={v} />
                ))}
            </div>
            <div>보너스!</div>
            {/*
             *  자식 컴포넌트에 함수를 넘길때는 useCallback을 꼭 해주어야한다
             *  useCallback이 없으면 새로운 함수가 전달이 되는데 사실 함수는 변한것이 없는데
             *  부모가 자식한테 새로운 props 을 주기 때문에 새로 렌더링이 된다
             */}
            {bonus && <Ball number={bonus} />}
            <button onClick={redo ? onClickRedo : () => {}}>한 번 더 !</button>
        </>
    );
};

export default Lotto;
