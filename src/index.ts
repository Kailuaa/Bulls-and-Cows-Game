import { renderSettings } from './ui/renderSettings';

const app = document.createElement('main');
app.id = 'app';

document.body.append(app);

renderSettings(app);
