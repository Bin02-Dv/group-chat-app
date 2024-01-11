$(document).ready(function() {
    // Get CSRF token from the cookie
    function getCookie(name) {
        var cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = jQuery.trim(cookies[i]);
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
    $('#send-button').on('click', function() {
        sendMessage();
    });

    $('#message-input').on('keyup', function(event) {
        if (event.key === 'Enter') {
            sendMessage();
        }
    });

    function sendMessage() {
        // Get CSRF token
        var csrftoken = getCookie('csrftoken');

        // Include CSRF token in the AJAX request header
        $.ajaxSetup({
            headers: { "X-CSRFToken": csrftoken }
        });
        var message = $('#message-input').val();
        if (message) {
            $.post('/add_message/', { message: message }, function(data) {
                if (data.success) {
                    $('#chat-messages').append('<div class="message">' + message + '</div>');
                    $('#message-input').val('');
                }
            });
        }
    }
});
