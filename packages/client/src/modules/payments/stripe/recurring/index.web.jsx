import React from 'react';
import { NavLink } from 'react-router-dom';

import translate from '../../../../i18n';
import { MenuItem } from '../../../../modules/common/components/web';
import AddSubscription from './containers/AddSubscription';
import SubscriberPage from './containers/SubscriberPage';
import UpdateCreditCard from './containers/UpdateCreditCard';
import { SubscriptionAuthRouter } from './containers/Auth';
import { IfLoggedIn, AuthRoute } from '../../../user';
import settings from '../../../../../../../settings';
import resources from './locales';
import Feature from '../../../connector';

const NavLinkWithI18n = translate('subscription')(({ t }) => (
  <NavLink to="/subscribers-only" className="nav-link" activeClassName="active">
    {t('navLink')}
  </NavLink>
));

const Loader = () => <span>Loading...</span>; // TODO: internationalisation

export default new Feature(
  settings.payments.stripe.recurring.enabled
    ? {
        route: [
          <AuthRoute exact role="user" path="/subscription" component={AddSubscription} />,
          <AuthRoute
            exact
            role="user"
            path="/subscribers-only"
            component={props => <SubscriptionAuthRouter {...props} loader={Loader} component={SubscriberPage} />}
          />,
          <AuthRoute
            exact
            role="user"
            path="/update-card"
            component={props => <SubscriptionAuthRouter {...props} loader={Loader} component={UpdateCreditCard} />}
          />
        ],
        navItem: (
          <IfLoggedIn role="user">
            <MenuItem key="/subscribers-only">
              <NavLinkWithI18n />
            </MenuItem>
          </IfLoggedIn>
        ),
        scriptsInsert: settings.payments.stripe.recurring.secretKey ? 'https://js.stripe.com/v3/' : undefined,
        localization: { ns: 'subscription', resources }
      }
    : {}
);