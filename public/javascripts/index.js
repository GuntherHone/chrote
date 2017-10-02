let $status
let value

function saveValue(el) {
  value = el.textContent
}

function edit(param, el) {
    if (value !== el.textContent) {
        $.post('/action/update',{ id: el.dataset.id, param, value: el.textContent }, displayStatus)
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