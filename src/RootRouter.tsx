import React, { Suspense, lazy } from 'react';
import { Switch, Route } from 'react-router-dom';
import App from './components/App/App';

const Home = lazy(() => import(/* webpackChunkName: "Home" */ './components/Home/Home'));

const RootRouter = () => (
  <App>
    <Suspense fallback={null}>
      <Switch>
        <Route exact path={'/ant'} render={() => <Home />} />
        {/* This route should always be last */}
        <Route exact path={'*'} render={() => <Home />} />
      </Switch>
    </Suspense>
  </App>
);

export default RootRouter;
