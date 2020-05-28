"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es6.regexp.split");

require("core-js/modules/web.dom.iterable");

var _invariant = _interopRequireDefault(require("invariant"));

var _thunk = _interopRequireDefault(require("./thunk"));

var _loading = _interopRequireDefault(require("./loading"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const getReducers = (namespace, defaultState, reducers) => {
  const actionTypes = Object.keys(reducers);
  return (state, action) => {
    const newState = state || defaultState;
    const [actionNameSpace, actionPiece] = action.type.split('/');
    if (actionNameSpace !== namespace) return newState;

    if (actionTypes.indexOf(actionPiece) !== -1) {
      return reducers[actionPiece](newState, action.payload);
    }

    return newState;
  };
};

class Zoom {
  constructor(models) {
    this.models = [];
    this.reducers = {};
    this.transformModels(models);
  }

  registerModel(model) {
    if (!this.models[model.namespace]) {
      this.models[model.namespace] = model;
    }
  }

  transformModels(models) {
    models.push(_loading.default);
    models.forEach(model => {
      const {
        namespace
      } = model; // namespace 必须被定义

      (0, _invariant.default)(namespace, '[app.model] namespace should be defined'); // 并且是字符串

      (0, _invariant.default)(typeof namespace === 'string', "[app.model] namespace should be string, but got ".concat(typeof namespace));

      if (process.env.NODE_ENV === 'development') {
        const exists = models.filter(mod => mod.namespace === namespace); // 并且唯一

        (0, _invariant.default)(exists.length === 1, '[app.model] namespace should be unique');
      } // 注册model


      this.registerModel(model); // 处理每个model中的reducers，生成每个model最终的reducer并注册

      this.reducers[model.namespace] = getReducers(model.namespace, model.state, model.reducers);
    });
  }

  createMiddleware() {
    return (0, _thunk.default)(this.models);
  }

}

var _default = Zoom;
exports.default = _default;