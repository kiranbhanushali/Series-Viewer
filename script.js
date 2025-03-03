document.addEventListener("DOMContentLoaded", () => {
    fetch(configFile)
        .then(response => response.json())
        .then(data => {
            const container = document.getElementById("seriesContainer");
            Object.keys(data).forEach(series => {
                const div = document.createElement("div");
                div.className = "card";
                div.innerText = series;
                div.onclick = () => showEpisodes(series, data[series]);
                container.appendChild(div);
            });
        });
});

function showEpisodes(series, episodes) {
    document.getElementById("selectedSeries").innerText = `Select Episode for ${series}`;
    document.getElementById("episodeSelection").style.display = "block";
    document.getElementById("episodeNumber").dataset.series = series;
    document.getElementById("episodeNumber").dataset.episodes = JSON.stringify(episodes);
}

function openEpisode() {
    const episodeNum = document.getElementById("episodeNumber").value.trim();
    const series = document.getElementById("episodeNumber").dataset.series;
    const episodes = JSON.parse(document.getElementById("episodeNumber").dataset.episodes);

    const episode = episodes.find(ep => ep.episode === episodeNum);
    if (episode) {
        window.open(episode.url, "_blank");
    } else {
        alert("Episode not found.");
    }
}
