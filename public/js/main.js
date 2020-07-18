const $ = document.querySelector.bind(document)
const config = {
    headers: {
        'Content-Type': 'application/json'
    }
}

const body = $('.message_body')
const bot_name = 'TOB'

$('.form').addEventListener('submit', async e => {
    const input = $('.input')
    const val = input.value
    input.value = ''
    e.preventDefault()
    if (!val) {
        alert('Enter text')
        return
    } 
    appendMsg(val, 'right-msg', 'You')
    axios.post('/query', { data: val }, config)
        .then(res => {
            appendMsg(res.data, 'left-msg', bot_name)
        })
        .catch(err => {
            console.log(err)
        })
})

$('.reveal').addEventListener('click', () => {
    if (body.style.display == 'none' || !body.style.display) 
        body.style.display = 'block'
    else 
        body.style.display = 'none'
})

function appendMsg(text, cls, name) {
    const date = moment(Date.now())
    const div = document.createElement('div')
    div.classList.add(cls)
    div.classList.add('msg')
    div.innerHTML = `<div class="msg-bubble">
                        <div class="msg-info">
                            <div class="msg-info-name">${name}</div>
                            <div class="msg-info-time">${date.format('hh:mm A')}</div>
                        </div>
                        <div class="msg-text">${text}</div>
                    </div>`
    $('.messages').appendChild(div)
    $('.messages').scrollTop = $('.messages').scrollHeight
}