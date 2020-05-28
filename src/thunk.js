const getModel = (models, actionNameSpace) => {
  const matched = Object.keys(models)
    .filter(key => models[key].namespace === actionNameSpace);

  return matched.length > 0 ? models[matched[0]] : null;
};

const put = (model, namespace, next) => function putReducer(reducer) {
  const { reducers } = model;

  if (reducers[reducer.type]) {
    next({
      type: `${namespace}/${reducer.type}`,
      payload: reducer,
    });
  }
};

const call = dispatch => async (service, params, loading) => {
  dispatch({
    type: 'loading/show',
    payload: loading,
  });

  let res;
  try {
    res = await service(params);
  } catch (e) {
    return Promise.reject(new Error(e));
  } finally {
    dispatch({
      type: 'loading/hide',
      payload: loading,
    });
  }

  return Promise.resolve(res);
};

const createThunkMiddleware = models => store => next => (action) => {
  const { dispatch, getState } = store;
  const [actionNameSpace, actionPiece] = action.type.split('/');
  // 拿到当前namespace的model
  const model = getModel(models, actionNameSpace);

  if (model) {
    // 拿到model中对应的action
    const modelAction = model.action ? model.action[actionPiece] : null;
    // 如果有action，调用action函数，action会调用commit，也就是next(action)
    if (modelAction) {
      const commit = put(model, actionNameSpace, next);
      const state = getState()[actionNameSpace];
      // modelAction实际上也是调用commit函数，commit函数的作用是对传入对象的type字段前面拼上namespace的名字
      return modelAction(action, {
        commit, dispatch, state, call: call(dispatch),
      });
    }
    // 如果没有action，则触发reducer
    const commit = put(model, actionNameSpace, next);
    return commit({
      ...action,
      type: actionPiece,
    });
  }
  // 如果没有找到当前
  return next(action);
};

export default createThunkMiddleware;
