 $(function () {
    var content = $('#content');
    var status = $('#status');
    var input = $('#input');

    socket = io.connect('http://localhost:3000');
    socket.on('open',function(){
        status.text('welcome!');
    });

    socket.on('message',function(json){
        
        var p = '<p>'+json+'</p>';
        content.prepend(p);
    });

    input.keydown(function(e) {
        if (e.keyCode === 13) {
            var msg = $(this).val();
            if (!msg) return;
            socket.send(msg);
            $(this).val('');
            if (myName === false) {
                myName = msg;
            }
        }
    });
});