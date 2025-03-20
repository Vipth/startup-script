async function loadScripts() {
    try {
        let response = await fetch("scripts.json"); // Fetch JSON file
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

            // Append OS labels to the script box
            scriptBox.insertBefore(osLabelContainer, scriptBox.firstChild);
            container.appendChild(scriptBox);
        });

        filterScripts(); // Apply filter after loading
    } catch (error) {
        console.error("Error loading scripts:", error);
    }
}

function filterScripts() {
    let input = document.getElementById('search').value.toLowerCase().trim();
    let osFilter = document.getElementById('os-filter').value.trim().toLowerCase();
    let scriptBoxes = document.querySelectorAll('.script-box');

    scriptBoxes.forEach(box => {
        let title = box.querySelector('.script-title').innerText.toLowerCase();
        let command = box.querySelector('.command').innerText.toLowerCase();
        
        // Get all OS labels inside the script box
        let osLabels = Array.from(box.querySelectorAll('.os-label')).map(label => label.innerText.trim().toLowerCase());

        console.log("OS Labels:", osLabels, "| Selected Filter:", osFilter); // Debugging output

        let matchesSearch = title.includes(input) || command.includes(input) || input === "";
        let matchesOS = osFilter === "all" || osLabels.includes(osFilter); // Check if any OS matches

        if (matchesSearch && matchesOS) {
            box.style.display = "block";
        } else {
            box.style.display = "none";
        }
    });
}

function copyToClipboard(button) {
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
}

function copyDiscord() {
    navigator.clipboard.writeText("Vipth").then(() => {
        null;
    }).catch(err => {
        console.error("Failed to copy text: ", err);
    });
}

loadScripts(); // Call function on page load
