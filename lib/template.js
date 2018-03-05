/**
 * Template string rendering template
*/
class Template {
  constructor() {
  }
  /**
   * 使用模板渲染数据模型，数据使用双大括号"{{}}"作为标识
   * use string template to render data model, with a symbol "{{}}"
   * @param {String} tpl - string template
   * @param {Object} view - data-model
   * @return {String} - return the rendering template with binding data model
   */
  render(tpl, view) {
    var outerReg = /{{#\s*(.*?)\s*}}((?:.|\s)*){{\/\s*\1\s*}}/
    var innerReg = /{{\s*((?:.|\s)*?)\s*}}/
    return tpl.replace(outerReg, function (match, $1, $2) {
      if (view[$1]) {
        
        if (Array.isArray(view[$1])) {
          return view[$1].map(function (item) {
            
            return $2.trim().replace(innerReg, function (match, $1) {
              if ($1.trim() === '.') {
                return item
              }
              return item[$1] || ''
            })
          }).join('')
        }
        return $2.trim().replace(innerReg, function (match, $1) {
          return view[$1] || ''
        })
      } else {
        return ''
      }
    }).trim()
      .replace(innerReg, function (match, $1) {
        return $1.split('.').reduce((result, item) => {
          return result[item]
        }, view) || ''
      })
  }
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = Template
}

