var socket = io.connect('http://192.168.206.109:6677' ,{'forceNew': true});


socket.on('messages', function(data){
    console.log(data);
    render(data);
});

function render(data){
    var html = data.map(function(message,index){
        return (`
            <div class="message">
                <strong>${message.nickname}</strong>
                <p>${message.text}</p>
            </div>
            `);
    }).join(' ');
    var div_ms = document.getElementById('messages');
    div_ms.innerHTML= html;
    div_ms.scrollTop = div_ms.scrollHeight;
}

function addMessage(e){

    var message = {
        nickname : document.getElementById('nickname').value,
        text : document.getElementById('text').value
    };

    document.getElementById('nickname').style.display='none';
    socket.emit('add-message',message);


    return false;
}