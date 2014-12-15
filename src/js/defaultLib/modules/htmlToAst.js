(function (global) {
    var defaultLib = global.DL,
        htmlToAST = {
            nodes: {},
            helpers: {},
            parse: null
        };



    /*
     * Nodes
     *
     * AST nodes
     * */

    //
    // Fragment
    //
    (function () {

        function Fragment () {
            var fragment = this;
            fragment.type = 'fragment';
            fragment.childNodes = [];
        }

        htmlToAST.nodes.Fragment = Fragment;
    } ());

    //
    // Tag
    //
    (function () {

        function Tag (name, attributes) {
            var tag = this;
            tag.type = 'tag';
            tag.childNodes = [];
            tag.name = name;
            tag.attributes = attributes || {};
        }

        htmlToAST.nodes.Tag = Tag;
    } ());

    //
    // Text
    //
    (function () {

        function Text (textContent) {
            var text = this;
            text.type = 'text';
            text.text = textContent;

        }

        htmlToAST.nodes.Text = Text;
    } ());

    //
    // Comment
    //
    (function () {

        function Comment (commentContent) {
            var comment = this;
            comment.type = 'comment';
            comment.text = commentContent;
        }

        htmlToAST.nodes.Comment = Comment;
    } ());



    /*
     * /Nodes
     */


    /*
     * helpers
     *
     * AST helpers
     * */

    //
    // appendChild()
    //
    (function () {
        /**
         *
         * @param {ASTNode} nodeTo
         * @param {ASTNode} node
         */
        htmlToAST.helpers.appendChild = function (nodeTo, node) {
            nodeTo.childNodes.push(node);
        };
    } ());

    /*
     * /helpers
     */

    /**
     *
     * @param {String} html
     * @return {Object} ast
     */
    function parse (html) {
        return {};
    }

    (function () {
        var nodes = htmlToAST.nodes,
            helpers = htmlToAST.nodes,
            statesTable = {
                '<': 'in decrypting',
                '<*': 'tag',
                '</': 'closed tag',
                '<!': 'comment',
                '/>': 'tag closed',
                't': 'text'
            },
            space = ' ',

            buffer = '';

        var stateId = 0,

            TEXT = stateId++,

            TAG_START = stateId++,
            TAG_NAME = stateId++,
            TAG_BODY = stateId++,
            TAG_CLOSE = stateId++,

            DECLARATION = stateId++;

        /*@DTesting.exports*/

            var testingExportsForStates = DL.getObjectSafely(DTesting.exports, 'DL', 'htmlToAST');
            testingExportsForStates.states = {
                TEXT: TEXT,

                TAG_START: TAG_START,
                TAG_NAME: TAG_NAME,
                TAG_BODY: TAG_BODY,
                TAG_CLOSE: TAG_CLOSE,

                DECLARATION: DECLARATION
            };

        /*@/DTesting.exports*/

        var letterTestRegExp = /[A-Za-z]/,
            tagNameCorrectSymbolRegExp = /\w|-/,
            whiteSpaceRegExp = /\s/;

        /*@DTesting.exports*/
        var testingExports = DL.getObjectSafely(DTesting.exports, 'DL', 'htmlToAST');
        testingExports.letterTestRegExp = letterTestRegExp;
        testingExports.tagNameCorrectSymbolRegExp = tagNameCorrectSymbolRegExp;
        /*@/DTesting.exports*/

        function isWhiteSpace (char) {
            return whiteSpaceRegExp.test(char);
        }

        function ContextOfParse () {
            var contextOfParse = this,
                root = new nodes.Fragment();

            contextOfParse.state = TEXT;
            contextOfParse.buffer = '';
            contextOfParse.treeStack = [root];
            contextOfParse.charIndex = 0;
            contextOfParse.result = root;

            contextOfParse.tagname = '';

            contextOfParse.attributeName = '';
            contextOfParse.attributeValue = '';

            contextOfParse.attributes = null;
        }

        ContextOfParse.destructor = function () {
            var contextOfParse = this;
            contextOfParse.state = null;
            contextOfParse.buffer = null;
            contextOfParse.treeStack = null;
            contextOfParse.charIndex = null;
            contextOfParse.result = null;
            contextOfParse.tagname = null;
            contextOfParse.attributeName = null;
            contextOfParse.attributeValue = null;
            contextOfParse.attributes = null;
        };

        /*@DTesting.exports*/
        DL.getObjectSafely(DTesting.exports, 'DL', 'htmlToAST').ContextOfParse = ContextOfParse;
        /*@/DTesting.exports*/


        function processingText (contextOfParse, char) {
            switch (char) {
                case '<':
                    contextOfParse.state = TAG_START;
                    contextOfParse.buffer += char;
                    break;
                default:
                    contextOfParse.buffer += char;
            }
        }

        /*@DTesting.exports*/
        DL.getObjectSafely(DTesting.exports, 'DL', 'htmlToAST', 'processings').processingText = processingText;
        /*@/DTesting.exports*/

        function processingTagStart (contextOfParse, char) {
            var isChar = letterTestRegExp.test(char);
            if (isChar) {
                contextOfParse.state = TAG_NAME;
                contextOfParse.tagname = char;
            } else {
                switch (char) {
                    case '!':
                        contextOfParse.state = DECLARATION;
                        break;

                    default:
                        contextOfParse.state = TEXT;
                }
            }
            contextOfParse.buffer += char;
        }

        /*@DTesting.exports*/
        DL.getObjectSafely(DTesting.exports, 'DL', 'htmlToAST', 'processings').processingTagStart = processingTagStart;
        /*@/DTesting.exports*/

        function processingTagName (contextOfParse, char) {
            var isCorrect = tagNameCorrectSymbolRegExp.test(char);
            if (isCorrect) {
                contextOfParse.tagname += char;
            } else if (isWhiteSpace(char)) {
                contextOfParse.buffer += contextOfParse.tagname + char;
                contextOfParse.state = TAG_BODY;
            } else if (char === '/'){
                contextOfParse.state = TEXT;
            } else {
                contextOfParse.state = TEXT;
            }
        }

        /*@DTesting.exports*/
        DL.getObjectSafely(DTesting.exports, 'DL', 'htmlToAST', 'processings').processingTagName = processingTagName;
        /*@/DTesting.exports*/

        function processingTagBody (contextOfParse, char) {

        }

        /*@DTesting.exports*/
        DL.getObjectSafely(DTesting.exports, 'DL', 'htmlToAST', 'processings').processingTagBody = processingTagBody;
        /*@/DTesting.exports*/


        /**
         *
         * @param {String} html
         * @return {Object} ast
         */
        function parse (html) {
            var contextOfParse = new ContextOfParse();

            defaultLib.cycle(html, function (char) {
                switch (contextOfParse.state) {
                    case TEXT:
                        processingText(contextOfParse, char);
                        break;
                    case TAG_START:
                        processingTagStart(contextOfParse, char);
                        break;
                    case TAG_NAME:
                        processingTagName(contextOfParse, char);
                        break;
                    case TAG_BODY:
                        processingTagBody(contextOfParse, char);
                        break;


                }
            });

            return contextOfParse.result;
        }

        htmlToAST.parse = parse;
    } ());

    defaultLib.htmlToAST = htmlToAST;
} (this));