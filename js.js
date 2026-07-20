function darCerto() {
    let promessa = new Promise((resolve, reject) => {
        setTimeout(() => {
            reject("Deu errado!")
        }, 400)
    })
    return promessa
}


darCerto()
    .then((data) => {
            console.log('Opa, deu certo!')
            console.log(data)
    })
    .catch((reason) => {
        console.log(reason)
    })
    .finally(() => {
        console.log("Finalmente")
    })