import ReactDOM from 'react-dom'
import "./assets/base.less"
import Router from './router'
import store from './store'
import {Provider} from 'react-redux'

ReactDOM.render(
    <Provider store={store}>
        <Router />
    </Provider>,
    document.getElementById('root')
)

