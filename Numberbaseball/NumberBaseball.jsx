import React, { useState,memo,createRef } from 'react';
import Try from './Try';

// 숫자 4개 중복되지 않개 출력
// this 를 안쓰는경우에는 밖으로 꺼내어 다룬곳에서도 사용할수 있도록 한다
// hook 으로 변환을 할때도 영향이 없어 따로 작업을 안해도 좋다 

function getNumbers() {
    const candidate = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const array = [];

    for (let i = 0; i < 4; i++) {
        // 최댓값을 포함하는 정수 난수 구하기
        // Math.random () * (max - min),min
        const chosen = candidate.splice(Math.floor(Math.random() * (9 - i)), 1)[0];

        array.push(chosen);
    }
    return array;
}

const NumberBaseball = memo(() => {
    // 화살표 함수는 bind this를 자동으로 해준다
    // 화살표 함수를 사용해자 construct 에서 bind this 를 안해주어도 된다

    // value 가 변하면 함수 컴포넌트는 통째로 실행히 되기 때문에 
    // getNumbers 가 실행이 된다 ㄷ
    const [result, setResult] = useState('');
    const [value, setValue] = useState('');
    const [answer, setAnswer] = useState(getNumbers());
    const [tries, setTries] = useState([]);

    const onSubmitForm = (e) => {
        e.preventDefault();
        if (value === answer.join('')) {
            setResult('홈련');
            setTries((prevTries) => {
                // 함수로 사용을 할때 
                return [...prevTries,{ try: value, result: '홈런!'}]
            });
            alert('게임을 다시 시작합니다')
            setValue('')
            setAnswer(getNumbers())
            setTries([])
        } else {
            const answerArray = value.split('').map((v) => parseInt(v));
            let strike = 0;
            let ball = 0;
            if (tries.length >= 9) {
                // 이전 값으로 현재 값을 적용할때는 
                // 함수형 setState() 을 사용한다 
                setResult(`10번 넘개 틀려서 실패! 답은 ${answer.join('')} 였습니다`);
                alert('게임을 다시 시작 입니다.');
                setValue('');
                setAnswer(getNumbers());
                setTries([]);
                inputRef.focus()
            } else {
                for (let i = 0; i < 4; i++) {
                    if (answerArray[i] === answer[i]) {
                        strike += 1;
                    } else if (answer.includes(answerArray[i])) {
                        ball += 1;
                    }
                }
                setTries((prevTries) => {
                    return [...prevTries, { try: value, result: `${strike} 스트라이크 ${ball} 볼 ` }];
                })
                setValue('');
            }
        }
    };

    const onChangeInput = (e) => {
        setValue(e.target.value);
    };
    inputRef = createRef();

    return (
        <>
            <h1>{result}</h1>
            <form onSubmit={onSubmitForm}>
                <input ref={this.onInputRef} maxLength={4} value={value} onChange={onChangeInput} />
            </form>
            <div> 시도 : {tries.length
            
            
            } (10번 안에 맞추기)</div>
            <ul>
                {/* 반복문의 가독성이나 성능을 위해 props 를 사용한다 */}
                {/* 
                    성능 최적화를 위해 key에 인덱스나 고유값이 아닌것을 사용하면 안된다 
                    인덱스로 할때 뭐가 변했는지 인지를 못하기 대문에 최적화 할때 인덱스를 사용하면 안된다                         
                    
                */}
                {tries.map((v, i) => {
                    return <Try key={`${i + 1}차 시도`} tryInfo={v} />;
                })}
            </ul>
        </>
    );
});

export default NumberBaseball;
