import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
// import HelloWorld from './HelloWorld';
import IssueList from './IssueList';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<IssueList/>, document.getElementById('root'));
registerServiceWorker();
