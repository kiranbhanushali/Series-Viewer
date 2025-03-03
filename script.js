document.addEventListener("DOMContentLoaded", () => {
    fetch(configFile)
        .then(response => response.json())
        .then(data => {
            const container = document.getElementById("seriesContainer");
            data.forEach(series => {
                const div = document.createElement("div");
                div.className = "card";
                div.innerText = series.name;
                div.onclick = () => showEpisodes(series);
                container.appendChild(div);
            });
        });
});

function showEpisodes(series) {
    document.getElementById("selectedSeries").innerText = `Select Episode for ${series.name}`;
    document.getElementById("episodeSelection").style.display = "block";
    document.getElementById("episodeSearch").dataset.series = JSON.stringify(series.episodes);
    filterEpisodes();
}

function filterEpisodes() {
    const searchText = document.getElementById("episodeSearch").value.toLowerCase();
    const episodes = JSON.parse(document.getElementById("episodeSearch").dataset.series);
    const episodeList = document.getElementById("episodeList");
    
    episodeList.innerHTML = ""; 
    episodes
        .filter(ep => ep.episodeNumber.toLowerCase().includes(searchText))
        .forEach(ep => {
            const div = document.createElement("div");
            div.className = "episode";
            div.innerText = ep.episodeNumber;
            div.onclick = () => window.open(ep.url, "_blank");
            episodeList.appendChild(div);
        });
}
