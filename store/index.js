import {
    createStore,
    compose, 
    applyMiddleware
} from 'redux';
import thunk from 'redux-thunk';
import { 
    persistStore, 
    persistReducer
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import reducers from '../reducers';

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['likedJobs']
};

const persistedReducer = persistReducer(persistConfig, reducers);

export default () => {
    let store = createStore(
        persistedReducer, 
        {}, 
        compose(
            applyMiddleware(thunk)
        )
    );
    let persistor = persistStore(store);
    
    return { store, persistor };
};
