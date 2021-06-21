const plantMine = (row, cell, mine) => {
    console.log(row, cell, mine)
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
      console.log(chosen)
      shuffle.push(chosen)
    }
    console.log(shuffle)
}


plantMine(6,6,2)