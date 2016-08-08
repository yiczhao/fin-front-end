/**
 * @author: pkeros.
 * @date: 2016/5/31.
 * @mail: pkeros@vip.qq.com
 * @see: https://www.github.com/pkeros/
 */
module.exports = function menu_adapter(_menus) {
    var types = {}, result = []

    //- todo 木桶分类
    _menus.forEach(o => {
        if (!types[o.code]) {
            types[o.code] = [].concat([o])

            return
        }

        types[o.code].push(o)
    })

    //- todo 生成特殊格式
    for (var _k in types) {
        let sub_menu = [], menus = {}

        types[_k].forEach(o => {
            if (!(o.level - 1)) {
                menus['name'] = o.name
                menus['icon'] = o.icon
                menus['id'] = o.id
                menus['code'] = o.code

                return
            }

            sub_menu.push({
                name: o.name,
                link: o.link,
                id: o.id,
                code: o.code
            })
        })
        menus['sub_menu'] = sub_menu

        result.push(menus)
    }

    return result
}
