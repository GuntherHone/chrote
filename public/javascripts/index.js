let $status
let value

function saveValue(el) {
  value = el.textContent
}

function post(path, params, method) {
    method = method || "post"; // Set method to post by default if not specified.

    var form = document.createElement("form");
    form.setAttribute("method", method);
    form.setAttribute("action", path);

    for(var key in params) {
        if(params.hasOwnProperty(key)) {
            var hiddenField = document.createElement("input");
            hiddenField.setAttribute("type", "hidden");
            hiddenField.setAttribute("name", key);
            hiddenField.setAttribute("value", params[key]);

            form.appendChild(hiddenField);
        }
    }

    document.body.appendChild(form);
    form.submit();
}

function edit(param, el) {
    if (value !== el.textContent) {
        post('/action/update', { id: el.dataset.id, param, value: el.textContent })
    }
}

const displayStatus = (data, status) => {
    $status.stop(true,true)
    $status.text(data)
    $status.show()
    $status.fadeOut(500)
}

$(() => {
    $status = $('#status')
    $('#btnprevious').click(() => $.post('/action/previous', {}, displayStatus))
    $('#btnplay').click(() => $.post('/action/play', {}, displayStatus))
    $('#btnstop').click(() => $.post('/action/stop', {}, displayStatus))
    $('#btnnext').click(() => $.post('/action/next', {}, displayStatus))
})