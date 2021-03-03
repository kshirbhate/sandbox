import createStore from './create';

declare global {
  interface Window {
    store: any;
  }
}

const store = createStore();
if (process.env.NODE_ENV !== 'production') window.store = store;
export default store;
