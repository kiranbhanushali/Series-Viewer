document.addEventListener("DOMContentLoaded", () => {
    fetch(configFile)
        .then(response => response.json())
        .then(data => {
            const container = document.getElementById("seriesContainer");
            data.forEach(series => {
                const div = document.createElement("div");
                div.className = "card";
                div.innerText = series.name;
                div.onclick = () => {
                    history.pushState({}, "", `/${series.name.replace(/\s+/g, "-")}`);
                    showEpisodes(series);
                };
                container.appendChild(div);
            });
        });
});

function showEpisodes(series) {
    document.getElementById("selectedSeries").innerText = `Select Episode for ${series.name}`;
    document.getElementById("episodeSelection").style.display = "block";
    document.getElementById("episodeSearch").dataset.episodes = JSON.stringify(series.episodes);
    
    document.getElementById("episodeSearch").oninput = function () {
        const query = this.value.toLowerCase();
        const episodes = JSON.parse(this.dataset.episodes);
        const filtered = episodes.filter(ep => ep.episodeNumber.toLowerCase().includes(query));
        displayEpisodes(filtered);
    };
}

function displayEpisodes(episodes) {
    const episodeList = document.getElementById("episodeList");
    episodeList.innerHTML = "";
    episodeList.style.display = episodes.length ? "block" : "none";

    episodes.forEach(ep => {
        const div = document.createElement("div");
        div.className = "episode-item";
        div.innerText = ep.episodeNumber;
        div.onclick = () => window.open(ep.url, "_blank");
        episodeList.appendChild(div);
    });
}
