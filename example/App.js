import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import PlaidAuthenticator from 'react-native-plaid-link';

export default class App extends Component {
  state = {
    data: {}
  };

  render() {
    return this.state.data.action &&
      this.state.data.action.indexOf('::connected') !== -1
      ? this.renderDetails()
      : this.renderLogin();
  }

  renderLogin() {
    return (
      <PlaidAuthenticator
        onMessage={this.onMessage}
        publicKey="eecc6d6382543dbee6478afbc5879b"
        env="sandbox"
        product="auth,transactions"
      />
    );
  }

  renderDetails() {
    return (
      <View style={styles.container}>
        <Text style={styles.paragraph}>
          Institution
        </Text>
        <Text style={styles.value}>
          {this.state.data.metadata.institution.name}
        </Text>
        <Text style={styles.paragraph}>
          Institution ID
        </Text>
        <Text style={styles.value}>
          {this.state.data.metadata.institution.institution_id}
        </Text>
        <Text style={styles.paragraph}>
          Token
        </Text>
        <Text style={styles.value}>
          {this.state.data.metadata.public_token}
        </Text>

      </View>
    );
  }

  onMessage = data => {
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

    this.setState({ data });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 24,
    backgroundColor: '#ecf0f1'
  },
  paragraph: {
    fontSize: 18,
    marginBottom: 5,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#34495e'
  },
  value: {
    marginBottom: 20,
    textAlign: 'center'
  }
});
