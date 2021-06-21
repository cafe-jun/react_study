import React, { useCallback,useEffect,useRef,memo } from 'react';
import { CLICK_CELL, CHANGE_TURN } from './TicTacToe';

const Td = memo(({ rowData ,rowIndex, cellIndex, dispatch, cellData }) => {
    console.log('td rendering')

    const ref = useRef([])

    useEffect(() => {
        console.log(rowData === ref.current[0],cellData === ref.current[1],dispatch === ref.current[2],cellData === ref.current[3])
        ref.current = [rowData,dispatch,cellData]
    },[rowData,cellData,dispatch,cellData])

    const onClickTd = useCallback(() => {
        console.log(rowIndex, cellIndex);
        // 바뀔 데이터들을 넣어 주면 된다 

        //칸을 클릭한다음 턴을 넘긴다
        //이미 셀 데이터가ㅣ 있으면
        if (cellData) {
            return;
        }
        // dispatch 에서 state 는 비동기적으로 변경이 된다
        // 비동기인 state를 처리하려면 useEffect를 사용해야 한다
        dispatch({ type: CLICK_CELL, row: rowIndex, cell: cellIndex });
        // 비동기 이기 때문에 턴이 먼저 실행이 되어버림 dispatch({ type: CHANGE_TURN });
    }, [cellData]); // 셀 데이터는 변경이 되니까 배열 안에 넣어준다
    return <td onClick={onClickTd}>{cellData}</td>;
});

export default Td;
