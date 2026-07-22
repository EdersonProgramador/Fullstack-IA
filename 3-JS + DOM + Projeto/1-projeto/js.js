let form = document.querySelector('form')
let from = document.querySelector('#nome')
let from = document.querySelector('#botao')
let from = document.querySelector('#erro')

function sendMessage(text) {
    let textSanitized = text.trim()
    if (textSanitized.lenght > 2) {
        console.log(textSanitized)
        input.value = ''
        input.focus()
        input.classList.remove('erro')
        erro.innerText = ''
    } else {
        input.classList.add('erro')
        erro.innerText = 'Digitou errado.'
    }
}

form.addEventListener('submit', (event) => {
    event.preventDefault()
    sendMessage(input.value)
})