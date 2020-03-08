console.log(`Hello! Would you like to contribute to this project? Go to https://github.com/littlezigy/cleancss and submit an issue or make a PR.`);
let csslint= module.exports;

let cssinput = document.querySelector('textarea#css');

//Remap tabkey in textarea
cssinput.addEventListener('keydown', function(e) {
    if(e.keyCode === 9) {
        let start = this.selectionStart;
        let end = this.selectionEnd;

        let target = e.target
        let value = target.value

        target.value = value.substring(0, start) + "    " + value.substring(end);
        
        this.selectionStart = this.selectionEnd = start + 4;
        e.preventDefault();
    }
}, false);
let cleanupcss = function() {
    let originalcss = cssinput.value;
    let css = csslint.trim(originalcss);

    let duplicates = csslint.check_duplicate_properties(css);

    //Printing Results
    let resultsdiv = document.querySelector('div#results');
    resultsdiv.removeAttribute('style');

    resultsdiv.appendChild(printduplicates(duplicates));
}

let printduplicates = function(duplicates) {
    let div = document.createElement('div');
    div.id = 'duplicates';
    for(element in duplicates) {
        //console.log('ELEMENT', element);
        let item = document.createElement('p');
        item.innerHTML = `<span class = 'tag'>${element}</span> has ${duplicates[element].length} duplicate ${(duplicates[element].length>1) ? 'properties': 'property'}`;
        let list = document.createElement('ul');
        for(dup in duplicates[element]) {
            let p = document.createElement('li');
            p.innerHTML = `<span class = 'property'>${duplicates[element][dup]}</span> is defined multiple times.`;
            list.appendChild(p);
        }
        item.appendChild(list);
        div.appendChild(item);
    }

    return div;
}
