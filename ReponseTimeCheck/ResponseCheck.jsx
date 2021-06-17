import React,{ useState,useRef } from 'react';

// class 에서는 this 의 속성들을 할당해 주었는데
// hook 에서는 ref 를 사용해야합니다. 
// this. 의 속성을 ref 로 표현할수 있다 
// useRef 와 useState의 차이는 
// state 는 값이 바뀐 부분이 다시 렌더링이 되지만 
// useRef 값이 바뀌기는 하지만 화면에는 영향을 미치지 않게 하고 싶은때 

const ResponseCheck = () => {

    const [state,setState] = useState('waiting');
    const [message,setMessage] = useState('클릭해서 사용하세요')
    const [result,setResult] = useState([])


    const timeout = useRef(null);
    const startTime = useRef();
    const endTime = useRef();

    const onClickScreen = () => {
        switch (state) {
            case 'waiting': // 클릭 대기 
                setState('ready');
                setMessage('초록색이 되면 클릭하세요')
                timeout.current = setTimeout(() => {
                    setState('now')
                    setMessage('지금 클릭')
                    startTime.current = new Date()
                },Math.floor(Math.random() * 1000) + 2000) // 2~3ch 
                break;
            case 'now': // 반응 속도 체크
                endTime.current = new Date();
                setState('waiting')
                setMessage('클릭해서 시작하세요')
                setResult((prevResult) => {
                    return [...prevResult,endTime.current - startTime.current]
                })
                break;
            case 'ready': // 성급하게 클릭 하였을때 
                // setTimeout으로 web api 에서 대기중인 함수가 2~3초후 콜스택으로 
                // 넘어가버리면서 실행이 됩니다. 
                // callStack 으로 넘어 간다고 하더라도 job 을 취소할수 있다 
                clearTimeout(timeout.current)
                setState('waiting')
                setMessage('너무 성급하시군요 초록색이 된후에 클릭하세요')
                break;   
        }
    }
     /*
     * false ,undefined, null은 jsx 에서 태그 없음을 의미합니다.
     */
    const onReset = () => {
        setResult([])
    }
    const renderAverage = () => {
        // 자식을 pure 를 변한을 해야한다 
        return result.length === 0
                ? null :
                <>
                    <div>평균 시간 : {result.reduce((a,c) => a+c)/result.length}ms</div>
                    <button onClick={onReset}>리셋</button>
                </>
    }
    return (
        <>
            <div 
                id="screen" 
                className={state}    
                onClick={onClickScreen}
            >
                {message}
            </div>
            {/* 배열도 return이 가능하다 
                return [
                    <div key={}> </div>

                ]
                JSX에서 if 를 사용하려면 즉시 실행 함수를 이용한다 (for 도 가능)
                {() => {
                if(result.length === 0) {
                    return 0;
                } else {
                    <>
                        <div>평균 시간 : {result.reduce((a,c) => a+c)/result.length}ms</div>
                        <button onClick={onReset}>리셋</button>
                    </> 
                }
                (() => {
                    const array;
                    for () {

                    }
                    return array
                })


            }} */}
            {/** 렌더링하는 부분 분리  
             *   JSX 에서은 if 를 사용하지 못하지만 
             *   분리하여 함수를 선언해 사용하면 if 를 사용할수 이씅ㅁ
            */}
            {renderAverage()}
        </>
    )
    
}


export default ResponseCheck