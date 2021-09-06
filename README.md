# instagram-tezekpaylasmarobotuiso9001-public
Basic image sharing bot for instagram. Currently working as a shitpostbot on https://instagram.com/tezekpaylasmarobotuiso9001
How To Use:

1:  Create an app on facebook developers page. <br>
2:  Copy client id&secret to auth file. (disabled for now, do step-3 as replacement) <br>
3:  You can work around and get a long life token and id from facebook developers graph api tool, copy them to auth file on LLT and ig_id.<br>
      3.a: on https://developers.facebook.com/tools/explorer/ for ig_id use this:<br>
        me?fields=id,name,businesses -> select the business account your instagram page is connected to, <br>
        then with that id query this {business_account_id}?fields=instagram_business_accounts,<br>
        result id is your instagram business page id. <br>
      3.b: you can use <br>
        https://graph.facebook.com/{graph-api-version}/oauth/access_token?grant_type=fb_exchange_token&client_id={app-id}&client_secret={app-secret}&fb_exchange_token={your-access-token}<br>
        
    this request to get a long lived token.<br>
4:  After that you can add your images to data file with their titles, titles get posted to caption side of post.<br>
    Your images need to be between in 4:5 to 1.91:1 ratio.<br>
    i.imgur links works just fine for posting.<br>
    Also beware of HTML encoding, you need to post encoded urls for some symbols. (like you need to replace # to %20 or something like that)<br>
5:  Run npm install to download dependencies.<br>
6:  And you are ready to go, run npm start to run your project.<br>
