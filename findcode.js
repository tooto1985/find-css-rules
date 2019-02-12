var fs = require('fs')
var path = require('path')
// ===========
var findPath = 'D:\\Tommy\\SourceCode\\OBWeb\\OBWeb\\css'
var findType = '.css'
var findRegExp = /.+(?=\{)/g
var ary = []
var rules = {}
// ===========
var walkSync = function (dir, list, type) {
  var files = fs.readdirSync(dir)
  list = list || []
  files.forEach(function (file) {
    if (fs.statSync(dir + '\\' + file).isDirectory()) {
      walkSync(dir + '\\' + file, list, type)
    } else {
      if (path.extname(file) === type) {
        list.push(dir + '\\' + file)
      }
    }
  })
  return list
}
// ===========
var recursion = function (ary, callback) {
  ary.forEach(callback)
}
// ===========
var searchCode = function (file, regexp, rules) {
  var data = fs.readFileSync(file).toString()
  data.match(regexp).map(function (item) {
    return item.split(' ')[0].split(':')[0]
  }).filter(function (item) {
    return true /* /^(\.|#)/.test(item) */
  }).forEach(function (item) {
    rules[item.trim()] = 1
  })
}
// ===========
walkSync(findPath, ary, findType)
// ===========
recursion(ary, function (item) {
  searchCode(item, findRegExp, rules)
})
// ===========
console.log(Object.keys(rules))
// ===========
fs.writeFileSync('./output.txt', Object.keys(rules).sort(function (a, b) {
  if (a > b) return 1
  return -1
}).join('\n'))
