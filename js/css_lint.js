//CSS LINTER

//CHECKS FOR DUPLICATE PROPERTIES
module.exports = {
    trim: function(css) {
        let newcss = css.replace(/[\r\n\t]|\s{2,}/gm, " ");
        return newcss;
    },
    check_duplicate_properties: function(css) {
        //Split rules into arrays
        let rules = css.match(/(?<={).*?(?=})/g);
        let rulenames = css.match(/(((?!}).)*)?(?={)/g);
        rulenames = rulenames.filter((entry)=> {return entry.trim() != '';});

        //console.log("Elements", rulenames);
        //console.log("Rules are rules.\n", rules);

        let duplicates = {};

        //Split properties for each rule into arrays, purge property vaules.
        for (let i = 0; i<rules.length; i++) {
            //console.log("Run", i, "of", rules.length, "for rules:", rules[i])k
            rulenames[i] = rulenames[i].trim();
            let properties = rules[i].match(/(((?!;)[^\s+])*)(?=:)/g);
            properties = properties.filter((entry)=> {return entry.trim() != '';});
            //console.log("Properties", properties);

            properties.sort((a, b) => a.localeCompare(b));

            //console.log("Sorted properties", properties);
            let tempArr = [];


            for(let j = 0; j< properties.length; j++) {
                if (properties[j + 1] == properties[j]) {
                    tempArr.push(properties[j]);
                }
            }
            if(tempArr.length) duplicates[rulenames[i]] = tempArr;
        }
        //console.log("DUPLICATES", duplicates);
        return duplicates;
    }
}
