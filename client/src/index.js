import React from 'react';
import ReactDOM from 'react-dom';

import App from './app';
import * as serviceWorkerRegistration from './serviceWorkerRegistration'
import './index.css';

ReactDOM.render(<App />, document.getElementById('root'));

serviceWorkerRegistration.unregister();