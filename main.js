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

    //Check for duplicates
    let duplicates = csslint.check_duplicate_properties(css);
    console.log("duplicate", duplicates);
}
