import React, { Suspense, lazy } from 'react';
import { Switch, Route } from 'react-router-dom';
import App from './components/App';

const Home = lazy(() => import(/* webpackChunkName: "Home" */ './components/Home/Home'));
const FeatureEntity = lazy(() => import(/* webpackChunkName: "FeatureEntity" */ './components/Feature/FeatureEntity'));
const Login = lazy(() => import(/* webpackChunkName: "Login" */ './components/Session/Login'));
const Context = lazy(() => import(/* webpackChunkName: "Context" */ './components/Session/Context'));

const RootRouter = () => (
  <App>
    <Suspense fallback={null}>
      <Switch>
        <Route exact path={'/'} render={() => <Login />} />
        <Route exact path={'/context'} render={() => <Context />} />
        <Route exact path={'/feature-entity'} render={() => <FeatureEntity />} />
        {/* This route should always be last */}
        <Route exact path={'*'} render={() => <Home />} />
      </Switch>
    </Suspense>
  </App>
);

export default RootRouter;