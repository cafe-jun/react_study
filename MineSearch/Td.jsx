import React, { useContext, useCallback } from "react"
import {
  CODE,
  TableContext,
  OPEN_CELL,
  CLICK_MINE,
  FLAG_CELL,
  QUESTION_CELL,
  NORMALIZE_CELL,
} from "./MineSearch"

const getTdStyle = (code) => {
  switch (code) {
    case CODE.NORMA:
    case CODE.MINE:
      return {
        background: "#444",
      }
    case CODE.OPENED:
    case CODE.CLICKED_MINE:
      return {
        background: "white",
      }
    case CODE.QUESTION_MINE:
    case CODE.QUESTION:
      return {
        background: "yello",
      }

    case CODE.FLAG_MINE:
    case CODE.FLAG:
      return {
        background: "red",
      }
    default:
      return {
        background: "white",
      }
  }
}

const getTdText = (code) => {
  switch (code) {
    case CODE.NORMA:
      return ""
    case CODE.MINE:
      return "X"
    case CODE.CLICKED_MINE:
      return "펑"
    case CODE.FLAG_MINE:
    case CODE.FLAG:
      return "!"
    case CODE.QUESTION:
    case CODE.QUESTION_MINE:
      return "?"
    default:
      return ""
  }
}

const Td = ({ rowIndex, cellIndex }) => {
  const { tableData, dispatch, halted } = useContext(TableContext)
  const onClickTd = useCallback(
    (e) => {
      if (halted) {
        return
      }
      switch (tableData[rowIndex][cellIndex]) {
        case CODE.NORMA:
          dispatch({ type: OPEN_CELL, row: rowIndex, cell: cellIndex })
          return
        case CODE.MINE:
          dispatch({ type: CLICK_MINE, row: rowIndex, cell: cellIndex })
          return
        case CODE.OPENED:
        case CODE.FLAG_MINE:
        case CODE.FLAG:
        case CODE.QUESTION:
        case CODE.QUESTION_MINE:
          return
      }

      dispatch({ type: OPEN_CELL, row: rowIndex, cell: cellIndex })
    },
    [tableData[rowIndex][cellIndex], halted]
  )

  const onRightClickTd = useCallback(
    (e) => {
      e.preventDefault() // 오른쪽 클릭시 기능 정지하기 위해
      if (halted) {
        return
      }
      switch (tableData[rowIndex][cellIndex]) {
        case CODE.NORMA:
        case CODE.MINE:
          dispatch({ type: FLAG_CELL, row: rowIndex, cell: cellIndex })
          return
        case CODE.QUESTION:
        case CODE.QUESTION_MINE:
          dispatch({ type: QUESTION_CELL, row: rowIndex, cell: cellIndex })
          return
        case CODE.QUESTION:
        case CODE.QUESTION_MINE:
          dispatch({ type: NORMALIZE_CELL, row: rowIndex, cell: cellIndex })
          return
        default:
          return
      }
    },
    [tableData[rowIndex][cellIndex], halted]
  )

  return (
    <td
      style={getTdStyle(tableData[rowIndex][cellIndex])}
      onClick={onClickTd}
      onContextMenu={onRightClickTd}
    >
      {getTdText(tableData[rowIndex][cellIndex])}
    </td>
  )
}

export default Td
