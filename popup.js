let changeColor = document.getElementById('changeColor');

chrome.storage.sync.get('color', function (data) {
    changeColor.style.backgroundColor = data.color;
    changeColor.setAttribute('value', data.color);
});

let toggle = true;

changeColor.onclick = function (element) {
    let color = toggle ? element.target.value : '';

    chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
        toggle = !toggle
        chrome.tabs.executeScript(
            tabs[0].id,
            {
                code: 'document.body.style.backgroundColor = "' + color + '";'
            }
        );
    });
};