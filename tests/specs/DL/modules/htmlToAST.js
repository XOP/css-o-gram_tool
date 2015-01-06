describe('DL.htmlToAST()', function () {

    describe('correct define', function () {
        it('module defined', function () {
            expect(DL.htmlToAST).toBeDefined();
        });

        it('module is Object', function () {
            expect(DL.htmlToAST).toEqual(jasmine.any(Object));
        });

        describe('parts', function () {
            var htmlToAST = DL.htmlToAST;

            it('parse is define', function () {
                expect(htmlToAST.parse).toBeDefined();
            });

            it('parse is function', function () {
                expect(htmlToAST.parse).toEqual(jasmine.any(Function));
            });


            it('nodes is define', function () {
                expect(htmlToAST.nodes).toBeDefined();
            });

            it('nodes is object', function () {
                expect(htmlToAST.nodes).toEqual(jasmine.any(Object));
            });


            describe('nodes', function () {
                var htmlToASTNodes = htmlToAST.nodes;

                it('Fragment is define', function () {
                    expect(htmlToASTNodes.Fragment).toBeDefined();
                });

                it('Fragment is constructor', function () {
                    expect(htmlToASTNodes.Fragment).toEqual(jasmine.any(Function));
                });


                it('Tag is define', function () {
                    expect(htmlToASTNodes.Tag).toBeDefined();
                });

                it('Tag is constructor', function () {
                    expect(htmlToASTNodes.Tag).toEqual(jasmine.any(Function));
                });


                it('Text is define', function () {
                    expect(htmlToASTNodes.Text).toBeDefined();
                });

                it('Text is constructor', function () {
                    expect(htmlToASTNodes.Text).toEqual(jasmine.any(Function));
                });


                it('Comment is define', function () {
                    expect(htmlToASTNodes.Comment).toBeDefined();
                });

                it('Comment is constructor', function () {
                    expect(htmlToASTNodes.Comment).toEqual(jasmine.any(Function));
                });

            });


            it('helpers is define', function () {
                expect(htmlToAST.helpers).toBeDefined();
            });

            it('helpers is object', function () {
                expect(htmlToAST.helpers).toEqual(jasmine.any(Object));
            });


            describe('helpers', function () {
                var helpers = htmlToAST.helpers;

                it('appendChild is defined', function () {
                    expect(helpers.appendChild).toBeDefined();
                });

                it('appendChild is function', function () {
                    expect(helpers.appendChild).toBeDefined();
                });

            });

        });


    });

    var htmlToAST = DL.htmlToAST,
        htmlToASTNodes = htmlToAST.nodes,
        htmlToASTHelpers = htmlToAST.helpers;

    describe('nodes instances construct and api', function () {

        describe('Fragment', function () {

            it('construct', function () {
                var fragment = new htmlToASTNodes.Fragment();
                expect(fragment).toEqual(jasmine.any(Object));
            });

            var fragment = new htmlToASTNodes.Fragment();

            it('type is define', function () {
                expect(fragment.type).toBeDefined();
            });

            it('type is \'fragment\'', function () {
                expect(fragment.type).toBe('fragment');
            });

            it('childNode is define', function () {
                expect(fragment.childNodes).toBeDefined();
            });

            it('childNodes is array', function () {
                expect(fragment.childNodes).toEqual(jasmine.any(Array));
            });

        });


        describe('Tag', function () {

            it('construct', function () {
                var tag = new htmlToASTNodes.Tag('div', {'class': 'block'});
                expect(tag).toEqual(jasmine.any(Object));
            });

            var tag = new htmlToASTNodes.Tag('div', {'class': 'block'});

            it('type is define', function () {
                expect(tag.type).toBeDefined();
            });

            it('type is \'tag\'', function () {
                expect(tag.type).toBe('tag');
            });

            it('childNode is define', function () {
                expect(tag.childNodes).toBeDefined();
            });

            it('childNodes is array', function () {
                expect(tag.childNodes).toEqual(jasmine.any(Array));
            });

            it('name is define', function () {
                expect(tag.name).toBeDefined();
            });

            it('name is \'div\'', function () {
                expect(tag.name).toBe('div');
            });

            it('attributes is define', function () {
                expect(tag.attributes).toBeDefined();
            });

            it('attributes is Object', function () {
                expect(tag.attributes).toEqual(jasmine.any(Object));
            });
        });


        describe('Text', function () {

            it('construct', function () {
                var text = new htmlToASTNodes.Text('text content');
                expect(text).toEqual(jasmine.any(Object));
            });

            var text = new htmlToASTNodes.Text('text content');

            it('type is define', function () {
                expect(text.type).toBeDefined();
            });

            it('type is \'text\'', function () {
                expect(text.type).toBe('text');
            });

            it('text is define', function () {
                expect(text.text).toBeDefined();
            });

            it('text is \'text content\'', function () {
                expect(text.text).toBe('text content');
            });

        });


        describe('Comment', function () {

            it('construct', function () {
                var comment = new htmlToASTNodes.Comment('comment text');
                expect(comment).toEqual(jasmine.any(Object));
            });

            var comment = new htmlToASTNodes.Comment('comment text');

            it('type is define', function () {
                expect(comment.type).toBeDefined();
            });

            it('type is \'comment\'', function () {
                expect(comment.type).toBe('comment');
            });

            it('text is define', function () {
                expect(comment.text).toBeDefined();
            });

            it('text is \'comment text\'', function () {
                expect(comment.text).toBe('comment text');
            });

        });

    });

    describe('helpers api', function () {
        it('appendChild() div into fragment', function () {
            var fragment = new htmlToASTNodes.Fragment(),
                div = new htmlToASTNodes.Tag('div', {'class': 'block'});
            htmlToASTHelpers.appendChild(fragment, div);
            expect(fragment.childNodes[0]).toBe(div);
        });
    });




    function createDefaultSpan(contentItem) {
        var createTagArguments = ['span', null];
        DL.cycle(arguments, function (contentItem) {
            createTagArguments.push(contentItem);
        });
        return DTesting.utils.createTag.apply(DTesting.utils, createTagArguments);
    }
    function defaultSpanTests(span) {
        it('div is parsed', function () {
            expect(span).toBeDefined();
        });

        it('div is parsed as Tag', function () {
            expect(span instanceof htmlToASTNodes.Tag).toBeTruthy();
        });

        it('correct name', function () {
            expect(span.name).toBe('div');
        });

        it('attributes is empty', function () {
            expect(DL.getObjectLength(span.attributes)).toBe(0);
        });
    }

    function createDefaultDiv(contentItem) {
        var createTagArguments = ['div', {'class': 'block', 'data-foo': 'bar'}];
        DL.cycle(arguments, function (contentItem) {
            createTagArguments.push(contentItem);
        });
        return DTesting.utils.createTag.apply(DTesting.utils, createTagArguments);
    }
    function defaultDivTests (div) {
        it ('div is parsed', function () {
            expect(div).toBeDefined();
        });

        it('div is parsed as Tag', function () {
            expect(div instanceof htmlToASTNodes.Tag).toBeTruthy();
        });

        it('correct name', function () {
            expect(div.name).toBe('div');
        });

        describe('correct attributes', function () {
            var attributes = div.attributes;
            it('class is block', function () {
                expect(attributes['class']).toBe('block');
            });
            it('data-foo is bar', function () {
                expect(attributes['data-foo']).toBe('bar');
            });
        });

    }



    describe('parse', function () {

        describe('private export', function () {
            var states,
                htmlToASTExport;

            describe('common exports check', function () {
                htmlToASTExport = DTesting.exports.DL.htmlToAST;

                it('htmlToAST namespace was exported', function () {
                    expect(htmlToASTExport).toBeDefined();
                });

                states = htmlToASTExport.states;

                it('states was exported', function () {
                    expect(states).toBeDefined();
                });
            });

            var ContextOfParse;
            describe('ContextOfParse', function () {
                ContextOfParse = htmlToASTExport.ContextOfParse;

                it('was exported', function () {
                    expect(ContextOfParse).toBeDefined();
                });

                it('is constructor', function () {
                    var contextOfParse = new ContextOfParse();
                    expect(contextOfParse).toEqual(jasmine.any(Object));
                });

                describe('has correct start properties', function () {
                    var contextOfParse = new ContextOfParse();

                    it('state', function () {
                        expect(contextOfParse.state).toBe(states.TEXT);
                    });

                    it('buffer', function () {
                        expect(contextOfParse.buffer).toBe('');
                    });

                    it('textBuffer', function () {
                        expect(contextOfParse.textBuffer).toBe('');
                    });

                    it('tagName', function () {
                        expect(contextOfParse.tagName).toBe('');
                    });

                    it('attributeName', function () {
                        expect(contextOfParse.attributeName).toBe('');
                    });

                    it('attributeValueSeparator', function () {
                        expect(contextOfParse.attributeValueSeparator).toBe('');
                    });

                    it('attributeValue', function () {
                        expect(contextOfParse.attributeValue).toBe('');
                    });

                    it('attributes', function () {
                        expect(contextOfParse.attributes).toBeNull();
                    });

                    it('result', function () {
                        expect(contextOfParse.result instanceof htmlToASTNodes.Fragment).toBeTruthy();
                    });

                    it('treeStack', function () {
                        var treeStack = contextOfParse.treeStack;
                        expect(treeStack).toEqual(jasmine.any(Array));
                        expect(treeStack.length).toBe(1);
                        expect(treeStack[0] instanceof htmlToASTNodes.Fragment).toBeTruthy();
                    });

                    it('isXML mode off', function () {
                        expect(contextOfParse.isXMLMode).toBe(false);
                    });

                    describe('use settings', function () {
                        var contextOfParse = new ContextOfParse({
                                isXML: true
                            });

                        it('isXML mode on', function () {
                            expect(contextOfParse.isXMLMode).toBe(true);
                        });
                    });

                });

                describe('destructor', function () {
                    var contextOfParse = new ContextOfParse();

                    it('has', function () {
                        expect(contextOfParse.destructor).toBeDefined();
                    });

                    it('work', function () {
                        contextOfParse.destructor();
                        expect(true).toBeTruthy();
                    });

                    describe('properties is clean', function () {
                        it('treeStack', function () {
                            expect(contextOfParse.treeStack).toBeNull();
                        });
                        it('result', function () {
                            expect(contextOfParse.result).toBeNull();
                        });
                        it('state', function () {
                            expect(contextOfParse.state).toBeNull();
                        });
                        it('buffer', function () {
                            expect(contextOfParse.buffer).toBeNull();
                        });
                        it('textBuffer', function () {
                            expect(contextOfParse.textBuffer).toBeNull();
                        });
                        it('tagName', function () {
                            expect(contextOfParse.tagName).toBeNull();
                        });
                        it('attributeName', function () {
                            expect(contextOfParse.attributeName).toBeNull();
                        });
                        it('attributeValue', function () {
                            expect(contextOfParse.attributeValue).toBeNull();
                        });
                        it('attributeValueSeparator', function () {
                            expect(contextOfParse.attributeValueSeparator).toBeNull();
                        });
                        it('attributes', function () {
                            expect(contextOfParse.attributes).toBeNull();
                        });

                    });

                });

            });

            describe('microhelpers', function () {
                //TODO: [dmitry.makhnev] symbols collection
                //TODO: [dmitry.makhnev] numbers collection
                //TODO: [dmitry.makhnev] latin letters collection
                //TODO: [dmitry.makhnev] some letters collection
                //TODO: [dmitry.makhnev] add generations expect with all collections

                describe('isCorrectTagNameStartSymbol', function () {
                    var isCorrectTagNameStartSymbol = htmlToASTExport.isCorrectTagNameStartSymbol;

                    it('was exported', function () {
                        expect(isCorrectTagNameStartSymbol).toBeDefined();
                    });

                    it('letter is letter', function () {
                        expect(isCorrectTagNameStartSymbol('A')).toBeTruthy();
                        expect(isCorrectTagNameStartSymbol('Z')).toBeTruthy();
                        expect(isCorrectTagNameStartSymbol('a')).toBeTruthy();
                        expect(isCorrectTagNameStartSymbol('z')).toBeTruthy();
                        expect(isCorrectTagNameStartSymbol('F')).toBeTruthy();
                        expect(isCorrectTagNameStartSymbol('f')).toBeTruthy();
                    });
                    it('/ is not letter', function () {
                        expect(isCorrectTagNameStartSymbol('/')).toBeFalsy();
                    });
                    it('! is not letter', function () {
                        expect(isCorrectTagNameStartSymbol('!')).toBeFalsy();
                    });
                    it('- is not letter', function () {
                        expect(isCorrectTagNameStartSymbol('-')).toBeFalsy();
                    });
                    it('_ is not letter', function () {
                        expect(isCorrectTagNameStartSymbol('_')).toBeFalsy();
                    });
                    it('\' \' is not letter', function () {
                        expect(isCorrectTagNameStartSymbol(' ')).toBeFalsy();
                    });
                    it('number is not letter', function () {
                        expect(isCorrectTagNameStartSymbol('0')).toBeFalsy();
                        expect(isCorrectTagNameStartSymbol('1')).toBeFalsy();
                        expect(isCorrectTagNameStartSymbol('2')).toBeFalsy();
                        expect(isCorrectTagNameStartSymbol('3')).toBeFalsy();
                        expect(isCorrectTagNameStartSymbol('4')).toBeFalsy();
                        expect(isCorrectTagNameStartSymbol('4')).toBeFalsy();
                        expect(isCorrectTagNameStartSymbol('6')).toBeFalsy();
                        expect(isCorrectTagNameStartSymbol('7')).toBeFalsy();
                        expect(isCorrectTagNameStartSymbol('8')).toBeFalsy();
                        expect(isCorrectTagNameStartSymbol('9')).toBeFalsy();
                    });

                });

                describe('isCorrectTagNameSymbol', function () {
                    var isCorrectTagNameSymbol = htmlToASTExport.isCorrectTagNameSymbol;

                    it('was exported', function () {
                        expect(isCorrectTagNameSymbol).toBeDefined();
                    });

                    it('letter is correct', function () {
                        expect(isCorrectTagNameSymbol('A')).toBeTruthy();
                        expect(isCorrectTagNameSymbol('Z')).toBeTruthy();
                        expect(isCorrectTagNameSymbol('a')).toBeTruthy();
                        expect(isCorrectTagNameSymbol('z')).toBeTruthy();
                        expect(isCorrectTagNameSymbol('F')).toBeTruthy();
                        expect(isCorrectTagNameSymbol('f')).toBeTruthy();
                    });
                    it('/ is not correct', function () {
                        expect(isCorrectTagNameSymbol('/')).toBeFalsy();
                    });
                    it('! is not correct', function () {
                        expect(isCorrectTagNameSymbol('!')).toBeFalsy();
                    });
                    it('\' \' is not correct', function () {
                        expect(isCorrectTagNameSymbol(' ')).toBeFalsy();
                    });
                    it('- is correct', function () {
                        expect(isCorrectTagNameSymbol('-')).toBeTruthy();
                    });
                    it('_ is correct', function () {
                        expect(isCorrectTagNameSymbol('_')).toBeTruthy();
                    });
                    it('number is correct', function () {
                        expect(isCorrectTagNameSymbol('0')).toBeTruthy();
                        expect(isCorrectTagNameSymbol('1')).toBeTruthy();
                        expect(isCorrectTagNameSymbol('2')).toBeTruthy();
                        expect(isCorrectTagNameSymbol('3')).toBeTruthy();
                        expect(isCorrectTagNameSymbol('4')).toBeTruthy();
                        expect(isCorrectTagNameSymbol('4')).toBeTruthy();
                        expect(isCorrectTagNameSymbol('6')).toBeTruthy();
                        expect(isCorrectTagNameSymbol('7')).toBeTruthy();
                        expect(isCorrectTagNameSymbol('8')).toBeTruthy();
                        expect(isCorrectTagNameSymbol('9')).toBeTruthy();
                    });
                });

                describe('isWhiteSpace', function () {
                    var isWhiteSpace = htmlToASTExport.isWhiteSpace;

                    it('was exported', function () {
                        expect(isWhiteSpace).toBeDefined();
                    });

                    it('letters is incorrect', function () {
                        expect(isWhiteSpace('A')).toBeFalsy();
                        expect(isWhiteSpace('Z')).toBeFalsy();
                        expect(isWhiteSpace('a')).toBeFalsy();
                        expect(isWhiteSpace('z')).toBeFalsy();
                        expect(isWhiteSpace('F')).toBeFalsy();
                        expect(isWhiteSpace('f')).toBeFalsy();
                    });

                    it('symbols is incorrect', function () {
                        expect(isWhiteSpace(',')).toBeFalsy();
                        expect(isWhiteSpace('>')).toBeFalsy();
                        expect(isWhiteSpace('!')).toBeFalsy();
                        expect(isWhiteSpace('-')).toBeFalsy();
                        expect(isWhiteSpace('_')).toBeFalsy();
                        expect(isWhiteSpace('(')).toBeFalsy();
                        expect(isWhiteSpace('}')).toBeFalsy();
                    });

                    it('numbers is incorrect', function () {
                        expect(isWhiteSpace('1')).toBeFalsy();
                        expect(isWhiteSpace('3')).toBeFalsy();
                        expect(isWhiteSpace('6')).toBeFalsy();
                        expect(isWhiteSpace('0')).toBeFalsy();
                    });

                    it('\' \' is correct', function () {
                        expect(isWhiteSpace(' ')).toBeTruthy();
                    });
                    it('\'\\n\' is correct', function () {
                        expect(isWhiteSpace('\n')).toBeTruthy();
                    });
                    it('\'\\t\' is correct', function () {
                        expect(isWhiteSpace('\t')).toBeTruthy();
                    });
                    it('\'\\r\' is correct', function () {
                        expect(isWhiteSpace('\r')).toBeTruthy();
                    });
                    it('\'\\f\' is correct', function () {
                        expect(isWhiteSpace('\f')).toBeTruthy();
                    });

                });

                describe('testOfSimpleHTMLTag', function () {
                    var testOfSimpleHTMLTag = htmlToASTExport.testOfSimpleHTMLTag;

                    it('was exported', function () {
                        expect(testOfSimpleHTMLTag).toBeDefined();
                    });

                    it('<img> is simple tag', function () {
                        expect(testOfSimpleHTMLTag('img')).toBeTruthy();
                    });
                    it('<input> is simple tag', function () {
                        expect(testOfSimpleHTMLTag('input')).toBeTruthy();
                    });
                    it('<br> is simple tag', function () {
                        expect(testOfSimpleHTMLTag('br')).toBeTruthy();
                    });
                    it('<hr> is simple tag', function () {
                        expect(testOfSimpleHTMLTag('hr')).toBeTruthy();
                    });
                    it('<link> is simple tag', function () {
                        expect(testOfSimpleHTMLTag('link')).toBeTruthy();
                    });
                    it('<meta> is simple tag', function () {
                        expect(testOfSimpleHTMLTag('meta')).toBeTruthy();
                    });

                });

                describe('isCorrectAttributeNameStartSymbol', function () {
                    var isCorrectAttributeNameStartSymbol = htmlToASTExport.isCorrectAttributeNameStartSymbol;

                    it('was exported', function () {
                        expect(isCorrectAttributeNameStartSymbol).toBeDefined();
                    });

                    it('is isCorrectTagNameStartSymbol', function () {
                        expect(isCorrectAttributeNameStartSymbol).toBe(htmlToASTExport.isCorrectTagNameStartSymbol);
                    })
                });

                describe('isCorrectAttributeNameSymbol', function () {
                    var isCorrectAttributeNameSymbol = htmlToASTExport.isCorrectAttributeNameSymbol;

                    it('was exported', function () {
                        expect(isCorrectAttributeNameSymbol).toBeDefined();
                    });

                    it('is isCorrectTagNameStartSymbol', function () {
                        expect(isCorrectAttributeNameSymbol).toBe(htmlToASTExport.isCorrectTagNameSymbol);
                    })
                });

                describe('addCharForBuffer', function () {
                    var addCharForBuffer = htmlToASTExport.addCharForBuffer;

                    it('was exported', function () {
                        expect(addCharForBuffer).toBeDefined();
                    });

                    var contextOfParse = new ContextOfParse();

                    addCharForBuffer(contextOfParse, ' ');
                    addCharForBuffer(contextOfParse, '\n');
                    addCharForBuffer(contextOfParse, ' ');
                    addCharForBuffer(contextOfParse, '\r');
                    addCharForBuffer(contextOfParse, '\r');
                    addCharForBuffer(contextOfParse, 'a');

                    it('contextOfParse.buffer correct', function () {
                        expect(contextOfParse.buffer).toBe(' \n \r\ra');
                    });

                });

                describe('clearForTextState', function () {
                    var clearForTextState = htmlToASTExport.clearForTextState;

                    it('was exported', function () {
                        expect(clearForTextState).toBeDefined();
                    });

                    var contextOfParse = new ContextOfParse();
                    contextOfParse.buffer = 'a<div class="asd"\\';
                    contextOfParse.textBuffer = 'a';
                    contextOfParse.tagName = 'div';
                    contextOfParse.attributes = {
                        'class': 'asd'
                    };

                    clearForTextState(contextOfParse);

                    it('contextOfParse.buffer is correct', function () {
                        expect(contextOfParse.buffer).toBe('a<div class="asd"\\');
                    });

                    it('contextOfParse.textBuffer is correct', function () {
                        expect(contextOfParse.textBuffer).toBe('a<div class="asd"\\');
                    });

                    //TODO: [dmitry.makhnev] think about other properties


                });

                describe('addAttribute', function () {
                    var addAttribute = htmlToASTExport.addAttribute;

                    it('was exported', function () {
                        expect(addAttribute).toBeDefined();
                    });

                    describe('correct for contextOfParse only with empty attributes', function () {
                        var contextOfParse = new ContextOfParse();
                        contextOfParse.attributeName = 'id';
                        contextOfParse.attributeValue = 'main';
                        addAttribute(contextOfParse);
                        it('attributes is object', function () {
                            expect(contextOfParse.attributes).toEqual(jasmine.any(Object));
                        });
                        it('attribute defined', function () {
                            expect(contextOfParse.attributes['id']).toBeDefined();
                        });
                        it('attribute has correct value', function () {
                            expect(contextOfParse.attributes['id']).toBe('main');
                        });
                    });

                    describe('correct for contextOfParse only with attributes', function () {
                        var contextOfParse = new ContextOfParse(),
                            attributesCache = {
                                'class': 'alpha'
                            };

                        contextOfParse.attributes = attributesCache;
                        contextOfParse.attributeName = 'id';
                        contextOfParse.attributeValue = 'main';
                        addAttribute(contextOfParse);

                        it('contextOfParse.attributes is saved', function () {
                            expect(contextOfParse.attributes).toBe(attributesCache);
                        });
                        it('attributes is object', function () {
                            expect(contextOfParse.attributes).toEqual(jasmine.any(Object));
                        });
                        it('attribute defined', function () {
                            expect(contextOfParse.attributes['id']).toBeDefined();
                        });
                        it('attribute has correct value', function () {
                            expect(contextOfParse.attributes['id']).toBe('main');
                        });

                    });

                    describe('correct for contextOfParse with attributeValue', function () {
                        var contextOfParse = new ContextOfParse();
                        contextOfParse.attributeName = 'id';
                        contextOfParse.attributeValue = 'main';
                        addAttribute(contextOfParse, 'test');
                        it('attributes is object', function () {
                            expect(contextOfParse.attributes).toEqual(jasmine.any(Object));
                        });
                        it('attribute defined', function () {
                            expect(contextOfParse.attributes['id']).toBeDefined();
                        });
                        it('attribute has correct value', function () {
                            expect(contextOfParse.attributes['id']).toBe('test');
                        });
                    });

                });

            });

            var builders;
            describe('builders', function () {
                builders = htmlToASTExport.builders;

                it('builders was exported', function () {
                    expect(builders).toBeDefined();
                });

                describe('buildText', function () {
                    var buildText = builders.buildText;

                    it('was exported', function () {
                        expect(buildText).toBeDefined();
                    });

                    describe('build text only', function () {
                        var contextOfParse = new ContextOfParse();
                        contextOfParse.buffer = 'hello';
                        contextOfParse.state = states.TEXT;
                        contextOfParse.textBuffer = 'hello';

                        buildText(contextOfParse);

                        it('contextOfParse.buffer is clean', function () {
                            expect(contextOfParse.buffer).toBe('');
                        });

                        it('contextOfParse.textBuffer is clean', function () {
                            expect(contextOfParse.textBuffer).toBe('');
                        });

                        it('correct contextOfParse.stack state', function () {
                            expect(contextOfParse.treeStack[1]).toBeUndefined();
                            expect(contextOfParse.treeStack[0] instanceof  htmlToASTNodes.Fragment).toBeTruthy();
                        });

                        describe('building Text', function () {
                            it('correct position', function () {
                                expect(contextOfParse.result.childNodes[0] instanceof htmlToASTNodes.Text).toBeTruthy();
                            });
                            it('correct Text.text', function () {
                                expect(contextOfParse.result.childNodes[0].text).toBe('hello');
                            });
                        });

                    });

                });

                describe('buildTag', function () {
                    var buildTag = builders.buildTag;
                    it('was exported', function () {
                        expect(buildTag).toBeDefined();
                    });

                    //some HTML tags define as simple. for example <img>, <input>, <br>, <hr>, <link>, <meta>
                    describe('build simple tag without nesting and attributes', function () {
                        var contextOfParse = new ContextOfParse();
                        contextOfParse.buffer = 'a<br>';
                        contextOfParse.state = states.TAG_NAME;
                        contextOfParse.textBuffer = 'a';
                        contextOfParse.tagName = 'br';
                        buildTag(contextOfParse);

                        it('contextOfParse.buffer is clean', function () {
                            expect(contextOfParse.buffer).toBe('');
                        });

                        it('contextOfParse.textBuffer is clean', function () {
                            expect(contextOfParse.textBuffer).toBe('');
                        });

                        it('correct contextOfParse.state', function () {
                            expect(contextOfParse.state).toBe(states.TEXT);
                        });

                        it('correct contextOfParse.treeStack state', function () {
                            expect(contextOfParse.treeStack[1]).toBeUndefined();
                            expect(contextOfParse.treeStack[0] instanceof  htmlToASTNodes.Fragment).toBeTruthy();
                        });

                        describe('building Text', function () {
                            it('correct position', function () {
                                expect(contextOfParse.result.childNodes[0] instanceof htmlToASTNodes.Text).toBeTruthy();
                            });
                            it('correct Text.text', function () {
                                expect(contextOfParse.result.childNodes[0].text).toBe('a');
                            });
                        });
                        describe('building Tag', function () {
                            it('correct position', function () {
                                expect(contextOfParse.result.childNodes[1] instanceof htmlToASTNodes.Tag).toBeTruthy();
                            });
                            it('correct Text.text', function () {
                                expect(contextOfParse.result.childNodes[1].name).toBe('br');
                            });
                        });
                    });

                    describe('build simple tag with attributes', function () {
                        var contextOfParse = new ContextOfParse();
                        contextOfParse.buffer = 'a<hr class="className" id="id">';
                        contextOfParse.state = states.TAG_NAME;
                        contextOfParse.textBuffer = 'a';
                        contextOfParse.tagName = 'hr';
                        contextOfParse.attributes = {
                            'class': 'className',
                            id: 'id'
                        };
                        buildTag(contextOfParse);

                        it('tag has correct attributes', function () {
                            var hrTag = contextOfParse.result.childNodes[1];
                            expect(hrTag.attributes['class']).toBe('className');
                            expect(hrTag.attributes.id).toBe('id');
                        });
                    });

                    describe('build tag with nesting', function () {
                        var contextOfParse = new ContextOfParse();
                        contextOfParse.buffer = '<div>';
                        contextOfParse.state = states.TAG_NAME;
                        contextOfParse.tagName = 'div';
                        buildTag(contextOfParse);

                        it('correct treeStack position', function () {
                            var treeStack = contextOfParse.treeStack;
                            expect(treeStack.length).toBe(2);
                            expect(treeStack[1]).toBe(contextOfParse.result.childNodes[0]);
                        });

                    });

                    describe('build undefined closed tag', function () {
                        var contextOfParse = new ContextOfParse();
                        contextOfParse.buffer = '<vid/>';
                        contextOfParse.state = states.TAG_NAME;
                        contextOfParse.tagName = 'vid';
                        buildTag(contextOfParse, true);

                        it('correct treeStack position', function () {
                            var treeStack = contextOfParse.treeStack;
                            expect(treeStack.length).toBe(1);
                        });
                    });

                    describe('build simple tag as tag with nesting for XML', function () {
                        var contextOfParse = new ContextOfParse({isXML: true});
                        contextOfParse.buffer = '<br>';
                        contextOfParse.state = states.TAG_NAME;
                        contextOfParse.tagName = 'br';
                        buildTag(contextOfParse);

                        it('correct treeStack position', function () {
                            var treeStack = contextOfParse.treeStack;
                            expect(treeStack.length).toBe(2);
                            expect(treeStack[1]).toBe(contextOfParse.result.childNodes[0]);
                        });

                    });

                    describe('build simple tag as tag with nesting for XML', function () {
                        var contextOfParse = new ContextOfParse({isXML: true});
                        contextOfParse.buffer = '<br/>';
                        contextOfParse.state = states.TAG_NAME;
                        contextOfParse.tagName = 'br';
                        buildTag(contextOfParse, true);

                        it('correct treeStack position', function () {
                            var treeStack = contextOfParse.treeStack;
                            expect(treeStack.length).toBe(1);
                        });

                    });

                });
            });

            var processings;
            describe('processings', function () {
                processings = htmlToASTExport.processings;

                it('was exported', function () {
                    expect(processings).toBeDefined();
                });

                describe('processingText', function () {
                    var processingText = processings.processingText;

                    it('was exported', function () {
                        expect(processingText).toBeDefined();
                    });

                    describe('change contextOfParse.state for \'<\'', function () {
                        var contextOfParse = new ContextOfParse();
                        processingText(contextOfParse, 'A');
                        processingText(contextOfParse, 'S');
                        processingText(contextOfParse, 'T');
                        processingText(contextOfParse, '<');
                        it('correct contextOfParse.state after processing \'<\'', function () {
                            expect(contextOfParse.state).toBe(states.TAG_START);
                        });
                        it('correct contextOfParse.buffer', function () {
                            expect(contextOfParse.buffer).toBe('AST<');
                        });
                        it('correct contextOfParse.textBuffer', function () {
                            expect(contextOfParse.textBuffer).toBe('AST');
                        });
                    });


                    describe('not change contextOfParse.state for random symbols', function () {
                        var contextOfParse = new ContextOfParse();
                        processingText(contextOfParse, 'a');
                        it('save TEXT state after processing \'a\'', function () {
                            expect(contextOfParse.state).toBe(states.TEXT);
                        });
                        processingText(contextOfParse, '/');
                        it('save TEXT state after processing \'/\'', function () {
                            expect(contextOfParse.state).toBe(states.TEXT);
                        });
                        processingText(contextOfParse, 'ф');
                        it('save TEXT state after processing \'ф\'', function () {
                            expect(contextOfParse.state).toBe(states.TEXT);
                        });
                        processingText(contextOfParse, '1');
                        it('save TEXT state after processing \'1\'', function () {
                            expect(contextOfParse.state).toBe(states.TEXT);
                        });
                    });

                });

                describe('processingTagStart', function () {
                    var processingText = processings.processingText,
                        processingTagStart = processings.processingTagStart;

                    it('was exported', function () {
                        expect(processingTagStart).toBeDefined();
                    });

                    describe('change state', function () {

                        describe('to TEXT', function () {
                            describe('correct for \' \'', function () {
                                var contextOfParse = new ContextOfParse();

                                processingText(contextOfParse, '<');
                                processingTagStart(contextOfParse, ' ');

                                it('contextOfParse.state is TEXT', function () {
                                    expect(contextOfParse.state).toBe(states.TEXT);
                                });
                                it('correct contextOfParse.buffer', function () {
                                    expect(contextOfParse.buffer).toBe('< ');
                                });
                                it('correct contextOfParse.textBuffer', function () {
                                    expect(contextOfParse.textBuffer).toBe('< ');
                                });
                            });
                            describe('correct for \'-\'', function () {
                                var contextOfParse = new ContextOfParse();

                                processingText(contextOfParse, '<');
                                processingTagStart(contextOfParse, '-');

                                it('contextOfParse.state is TEXT', function () {
                                    expect(contextOfParse.state).toBe(states.TEXT);
                                });
                                it('correct contextOfParse.buffer', function () {
                                    expect(contextOfParse.buffer).toBe('<-');
                                });
                                it('correct contextOfParse.textBuffer', function () {
                                    expect(contextOfParse.textBuffer).toBe('<-');
                                });
                            });
                            describe('correct for \'.\'', function () {
                                var contextOfParse = new ContextOfParse();

                                processingText(contextOfParse, '<');
                                processingTagStart(contextOfParse, '.');

                                it('contextOfParse.state is TEXT', function () {
                                    expect(contextOfParse.state).toBe(states.TEXT);
                                });
                                it('correct contextOfParse.buffer', function () {
                                    expect(contextOfParse.buffer).toBe('<.');
                                });
                                it('correct contextOfParse.textBuffer', function () {
                                    expect(contextOfParse.textBuffer).toBe('<.');
                                });
                            });
                            describe('correct for \'ы\'', function () {
                                var contextOfParse = new ContextOfParse();

                                processingText(contextOfParse, '<');
                                processingTagStart(contextOfParse, 'ы');

                                it('contextOfParse.state is TEXT', function () {
                                    expect(contextOfParse.state).toBe(states.TEXT);
                                });
                                it('correct contextOfParse.buffer', function () {
                                    expect(contextOfParse.buffer).toBe('<ы');
                                });
                                it('correct contextOfParse.textBuffer', function () {
                                    expect(contextOfParse.textBuffer).toBe('<ы');
                                });
                            });
                        });

                        describe('to TAG_NAME', function () {
                            var contextOfParse = new ContextOfParse();

                            processingText(contextOfParse, 'b');
                            processingText(contextOfParse, '<');
                            processingTagStart(contextOfParse, 'a');

                            it('contextOfParse.state is TAG_NAME', function () {
                                expect(contextOfParse.state).toBe(states.TAG_NAME);
                            });
                            it('correct contextOfParse.buffer', function () {
                                expect(contextOfParse.buffer).toBe('b<a');
                            });
                            it('correct contextOfParse.textBuffer', function () {
                                expect(contextOfParse.textBuffer).toBe('b');
                            });
                            it('correct contextOfParse.tagName', function () {
                                expect(contextOfParse.tagName).toBe('a');
                            });
                        });

                        describe('to DECLARATION_START', function () {
                            var contextOfParse = new ContextOfParse();

                            processingText(contextOfParse, 'a');
                            processingText(contextOfParse, '<');
                            processingTagStart(contextOfParse, '!');

                            it('contextOfParse.state is DECLARATION_START', function () {
                                expect(contextOfParse.state).toBe(states.DECLARATION_START);
                            });
                            it('correct contextOfParse.buffer', function () {
                                expect(contextOfParse.buffer).toBe('a<!');
                            });
                            it('correct contextOfParse.textBuffer', function () {
                                expect(contextOfParse.textBuffer).toBe('a');
                            });
                        });
                    });


                });

                describe('processingTagName', function () {
                    var processingText = processings.processingText,
                        processingTagStart = processings.processingTagStart,
                        processingTagName = processings.processingTagName;

                    it('was exported', function () {
                        expect(processingTagName).toBeDefined();
                    });

                    describe('change state', function () {

                        describe('to TEXT', function () {
                            var contextOfParse = new ContextOfParse();

                            processingText(contextOfParse, 'a');
                            processingText(contextOfParse, '<');
                            processingTagStart(contextOfParse, 's');
                            processingTagName(contextOfParse, '*');

                            it('contextOfParse.state is TEXT', function () {
                                expect(contextOfParse.state).toBe(states.TEXT);
                            });
                            it('contextOfParse.buffer is correct', function () {
                                expect(contextOfParse.buffer).toBe('a<s*');
                            });
                            it('contextOfParse.textBuffer is correct', function () {
                                expect(contextOfParse.textBuffer).toBe('a<s*');
                            });
                        });

                        describe('to TEXT when tag close after name with \'>\' and  without \'/\'', function () {
                            describe('tag without nesting', function () {
                                var contextOfParse = new ContextOfParse();

                                processingText(contextOfParse, 'a');
                                processingText(contextOfParse, '<');
                                processingTagStart(contextOfParse, 'b');
                                processingTagName(contextOfParse, 'r');
                                processingTagName(contextOfParse, '>');

                                it('contextOfParse.state is TEXT', function () {
                                    expect(contextOfParse.state).toBe(states.TEXT);
                                });
                                it('contextOfParse.buffer is correct', function () {
                                    expect(contextOfParse.buffer).toBe('');
                                });
                                it('contextOfParse.textBuffer is correct', function () {
                                    expect(contextOfParse.textBuffer).toBe('');
                                });

                                describe('textNode', function () {
                                    var textNode = contextOfParse.result.childNodes[0];
                                    it('is define', function () {
                                        expect(textNode).toBeDefined();
                                    });
                                    it('is TextNode', function () {
                                        expect(textNode instanceof htmlToASTNodes.Text).toBeTruthy();
                                    });
                                    it('correct textNode.text', function () {
                                        expect(textNode.text).toBe('a');
                                    });
                                });
                                describe('tag', function () {
                                    var tag = contextOfParse.result.childNodes[1];
                                    it('is define', function () {
                                        expect(tag).toBeDefined();
                                    });
                                    it('is Tag', function () {
                                        expect(tag instanceof htmlToASTNodes.Tag).toBeTruthy();
                                    });
                                    it('correct textNode.text', function () {
                                        expect(tag.name).toBe('br');
                                    });
                                    it('not add to contextOfParse.treeStack', function () {
                                        var treeStack = contextOfParse.treeStack;
                                        expect(treeStack.length).toBe(1);
                                        expect(treeStack[0]).toBe(contextOfParse.result);
                                    });
                                });
                            });

                            describe('common tag', function () {
                                var contextOfParse = new ContextOfParse();

                                processingText(contextOfParse, 'a');
                                processingText(contextOfParse, '<');
                                processingTagStart(contextOfParse, 'd');
                                processingTagName(contextOfParse, 'i');
                                processingTagName(contextOfParse, 'v');
                                processingTagName(contextOfParse, '>');

                                it('contextOfParse.state is TEXT', function () {
                                    expect(contextOfParse.state).toBe(states.TEXT);
                                });
                                it('contextOfParse.buffer is correct', function () {
                                    expect(contextOfParse.buffer).toBe('');
                                });
                                it('contextOfParse.textBuffer is correct', function () {
                                    expect(contextOfParse.textBuffer).toBe('');
                                });

                                describe('textNode', function () {
                                    var textNode = contextOfParse.result.childNodes[0];
                                    it('is define', function () {
                                        expect(textNode).toBeDefined();
                                    });
                                    it('is TextNode', function () {
                                        expect(textNode instanceof htmlToASTNodes.Text).toBeTruthy();
                                    });
                                    it('correct textNode.text', function () {
                                        expect(textNode.text).toBe('a');
                                    });
                                });

                                describe('tag', function () {
                                    var tag = contextOfParse.result.childNodes[1];
                                    it('is define', function () {
                                        expect(tag).toBeDefined();
                                    });
                                    it('is TextNode', function () {
                                        expect(tag instanceof htmlToASTNodes.Tag).toBeTruthy();
                                    });
                                    it('correct textNode.text', function () {
                                        expect(tag.name).toBe('div');
                                    });
                                    it('add to contextOfParse.treeStack', function () {
                                        var treeStack = contextOfParse.treeStack,
                                            contextOfParseResult = contextOfParse.result;
                                        expect(treeStack.length).toBe(2);
                                        expect(treeStack[0]).toBe(contextOfParseResult);
                                        expect(treeStack[1]).toBe(contextOfParseResult.childNodes[1]);
                                    });
                                });
                            });
                        });

                        describe('to TAG_BODY', function () {
                            var contextOfParse = new ContextOfParse();

                            processingText(contextOfParse, 'a');
                            processingText(contextOfParse, '<');
                            processingTagStart(contextOfParse, 's');
                            processingTagName(contextOfParse, 't');
                            processingTagName(contextOfParse, ' ');

                            it('contextOfParse.state is TAG_BODY', function () {
                                expect(contextOfParse.state).toBe(states.TAG_BODY);
                            });
                            it('correct contextOfParse.buffer', function () {
                                expect(contextOfParse.buffer).toBe('a<st ');
                            });
                            it('correct contextOfParse.textBuffer', function () {
                                expect(contextOfParse.textBuffer).toBe('a');
                            });
                            it('correct contextOfParse.tagName', function () {
                                expect(contextOfParse.tagName).toBe('st');
                            });
                        });

                        describe('to TAG_CLOSE', function () {
                            var contextOfParse = new ContextOfParse();

                            processingText(contextOfParse, 'a');
                            processingText(contextOfParse, '<');
                            processingTagStart(contextOfParse, 's');
                            processingTagName(contextOfParse, 't');
                            processingTagName(contextOfParse, '/');

                            it('contextOfParse.state is TAG_CLOSE', function () {
                                expect(contextOfParse.state).toBe(states.TAG_CLOSE);
                            });
                            it('correct contextOfParse.buffer', function () {
                                expect(contextOfParse.buffer).toBe('a<st/');
                            });
                            it('correct contextOfParse.textBuffer', function () {
                                expect(contextOfParse.textBuffer).toBe('a');
                            });
                            it('correct contextOfParse.tagName', function () {
                                expect(contextOfParse.tagName).toBe('st');
                            });


                        });

                    });
                });

                describe('processingTagBody', function () {
                    var processingTagBody = processings.processingTagBody,
                        processingText = processings.processingText,
                        processingTagStart = processings.processingTagStart,
                        processingTagName = processings.processingTagName;

                    it('was exported', function () {
                        expect(processingTagBody).toBeDefined();
                    });

                    describe('change state', function () {

                        describe('to TEXT when incorrect tag body symbol', function () {
                            var contextOfParse = new ContextOfParse();
                            processingText(contextOfParse, 'a');
                            processingText(contextOfParse, '<');
                            processingTagStart(contextOfParse, 'd');
                            processingTagName(contextOfParse, 'i');
                            processingTagName(contextOfParse, 'v');
                            processingTagName(contextOfParse, ' ');
                            processingTagBody(contextOfParse, '\\');

                            it('contextOfParse.state is TEXT', function () {
                                expect(contextOfParse.state).toBe(states.TEXT);
                            });

                            it('contextOfParse.buffer is correct', function () {
                                expect(contextOfParse.buffer).toBe('a<div \\');
                            });

                            it('contextOfParse.textBuffer is correct', function () {
                                expect(contextOfParse.textBuffer).toBe('a<div \\');
                            });

                        });

                        describe('to TEXT when symbol is \'>\'', function () {
                            var contextOfParse = new ContextOfParse();
                            processingText(contextOfParse, 'a');
                            processingText(contextOfParse, '<');
                            processingTagStart(contextOfParse, 'd');
                            processingTagName(contextOfParse, 'i');
                            processingTagName(contextOfParse, 'v');
                            processingTagName(contextOfParse, '\t');
                            processingTagBody(contextOfParse, '>');

                            it('contextOfParse.state is TEXT', function () {
                                expect(contextOfParse.state).toBe(states.TEXT);
                            });
                            it('contextOfParse.buffer is correct', function () {
                                expect(contextOfParse.buffer).toBe('');
                            });
                            it('contextOfParse.textBuffer is correct', function () {
                                expect(contextOfParse.textBuffer).toBe('');
                            });

                            describe('textNode', function () {
                                var textNode = contextOfParse.result.childNodes[0];
                                it('is define', function () {
                                    expect(textNode).toBeDefined();
                                });
                                it('is TextNode', function () {
                                    expect(textNode instanceof htmlToASTNodes.Text).toBeTruthy();
                                });
                                it('correct textNode.text', function () {
                                    expect(textNode.text).toBe('a');
                                });
                            });

                            describe('tag', function () {
                                var tag = contextOfParse.result.childNodes[1];
                                it('is define', function () {
                                    expect(tag).toBeDefined();
                                });
                                it('is TextNode', function () {
                                    expect(tag instanceof htmlToASTNodes.Tag).toBeTruthy();
                                });
                                it('correct textNode.text', function () {
                                    expect(tag.name).toBe('div');
                                });
                                it('add to contextOfParse.treeStack', function () {
                                    var treeStack = contextOfParse.treeStack,
                                        contextOfParseResult = contextOfParse.result;
                                    expect(treeStack.length).toBe(2);
                                    expect(treeStack[0]).toBe(contextOfParseResult);
                                    expect(treeStack[1]).toBe(contextOfParseResult.childNodes[1]);
                                });
                            });

                        });

                        describe('to TAG_CLOSE', function () {
                            var contextOfParse = new ContextOfParse();
                            processingText(contextOfParse, 'a');
                            processingText(contextOfParse, '<');
                            processingTagStart(contextOfParse, 'd');
                            processingTagName(contextOfParse, 'i');
                            processingTagName(contextOfParse, 'v');
                            processingTagName(contextOfParse, '\r');
                            processingTagBody(contextOfParse, '/');

                            it('contextOfParse.state is TAG_CLOSE', function () {
                                expect(contextOfParse.state).toBe(states.TAG_CLOSE);
                            });
                            it('contextOfParse.buffer is correct', function () {
                                expect(contextOfParse.buffer).toBe('a<div\r/');
                            });
                            it('contextOfParse.textBuffer is correct', function () {
                                expect(contextOfParse.textBuffer).toBe('a');
                            });
                            it('contextOfParse.tagName is correct', function () {
                                expect(contextOfParse.tagName).toBe('div');
                            });
                        });

                        describe('to TAG_ATTRIBUTE_NAME', function () {
                            var contextOfParse = new ContextOfParse();
                            processingText(contextOfParse, 'a');
                            processingText(contextOfParse, '<');
                            processingTagStart(contextOfParse, 'd');
                            processingTagName(contextOfParse, 'i');
                            processingTagName(contextOfParse, 'v');
                            processingTagName(contextOfParse, ' ');
                            processingTagBody(contextOfParse, '\n');
                            processingTagBody(contextOfParse, 'a');

                            it('contextOfParse.state is TAG_ATTRIBUTE_NAME', function () {
                                expect(contextOfParse.state).toBe(states.TAG_ATTRIBUTE_NAME);
                            });

                            it('contextOfParse.buffer is correct', function () {
                                expect(contextOfParse.buffer).toBe('a<div \na');
                            });

                            it('contextOfParse.textBuffer is correct', function () {
                                expect(contextOfParse.textBuffer).toBe('a');
                            });

                            it('contextOfParse.tagName is correct', function () {
                                expect(contextOfParse.tagName).toBe('div');
                            });

                            it('contextOfParse.attributeName is correct', function () {
                                expect(contextOfParse.attributeName).toBe('a');
                            });



                        });

                    });

                });

                describe('processingTagAttributeName', function () {
                    var processingTagAttributeName = processings.processingTagAttributeName,
                        processingTagBody = processings.processingTagBody,
                        processingText = processings.processingText,
                        processingTagStart = processings.processingTagStart,
                        processingTagName = processings.processingTagName;

                    it('was exported', function () {
                        expect(processingTagAttributeName).toBeDefined();
                    });

                    describe('change state', function () {
                        describe('to TEXT when incorrect symbol', function () {
                            var contextOfParse = new ContextOfParse();
                            processingText(contextOfParse, 'a');
                            processingText(contextOfParse, '<');
                            processingTagStart(contextOfParse, 'd');
                            processingTagName(contextOfParse, 'i');
                            processingTagName(contextOfParse, 'v');
                            processingTagName(contextOfParse, ' ');
                            processingTagBody(contextOfParse, 'a');
                            processingTagAttributeName(contextOfParse, '\\');

                            it('contextOfParse.state is TEXT', function () {
                                expect(contextOfParse.state).toBe(states.TEXT);
                            });

                            it('contextOfParse.buffer is correct', function () {
                                expect(contextOfParse.buffer).toBe('a<div a\\');
                            });

                            it('contextOfParse.textBuffer is correct', function () {
                                expect(contextOfParse.textBuffer).toBe('a<div a\\');
                            });
                        });

                        describe('to TAG_ATTRIBUTE_TO_VALUE', function () {
                            var contextOfParse = new ContextOfParse();
                            processingText(contextOfParse, 'a');
                            processingText(contextOfParse, '<');
                            processingTagStart(contextOfParse, 'd');
                            processingTagName(contextOfParse, 'i');
                            processingTagName(contextOfParse, 'v');
                            processingTagName(contextOfParse, ' ');
                            processingTagBody(contextOfParse, 'd');
                            processingTagAttributeName(contextOfParse, 'a');
                            processingTagAttributeName(contextOfParse, 't');
                            processingTagAttributeName(contextOfParse, 'a');
                            processingTagAttributeName(contextOfParse, '-');
                            processingTagAttributeName(contextOfParse, 'a');
                            processingTagAttributeName(contextOfParse, '=');

                            it('contextOfParse.state is TAG_ATTRIBUTE_TO_VALUE', function () {
                                expect(contextOfParse.state).toBe(states.TAG_ATTRIBUTE_TO_VALUE);
                            });

                            it('contextOfParse.buffer is correct', function () {
                                expect(contextOfParse.buffer).toBe('a<div data-a=');
                            });

                            it('contextOfParse.textBuffer is correct', function () {
                                expect(contextOfParse.textBuffer).toBe('a');
                            });

                            it('contextOfParse.attributeName is correct', function () {
                                expect(contextOfParse.attributeName).toBe('data-a');
                            });
                        });
                    });
                });

                describe('processingTagAttributeToValue', function () {
                    var processingTagAttributeToValue = processings.processingTagAttributeToValue,
                        processingTagAttributeName = processings.processingTagAttributeName,
                        processingTagBody = processings.processingTagBody,
                        processingText = processings.processingText,
                        processingTagStart = processings.processingTagStart,
                        processingTagName = processings.processingTagName;

                    it('was exported', function () {
                        expect(processingTagAttributeToValue).toBeDefined();
                    });

                    describe('change state', function () {
                        describe('to TEXT when incorrect symbol', function () {
                            var contextOfParse = new ContextOfParse();
                            processingText(contextOfParse, 'a');
                            processingText(contextOfParse, '<');
                            processingTagStart(contextOfParse, 'd');
                            processingTagName(contextOfParse, 'i');
                            processingTagName(contextOfParse, 'v');
                            processingTagName(contextOfParse, ' ');
                            processingTagBody(contextOfParse, 'd');
                            processingTagAttributeName(contextOfParse, 'a');
                            processingTagAttributeName(contextOfParse, 't');
                            processingTagAttributeName(contextOfParse, 'a');
                            processingTagAttributeName(contextOfParse, '=');
                            processingTagAttributeToValue(contextOfParse, '|');

                            it('contextOfParse.state is TEXT', function () {
                                expect(contextOfParse.state).toBe(states.TEXT);
                            });

                            it('contextOfParse.buffer is correct', function () {
                                expect(contextOfParse.buffer).toBe('a<div data=|');
                            });

                            it('contextOfParse.textBuffer is correct', function () {
                                expect(contextOfParse.textBuffer).toBe('a<div data=|');
                            });
                        });

                        describe('to TEXT when tag closed', function () {
                            var contextOfParse = new ContextOfParse();
                            processingText(contextOfParse, 'a');
                            processingText(contextOfParse, '<');
                            processingTagStart(contextOfParse, 'd');
                            processingTagName(contextOfParse, 'i');
                            processingTagName(contextOfParse, 'v');
                            processingTagName(contextOfParse, ' ');
                            processingTagBody(contextOfParse, 'd');
                            processingTagAttributeName(contextOfParse, 'a');
                            processingTagAttributeName(contextOfParse, 't');
                            processingTagAttributeName(contextOfParse, 'a');
                            processingTagAttributeName(contextOfParse, '>');

                            it('contextOfParse.state is TEXT', function () {
                                expect(contextOfParse.state).toBe(states.TEXT);
                            });

                            it('contextOfParse.buffer is correct', function () {
                                expect(contextOfParse.buffer).toBe('');
                            });

                            it('contextOfParse.textBuffer is correct', function () {
                                expect(contextOfParse.textBuffer).toBe('');
                            });

                            it('contextOfParse.attributeName is correct', function () {
                                expect(contextOfParse.attributeName).toBe('data');
                            });

                            it('attributes is object', function () {
                                expect(contextOfParse.attributes).toEqual(jasmine.any(Object));
                            });

                            it('attribute defined', function () {
                                expect(contextOfParse.attributes['data']).toBeDefined();
                            });

                            it('attribute has correct value', function () {
                                expect(contextOfParse.attributes['data']).toBe('');
                            });

                            describe('textNode', function () {
                                var textNode = contextOfParse.result.childNodes[0];
                                it('is define', function () {
                                    expect(textNode).toBeDefined();
                                });
                                it('is TextNode', function () {
                                    expect(textNode instanceof htmlToASTNodes.Text).toBeTruthy();
                                });
                                it('correct textNode.text', function () {
                                    expect(textNode.text).toBe('a');
                                });
                            });

                            describe('tag', function () {
                                var tag = contextOfParse.result.childNodes[1];
                                it('is define', function () {
                                    expect(tag).toBeDefined();
                                });
                                it('is TextNode', function () {
                                    expect(tag instanceof htmlToASTNodes.Tag).toBeTruthy();
                                });
                                it('correct textNode.text', function () {
                                    expect(tag.name).toBe('div');
                                });
                                it('add to contextOfParse.treeStack', function () {
                                    var treeStack = contextOfParse.treeStack,
                                        contextOfParseResult = contextOfParse.result;
                                    expect(treeStack.length).toBe(2);
                                    expect(treeStack[0]).toBe(contextOfParseResult);
                                    expect(treeStack[1]).toBe(contextOfParseResult.childNodes[1]);
                                });

                                it('attributes is object', function () {
                                    expect(tag.attributes).toEqual(jasmine.any(Object));
                                });

                                it('attribute defined', function () {
                                    expect(tag.attributes['data']).toBeDefined();
                                });

                                it('attribute has correct value', function () {
                                    expect(tag.attributes['data']).toBe('');
                                });
                            });

                        });

                        describe('to TAG_ATTRIBUTE_VALUE for \'\'\'', function () {
                            var contextOfParse = new ContextOfParse();
                            processingText(contextOfParse, 'a');
                            processingText(contextOfParse, '<');
                            processingTagStart(contextOfParse, 'd');
                            processingTagName(contextOfParse, 'i');
                            processingTagName(contextOfParse, 'v');
                            processingTagName(contextOfParse, ' ');
                            processingTagBody(contextOfParse, 'd');
                            processingTagAttributeName(contextOfParse, 'a');
                            processingTagAttributeName(contextOfParse, 't');
                            processingTagAttributeName(contextOfParse, 'a');
                            processingTagAttributeName(contextOfParse, '=');
                            processingTagAttributeToValue(contextOfParse, '\'');

                            it('contextOfParse.state is TAG_ATTRIBUTE_VALUE', function () {
                                expect(contextOfParse.state).toBe(states.TAG_ATTRIBUTE_VALUE);
                            });

                            it('contextOfParse.buffer is correct', function () {
                                expect(contextOfParse.buffer).toBe('a<div data=\'');
                            });

                            it('contextOfParse.textBuffer is correct', function () {
                                expect(contextOfParse.textBuffer).toBe('a');
                            });

                            it('contextOfParse.attributeName is correct', function () {
                                expect(contextOfParse.attributeName).toBe('data');
                            });

                            it('contextOfParse.attributeValueSeparator is correct', function () {
                                expect(contextOfParse.attributeValueSeparator).toBe('\'');
                            });

                            it('contextOfParse.attributeValueSeparator is correct', function () {
                                expect(contextOfParse.attributeValue).toBe('');
                            });
                        });

                        describe('to TAG_ATTRIBUTE_VALUE for \'"\'', function () {
                            var contextOfParse = new ContextOfParse();
                            processingText(contextOfParse, 'a');
                            processingText(contextOfParse, '<');
                            processingTagStart(contextOfParse, 'd');
                            processingTagName(contextOfParse, 'i');
                            processingTagName(contextOfParse, 'v');
                            processingTagName(contextOfParse, ' ');
                            processingTagBody(contextOfParse, 'd');
                            processingTagAttributeName(contextOfParse, 'a');
                            processingTagAttributeName(contextOfParse, 't');
                            processingTagAttributeName(contextOfParse, 'a');
                            processingTagAttributeName(contextOfParse, '=');
                            processingTagAttributeToValue(contextOfParse, '"');

                            it('contextOfParse.state is TAG_ATTRIBUTE_VALUE', function () {
                                expect(contextOfParse.state).toBe(states.TAG_ATTRIBUTE_VALUE);
                            });

                            it('contextOfParse.buffer is correct', function () {
                                expect(contextOfParse.buffer).toBe('a<div data="');
                            });

                            it('contextOfParse.textBuffer is correct', function () {
                                expect(contextOfParse.textBuffer).toBe('a');
                            });

                            it('contextOfParse.attributeName is correct', function () {
                                expect(contextOfParse.attributeName).toBe('data');
                            });

                            it('contextOfParse.attributeValueSeparator is correct', function () {
                                expect(contextOfParse.attributeValueSeparator).toBe('"');
                            });

                            it('contextOfParse.attributeName is correct', function () {
                                expect(contextOfParse.attributeValue).toBe('');
                            });
                        });

                        describe('to TAG_BODY for attribute without value', function () {
                            var contextOfParse = new ContextOfParse();
                            processingText(contextOfParse, 'a');
                            processingText(contextOfParse, '<');
                            processingTagStart(contextOfParse, 'd');
                            processingTagName(contextOfParse, 'i');
                            processingTagName(contextOfParse, 'v');
                            processingTagName(contextOfParse, ' ');
                            processingTagBody(contextOfParse, 'd');
                            processingTagAttributeName(contextOfParse, 'a');
                            processingTagAttributeName(contextOfParse, 't');
                            processingTagAttributeName(contextOfParse, 'a');
                            processingTagAttributeName(contextOfParse, ' ');

                            it('contextOfParse.state is TAG_BODY', function () {
                                expect(contextOfParse.state).toBe(states.TAG_BODY);
                            });

                            it('contextOfParse.buffer is correct', function () {
                                expect(contextOfParse.buffer).toBe('a<div data ');
                            });

                            it('contextOfParse.textBuffer is correct', function () {
                                expect(contextOfParse.textBuffer).toBe('a');
                            });

                            it('contextOfParse.attributeName is correct', function () {
                                expect(contextOfParse.attributeName).toBe('data');
                            });

                            it('attributes is object', function () {
                                expect(contextOfParse.attributes).toEqual(jasmine.any(Object));
                            });
                            it('attribute defined', function () {
                                expect(contextOfParse.attributes['data']).toBeDefined();
                            });
                            it('attribute has correct value', function () {
                                expect(contextOfParse.attributes['data']).toBe('');
                            });


                        });

                        describe('to TAG_CLOSE for attribute without value', function () {
                            var contextOfParse = new ContextOfParse();
                            processingText(contextOfParse, 'a');
                            processingText(contextOfParse, '<');
                            processingTagStart(contextOfParse, 'd');
                            processingTagName(contextOfParse, 'i');
                            processingTagName(contextOfParse, 'v');
                            processingTagName(contextOfParse, ' ');
                            processingTagBody(contextOfParse, 'd');
                            processingTagAttributeName(contextOfParse, 'a');
                            processingTagAttributeName(contextOfParse, 't');
                            processingTagAttributeName(contextOfParse, 'a');
                            processingTagAttributeName(contextOfParse, '/');

                            it('contextOfParse.state is TAG_CLOSE', function () {
                                expect(contextOfParse.state).toBe(states.TAG_CLOSE);
                            });

                            it('contextOfParse.buffer is correct', function () {
                                expect(contextOfParse.buffer).toBe('a<div data/');
                            });

                            it('contextOfParse.textBuffer is correct', function () {
                                expect(contextOfParse.textBuffer).toBe('a');
                            });

                            it('contextOfParse.attributeName is correct', function () {
                                expect(contextOfParse.attributeName).toBe('data');
                            });

                            it('attributes is object', function () {
                                expect(contextOfParse.attributes).toEqual(jasmine.any(Object));
                            });
                            it('attribute defined', function () {
                                expect(contextOfParse.attributes['data']).toBeDefined();
                            });
                            it('attribute has correct value', function () {
                                expect(contextOfParse.attributes['data']).toBe('');
                            });

                        });
                    });
                });

                describe('processingTagAttributeValue', function () {
                    var processingTagAttributeValue = processings.processingTagAttributeValue,
                        processingTagAttributeToValue = processings.processingTagAttributeToValue,
                        processingTagAttributeName = processings.processingTagAttributeName,
                        processingTagBody = processings.processingTagBody,
                        processingText = processings.processingText,
                        processingTagStart = processings.processingTagStart,
                        processingTagName = processings.processingTagName;

                    it('was exported', function () {
                        expect(processingTagAttributeToValue).toBeDefined();
                    });

                    describe('change state', function () {
                        describe('to TAG_ATTRIBUTE_VALUE_END', function () {
                            var contextOfParse = new ContextOfParse();
                            processingText(contextOfParse, 'a');
                            processingText(contextOfParse, '<');
                            processingTagStart(contextOfParse, 'd');
                            processingTagName(contextOfParse, 'i');
                            processingTagName(contextOfParse, 'v');
                            processingTagName(contextOfParse, ' ');
                            processingTagBody(contextOfParse, 'd');
                            processingTagAttributeName(contextOfParse, 'a');
                            processingTagAttributeName(contextOfParse, 't');
                            processingTagAttributeName(contextOfParse, 'a');
                            processingTagAttributeName(contextOfParse, '=');
                            processingTagAttributeToValue(contextOfParse, '"');
                            processingTagAttributeValue(contextOfParse, 'a');
                            processingTagAttributeValue(contextOfParse, '"');

                            it('contextOfParse.state is TAG_ATTRIBUTE_VALUE_END', function () {
                                expect(contextOfParse.state).toBe(states.TAG_ATTRIBUTE_VALUE_END);
                            });

                            it('contextOfParse.buffer is correct', function () {
                                expect(contextOfParse.buffer).toBe('a<div data="a"');
                            });

                            it('contextOfParse.textBuffer is correct', function () {
                                expect(contextOfParse.textBuffer).toBe('a');
                            });

                            it('contextOfParse.attributes is object', function () {
                                expect(contextOfParse.attributes).toEqual(jasmine.any(Object));
                            });
                            it('attribute defined', function () {
                                expect(contextOfParse.attributes['data']).toBeDefined();
                            });
                            it('attribute has correct value', function () {
                                expect(contextOfParse.attributes['data']).toBe('a');
                            });
                        });

                    });
                });

                describe('processingAttributeValueEnd', function () {
                    var processingAttributeValueEnd = processings.processingAttributeValueEnd,
                        processingTagAttributeValue = processings.processingTagAttributeValue,
                        processingTagAttributeToValue = processings.processingTagAttributeToValue,
                        processingTagAttributeName = processings.processingTagAttributeName,
                        processingTagBody = processings.processingTagBody,
                        processingText = processings.processingText,
                        processingTagStart = processings.processingTagStart,
                        processingTagName = processings.processingTagName;

                    it('was exported', function () {
                        expect(processingAttributeValueEnd).toBeDefined();
                    });

                    describe('change state', function () {
                        describe('to TEXT when incorrect symbol', function () {
                            var contextOfParse = new ContextOfParse();
                            processingText(contextOfParse, 'a');
                            processingText(contextOfParse, '<');
                            processingTagStart(contextOfParse, 'd');
                            processingTagName(contextOfParse, 'i');
                            processingTagName(contextOfParse, 'v');
                            processingTagName(contextOfParse, ' ');
                            processingTagBody(contextOfParse, 'd');
                            processingTagAttributeName(contextOfParse, 'a');
                            processingTagAttributeName(contextOfParse, 't');
                            processingTagAttributeName(contextOfParse, 'a');
                            processingTagAttributeName(contextOfParse, '=');
                            processingTagAttributeToValue(contextOfParse, '"');
                            processingTagAttributeValue(contextOfParse, 'a');
                            processingTagAttributeValue(contextOfParse, '"');
                            processingAttributeValueEnd(contextOfParse, '.');

                            it('contextOfParse.state is TEXT', function () {
                                expect(contextOfParse.state).toBe(states.TEXT);
                            });

                            it('contextOfParse.buffer is correct', function () {
                                expect(contextOfParse.buffer).toBe('a<div data="a".');
                            });

                            it('contextOfParse.textBuffer is correct', function () {
                                expect(contextOfParse.textBuffer).toBe('a<div data="a".');
                            });

                        });

                        describe('to TEXT when \'>\' after attributeValueSeparator', function () {
                            var contextOfParse = new ContextOfParse();
                            processingText(contextOfParse, 'a');
                            processingText(contextOfParse, '<');
                            processingTagStart(contextOfParse, 'd');
                            processingTagName(contextOfParse, 'i');
                            processingTagName(contextOfParse, 'v');
                            processingTagName(contextOfParse, ' ');
                            processingTagBody(contextOfParse, 'd');
                            processingTagAttributeName(contextOfParse, 'a');
                            processingTagAttributeName(contextOfParse, 't');
                            processingTagAttributeName(contextOfParse, 'a');
                            processingTagAttributeName(contextOfParse, '=');
                            processingTagAttributeToValue(contextOfParse, '"');
                            processingTagAttributeValue(contextOfParse, 'a');
                            processingTagAttributeValue(contextOfParse, '"');
                            processingAttributeValueEnd(contextOfParse, '>');

                            it('contextOfParse.state is TEXT', function () {
                                expect(contextOfParse.state).toBe(states.TEXT);
                            });

                            it('contextOfParse.buffer is correct', function () {
                                expect(contextOfParse.buffer).toBe('');
                            });

                            it('contextOfParse.textBuffer is correct', function () {
                                expect(contextOfParse.textBuffer).toBe('');
                            });

                            describe('textNode', function () {
                                var textNode = contextOfParse.result.childNodes[0];
                                it('is define', function () {
                                    expect(textNode).toBeDefined();
                                });
                                it('is TextNode', function () {
                                    expect(textNode instanceof htmlToASTNodes.Text).toBeTruthy();
                                });
                                it('correct textNode.text', function () {
                                    expect(textNode.text).toBe('a');
                                });
                            });

                            describe('tag', function () {
                                var tag = contextOfParse.result.childNodes[1];
                                it('is define', function () {
                                    expect(tag).toBeDefined();
                                });
                                it('is TextNode', function () {
                                    expect(tag instanceof htmlToASTNodes.Tag).toBeTruthy();
                                });
                                it('correct textNode.text', function () {
                                    expect(tag.name).toBe('div');
                                });
                                it('add to contextOfParse.treeStack', function () {
                                    var treeStack = contextOfParse.treeStack,
                                        contextOfParseResult = contextOfParse.result;
                                    expect(treeStack.length).toBe(2);
                                    expect(treeStack[0]).toBe(contextOfParseResult);
                                    expect(treeStack[1]).toBe(contextOfParseResult.childNodes[1]);
                                });

                                it('attributes is object', function () {
                                    expect(tag.attributes).toEqual(jasmine.any(Object));
                                });

                                it('attribute defined', function () {
                                    expect(tag.attributes['data']).toBeDefined();
                                });

                                it('attribute has correct value', function () {
                                    expect(tag.attributes['data']).toBe('a');
                                });
                            });

                        });

                        describe('to TAG_BODY', function () {
                            var contextOfParse = new ContextOfParse();
                            processingText(contextOfParse, 'a');
                            processingText(contextOfParse, '<');
                            processingTagStart(contextOfParse, 'd');
                            processingTagName(contextOfParse, 'i');
                            processingTagName(contextOfParse, 'v');
                            processingTagName(contextOfParse, ' ');
                            processingTagBody(contextOfParse, 'd');
                            processingTagAttributeName(contextOfParse, 'a');
                            processingTagAttributeName(contextOfParse, 't');
                            processingTagAttributeName(contextOfParse, 'a');
                            processingTagAttributeName(contextOfParse, '=');
                            processingTagAttributeToValue(contextOfParse, '"');
                            processingTagAttributeValue(contextOfParse, 'a');
                            processingTagAttributeValue(contextOfParse, '"');
                            processingAttributeValueEnd(contextOfParse, '\t');

                            it('contextOfParse.state is TAG_BODY', function () {
                                expect(contextOfParse.state).toBe(states.TAG_BODY);
                            });

                            it('contextOfParse.buffer is correct', function () {
                                expect(contextOfParse.buffer).toBe('a<div data="a"\t');
                            });

                            it('contextOfParse.textBuffer is correct', function () {
                                expect(contextOfParse.textBuffer).toBe('a');
                            });

                            it('contextOfParse.attributes is object', function () {
                                expect(contextOfParse.attributes).toEqual(jasmine.any(Object));
                            });
                            it('attribute defined', function () {
                                expect(contextOfParse.attributes['data']).toBeDefined();
                            });
                            it('attribute has correct value', function () {
                                expect(contextOfParse.attributes['data']).toBe('a');
                            });

                        });

                        describe('to TAG_CLOSE', function () {
                            var contextOfParse = new ContextOfParse();
                            processingText(contextOfParse, 'a');
                            processingText(contextOfParse, '<');
                            processingTagStart(contextOfParse, 'd');
                            processingTagName(contextOfParse, 'i');
                            processingTagName(contextOfParse, 'v');
                            processingTagName(contextOfParse, ' ');
                            processingTagBody(contextOfParse, 'd');
                            processingTagAttributeName(contextOfParse, 'a');
                            processingTagAttributeName(contextOfParse, 't');
                            processingTagAttributeName(contextOfParse, 'a');
                            processingTagAttributeName(contextOfParse, '=');
                            processingTagAttributeToValue(contextOfParse, '"');
                            processingTagAttributeValue(contextOfParse, 'a');
                            processingTagAttributeValue(contextOfParse, '"');
                            processingAttributeValueEnd(contextOfParse, '/');

                            it('contextOfParse.state is TAG_CLOSE', function () {
                                expect(contextOfParse.state).toBe(states.TAG_CLOSE);
                            });

                            it('contextOfParse.buffer is correct', function () {
                                expect(contextOfParse.buffer).toBe('a<div data="a"/');
                            });

                            it('contextOfParse.textBuffer is correct', function () {
                                expect(contextOfParse.textBuffer).toBe('a');
                            });

                            it('contextOfParse.attributes is object', function () {
                                expect(contextOfParse.attributes).toEqual(jasmine.any(Object));
                            });
                            it('attribute defined', function () {
                                expect(contextOfParse.attributes['data']).toBeDefined();
                            });
                            it('attribute has correct value', function () {
                                expect(contextOfParse.attributes['data']).toBe('a');
                            });

                        });

                    });


                });

                describe('processing 2 attributes', function () {
                    var processingAttributeValueEnd = processings.processingAttributeValueEnd,
                        processingTagAttributeValue = processings.processingTagAttributeValue,
                        processingTagAttributeToValue = processings.processingTagAttributeToValue,
                        processingTagAttributeName = processings.processingTagAttributeName,
                        processingTagBody = processings.processingTagBody,
                        processingText = processings.processingText,
                        processingTagStart = processings.processingTagStart,
                        processingTagName = processings.processingTagName;

                    var contextOfParse = new ContextOfParse();

                    processingText(contextOfParse, 'a');
                    processingText(contextOfParse, '<');
                    processingTagStart(contextOfParse, 'd');
                    processingTagName(contextOfParse, 'i');
                    processingTagName(contextOfParse, 'v');
                    processingTagName(contextOfParse, ' ');
                    processingTagBody(contextOfParse, 'd');
                    processingTagAttributeName(contextOfParse, 'a');
                    processingTagAttributeName(contextOfParse, 't');
                    processingTagAttributeName(contextOfParse, 'a');
                    processingTagAttributeName(contextOfParse, '=');
                    processingTagAttributeToValue(contextOfParse, '"');
                    processingTagAttributeValue(contextOfParse, 'a');
                    processingTagAttributeValue(contextOfParse, '"');
                    processingAttributeValueEnd(contextOfParse, ' ');
                    processingTagBody(contextOfParse, 'i');
                    processingTagAttributeName(contextOfParse, 'd');
                    processingTagAttributeName(contextOfParse, '=');
                    processingTagAttributeToValue(contextOfParse, '\'');
                    processingTagAttributeValue(contextOfParse, 'b');
                    processingTagAttributeValue(contextOfParse, '\'');
                    processingAttributeValueEnd(contextOfParse, ' ');

                    it('contextOfParse.state is TAG_BODY', function () {
                        expect(contextOfParse.state).toBe(states.TAG_BODY);
                    });

                    it('contextOfParse.buffer is correct', function () {
                        expect(contextOfParse.buffer).toBe('a<div data="a" id=\'b\' ');
                    });

                    it('contextOfParse.textBuffer is correct', function () {
                        expect(contextOfParse.textBuffer).toBe('a');
                    });

                    it('contextOfParse.attributes is object', function () {
                        expect(contextOfParse.attributes).toEqual(jasmine.any(Object));
                    });

                    it('attribute \'data\' defined', function () {
                        expect(contextOfParse.attributes['data']).toBeDefined();
                    });
                    it('attribute \'data\' has correct value', function () {
                        expect(contextOfParse.attributes['data']).toBe('a');
                    });

                    it('attribute \'id\' defined', function () {
                        expect(contextOfParse.attributes['id']).toBeDefined();
                    });
                    it('attribute \'id\' has correct value', function () {
                        expect(contextOfParse.attributes['id']).toBe('b');
                    });

                });

                describe('processingTagClose', function () {
                    var processingTagClose = processings.processingTagClose,
                        processingText = processings.processingText,
                        processingTagStart = processings.processingTagStart,
                        processingTagName = processings.processingTagName;

                    it('was export', function () {
                        expect(processingTagClose).toBeDefined();
                    });

                    describe('change state', function () {
                        describe('to TEXT when not \'>\' after \'/\' ', function () {
                            var contextOfParse = new ContextOfParse();

                            processingText(contextOfParse, 'a');
                            processingText(contextOfParse, '<');
                            processingTagStart(contextOfParse, 's');
                            processingTagName(contextOfParse, 't');
                            processingTagName(contextOfParse, '/');
                            processingTagClose(contextOfParse, ' ');

                            it('contextOfParse.state is TEXT', function () {
                                expect(contextOfParse.state).toBe(states.TEXT);
                            });
                            it('contextOfParse.buffer is correct', function () {
                                expect(contextOfParse.buffer).toBe('a<st/ ');
                            });
                            it('contextOfParse.textBuffer is correct', function () {
                                expect(contextOfParse.textBuffer).toBe('a<st/ ');
                            });

                        });

                        describe('to TEXT when \'>\' after \'/\' ', function () {
                            var contextOfParse = new ContextOfParse();

                            processingText(contextOfParse, 'a');
                            processingText(contextOfParse, '<');
                            processingTagStart(contextOfParse, 's');
                            processingTagName(contextOfParse, 't');
                            processingTagName(contextOfParse, '/');
                            processingTagClose(contextOfParse, '>');

                            it('contextOfParse.state is TEXT', function () {
                                expect(contextOfParse.state).toBe(states.TEXT);
                            });
                            it('contextOfParse.buffer is correct', function () {
                                expect(contextOfParse.buffer).toBe('');
                            });
                            it('contextOfParse.textBuffer is correct', function () {
                                expect(contextOfParse.textBuffer).toBe('');
                            });

                            describe('textNode', function () {
                                var textNode = contextOfParse.result.childNodes[0];
                                it('is define', function () {
                                    expect(textNode).toBeDefined();
                                });
                                it('is TextNode', function () {
                                    expect(textNode instanceof htmlToASTNodes.Text).toBeTruthy();
                                });
                                it('correct textNode.text', function () {
                                    expect(textNode.text).toBe('a');
                                });
                            });

                            describe('tag', function () {
                                var tag = contextOfParse.result.childNodes[1];
                                it('is define', function () {
                                    expect(tag).toBeDefined();
                                });
                                it('is Tag', function () {
                                    expect(tag instanceof htmlToASTNodes.Tag).toBeTruthy();
                                });
                                it('correct textNode.text', function () {
                                    expect(tag.name).toBe('st');
                                });
                                it('not add to contextOfParse.treeStack', function () {
                                    var treeStack = contextOfParse.treeStack;
                                    expect(treeStack.length).toBe(1);
                                    expect(treeStack[0]).toBe(contextOfParse.result);
                                });
                            });

                        });
                    });



                });


            });

        });

        it('any AST root is Fragment', function () {
            var ast = htmlToAST.parse('');
            expect(ast instanceof htmlToASTNodes.Fragment).toBeTruthy();
        });

        describe('one span', function () {

            var ast = htmlToAST.parse(createDefaultSpan()),
                span = ast.childNodes[0];

            defaultDivTests(span);

        });

        describe('one div with attributes', function () {

            var ast = htmlToAST.parse(createDefaultDiv()),
                div = ast.childNodes[0];

            defaultDivTests(div);

        });


        describe('2 linear tags', function () {

            var ast = htmlToAST.parse(createDefaultSpan() + createDefaultDiv()),
                span = ast.childNodes[0],
                div = ast.childNodes[1];

            describe('span', function () {
                defaultSpanTests(span);
            });

            describe('div', function () {
                defaultDivTests(div);
            });

        });

        describe('2 nested divs', function () {
            var ast = htmlToAST.parse(createDefaultDiv(createDefaultDiv())),
                div1 = ast.childNodes[0],
                div2 = ast.childNodes[0].childNodes[0];

            describe('parent div', function () {
                defaultDivTests(div1);
            });

            describe('children div', function () {
                defaultDivTests(div2);
            });

        })

    });



});