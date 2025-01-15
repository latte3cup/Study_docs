// ==UserScript==
// @name         GPT Response Star and Save
// @namespace    http://tampermonkey.net/
// @version      2.0
// @description  Add a star button to GPT responses for temporary saving and view them on the right with titles and popup expansion.
// @author       You
// @match        https://chatgpt.com/*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    function addStarButtons() {
        // Select response blocks with data-testid="conversation-turn-" and odd IDs
        const responses = document.querySelectorAll("[data-testid^='conversation-turn-']");

        responses.forEach((response) => {
            const testId = response.getAttribute("data-testid");
            if (!testId || !testId.startsWith("conversation-turn-")) return;

            const idNumber = parseInt(testId.split("-").pop(), 10);

            // Only target response blocks (odd numbers starting from 3)
            if (idNumber % 2 !== 1 || idNumber < 3) return;

            // Find the target child where the star button will be appended
            const targetChild = response.querySelector(".m-auto .mx-auto .relative.w-full");

            if (!targetChild || targetChild.querySelector(".star-button")) return; // Skip if target child not found or button already exists

            // Create a star button
            const starButton = document.createElement("button");
            starButton.innerText = "⭐";
            starButton.className = "star-button";
            starButton.style.marginLeft = "10px";
            starButton.style.cursor = "pointer";
            starButton.style.border = "none";
            starButton.style.background = "transparent";
            starButton.style.fontSize = "20px";
            starButton.style.color = getComputedStyle(document.body).color; // Match text color for dark mode

            // Add an onclick event to save the question and corresponding response
            starButton.onclick = () => {
                const questionId = idNumber - 1; // Corresponding question block ID is one before the response ID
                const question = document.querySelector(`[data-testid='conversation-turn-${questionId}']`);

                if (!question) {
                    alert("Corresponding question not found!");
                    return;
                }

                saveResponse(response, question);
            };

            targetChild.appendChild(starButton); // Append the star button to the specific child
        });
    }

    // Function to save a question and response pair
    function saveResponse(response, question) {
        const savedResponses = JSON.parse(localStorage.getItem("starredGPTResponses") || "[]");
        const questionText = question.innerText;
        const responseText = response.innerText;

        const savedItem = { question: questionText, response: responseText };

        if (!savedResponses.some(item => item.response === responseText)) {
            savedResponses.push(savedItem);
            localStorage.setItem("starredGPTResponses", JSON.stringify(savedResponses));
            updateSavedResponses();
        } else {
            alert("This response is already starred.");
        }
    }

    // Function to update the sidebar with saved responses
    function updateSavedResponses() {
        const savedResponses = JSON.parse(localStorage.getItem("starredGPTResponses") || "[]");

        const sidebar = document.getElementById("gpt-sidebar");
        sidebar.innerHTML = ""; // Clear previous content

        savedResponses.forEach((item, index) => {
            const responseDiv = document.createElement("div");
            responseDiv.style.marginBottom = "10px";
            responseDiv.style.padding = "10px";
            responseDiv.style.border = "1px solid #444";
            responseDiv.style.borderRadius = "5px";
            responseDiv.style.backgroundColor = "#000"; // Explicit dark background
            responseDiv.style.color = "#fff"; // Explicit white text color

            // Add a dividing line between title and response
            responseDiv.style.borderBottom = "1px solid #fff"; // White dividing line

            const titleDiv = document.createElement("div");
            titleDiv.innerText = `Q: ${item.question.length > 100 ? item.question.slice(0, 97) + "..." : item.question}`; // Truncate long questions
            titleDiv.style.fontWeight = "bold";
            titleDiv.style.marginBottom = "5px";

            const textDiv = document.createElement("div");
            textDiv.innerText = item.response;
            textDiv.style.maxHeight = "100px";
            textDiv.style.overflow = "auto";

            const removeButton = document.createElement("button");
            removeButton.innerText = "❌";
            removeButton.style.marginLeft = "10px";
            removeButton.style.cursor = "pointer";
            removeButton.style.border = "none";
            removeButton.style.background = "transparent";
            removeButton.style.fontSize = "16px";
            removeButton.style.color = "#fff"; // Explicit white text color
            removeButton.onclick = () => {
                savedResponses.splice(index, 1);
                localStorage.setItem("starredGPTResponses", JSON.stringify(savedResponses));
                updateSavedResponses();
            };

            const expandButton = document.createElement("button");
            expandButton.innerText = "🔍";
            expandButton.style.marginLeft = "10px";
            expandButton.style.cursor = "pointer";
            expandButton.style.border = "none";
            expandButton.style.background = "transparent";
            expandButton.style.fontSize = "16px";
            expandButton.style.color = "#fff"; // Explicit white text color
            expandButton.onclick = () => {
                showPopup(item);
            };

            responseDiv.appendChild(titleDiv);
            responseDiv.appendChild(textDiv);
            responseDiv.appendChild(removeButton);
            responseDiv.appendChild(expandButton);
            sidebar.appendChild(responseDiv);
        });
    }

    // Function to create the sidebar
    function createSidebar() {
        if (document.getElementById("gpt-sidebar")) return; // Skip if sidebar already exists

        const sidebar = document.createElement("div");
        sidebar.id = "gpt-sidebar";
        sidebar.style.position = "fixed";
        sidebar.style.top = "10px";
        sidebar.style.right = "10px";
        sidebar.style.width = "300px";
        sidebar.style.height = "90%";
        sidebar.style.overflowY = "auto";
        sidebar.style.border = "1px solid #444";
        sidebar.style.borderRadius = "5px";
        sidebar.style.padding = "10px";
        sidebar.style.backgroundColor = "#000"; // Explicit dark background
        sidebar.style.color = "#fff"; // Explicit white text color
        sidebar.style.boxShadow = "0 0 10px rgba(0,0,0,0.5)";
        sidebar.style.zIndex = "99999";

        const title = document.createElement("h4");
        title.innerText = "Starred Responses";
        title.style.marginTop = "0";
        title.style.color = "#fff"; // Explicit white text color
        sidebar.appendChild(title);

        document.body.appendChild(sidebar);
    }

    function showPopup(item) {
        const popup = document.createElement("div");
        popup.style.position = "fixed";
        popup.style.top = "50%";
        popup.style.left = "50%";
        popup.style.transform = "translate(-50%, -50%)";
        popup.style.width = "60%";
        popup.style.maxHeight = "80%";
        popup.style.overflowY = "auto";
        popup.style.padding = "20px";
        popup.style.backgroundColor = "#000"; // Explicit dark background
        popup.style.color = "#fff"; // Explicit white text color
        popup.style.border = "1px solid #444";
        popup.style.borderRadius = "10px";
        popup.style.boxShadow = "0 0 20px rgba(0, 0, 0, 0.5)";
        popup.style.zIndex = "100000";

        const closeButton = document.createElement("button");
        closeButton.innerText = "Close";
        closeButton.style.position = "fixed";
        closeButton.style.top = "10px";
        closeButton.style.right = "10px";
        closeButton.style.cursor = "pointer";
        closeButton.style.border = "none";
        closeButton.style.borderRadius = "5px";
        closeButton.style.backgroundColor = "#444";
        closeButton.style.color = "#fff";
        closeButton.onclick = () => {
            document.body.removeChild(popup);
        };

        const title = document.createElement("h3");
        title.innerText = `Q: ${item.question}`;
        title.style.marginBottom = "10px";

        const content = document.createElement("div");
        content.innerHTML = item.response.replace(/\n/g, '<br>');
        content.style.padding = "10px";
        content.style.border = "1px solid #333";
        content.style.backgroundColor = "#111";
        content.style.borderRadius = "5px";
        content.style.whiteSpace = "pre-wrap"; // Maintain formatting

        popup.appendChild(closeButton);
        popup.appendChild(title);
        popup.appendChild(content);
        document.body.appendChild(popup);
    }

    // Initialize the script
    function init() {
        createSidebar();
        updateSavedResponses();
        setInterval(addStarButtons, 1000); // Periodically check for new responses
    }

    init();
})();
