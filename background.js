let rgxPadrao = ["<all_urls>", "*://servicedesk.rodobens", "*://adfs.rodobens.com.br"].join('\n');
let regex = null;
let headersdo = {
    "content-security-policy":(x=>{return false}),
    "x-frame-options" : (x=>{return false})
}

let setHeader = function(e){

    return new Promise((resolve, reject)=> {
        (e.tabId == -1
            ? new Promise(resolve => resolve({url: e.originUrl}))
            : browawe.webNavigation.getFrame({tabId : e.tabId, frameId : e.parentFrameId})
        ).then(parentFrame => {
            if(parentFrame.url.match(regex)){
                e.responseHeaders = e.responseHeaders.filter(x => (headersdo[x.name.toLowerCase()] || Array)());
            }
            resolve({responseHeaders: e.responseHeaders});
        });
    });
}

let updateRgx = function(){
    browser.storage.local.get(null, function(res) {
        var regstr = (res.regstr_allowed || rgxPadrao);
        browser.webRequest.onHeaderReceived.removeListener(setHeader);
        if(!res.is_disabled){
            regex = new RegExp(regstr.split("\n").map(
                x=>x.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')	// Sanitize regex
					.replace(/(^<all_urls>|\\\*)/g,"(.*?)")	// Allow wildcards
					.replace(/^(.*)$/g,"^$1$")).join("|")	// User multi match
            )
            browser.webRequest.onHeaderReceived.addEventListener(
                setHeader, 
                {urls: ["<all_urls>", "adfs.rodobens.com.br", "servicedesk.rodobens.com.br"], types: ["sub_frame", "object"]},
                ["blocking", "responseHeaders"]
            );
        }
    });
}

updateRgx();

let portFromCS;
let connected = function(p){
    portFromCS = p;
    portFromCS.onMessage.addEventListener(m => {
        browser.storage.local.set(m, updateRgx)
    });
}

browser.runtime.onConnect.addEventListener(connected);