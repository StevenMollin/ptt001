
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

axios(
    {
        method: 'GET',
        url: '/sheet',
    }
).then(response => {
    const best_rated_scores = response.data.best_rated_scores
    const recent_rated_scores = response.data.recent_rated_scores
    console.log(recent_rated_scores)
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
    <div onclick="modifyPlayResult(${i+30})" class="song-illustration-container"><img class="song-illustration"
            src="../static/song_img/${recent_rated_scores[i]['song_id']}.jpg"></div>
    <div class="song-information">
        <div class="song-playrating">${recent_rated_scores[i]['rating']}</div>
        <div class="song-constant">${recent_rated_scores[i]['difficulty']}</div>
        <div class="song-rank">#${i + 1+30}</div>
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
})


axios(
    {
        method: 'GET',
        url: '/rating',
    }
).then(response => {
    //{"best":11.999,"rating":12.04,"recent":12.162}
    document.querySelector("#ptt-max").innerHTML = `Max : <span>${response.data.rating}</span>`
    document.querySelector("#ptt-b30").innerHTML = `B30 : <span>${response.data.best}</span>`
    document.querySelector("#ptt-r10").innerHTML = `R10 : <span>${response.data.recent}</span>`
    document.querySelector("#potential-value").textContent = response.data.rating
})


//document.querySelector("#copyright span:nth-child(2)").textContent = new Date().toLocaleString()

//setInterval(function (){
//    document.querySelector("#copyright span:nth-child(2)").textContent = new Date().toLocaleString()
//},1000)

function picture(){
    const options = {
        allowTaint: false,
        useCORS: true,
        async:true,
        scale: 2,
        logging: false
    };
    mainCapture=document.querySelector("#mainCapture")
    mainCapture.style.height="3600px"
    mainCapture.style.backgroundImage="url(static/b30_image/Background_scenery_Chap9.jpg)"


    html2canvas(document.body, options).then(canvas => {
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
    document.querySelector("#mainCapture").style.height="50px"

}

function span(){
    const control = document.getElementById("copyright");
    let date = new Date();

    control.innerHTML=`
        <span>${date.toLocaleString()}@</span>
        <span contenteditable="true">点击编辑自定义内容</span>
    `;
}
window.onload=span;