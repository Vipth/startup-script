window.loadScripts = async function () {
    try {
        let response = await fetch("scripts.json?t=" + new Date().getTime()); // Cache Buster
        let scripts = await response.json();
        let container = document.getElementById("scripts-container");
        container.innerHTML = ""; // Clear existing content

        scripts.forEach(script => {
            let scriptBox = document.createElement("div");
            scriptBox.classList.add("script-box");

            // Create OS Labels
            let osLabelContainer = document.createElement("div");
            osLabelContainer.classList.add("os-label-container");

            script.os.forEach(os => {
                let osLabel = document.createElement("span");
                osLabel.classList.add("os-label");
                osLabel.innerText = os;
                osLabelContainer.appendChild(osLabel);
            });

            // Add content inside the script box
            scriptBox.innerHTML = `
                <h2><a class="script-title" href="${script.url}">${script.name}</a></h2>
                <p>${script.description}</p>
                <div class="command">${script.command}</div>
                <button class="copy-btn" onclick="copyToClipboard(this)">Copy Command</button>
            `;

            // Append OS labels
            scriptBox.insertBefore(osLabelContainer, scriptBox.firstChild);

            // Create Info Button (Top-Left Corner) ONLY if "info" exists
            if (script.info) {
                let infoButton = document.createElement("a");
                infoButton.href = script.info;
                infoButton.classList.add("info-button");
                infoButton.innerHTML = '<i class="fa-solid fa-info"></i>'; // FontAwesome icon
                infoButton.title = "More Info";

                scriptBox.insertBefore(infoButton, scriptBox.firstChild); // Insert at top-left
            }

            container.appendChild(scriptBox);
        });

        window.filterScripts(); // Apply filter after loading
    } catch (error) {
        console.error("Error loading scripts:", error);
    }
};

window.copyToClipboard = function(button) {
    let text = button.previousElementSibling.innerText;
    navigator.clipboard.writeText(text).then(() => {
        button.textContent = "Copied!";
        button.style.background = "#0080FF";
        setTimeout(() => {
            button.textContent = "Copy Command";
            button.style.background = "#4A90E2";
        }, 2000);
    }).catch(err => {
        console.error("Failed to copy text: ", err);
    });
};

window.copyDiscord = function(event) {
    event.preventDefault(); // Prevents page from reloading
    navigator.clipboard.writeText("Vipth")
        .catch(err => console.error("Clipboard copy failed: ", err));
};

window.filterScripts = function() {
    let input = document.getElementById('search').value.toLowerCase().trim();
    let osFilter = document.getElementById('os-filter').value.trim().toLowerCase();
    let scriptBoxes = document.querySelectorAll('.script-box');

    scriptBoxes.forEach(box => {
        let title = box.querySelector('.script-title').innerText.toLowerCase();
        let command = box.querySelector('.command').innerText.toLowerCase();
        
        let osLabels = Array.from(box.querySelectorAll('.os-label')).map(label => label.innerText.trim().toLowerCase());

        console.log("OS Labels:", osLabels, "| Selected Filter:", osFilter);

        let matchesSearch = title.includes(input) || command.includes(input) || input === "";
        let matchesOS = osFilter === "all" || osLabels.includes(osFilter);

        if (matchesSearch && matchesOS) {
            box.style.display = "block";
        } else {
            box.style.display = "none";
        }
    });
};

// Ensure scripts load on page start
window.onload = function() {
    window.loadScripts();
};
