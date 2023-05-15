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

function clickHandler() {
    console.log("clicked");
}

eventListener();