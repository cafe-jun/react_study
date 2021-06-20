import React, { useState, useReducer, useCallback, useEffect } from 'react';
import Table from './Table';

const initialState = {
    winner: '',
    turn: 'O',
    tableData: [
        ['', '', ''],
        ['', '', ''],
        ['', '', ''],
    ],
    recentCell: [-1, -1],
};

export const SET_WINNER = 'SET_WINNER';
export const CLICK_CELL = 'CLICK_CELL';
export const CHANGE_TURN = 'CHANGE_TURN';
export const RESET_GAME = 'RESET_GAME';

const reducer = (state, action) => {
    // dispath(action) 이 실행될때마다 Reducer가 실행이 된다
    switch (action.type) {
        case SET_WINNER:
            // state.winner = action.winner ;; 이렇게 하면 안됨
            return {
                ...state,
                winner: action.winner,
            }; // 불변성 : 바뀌는 부분만 설정하는것
        case CLICK_CELL: {
            const tableData = [...state.tableData];
            tableData[action.row] = [...tableData[action.row]]; // immer 라는 라이브러리로 가독성을 높힐수 있다
            tableData[action.row][action.cell] = state.turn;
            return {
                ...state,
                tableData,
                recentCell: [action.row, action.cell], // 최근에 클릭한 셀
            };
        }
        case CHANGE_TURN: {
            return {
                ...state,
                turn: state.turn === 'O' ? 'X' : 'O',
            };
        }
        case RESET_GAME: {
            return {
                ...state,
                tableData: [
                    ['', '', ''],
                    ['', '', ''],
                    ['', '', ''],
                ],
                recentCell: [-1, -1],
            };
        }
    }
};

const TicTacToe = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const { tableData, turn, winner, recentCell } = state;
    // const [winner, setWinner] = useState('');
    // const [turn, setTurn] = useState('0');
    // const [tableData, setTableData] = useState([
    //     ['', '', ''],
    //     ['', '', ''],
    //     ['', '', ''],
    // ]);
    // 여기 있는 객체가 Action 이고
    // reducer가 어떻게 행동을 하는지 설명한다
    const onClickTable = useCallback(() => {
        dispatch({ type: SET_WINNER, winner: 'O' });
    }, []);
    // 셀이 변경이 되었을때
    //
    useEffect(() => {
        const [row, cell] = recentCell;
        if (row < 0) {
            return;
        }
        let win = false;
        if (tableData[row][0] === turn && tableData[row][1] === turn && tableData[row][2] === turn) {
            win = true;
        } else if (tableData[0][cell] === turn && tableData[1][cell] === turn && tableData[2][cell] === turn) {
            win = true;
        } else if (tableData[0][0] === turn && tableData[1][1] === turn && tableData[2][2] === turn) {
            win = true;
        } else if (tableData[2][0] === turn && tableData[1][1] === turn && tableData[0][2] === turn) {
            win = true;
        }
        if (win) {
            dispatch({ type: SET_WINNER, winner: turn });
            dispatch({ type: RESET_GAME });
        } else {
            // 무승부 검사
            let all = true; // 칸이 다 차있다라는 가정
            tableData.forEach((row) => {
                row.forEach((cell) => {
                    if (!cell) {
                        all = false;
                    }
                });
            });
            if (all) {
                dispatch({ type: RESET_GAME });
            } else {
                dispatch({ type: CHANGE_TURN });
            }
        }
        return () => {};
    }, [recentCell]);
    return (
        <>
            <Table onClick={onClickTable} tableData={state.tableData} dispatch={dispatch} />
            {state.winner && <div>{state.winner}님의 승리</div>}
        </>
    );
};

export default TicTacToe;
