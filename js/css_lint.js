//CSS LINTER

//CHECKS FOR DUPLICATE PROPERTIES
module.exports = {
    trim: function(css) {
        let newcss = css.replace(/[\r\n\t]|\s{2,}/gm, " ");
        return newcss;
    },
    check_duplicate_properties: function(css) {
        let cssString = module.exports.trim(css);

        //Split rules into arrays
        let rules = cssString.match(/(?<={).*?(?=})/g);
        //console.log("Rules are rules.\n", rules);

        //Split properties for each rule into arrays, purge property vaules.
        for (let i = 0; i<rules.length; i++) {
            let properties = rules[i].match(/(((?!;)[^\s+])*)(?=:)/g);
            properties = properties.filter((entry)=> {return entry.trim() != '';});
            //console.log("Properties", properties);

            properties.sort((a, b) => a.localeCompare(b));

            //console.log("Sorted properties", properties);

            let duplicates = [];

            for(let i = 0; i< properties.length; i++) {
                if (properties[i + 1] == properties[i]) {
                    duplicates.push(properties[i]);
                }
            }
            return duplicates;
        }
    }
}
