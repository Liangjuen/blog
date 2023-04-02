type Format = 'YYYY-MM-DD HH:mm:ss' | 'YYYY-MM-DD HH:mm' | 'YYYY-MM-DD'

export const format = (dateTime: string, format: Format = 'YYYY-MM-DD HH:mm:ss') => {
    let t = new Date(dateTime)
    let tf = function (i: number) { return (i < 10 ? '0' : '') + i }
    return format.replace(/YYYY|MM|DD|HH|mm|ss/g, (a) => {
        switch (a) {
            case 'YYYY':
                return tf(t.getFullYear())
            case 'MM':
                return tf(t.getMonth() + 1)
            case 'DD':
                return tf(t.getDate())
            case 'HH':
                return tf(t.getHours())
            case 'mm':
                return tf(t.getMinutes())
            case 'ss':
                return tf(t.getSeconds())
            default:
                return ''
        }
    })
}


export const getDateTime = (d:any = Date.now()) => {
    d = new Date(d)
    const YY = d.getFullYear()
    const MM = d.getMonth() + 1
    const DD = d.getDate()
    const HH = d.getHours()
    const mm = d.getMinutes()
    const ss = d.getSeconds()
    return YY + '-' + MM + '-' + DD + ' ' + HH + ':' + mm + ':' + ss
}
export const getDate = (d:any = Date.now()) => {
    d = new Date(d)
    const YY = d.getFullYear()
    const MM = d.getMonth() + 1
    const DD = d.getDate()
    return YY + '-' + MM + '-' + DD
}