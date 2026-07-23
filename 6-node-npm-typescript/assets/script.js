import { format } from 'date-fns'
const dateFns = require('date-fns')

let dataOriginal = new Date(2024, 1, 11)

let data1 = dateFns.format(dataOriginal, "yyyy-MM-dd")
let data2 = format(dataOriginal, "dd/MM/yyyy")