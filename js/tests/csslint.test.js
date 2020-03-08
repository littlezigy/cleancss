let { check_duplicate_properties, trim } = require('../css_lint.js');
describe('CSS Trimmer', function() {
    test('Trims multiline css', function() {
        css = `div.new {
                    width: 30%;
                    height: 43%;
                    box-sizing: border-box;
                }
                #cold {
                    height: 100%;
                    width: 30%;
                    display: flex;
                }`;
        let result = trim(css);
        expect(result).toEqual(expect.not.stringMatching(/\s{3,}/));
        expect(result).not.toContain('\n');

    });
});
describe('Checks duplicate properties', function() {
    test('Only one rule has duplicate properties', function() {
        $css = `div.new {width: 30%; height: 43%; box-sizing: border-box; width: 300px; height: 300px;}  #cold {height: 100%; width: 30%; display: flex;}`;
        let result = check_duplicate_properties($css);

        console.log("result\n\-------------------\n", result, Object.keys(result).length);
        expect(result['div.new']).toContain('width');
        expect(Object.keys(result).length).toBe(1);

    });
    test('Three rules have duplicate properties', function() {
        $css = `div.new {width: 30%; height: 43%; box-sizing: border-box; width: 300px;}  #cold {height: 100%; width: 30%; display: flex;} .class {width: 300px; margin: 1px solid grey; margin: 3rem solid pink} p, span {margin: 0; padding: 3rem; padding: 1px}`;
        let result = check_duplicate_properties($css);
        console.log("Result", result);
        expect(result['.class']).toContain('margin');
        expect(result['div.new']).toContain('width');
        expect(result['p, span']).toContain('padding');
        expect(Object.keys(result).length).toBe(3);
    });
    test('No duplicates', function() {
        $css = `div.new { width: 30%; height: 43%; box-sizing: border-box; } #cold { height: 100%; width: 30%; display: flex; }`;
        let result = check_duplicate_properties($css);
        expect(Object.keys(result).length).toEqual(0);
    });
});
