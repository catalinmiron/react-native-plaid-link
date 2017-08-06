import React, { PropTypes, Component } from 'react';
import { WebView } from 'react-native';

class PlaidAuthenticator extends Component {
  render() {
    const {publicKey, env, product, clientName, webhook, style} = this.props;

    return <WebView
      style={{...style}}
      source={{uri: `https://cdn.plaid.com/link/v2/stable/link.html?key=${publicKey}&apiVersion=v2&env=${env}&product=${product}&clientName=${clientName}&isWebView=true&isMobile=true&webhook=${webhook}`}}
      onMessage={(e) => this.onMessage(e)}
    />
  }

  onMessage(e) {
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

    this.props.onMessage(JSON.parse(e.nativeEvent.data))
  }
}

PlaidAuthenticator.defaultProps = {
  publicKey: PropTypes.string.isRequired,
  onMessage: PropTypes.func.isRequired,
  env: PropTypes.string.isRequired,
  product: PropTypes.string.isRequired,
  clientName: PropTypes.string,
  webhook: PropTypes.string,
  style: PropTypes.object
}

PlaidAuthenticator.defaultProps = {
  clientName: 'CatalinMiron',
  webhook: 'http://batman.codes',
  style: {}
};

export default PlaidAuthenticator;
