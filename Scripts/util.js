$(function () {

    $('#chatBody').hide();
    $('#loginBlock').show();
    // Ссылка на автоматически-сгенерированный прокси хаба
    var chat = $.connection.chatHub;


    chat.client.addMessage = function (name, message, id) {
        // Добавление сообщений на веб-страницу 
        var dt = new Date();
        var time = dt.getHours() + ":" + dt.getMinutes() + ":" + dt.getSeconds();
        var userId = $('#hdId').val();
        if(userId == id)
        {
            $('.chat-box').append('<li class="chat-right"><div class="chat-avatar"><img src="https://www.bootdey.com/img/Content/avatar/avatar3.png" alt="Retail Admin"><div class="chat-name">"' + htmlEncode(name) + '"</div></div><div class="chat-text">"' + htmlEncode(message) + '"</div><div class="chat-hour">"' + time+'"<span class="fa fa-check-circle"></span></div></li>');
        }
        else
        {
            $('.chat-box').append('<li class="chat-left"><div class="chat-avatar"><img src="https://www.bootdey.com/img/Content/avatar/avatar3.png" alt="Retail Admin"><div class="chat-name">"' + htmlEncode(name) + '"</div></div><div class="chat-text">"' + htmlEncode(message) + '"</div><div class="chat-hour">08:55 <span class="fa fa-check-circle"></span></div></li>');
        }
    };

    // Функция, вызываемая при подключении нового пользователя
    chat.client.onConnected = function (id, userName, allUsers) {

        $('#loginBlock').hide();
        $('#chatBody').show();
        // установка в скрытых полях имени и id текущего пользователя
        $('#hdId').val(id);
        $('#username').val(userName);
        $('#header').html('<h3>Добро пожаловать, ' + userName + '</h3>');
        $('#chatBody').hide();
        $('.container').show();

        // Добавление всех пользователей
        for (i = 0; i < allUsers.length; i++) {

            AddUser(allUsers[i].ConnectionId, allUsers[i].Name);
        }
    }

    // Добавляем нового пользователя
    chat.client.onNewUserConnected = function (id, name) {

        AddUser(id, name);
    }

    // Удаляем пользователя
    chat.client.onUserDisconnected = function (id, userName) {

        $('#' + id).remove();
    }

    // Открываем соединение
    $.connection.hub.start().done(function () {

        $('.sendmessage').click(function () {
            // Вызываем у хаба метод Send
            var userId = $('#hdId').val();
            chat.server.send($('#username').val(), $('#Message').val());
            $('#Message').val('');
        });

        // обработка логина
        $("#btnLogin").click(function () {

            var name = $("#txtUserName").val();
            if (name.length > 0) {
                chat.server.connect(name);
            }
            else {
                alert("Введите имя");
            }
        });
    });
});
// Кодирование тегов
function htmlEncode(value) {
    var encodedValue = $('<div />').text(value).html();
    return encodedValue;
}
//Добавление нового пользователя
function AddUser(id, name) {

/*    var userId = $('#hdId').val();*/
    //if (userId != id) {

        var Message = '<li class="person" id="' + id + '" data-chat="person1"><div class="user"><img src="https://www.bootdey.com/img/Content/avatar/avatar3.png" alt="Retail Admin"><span class="status online"></span></div><p class="name-time"><span class="name">' + name + '</span><span class="time">15/02/2019</span</p></li>'
        $(".users").append(Message);
    //}
}