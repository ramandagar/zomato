import { configureStore } from '@reduxjs/toolkit'
import rootReducer from './rootReducer'
import { FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER, persistStore } from 'redux-persist'
import persistReducer from 'redux-persist/es/persistReducer'
import reduxStorage from './storage'

const persistConfig = {
    key: 'root',
    storage: reduxStorage,
    blacklist: [],
    whitelist: ['user','cart'],
}

const persistedReducer = persistReducer(persistConfig,rootReducer)
export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware({
            serializableCheck: {
                ignoreActions: [
                    FLUSH,
                    REHYDRATE,
                    PAUSE,
                    PERSIST,
                    PURGE,
                    REGISTER,
                ],
            },
        }),
})

export const persistor = persistStore(store)


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch