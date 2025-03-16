//TODO 未增加删除本地缓存，更新数据功能

// 获取分数对应的图片标识
function getString(value) {
    if (value > 10000000) {
        return 'PM';
    } else if (value > 9900000) {
        return 'EX+';
    } else if (value > 9800000) {
        return 'EX';
    } else if (value > 9500000) {
        return 'AA';
    } else if (value > 9200000) {
        return 'A';
    } else {
        return 'B';
    }
}


// 截图功能
function picture() {
    const options = {
        allowTaint: false,
        useCORS: true,
        async: true,
        scale: 2,
        logging: false
    };
    mainCapture = document.querySelector("#mainCapture")
    background = document.querySelector("#background")
    mainCapture.style.height = "3600px"
    mainCapture.style.backgroundImage = "url(static/b30_image/Background.jpg)"
    background.style.backgroundImage = ""

    html2canvas(document.querySelector("#mainCapture"), options).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.download = `best30.png`;
        link.href = imgData;

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }).catch(err => {
        console.error('截图失败:', err);
    });
    document.querySelector("#mainCapture").style.height = "50px"
    mainCapture.style.backgroundImage = ""
    background.style.backgroundImage = "url(static/b30_image/Background.jpg)"

}


// 窗口大小改变时触发
windowsBox = document.querySelector("#windowsBox")
mainCapture = document.querySelector("#mainCapture")
function resize_windows() {
    windowsBox.style = "width:" + window.innerWidth + "px;height:" + window.innerHeight + "px;"
    mainCapture.style.transform = `scale(${window.innerWidth / 1700})`
}

// 监听窗口大小改变事件
window.addEventListener('resize', resize_windows, 200); // 200ms 内只触发一次


//初始化数据
(function () {
    //加载数据
    if (localStorage.getItem("rating") && localStorage.getItem("sheet")) {
        const sheetData = JSON.parse(localStorage.getItem("sheet"))
        const best_rated_scores = sheetData['best_rated_scores']
        const recent_rated_scores = sheetData['recent_rated_scores']
        let best_show_scores = ""
        let recent_show_scores = ""
        for (let i = 0; i < best_rated_scores.length; i++) {
            best_show_scores += `
        <div class="song-result-unit future" id="${best_rated_scores[i]['title']}">
            <div onclick="modifyPlayResult(${i})" class="song-illustration-container"><img class="song-illustration"
                    src="../static/song_img/${best_rated_scores[i]['song_id']}.jpg?v=323"></div>
            <div class="song-information">
                <div class="song-playrating">${best_rated_scores[i]['rating']}</div>
                <div class="song-constant">${best_rated_scores[i]['difficulty']}</div>
                <div class="song-rank">#${i + 1}</div>
            </div>
            <div class="song-name">${best_rated_scores[i]['title']}</div>
            <div class="song-score">${best_rated_scores[i]['score']}</div>
            <div class="song-items">
            </div><img class="song-ranking-image" src="static/b30_image/rank/${getString(best_rated_scores[i]['score'])}.png">
        </div>`
        }
        console.log(best_show_scores)
        for (let i = 0; i < recent_rated_scores.length; i++) {
            recent_show_scores += `
        <div class="song-result-unit future" id="${recent_rated_scores[i]['title']}">
            <div onclick="modifyPlayResult(${i + 30})" class="song-illustration-container"><img class="song-illustration"
                    src="../static/song_img/${recent_rated_scores[i]['song_id']}.jpg"></div>
            <div class="song-information">
                <div class="song-playrating">${recent_rated_scores[i]['rating']}</div>
                <div class="song-constant">${recent_rated_scores[i]['difficulty']}</div>
                <div class="song-rank">#${i + 1 + 30}</div>
            </div>
            <div class="song-name">${recent_rated_scores[i]['title']}</div>
            <div class="song-score">${recent_rated_scores[i]['score']}</div>
            <div class="song-items">
            </div><img class="song-ranking-image" src="static/b30_image/rank/${getString(recent_rated_scores[i]['score'])}.png">
        </div>`
        }
        console.log(recent_show_scores)

        const b30data = document.querySelector("#b30-data")
        b30data.innerHTML = best_show_scores + b30data.innerHTML + recent_show_scores

        const ratingData = JSON.parse(localStorage.getItem("rating"))
        //{"best":11.999,"rating":12.04,"recent":12.162}
        document.querySelector("#ptt-max").innerHTML = `Max : <span>${ratingData['rating']}</span>`
        document.querySelector("#ptt-b30").innerHTML = `B30 : <span>${ratingData['best']}</span>`
        document.querySelector("#ptt-r10").innerHTML = `R10 : <span>${ratingData['recent']}</span>`
        document.querySelector("#potential-value").textContent = ratingData['rating']

    } else {

        axios(
            {
                method: 'GET',
                url: '/sheet',
            }
        ).then(response => {
            localStorage.setItem("sheet", JSON.stringify(response.data))
        })

        axios(
            {
                method: 'GET',
                url: '/rating',
            }
        ).then(response => {
            localStorage.setItem("rating", JSON.stringify(response.data))
        })

        setInterval(function () {
            if (localStorage.getItem("rating") && localStorage.getItem("sheet")) { location.reload() }
        }, 1000)

    }

    //时间
    document.querySelector("#copyright span:first-child").textContent = new Date().toLocaleString()
    setInterval(function () {
        document.querySelector("#copyright span:first-child").textContent = new Date().toLocaleString()
    }, 1000)


    //加载完成调整页面尺寸
    resize_windows()

})()