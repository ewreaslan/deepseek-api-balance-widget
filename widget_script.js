// ==========================
// App: Scriptable
// App : https://apps.apple.com/us/app/scriptable/id1405459188
// ==========================

const API_KEY = "sk-api-key"; 

const req = new Request("https://api.deepseek.com/user/balance");
req.method = "GET";
req.headers = {
  "Authorization": Bearer ${API_KEY},
  "Accept": "application/json"
};

let widget = new ListWidget();
widget.setPadding(16,16,16,16);

widget.backgroundColor = new Color("#111111");

let title = widget.addText("DeepSeek");
title.font = Font.boldSystemFont(20);
title.textColor = Color.white();

widget.addSpacer(10);

try {

    const data = await req.loadJSON();

    if(data.is_available){

        const info = data.balance_infos[0];

        let b = widget.addText(`${info.total_balance} ${info.currency}`);
        b.font = Font.mediumSystemFont(18);
        b.textColor = Color.green();

        widget.addSpacer(6);

        let s = widget.addText("Status: Online");
        s.textColor = Color.green();
        s.font = Font.systemFont(14);

    }else{

        let s = widget.addText("Account Unavailable");
        s.textColor = Color.red();
        s.font = Font.systemFont(15);

    }

}catch(e){

    let err = widget.addText("API Error");
    err.textColor = Color.red();
    err.font = Font.boldSystemFont(16);

    widget.addSpacer(4);

    let d = widget.addText(e.toString());
    d.font = Font.systemFont(10);
    d.textColor = Color.lightGray();

}

widget.addSpacer();

let date = widget.addDate(new Date());
date.applyTimeStyle();
date.textColor = Color.gray();
date.font = Font.systemFont(11);

Script.setWidget(widget);
widget.presentMedium();
Script.complete();
