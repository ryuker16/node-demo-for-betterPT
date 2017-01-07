// flow-typed signature: 8e85a6af8e79cd4c883cd3b3d8bd20dd
// flow-typed version: c4bbd91cfc/redux_v3.x.x/flow_>=v0.33.x

declare module 'redux' {

  /*

    S = State
    A = Action

  */

  declare type Dispatch<A: { type: $Subtype<string> }> = (action: A) => A;

  declare type MiddlewareAPI<S, A> = {
    dispatch: Dispatch<A>;
    getState(): S;
  };

  declare type Store<S, A> = {
    // rewrite MiddlewareAPI members in order to get nicer error messages (intersections produce long messages)
    dispatch: Dispatch<A>;
    getState(): S;
    subscribe(listener: () => void): () => void;
    replaceReducer(nextReducer: Reducer<S, A>): void
  };

  declare type Reducer<S, A> = (state: S, action: A) => S;

  declare type Middleware<S, A> =
    (api: MiddlewareAPI<S, A>) =>
      (next: Dispatch<A>) => Dispatch<A>;

  declare type StoreCreator<S, A> = {
    (reducer: Reducer<S, A>, enhancer?: StoreEnhancer<S, A>): Store<S, A>;
    (reducer: Reducer<S, A>, preloadedState: S, enhancer?: StoreEnhancer<S, A>): Store<S, A>;
  };

  declare type StoreEnhancer<S, A> = (next: StoreCreator<S, A>) => StoreCreator<S, A>;

  declare function createStore<S, A>(reducer: Reducer<S, A>, enhancer?: StoreEnhancer<S, A>): Store<S, A>;
  declare function createStore<S, A>(reducer: Reducer<S, A>, preloadedState: S, enhancer?: StoreEnhancer<S, A>): Store<S, A>;

  declare function applyMiddleware<S, A>(...middlewares: Array<Middleware<S, A>>): StoreEnhancer<S, A>;

  declare type ActionCreator<A, B> = (...args: Array<B>) => A;
  declare type ActionCreators<K, A> = { [key: K]: ActionCreator<A, any> };

  declare function bindActionCreators<A, C: ActionCreator<A, any>>(actionCreator: C, dispatch: Dispatch<A>): C;
  declare function bindActionCreators<A, K, C: ActionCreators<K, A>>(actionCreators: C, dispatch: Dispatch<A>): C;

  declare function combineReducers<O: Object, A>(reducers: O): Reducer<$ObjMap<O, <S>(r: Reducer<S, any>) => S>, A>;

  declare function compose<S, A>(...fns: Array<StoreEnhancer<S, A>>): Function;

}
