const socket = io()

const clienttotal = document.getElementById('client-title')

const messagecontainer = document.getElementById('message-container')

const nameinput = document.getElementById('name-input')

const messageform = document.getElementById('message-form')

const messageinput = document.getElementById('message-input')


const massagetone = new Audio('/public-message-tone.mp3')

messageform.addEventListener('submit',(e)=>{
    e.preventDefault()
    sendmessage()

})






socket.on('clients-total',(data)=>{
    clienttotal.innerText = `total clients : ${data}`

})

function sendmessage(){
    console.log(messageinput.value);
    const data = {
        name:nameinput.value,
        message :messageinput.value,
        datetime : new Date()
    }
    socket.emit('message',data)
    addmessagetoui(true,data)
    messageinput.value = ''
}

//reciving
socket.on('chat-message',(data)=>{
    console.log(data);
    massagetone.play()
    addmessagetoui(false,data)
}
)

 function addmessagetoui(isownmessage, data){
    const element = `
     <li class="${isownmessage ? "message-right" : "message-left"}">
                <p class="message">
                    ${data.message}
                    <span>${data.name} </span>
                </p>
            </li>`

            messagecontainer.innerHTML += element
 }

 