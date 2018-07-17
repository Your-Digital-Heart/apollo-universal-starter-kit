import resolvers from './resolvers';
import resources from './locales';
import Feature from '../../connector';
import { ClientCounterButton, ClientCounterView } from './components/ClientCounterView';
import ClientCounterContainer from './containers/ClientCounter';

export default new Feature({
  resolver: resolvers,
  localization: { ns: 'clientCounter', resources }
});

export { ClientCounterButton, ClientCounterView, ClientCounterContainer };