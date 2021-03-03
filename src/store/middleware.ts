import { applyMiddleware } from 'redux';
import invariant from 'redux-immutable-state-invariant';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';

export default () => {
  const middleware = [];

  middleware.push(thunk);

  if (process.env.NODE_ENV !== 'production') {
    middleware.push(invariant());
    middleware.push(
      createLogger({
        level: 'log',
        duration: true,
        collapsed: true,
        diff: true,
      })
    );
  }
  return applyMiddleware(...middleware);
};
