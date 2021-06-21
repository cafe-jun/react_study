import React, { createContext, useReducer, useMemo } from "react"
import Table from "./Table"
import Form from "./Form"

export const CODE = {
  MINE: -7,
  NORMA: -1,
  QUESTION: -2,
  FLAG: -3,
  QUESTION_MINE: -4,
  FLAG_MINE: -5,
  CLICKED_MINE: -6,
  OPENED: 0, // 0 이상이면 opened
}

const plantMine = (row, cell, mine) => {
  // 0 부터 99까지 칸 부터

  const candidate = Array(row * cell)
    .fill()
    .map((arr, i) => {
      return i
    })
  const shuffle = []
  // 20 개의 숫자를 랜덤하개 부려놓고
  while (candidate.length > row * cell - mine) {
    const chosen = candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0]
    shuffle.push(chosen)
  }
  const data = []
  for (let i = 0; i < row; i++) {
    const rowData = []
    data.push(rowData)
    for (let j = 0; j < cell; j++) {
      12
      rowData.push(CODE.NORMA)
    }
  }
  for (let k = 0; k < shuffle.length; k++) {
    const ver = Math.floor(shuffle[k] / cell)
    const hor = shuffle[k] % cell
    data[ver][hor] = CODE.MINE
  }
  return data
}

const initialState = {
  tableData: [
    [-1, -1, -1, -1, -1, -1, -1],
    [-7, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1],
  ],
  timer: 0,
  result: "",
  halted: false,
}

export const START_GAME = "START_GAME"
export const OPEN_CELL = "OPEN_CELL"
export const CLICK_MINE = "CLICK_MINE"
export const FLAG_CELL = "FLAG_CELL"
export const QUESTION_CELL = "QUESTION_CELL"
export const NORMALIZE_CELL = "NORMALIZE_CELL"

export const TableContext = createContext({
  tableData: [], // 초기값
  dispatch: () => {},
  halted: false,
})

const reducer = (state, action) => {
  switch (action.type) {
    case START_GAME: {
      return {
        ...state,
        tableData: plantMine(action.row, action.cell, action.mine),
        halted: false,
      }
    }
    case OPEN_CELL: {
      // 불변성을 유지해야하기 때문에 번거로운 작업을 해야한다
      const tableData = [...state.tableData]
      tableData[action.row] = [...state.tableData[action.row]]
      tableData[action.row][action.cell] = CODE.OPENED
      // 주변 지뢰 개수 구하기
      let around = []
      // 내 위줄이 있으면
      if (tableData[action.row - 1]) {
        around.concat(
          tableData[action.row - 1][action.cell - 1],
          tableData[action.row - 1][action.cell],
          tableData[action.row - 1][action.cell + 1]
        )
      }
      around.concat(tableData[action.row][action.cell - 1], tableData[action.row][action.cell + 1])
      if (tableData[action.row + 1]) {
        around.concat(
          tableData[action.row + 1][action.cell - 1],
          tableData[action.row + 1][action.cell],
          tableData[action.row + 1][action.cell + 1]
        )
      }
      console.log(around)
      const count = around.filter((v) =>
        [CODE.MINE, CODE.FLAG_MINE, CODE.QUESTION_MINE].includes(v)
      )
      tableData[action.row][action.cell] = count
      return {
        ...state,
        tableData,
      }
    }
    case CLICK_MINE: {
      // 불변성을 유지해야하기 때문에 번거로운 작업을 해야한다
      const tableData = [...state.tableData]
      tableData[action.row] = [...state.tableData[action.row]]
      tableData[action.row][action.cell] = CODE.CLICKED_MINE
      return {
        ...state,
        tableData,
        halted: true,
      }
    }
    case FLAG_CELL: {
      const tableData = [...state.tableData]
      tableData[action.row] = [...state.tableData[action.row]]
      if (tableData[action.row][action.cell] === CODE.MINE) {
        tableData[action.row][action.cell] = CODE.FLAG_MINE
      } else {
        tableData[action.row][action.cell] = CODE.FLAG
      }
      return {
        ...state,
        tableData,
      }
    }
    case QUESTION_CELL: {
      const tableData = [...state.tableData]
      tableData[action.row] = [...state.tableData[action.row]]
      if (tableData[action.row][action.cell] === CODE.FLAG_MINE) {
        tableData[action.row][action.cell] = CODE.QUESTION_MINE
      } else {
        tableData[action.row][action.cell] = CODE.QUESTION
      }
      return {
        ...state,
        tableData,
      }
    }
    case NORMALIZE_CELL: {
      const tableData = [...state.tableData]
      tableData[action.row] = [...state.tableData[action.row]]
      if (tableData[action.row][action.cell] === CODE.QUESTION_MINE) {
        tableData[action.row][action.cell] = CODE.MINE
      } else {
        tableData[action.row][action.cell] = CODE.NORMA
      }
      return {
        ...state,
        tableData,
      }
    }
    default:
      return state
  }
}

const MineSearch = () => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const { tableData, halted } = state
  const value = useMemo(
    () => ({
      tableData,
      halted,
      dispatch,
    }),
    [tableData, halted]
  )

  return (
    <TableContext.Provider value={value}>
      <Form />
      <div>{state.timer}</div>
      <Table />
      <div>{state.result}</div>
    </TableContext.Provider>
  )
}

export default MineSearch
