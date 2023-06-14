let queueBtn, objclickvalue, ident, objplaylist;

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

var style = `
.card {
    background-color: black;
    display: flex;
    border-radius: 5px;
    width: 300px;
    position: fixed;
    bottom: 10px;
    right: 0;
}

.container {
    padding: 5px 16px;
    color: white;
    font-size: 13px;
}

.card>img {
    border-radius: 10px;
    padding: 5px;
}

.card>a {
    display: flex;
    text-decoration: none;
}
`

const addQueueButton = async () => {
    console.log("adding queue button");
    setTimeout(function () {
        queuebtnexist = document.getElementById("queue-btn");
        if (!queuebtnexist) {
            var styleSheet = document.createElement("style");
            styleSheet.innerText = styles;
            document.head.appendChild(styleSheet);

            const list = document.querySelectorAll(".style-scope.yt-multi-page-menu-section-renderer.unread");

            for (i = 0; i < list.length - 1; i++) {
                ident = document.querySelectorAll('.yt-simple-endpoint.style-scope.ytd-notification-renderer')[i].getAttribute("href");
                title = document.querySelectorAll('.message.style-scope.ytd-notification-renderer')[i].innerHTML;
                imgLocation = document.querySelectorAll('.style-scope.ytd-notification-renderer.no-transition')[i + 1].querySelectorAll('.style-scope.yt-img-shadow')[0].getAttribute("src");
                parsed = ident.split('=');
                videoId = parsed[1].split('&');
                console.log(videoId[1]);
                queueBtn = document.createElement("img");
                queueBtn.id = "queue-btn";
                queueBtn.className = i;
                queueBtn.setAttribute("videoId", videoId[0]);
                queueBtn.setAttribute("title", title);
                queueBtn.setAttribute("imgLocation", imgLocation);
                queueBtn.src = chrome.runtime.getURL("assets/playlist-play.svg");
                list[i].appendChild(queueBtn);

                queueBtn.addEventListener("click", clickHandler);
            }
        }
    }, 500)
};

const eventListener = async () => {
    console.log("running eventListener");
    setTimeout(function () {
        document.querySelector('[aria-label="Notifications"]').addEventListener("click", addQueueButton);
    }, 1000)
};

const clickHandler = async (event) => {
    const getId = event.target.className;
    const videoId = document.getElementsByClassName(getId)[0].getAttribute("videoid");
    const title = document.getElementsByClassName(getId)[0].getAttribute("title");
    const img = document.getElementsByClassName(getId)[0].getAttribute("imgLocation");
    console.log(videoId, title, img);
    createPlaylist(videoId, title, img);
}

const createPlaylist = async (id, vname, img) => {
    var html = document.createElement("div");
    html.className = "card";
    document.getElementById("content").append(html);

    var link = document.createElement("a");
    link.setAttribute("href","https://www.youtube.com/watch?v="+id);
    link.id="queuelink";
    link.setAttribute("target", "_blank")
    document.getElementsByClassName("card")[0].append(link);
 
    var imgContainer = document.createElement("img");
    imgContainer.setAttribute("src", img);
    imgContainer.setAttribute("style", "width:100px");
    imgContainer.id="image";

    var title = document.createElement("div");
    title.className = "container";
    title.innerHTML = vname;
    document.getElementById("queuelink").append(imgContainer);
    document.getElementById("queuelink").append(title);

    var styleSheet = document.createElement("style");
    styleSheet.innerText = style;
    document.head.appendChild(styleSheet);
}


eventListener();