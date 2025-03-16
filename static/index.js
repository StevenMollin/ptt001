async function fetchData() {
    try {
        const response = await fetch('http://localhost:5000/sheet');
        const data = await response.json();

        renderTable(data.best_rated_scores, 'best-rated', 'Best Rated Scores');
        renderTable(data.recent_rated_scores, 'recent-rated', 'Recent Rated Scores');

    } catch (error) {
        console.error('Error fetching data:', error);
    }

    try {
        const response = await fetch('http://localhost:5000/rating');
        const data = await response.json();

        rating_calc(data.rating,data.best,data.recent,"rating")

    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

function renderTable(scores, containerId, title) {
    const container = document.getElementById(containerId);
    container.innerHTML = `
                <h2>${title}</h2>
                <table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>曲绘</th>
                            <th>曲名</th>
                            <th>难度</th>
                            <th>潜力值</th>
                            <th>分数</th>
                            <th>游玩时间</th>
                        </tr>
                    </thead>
                    <tbody>
    ${scores.map((score,index) => `
                    <tr>
                         <td class="index">${index+1}</td>
                         <td><img src="../static/song_img/${score.song_id}.jpg"></td>
                         <td>${score.title}</td>
                         <td class="difficulty">${score.difficulty}</td>
                         <td class="rating">${score.rating.toFixed(2)}</td>
                         <td>${score.score.toLocaleString()}</td>
                         <td class="time">${new Date(score.time_played).toLocaleString()}</td>
                    </tr>
                    `).join('')}
                </tbody>
            </table>
            `;
        }

function clean_cache(){
    //缓存功能
}

function rating_calc(max,best,recent,containerId){
    const container = document.getElementById(containerId);
    container.innerHTML = `
        <h1>PTT001</h1>
        <h2>Rating:${max} Best:${best} Recent:${recent}</h2>
        <button onclick="window.location.href='../b30'">生成b30</button>
        <button onclick="clean_cache()">清除缓存</button>
        `;
}

window.onload = fetchData;