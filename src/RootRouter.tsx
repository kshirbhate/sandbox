import React, { Suspense, lazy } from 'react';
import { Switch, Route } from 'react-router-dom';
import App from './components/App';
import { getAccessToken } from 'utils/localStorage';
import { isEmpty } from 'lodash';

const Home = lazy(() => import(/* webpackChunkName: "Home" */ './components/Home/Home'));
const FeatureEntity = lazy(() => import(/* webpackChunkName: "FeatureEntity" */ './components/Feature/FeatureEntity'));
const Login = lazy(() => import(/* webpackChunkName: "Login" */ './components/Session/Login'));
const Context = lazy(() => import(/* webpackChunkName: "Context" */ './components/Session/Context'));

const AuthRoute = ({ component: Component, ...rest }) => {
  const valid = !isEmpty(getAccessToken());
  return <Route {...rest} render={(props) => (valid ? <Component {...props} /> : <Login />)} />;
};

const RootRouter = () => (
  <App>
    <Suspense fallback={null}>
      <Switch>
        <AuthRoute exact path={'/'} component={Login} />
        <AuthRoute exact path={'/context'} component={Context} />
        <AuthRoute exact path={'/home'} component={Home} />
        <AuthRoute exact path={'/feature-entity'} component={FeatureEntity} />
        {/* This route should always be last */}
        <Route exact path={'*'} render={() => <Login />} />
      </Switch>
    </Suspense>
  </App>
);

export default RootRouter;
