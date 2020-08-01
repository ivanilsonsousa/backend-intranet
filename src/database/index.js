const mongoose = require("mongoose")

mongoose.Promise = global.Promise
mongoose.connect("mongodb://localhost/intranet", { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }).then(() => {
  console.log("Conectado ao MongoDB...")
}).catch((err) => {
  console.log("Deu erro..." + err)
})

module.exports = mongoose