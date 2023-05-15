let queueBtn, objclickvalue, ident, videoId;

var styles =
    `
#queue-btn {
position: absolute;
top: 65%;
left: 92%;
display: none;
}

#queue-btn:hover {
cursor: pointer;
}

.style-scope.yt-multi-page-menu-section-renderer.unread:hover #queue-btn {
display: flex;
}
`

const addQueueButton = async () => {
    console.log("adding queue button");
    setTimeout(function () {
        queuebtnexist = document.getElementById("qeuebtn");
        if (!queuebtnexist) {
            var styleSheet = document.createElement("style")
            styleSheet.innerText = styles;
            document.head.appendChild(styleSheet)

            const list = document.querySelectorAll(".style-scope.yt-multi-page-menu-section-renderer.unread");

            for (i = 0; i < list.length - 1; i++) {
                ident = document.querySelectorAll('.yt-simple-endpoint.style-scope.ytd-notification-renderer')[i].getAttribute("href");
                videoId = ident.split('=');
                console.log(videoId[1]);
                queueBtn = document.createElement("img");
                queueBtn.id = "queue-btn";
                queueBtn.setAttribute("videoId", videoId[1]);
                queueBtn.src = chrome.runtime.getURL("assets/playlist-play.svg");
                list[i].appendChild(queueBtn);

                queueBtn.addEventListener("click", clickHandler);
            }
        }
    }, 500)
};

const eventListener = async () => {
    console.log("running eventListener");
    console.log("queuenoexist");
    document.querySelector('[aria-label="Notifications"]').addEventListener("click", addQueueButton);
};

const notifclicked = async () => {
    console.log("objclicked");
    //var selector = document.querySelectorAll('.style-scope ytd-notification-renderer [safe-area]').length;
    //for (i = 0; i < selector; i++) {
    setTimeout(function () { //timeout is necessary to wait for ajax response.
        var selector = document.querySelectorAll('#menu.style-scope.ytd-notification-renderer > .style-scope.ytd-notification-renderer').length;
        for (i = 0; i < selector; i++) {
            document.querySelectorAll('#menu.style-scope.ytd-notification-renderer > .style-scope.ytd-notification-renderer')[i].getElementsByClassName("style-scope yt-icon-button")[0].addEventListener("click", addQueueButton);
        }
    }, 500)
    //}
};

function clickHandler() {
    console.log("clicked");
}


eventListener();