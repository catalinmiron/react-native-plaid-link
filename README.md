### React Native Plaid Link auth

![react_native_plaid_link_auth](https://user-images.githubusercontent.com/2805320/29003828-ad4ab974-7ac6-11e7-90f9-e7b637b58de1.gif)

Since [Plaid.com](https://plaid.com/) doesn't have support for React Native and
a lot o devs [asked](https://github.com/plaid/link/issues/153) for an
implementation, I've built this lib that adds support for
[Plaid](https://plaid.com/) authentication using a
[Webview](https://plaid.com/docs/quickstart/#webview-integration) and
[Plaid Link](https://blog.plaid.com/announcing-a-new-mobile-experience-for-link/)

### Usage

```
yarn add react-native-plaid-link
yarn link react-native-webview
```

#### API

| Prop                                                                       | Type       | defaultValue          |
| -------------------------------------------------------------------------- | ---------- | --------------------- |
| **publicKey** (required)                                                   | `string`   |                       |
| **onMessage** (required)                                                   | `function` |                       |
| **env** (required)                                                         | `string`   |                       |
| **product** (required)                                                     | `string`   |                       |
| clientName                                                                 | `string`   |                       |
| selectAccount                                                              | `boolean`  | false                 |
| token                                                                      | `string`   |                       |
| userEmail                                                                  | `string`   |                       |
| userLegalName                                                              | `string`   |                       |
| webhook                                                                    | `string`   | `http://batman.codes` |
| [WebView props][WebViewPropsRef]                                           | -          | -                     |

[WebViewPropsRef]: https://github.com/react-native-community/react-native-webview/blob/master/docs/Reference.md#props-index

```js
render() {
  return <PlaidAuthenticator
    onMessage={this.onMessage}
    publicKey="YOUR_PLAID_PUBLIC_KEY"
    env="sandbox"
    product="auth,transactions"
    clientName="Catalin Miron"
    selectAccount={false}
  />
}

onMessage = (data) => {
  this.setState({data})
}
```

##### Returned **data** object

```json
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
```

For more information please
[read their docs](https://plaid.com/docs/quickstart/#accessing-item-data)

[Type of actions](https://plaid.com/docs/api/#onexit-callback):

| Status                | Description                                                                                                                 |
| --------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| connected             | User completed the Link flow                                                                                                |
| requires_questions    | User prompted to answer security question(s)                                                                                |
| requires_selections   | User prompted to answer multiple choice question(s)                                                                         |
| requires_code         | User prompted to provide a one-time passcode                                                                                |
| choose_device         | User prompted to select a device on which to receive a one-time passcode                                                    |
| requires_credentials  | User prompted to provide credentials for the selected financial institution or has not yet selected a financial institution |
| institution_not_found | User exited the Link flow after unsuccessfully (no results returned) searching for a financial institution                  |

For `Sandbox mode` the credentials are:

```
username: user_good
password: pass_good
```

#### Get your plaid API key

* Go to [Plaid dashboard](https://dashboard.plaid.com/signin) and `Sign in`.
  ![image](https://user-images.githubusercontent.com/2805320/29003405-274c972c-7abf-11e7-89f5-dffce0d0132a.png)
* Add Plaid to your app
  ![image](https://user-images.githubusercontent.com/2805320/29003409-36d48042-7abf-11e7-8e55-01a1e184fb49.png)
* Copy your Plaid **public_key**

#### Questions?

Feel free to contact me:

Twitter: [@mironcatalin](http://twitter.com) Website:
[http://batman.codes](http://batman.codes)
