async function fetchData() {
    try {
        const response = await fetch('http://localhost:5000/sheet');
        const data = await response.json();

        sheet("b30",data.best_rated_scores)
    } catch (error) {
        console.error('Error fetching data:', error);
    }

    try {
        const response = await fetch('http://localhost:5000/rating');
        const data = await response.json();
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

function sheet(getId, score) {
    const control = document.getElementById(getId);

    // 将数组切割为每组5个元素的二维数组
    const rows = [];
    for (let i = 0; i < score.length; i += 5) {
        rows.push(score.slice(i, i + 5));
    }

    control.innerHTML = `
        ${rows.map(row => `
            <div class="row">
                ${row.map(item => `
                    <div class="son_div">
                        <img src="https://webassets.lowiro.com/${item.bg}.jpg?v=323">
                    </div>
                `).join('')}
            </div>
        `).join('')}
    `;
}

window.onload = fetchData()