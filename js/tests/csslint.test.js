let { check_duplicate_properties } = require('../css_lint.js');

describe('Checks duplicate properties', function() {
    test('Multiple rules, no new lines', function() {
        $css = `div.new {width: 30%; height: 43%; box-sizing: border-box; width: 300px;}  #cold {height: 100%; width: 30%; display: flex;}`;
        let result = check_duplicate_properties($css);

        expect(result).toContain('width');
        expect(result.length).toBe(1);
    });
    test('Multiple rules, new line', function() {
        $css = `div.new {
                    width: 30%;
                    height: 43%;
                    box-sizing: border-box;
                    width: 300px;
                }
                #cold {
                    height: 100%;
                    width: 30%;
                    display: flex;
                }`;
        let result = check_duplicate_properties($css);

        expect(result).toContain('width');
        expect(result.length).toBe(1);
    });
    test('No duplicates', function() {
        $css = `div.new {
                    width: 30%;
                    height: 43%;
                    box-sizing: border-box;
                }
                #cold {
                    height: 100%;
                    width: 30%;
                    display: flex;
                }`;
        let result = check_duplicate_properties($css);
        expect(result.length).toEqual(0);
    });
});
