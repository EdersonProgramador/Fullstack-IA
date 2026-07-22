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
    let response = await fetch(`https://api.github.com/users/${username}`)
    if (reponse.status === 200) {
        let data = await response.json()
        if (data.name) {
            nameField.innerText = data.name
            imageField.setAttribute('src', data.avatar_url)
            imageField.setAttribute('alt', data.name)
        }
    } else if(response.status === 404) {
        aviso.innerText = 'Usuário não encontrado'
        aviso.style.display = 'block'
    } else {
        throw new Error()
    }
} catch (error) {
    aviso.innerText = 'Deu erro na requisição. Tente novamente mais tarde.'
    aviso.style.display = 'block'
}
        botao.removeAttribute('disabled')
        botao.innerText = 'Meclique'
}

botao.addEventListener('click', () => {
    searchUser('bonieky')
})