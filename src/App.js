import './App.css';

import { config } from './config';
import { PublicClientApplication } from '@azure/msal-browser';

const publicClientApplication = new PublicClientApplication({
  auth: {
    clientId: config.appId,
    redirectUri: config.redirectUri,
    authority: config.authority,
  },
  cache: {
    cacheLocation: `${process.env.REACT_APP_MICROSOFT_CACHE_LOCATION}`,
    storeAuthStateInCookie: true,
  },
});

const App = () => {
  const getUser = async () => {
    const storage = JSON.parse(
      localStorage.getItem(process.env.REACT_APP_MICROSOFT_APP_ID)
    );
    console.log(storage);
    // const user =await publicClientApplication.getAccountByUsername('')
    // console.log(user);
  };
  getUser();

  const login = async () => {
    try {
      const userObj = await publicClientApplication.loginPopup({
        scopes: config.scopes,
        prompt: 'select_account',
      });

      // const { name, username } = userObj.account;
      console.log(userObj);
      localStorage.setItem(
        process.env.REACT_APP_MICROSOFT_APP_ID,
        JSON.stringify(userObj)
      );
    } catch (err) {
      console.log(err.message);
    }
  };

  const logout = async () => {
    try {
      const userLogout = await publicClientApplication.logoutPopup();
      console.log(userLogout);
    } catch (err) {
      console.log(err.message);
    }
  };

  const refreshToken = async () => {
    try {
      const storage = JSON.parse(
        localStorage.getItem(process.env.REACT_APP_MICROSOFT_APP_ID)
      );

      const { account } = storage;
      const silentRequest = {
        scopes: config.scopes,
        account: publicClientApplication.getAccountByUsername(account.username),
        forceRefresh: false,
      };

      const tokenResponse = await publicClientApplication.acquireTokenSilent(
        silentRequest
      );

      console.log(tokenResponse);
    } catch (err) {
      console.log('Error refresh token : ', err.message);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <p>ReactJS Azure Login</p>
        <button onClick={login}>Login AD</button>
        <br />
        <button onClick={logout}>Logout AD</button>
        <br />
        <button onClick={refreshToken}>Refresh Token</button>
      </header>
    </div>
  );
};

export default App;
