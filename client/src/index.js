import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { library } from '@fortawesome/fontawesome-svg-core'
// import { fab } from '@fortawesome/free-brands-svg-icons'
import { faClock, faEnvelope, faMapMarkerAlt, faPhoneSquareAlt, faTrashAlt, faSpinner, faEdit, faSearch, faCaretRight, faCaretLeft } from '@fortawesome/free-solid-svg-icons'

import 'bootstrap/dist/css/bootstrap.css';
import reduxThunk from 'redux-thunk';

import App from './components/App';
import reducers from './reducers';
// dom.watch();
library.add(faClock, faEnvelope, faMapMarkerAlt, faPhoneSquareAlt, faTrashAlt, faSpinner, faEdit, faSearch, faCaretRight, faCaretLeft);

const store = createStore(reducers, {}, applyMiddleware(reduxThunk));

ReactDOM.render(
    <Provider store={store}><App /></Provider>, // 
    document.querySelector('#root') 
);
