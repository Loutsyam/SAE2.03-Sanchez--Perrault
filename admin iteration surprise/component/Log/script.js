

let templateFile = await fetch('./component/Log/template.html');
let template = await templateFile.text();

let logItemTemplateFile = await fetch('./component/Log/logItem.template.html');
let templateLi = await logItemTemplateFile.text();

let logItemLastTemplateFile = await fetch('./component/Log/logItemLast.template.html');
let templateLiLast = await logItemLastTemplateFile.text();

let Log = {};

let history = []; 

let add = function(txt){ 
    let d = new Date();
    let h = d.getHours();
    let m = d.getMinutes();
    let s = d.getSeconds();
    let time = h + ':' + m + ':' + s;
    let log = {time: time, txt: txt};
    history.push(log);
}

let formatHistory= function(){ 
    let html = "";
    if (history.length == 0) return html;
    for (let i=0; i<history.length-1; i++){ 
        let log = history[i];
        let itemHtml = templateLi.replace('{{time}}', log.time).replace('{{txt}}', log.txt);
        html += itemHtml;
    }
    let lastLog = history[history.length-1];
    let lastItemHtml = templateLiLast.replace('{{time}}', lastLog.time).replace('{{txt}}', lastLog.txt);
    html += lastItemHtml;
    return html;
}

Log.format = function(txt){
    add(txt);
    let html= template;
    html = html.replace("{{logs}}", formatHistory());
    return html;
}


export {Log};

