$(function () {
    var result = $('#result');

    var hubs_0 = new Hub('json', result, disableButtons);
    var hubs_1 = new Hub('msgpack', result, disableButtons);

    $('#script-test1').click(function () {
        console.log('click at 1');
        hubs_0.getData();
    });

    $('#script-test2').click(function () {
        console.log('click at 2');
        hubs_1.getData();
    });

    // clean close
    window.addEventListener("beforeunload", function (e) {
        hubs_0.dispose();
        hubs_1.dispose();
    });

    function disableButtons(value) {
        $('.S_ButtonFixedWidth').prop('disabled', value);
    }
});

class Hub {
    constructor(protocolName, resultElement, callbackDisableButtons) {
        var protocol = protocolName === "msgpack" ?
            new signalR.protocols.msgpack.MessagePackHubProtocol() :
            new signalR.JsonHubProtocol();

        this.DisableButtons = callbackDisableButtons;
        this.protocolName = protocolName;
        
        var x = new signalR.HubConnectionBuilder()
            .withUrl('/booksHub')
            .withHubProtocol(protocol)
            .build();;

        x.start()
            .then(function () {
                console.log('Started: ' + protocolName);
                x.invoke("Subscribe", protocolName);
            });

        x.on('RaiseResult', function (data) {

            console.log(JSON.stringify(data, null, 2));

            resultElement.html(JSON.stringify(data, null, 2));

            callbackDisableButtons(false);
        });

        x.onclose(function () {
            console.log('Hub is closed.');
        });

        this.Connection = x;
    }

    getData() {
        this.DisableButtons(true);

        this.Connection.invoke('GetBook', this.protocolName );
    }

    dispose() {
        this.Connection.stop();
    }
}