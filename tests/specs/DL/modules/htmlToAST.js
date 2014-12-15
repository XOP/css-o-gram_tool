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
            expect(span instanceof htmlToASTNodes.Tag).toBe(true);
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
            expect(div instanceof htmlToASTNodes.Tag).toBe(true);
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

            describe('letterTestRegExp', function () {
                var letterTestRegExp = DTesting.exports.DL.htmlToAST.letterTestRegExp;

                it('letter is letter', function () {
                    expect(letterTestRegExp.test('A')).toBe(true);
                    expect(letterTestRegExp.test('Z')).toBe(true);
                    expect(letterTestRegExp.test('a')).toBe(true);
                    expect(letterTestRegExp.test('z')).toBe(true);
                    expect(letterTestRegExp.test('F')).toBe(true);
                    expect(letterTestRegExp.test('f')).toBe(true);
                });
                it('/ is not letter', function () {
                    expect(letterTestRegExp.test('/')).toBe(false);
                });
                it('! is not letter', function () {
                    expect(letterTestRegExp.test('!')).toBe(false);
                });
                it('- is not letter', function () {
                    expect(letterTestRegExp.test('-')).toBe(false);
                });
                it('_ is not letter', function () {
                    expect(letterTestRegExp.test('_')).toBe(false);
                });
                it('\' \' is not letter', function () {
                    expect(letterTestRegExp.test(' ')).toBe(false);
                });
                it('number is not letter', function () {
                    expect(letterTestRegExp.test('0')).toBe(false);
                    expect(letterTestRegExp.test('1')).toBe(false);
                    expect(letterTestRegExp.test('2')).toBe(false);
                    expect(letterTestRegExp.test('3')).toBe(false);
                    expect(letterTestRegExp.test('4')).toBe(false);
                    expect(letterTestRegExp.test('4')).toBe(false);
                    expect(letterTestRegExp.test('6')).toBe(false);
                    expect(letterTestRegExp.test('7')).toBe(false);
                    expect(letterTestRegExp.test('8')).toBe(false);
                    expect(letterTestRegExp.test('9')).toBe(false);
                });

            });

            describe('tagNameCorrectSymbolRegExp', function () {
                var tagNameCorrectSymbolRegExp = DTesting.exports.DL.htmlToAST.tagNameCorrectSymbolRegExp;

                it('letter is correct', function () {
                    expect(tagNameCorrectSymbolRegExp.test('A')).toBe(true);
                    expect(tagNameCorrectSymbolRegExp.test('Z')).toBe(true);
                    expect(tagNameCorrectSymbolRegExp.test('a')).toBe(true);
                    expect(tagNameCorrectSymbolRegExp.test('z')).toBe(true);
                    expect(tagNameCorrectSymbolRegExp.test('F')).toBe(true);
                    expect(tagNameCorrectSymbolRegExp.test('f')).toBe(true);
                });
                it('/ is not correct', function () {
                    expect(tagNameCorrectSymbolRegExp.test('/')).toBe(false);
                });
                it('! is not correct', function () {
                    expect(tagNameCorrectSymbolRegExp.test('!')).toBe(false);
                });
                it('\' \' is not correct', function () {
                    expect(tagNameCorrectSymbolRegExp.test(' ')).toBe(false);
                });
                it('- is correct', function () {
                    expect(tagNameCorrectSymbolRegExp.test('-')).toBe(true);
                });
                it('_ is correct', function () {
                    expect(tagNameCorrectSymbolRegExp.test('_')).toBe(true);
                });
                it('number is correct', function () {
                    expect(tagNameCorrectSymbolRegExp.test('0')).toBe(true);
                    expect(tagNameCorrectSymbolRegExp.test('1')).toBe(true);
                    expect(tagNameCorrectSymbolRegExp.test('2')).toBe(true);
                    expect(tagNameCorrectSymbolRegExp.test('3')).toBe(true);
                    expect(tagNameCorrectSymbolRegExp.test('4')).toBe(true);
                    expect(tagNameCorrectSymbolRegExp.test('4')).toBe(true);
                    expect(tagNameCorrectSymbolRegExp.test('6')).toBe(true);
                    expect(tagNameCorrectSymbolRegExp.test('7')).toBe(true);
                    expect(tagNameCorrectSymbolRegExp.test('8')).toBe(true);
                    expect(tagNameCorrectSymbolRegExp.test('9')).toBe(true);
                });
            });

            describe('syntax analyzers', function () {
                var states = DTesting.exports.DL.htmlToAST.states,
                    processings = DTesting.exports.DL.htmlToAST.processings,
                    ContextOfParse = DTesting.exports.DL.htmlToAST.ContextOfParse;

                it('states did exported', function () {
                    expect(states).toBeDefined();
                });

                it('processings did exported', function () {
                    expect(processings).toBeDefined();
                });

                it('ContextOfParse did exported', function () {
                    expect(ContextOfParse).toBeDefined();
                });

                describe('processings', function () {

                    describe('processingText', function () {
                        var processingText = processings.processingText;

                        it('was exported', function () {
                            expect(processingText).toBeDefined();
                        });

                        it('change state for \'<\'', function () {
                            var contextOfParse = new ContextOfParse();
                            processingText(contextOfParse, '<');
                            expect(contextOfParse.state).toBe(states.TAG_START);
                        });

                        describe('not change state for text', function () {
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

                });


            });
        //
        //    describe('detect state', function () {
        //        var detectState = DTesting.exports.DL.htmlToAST.detectState;
        //
        //        it('tag', function () {
        //            var state;
        //
        //            state = detectState('<');
        //
        //            expect(state).toBe('in decrypting');
        //
        //            state = detectState('a', '<');
        //
        //            expect(state).toBe('tag');
        //
        //        });
        //
        //    });
        //
        });

        it('any AST root is Fragment', function () {
            var ast = htmlToAST.parse('');
            expect(ast instanceof htmlToASTNodes.Fragment).toBe(true);
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