import React, { Component } from 'react';
import { WebView } from 'react-native-webview';
import { PropTypes } from 'prop-types';
import omit from 'object.omit';

const injectedJavaScript = `(function() {
  window.postMessage = function(data) {
    window.ReactNativeWebView.postMessage(data);
  };
})()`;

class PlaidAuthenticator extends Component {
  render() {
    const {
      clientName,
      countryCodes,
      env,
      product,
      publicKey,
      selectAccount,
      style,
      webhook,
      token
    } = this.props;

    let uri = `https://cdn.plaid.com/link/v2/stable/link.html?key=${
      publicKey
    }&apiVersion=v2&env=${env}&product=${product}&clientName=${
      clientName
    }&isWebView=true&isMobile=true&selectAccount=${
      selectAccount
    }`;
    uri = token !== undefined ? `${uri}&token=${token}` : uri;
    uri = webhook !== undefined ? `${uri}&webhook=${webhook}` : uri;
    uri = countryCodes !== undefined ? `${uri}&countryCodes=${countryCodes}` : uri;

    return (
      <WebView
        {...omit(this.props, [
          'publicKey',
          'selectAccount',
          'env',
          'product',
          'clientName',
          'countryCodes',
          'webhook',
          'token',
          'ref'
        ])}
        ref={this.props.plaidRef}
        source={{ uri }}
        onMessage={this.onMessage}
        useWebKit
        injectedJavaScript={injectedJavaScript}
      />
    );
  }

  onMessage = e => {
    /*
      Response example for success
      {
        "action": "plaid_link-undefined::connected",
        "metadata": {
          "account": {
            "id": null,
            "name": null
          },
          "account_id": null,
          "public_token": "public-sandbox-e697e666-9ac2-4538-b152-7e56a4e59365",
          "institution": {
            "name": "Chase",
            "institution_id": "ins_3"
          }
        }
      }
    */

    this.props.onMessage(JSON.parse(e.nativeEvent.data));
  };
}

PlaidAuthenticator.propTypes = {
  clientName: PropTypes.string,
  countryCodes: PropTypes.string,
  env: PropTypes.string.isRequired,
  onMessage: PropTypes.func.isRequired,
  plaidRef: PropTypes.func,
  product: PropTypes.string.isRequired,
  publicKey: PropTypes.string.isRequired,
  token: PropTypes.string,
  webhook: PropTypes.string,
};

PlaidAuthenticator.defaultProps = {
  clientName: '',
  plaidRef: () => {}
};

export default PlaidAuthenticator;
