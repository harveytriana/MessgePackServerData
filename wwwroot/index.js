$(function () {

    var hubConnection = null;

    var hubUri = '/booksHub';

    var result = $('#result');

    $('#script-test').click(function () {
        disableButtons(true);
        getBook();
    });

    function getBook() {
        if (hubConnection == null) {
            hubConnection = new signalR.HubConnectionBuilder()
                .withUrl(hubUri)
                .withHubProtocol(new signalR.protocols.msgpack.MessagePackHubProtocol())
                .build();

            hubConnection.start()
                .then(function () {
                    hubConnection.invoke('GetBook');
                });

            hubConnection.on('RaiseResult', function (data) {
                result.html(JSON.stringify(data, null, 2));
                disableButtons(false);
            });

            hubConnection.onclose(function () {
                console.log('Hub is closed.');
            });

        } else {
            hubConnection.invoke('GetBook');
        }
    }

    // clean close
    window.addEventListener("beforeunload", function (e) {
        if (hubConnection != null) hubConnection.stop();
    });

    function disableButtons(value) {
        $('.S_ButtonFixedWidth').prop('disabled', value);
    }
});