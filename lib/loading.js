"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es6.symbol");

require("core-js/modules/web.dom.iterable");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _default = {
  namespace: 'loading',
  state: {
    loading: false
  },
  reducers: {
    show(state, _ref) {
      let {
        payload
      } = _ref;
      // 传了 key 值， 则使用key作为键值
      const key = payload || 'loading';
      return _objectSpread(_objectSpread({}, state), {}, {
        [key]: true
      });
    },

    hide(state, _ref2) {
      let {
        payload
      } = _ref2;
      // 传了 key 值， 则使用key作为键值
      const key = payload || 'loading';
      return _objectSpread(_objectSpread({}, state), {}, {
        [key]: false
      });
    }

  }
};
exports.default = _default;