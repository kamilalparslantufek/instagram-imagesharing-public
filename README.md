# instagram-tezekpaylasmarobotuiso9001-public
Basic image sharing bot for instagram. Currently working as a shitpostbot on https://instagram.com/tezekpaylasmarobotuiso9001
How To Use:

1:  Create an app on facebook developers page.
2:  Copy client id&secret to auth file. (disabled for now, do step-3 as replacement)
3:  You can work around and get a long life token and id from facebook developers graph api tool, copy them to auth file on LLT and ig_id.
      3.a: on https://developers.facebook.com/tools/explorer/ for ig_id use this:
        me?fields=id,name,businesses -> select the business account your instagram page is connected to, 
        then with that id query this {business_account_id}?fields=instagram_business_accounts,
        result id is your instagram business page id. 
      3.b: you can use 
        https://graph.facebook.com/{graph-api-version}/oauth/access_token?grant_type=fb_exchange_token&client_id={app-id}&client_secret={app-secret}&fb_exchange_token={your-access-token}
        
    this request to get a long lived token.
4:  After that you can add your images to data file with their titles, titles get posted to caption side of post.
    Your images need to be between in 4:5 to 1.91:1 ratio.
    i.imgur links works just fine for posting.
    Also beware of HTML encoding, you need to post encoded urls for some symbols. (like you need to replace # to %20 or something like that)
5:  Run npm install to download dependencies.
6:  And you are ready to go, run npm start to run your project.
