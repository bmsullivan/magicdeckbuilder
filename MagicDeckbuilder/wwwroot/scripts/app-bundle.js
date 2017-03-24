define('deckbuilder-app',['exports'], function (exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var App = exports.App = function () {
        function App() {
            _classCallCheck(this, App);

            this.message = 'Hello World!';
        }

        App.prototype.configureRouter = function configureRouter(config, router) {
            this.router = router;

            config.map([{ route: ['', 'decks/list'], name: 'decks/list', moduleId: 'decks/list' }, { route: ['decks/edit/:id'], name: 'decks/edit', moduleId: 'decks/edit' }]);
        };

        return App;
    }();
});
define('deckbuilder',['exports', './environment'], function (exports, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.configure = configure;

  var _environment2 = _interopRequireDefault(_environment);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  Promise.config({
    warnings: {
      wForgottenReturn: false
    }
  });

  function configure(aurelia) {
    aurelia.use.standardConfiguration().feature('resources');

    if (_environment2.default.debug) {
      aurelia.use.developmentLogging();
    }

    if (_environment2.default.testing) {
      aurelia.use.plugin('aurelia-testing');
    }

    aurelia.start().then(function () {
      return aurelia.setRoot('deckbuilder-app');
    });
  }
});
define('environment',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    debug: true,
    testing: true
  };
});
define('decks/edit',['exports', 'aurelia-fetch-client', 'aurelia-framework'], function (exports, _aureliaFetchClient, _aureliaFramework) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.Edit = undefined;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _createClass = function () {
        function defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
                var descriptor = props[i];
                descriptor.enumerable = descriptor.enumerable || false;
                descriptor.configurable = true;
                if ("value" in descriptor) descriptor.writable = true;
                Object.defineProperty(target, descriptor.key, descriptor);
            }
        }

        return function (Constructor, protoProps, staticProps) {
            if (protoProps) defineProperties(Constructor.prototype, protoProps);
            if (staticProps) defineProperties(Constructor, staticProps);
            return Constructor;
        };
    }();

    var _dec, _class;

    var Edit = exports.Edit = (_dec = (0, _aureliaFramework.inject)(_aureliaFetchClient.HttpClient), _dec(_class = function () {
        function Edit(http) {
            _classCallCheck(this, Edit);

            this.deck = null;

            this.http = http;

            this.http.configure(function (x) {
                return x.useStandardConfiguration().withBaseUrl("/api/");
            });
        }

        Edit.prototype.activate = function activate(params) {
            var _this = this;

            return this.http.fetch('decks/' + params.id).then(function (x) {
                return x.json();
            }).then(function (x) {
                _this.deck = x;
            });
        };

        _createClass(Edit, [{
            key: 'cardList',
            get: function get() {
                return this.deck.cards.map(function (x) {
                    return x.quantity + ' ' + x.name;
                }).join('\n');
            },
            set: function set(val) {
                var cardQuantityStrings = val.split('\n');
                this.deck.cards = cardQuantityStrings.map(function (x) {
                    var firstSpaceIndex = x.indexOf(' ');
                    var card = {
                        quantity: x.substr(0, firstSpaceIndex),
                        name: x.substr(firstSpaceIndex + 1)
                    };
                    return card;
                });
            }
        }]);

        return Edit;
    }()) || _class);
});
define('decks/list',['exports', 'aurelia-fetch-client', 'aurelia-framework'], function (exports, _aureliaFetchClient, _aureliaFramework) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.List = undefined;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _dec, _class;

    var List = exports.List = (_dec = (0, _aureliaFramework.inject)(_aureliaFetchClient.HttpClient), _dec(_class = function () {
        function List(http) {
            _classCallCheck(this, List);

            this.http = http;

            this.http.configure(function (x) {
                return x.useStandardConfiguration().withBaseUrl("/api/");
            });
        }

        List.prototype.activate = function activate() {
            var _this = this;

            return this.http.fetch('decks?userId=' + window.currentUserId).then(function (x) {
                return x.json();
            }).then(function (x) {
                return _this.decks = x;
            });
        };

        return List;
    }()) || _class);
});
define('resources/index',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.configure = configure;
  function configure(config) {}
});
define('text!deckbuilder-app.html', ['module'], function(module) { module.exports = "<template>\n    <router-view />\n</template>\n"; });
define('text!decks/edit.html', ['module'], function(module) { module.exports = "<template>\r\n    <h2>Deck Editor</h2>\r\n    <form role=\"form\">\r\n        <div class=\"row\">\r\n            <div class=\"col-md-12\">\r\n                <div class=\"form-group\">\r\n                    <label class=\"control-label\" for=\"name\">Deck Name</label>\r\n                    <input type=\"text\" class=\"form-control\" value.bind=\"deck.name\" id=\"name\"/>\r\n                </div>\r\n                <div class=\"form-group\">\r\n                    <label class=\"control-label\" for=\"cards\">Cards</label>\r\n                    <textarea class=\"form-control\" value.bind=\"cardList\" id=\"cards\"></textarea>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </form>\r\n</template>"; });
define('text!decks/list.html', ['module'], function(module) { module.exports = "<template>\r\n    <table class=\"table table-striped\">\r\n        <tr><th>Name</th><th></th></tr>\r\n        <tr repeat.for=\"deck of decks\">\r\n            <td>${deck.name}</td>\r\n            <td><a route-href=\"route: decks/edit; params.bind: {id: deck.id}\"><i class=\"fa fa-edit\"></i></a></td>\r\n        </tr>\r\n    </table>\r\n</template>"; });
//# sourceMappingURL=app-bundle.js.map