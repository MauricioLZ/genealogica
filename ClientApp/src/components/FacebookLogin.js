const facebookAppId = process.env.REACT_APP_FACEBOOK_APP_ID;

export function initFacebookSdk() {
    return new Promise(resolve => {
        // wait for facebook sdk to initialize before starting the react app
        window.fbAsyncInit = function () {
            window.FB.init({
                appId: facebookAppId,
                cookie: true,
                xfbml: true,
                version: 'v8.0'
            });

            // auto authenticate with the api if already logged in with facebook
            window.FB.getLoginStatus(({ authResponse }) => {
                resolve();
            });
        };

        // load facebook sdk script
        (function (d, s, id) {
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) { return; }
            js = d.createElement(s); js.id = id;
            js.src = "https://connect.facebook.net/en_US/sdk.js";
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));    
    });
}

export async function loginWithFb() {
    // login with facebook then authenticate with the API to get a JWT auth token
    const { authResponse } = await new Promise(window.FB.login);
    if (!authResponse) return;

    console.log(authResponse);
}