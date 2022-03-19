const fs = require('fs')
const path = require('path')
fs.readFile('history.csv','utf8', function(err, data) {
  const lines = data.split('\n')
  console.log(lines)
  let headers = []
  let jsonData = []
  lines.forEach((line, index) => {
    if (index === 0) {
      headers = line.split(',')
    } else {
      const pieceData = {}
      data = line.split(',')
      data.forEach((piece, index) => {
        const key = headers[index]
        pieceData[key] = piece
      })
      jsonData.push(pieceData)
    }
  })

  let text = ''
  jsonData.forEach(e => {
    const first_name = e['First name']
    const last_name = e['Last name']
    const user_id = e['User Reference']
    const birthday = e['DOB']
    const id_number = e['Document Number']
    const expired_at = e['Expiry']
    text +=`UPDATE id_scan_verify SET first_name = '${first_name}' ,last_name = '${last_name}',birthday='${birthday}',id_number='${id_number}',expired_at='${expired_at}' WHERE user_id = ${user_id} AND \`status\` = 4 AND first_name = '' AND last_name = '';\n`
    let file = path.resolve(path.dirname('./'), './file.txt')
    // 异步写入数据到文件
    fs.writeFile(file, text, { encoding: 'utf8' }, err => {})
  })
})