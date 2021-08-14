// this file is just only for quick generate of a list of data
const fs = require("fs")
const path = "./"
const select = {}
const image = {}

const accessorize = fs.readdirSync(path).filter(e => {
  if (
    e !== ".DS_Store" &&
    e !== "index.js" &&
    !e.includes(".png") &&
    e !== "export.js"
  )
    return e
})

for (let i = 0; i < accessorize.length; i++) {
  select[accessorize[i]] = fs
    .readdirSync(path + `${accessorize[i]}`)
    .map(e => e.slice(0, -4))
}

// for (const e in select) {
//   for (const k of select[e]) {
//     console.log(k)
//     image[k.slice(0, -4)] = `require(${path}${e}/${k}).default`
//   }
// }

const nose = path + "nose.png"

console.log(select)
