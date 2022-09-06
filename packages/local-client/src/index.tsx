import 'bulmaswatch/darkly/bulmaswatch.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import {createRoot} from 'react-dom/client';
import {Provider} from 'react-redux';
import {store} from './state';
import CellList from './components/cell-list';

const App = () => {
    return (
        <Provider store={store}>
            <div id='root'>
                <CellList />
            </div>
        </Provider>
    );
};

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(<App />);
