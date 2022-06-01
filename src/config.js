export const config = {
    appId: `${process.env.REACT_APP_MICROSOFT_APP_ID}`,
    redirectUri: `${process.env.REACT_APP_MICROSOFT_REDIRECT_URI}`,
    scopes: [
        'user.read'
    ],
    authority: `${process.env.REACT_APP_MICROSOFT_AUTHORITY}`
}