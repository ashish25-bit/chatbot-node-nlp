const $ = document.querySelector.bind(document)
const config = {
    headers: {
        'Content-Type': 'application/json'
    }
}

const body = $('.message_body')
const bot_name = 'TOB'
const spans = '<span></span><span></span><span></span>'

window.onload = () => {
    const sentence = "Hello, I am TOB, a chatbot. I was made with love and care and I try to learn from my past experiences." 
    appendMsg(sentence, 'left-msg', bot_name)

    // appending questions
    const ques = ["What is node js?", "What is artificial intelligence?", "What is machine learning?"]
    for (let i=0; i<3; i++) {
        const div = document.createElement('div')
        div.classList.add('pre')
        div.innerText = ques[i]
        div.addEventListener('click', preDefinedQues)
        $('.messages').appendChild(div)
    }
}

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
    const loading = loadingElement()
    axios.post('/query', { data: val }, config)
        .then(res => {
            loading.remove()
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

function preDefinedQues(e) {
    const text = e.target.innerText
    appendMsg(text, 'right-msg', 'You')
    const loading = loadingElement()
    axios.post('/query', { data: text }, config)
        .then(res => {
            loading.remove()
            appendMsg(res.data, 'left-msg', bot_name)
        })
        .catch(err => {
            console.log(err)
        })
}

function loadingElement() {
    const loading = document.createElement('div')
    loading.classList.add('loading')
    loading.innerHTML = spans
    $('.messages').appendChild(loading)
    $('.messages').scrollTop = $('.messages').scrollHeight
    return loading
}