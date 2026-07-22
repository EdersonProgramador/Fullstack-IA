let botao = document.querySelector('button')
let aviso = document.querySelector('.aviso')
let nameField = document.querySelector('#name')
let imageFild = document.querySelector('#image')

async function searchUser(username) {
    botao.innerText = 'Carregando...'
    botao.setAttribute('disabled', 'disabled')
    aviso.innerText = ''
    aviso.style.display = 'none'
    nameField.innerText = ''
    imageField.removeAttribute('src')
    imageField.removeAttribute('alt')

    try {
        botao.innerText = 'Carregando...'
        botao.setAtribute('disabled', 'disabled')
        let response = await fetch(`https://api.github.com/users/${username}`)
        let data = await response.json()
        if (data.name) {
            document.querySelector('#name').innerText = data.name
            document.querySelector('#imagem').setAttribute('src', data.avatar_url)
            document.querySelector('#imagem').setAtribute('alt', data.name)
        }
        botao.removeAttribute('disabled')
        botao.innerText = 'Meclique'
    } catch (error) {
        aviso.innerText = 'Deu erro na requisição'
        aviso.style.display = 'block'
    }
}

botao.addEventListener('click', () => {
    searchUser('bonieky')
})