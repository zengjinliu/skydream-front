import axios from 'axios'


/**
 * 封装导出Excal文件请求
 * @param url
 * @param data
 * @param fileName 文件名字
 * @returns {Promise}
 */
export  function exportExcel(url,fileName,options = {}) {
  return new Promise((resolve, reject) => {
    console.log(`${url} 请求数据，参数=>`, JSON.stringify(options))
    axios.defaults.headers['content-type'] = 'application/json;charset=UTF-8'
    axios({
      method: 'post',
      url: url, // 请求地址
      data: options, // 参数
      responseType: 'blob' // 表明返回服务器返回的数据类型
    }).then(
      response => {
        resolve(response.data)
        let blob = new Blob([response.data], {
          type: 'application/vnd.ms-excel'
        })
        console.log('----->blob' +blob)
        let name = fileName + '.xlsx';
        if (window.navigator.msSaveOrOpenBlob) {
          // console.log(2)
          navigator.msSaveBlob(blob, name)
        } else {
          // console.log(3)
          var link = document.createElement('a')
          link.href = window.URL.createObjectURL(blob)
          link.download = name
          link.click()
          //释放内存
          window.URL.revokeObjectURL(link.href)
        }
      },
      err => {
        reject(err)
      }
    )
  })
}
