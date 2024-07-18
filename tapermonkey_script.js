// ==UserScript==
// @name         Download Contest Package 48hourslogo.com
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  Adds a download button for contest packages on 48hourslogo.com
// @author       Viorel Odajiu
// @match        *://www.48hourslogo.com/contest/*
// @grant        none
// @downloadURL  https://raw.githubusercontent.com/newtoneweb/48hourslogo-chrome-extension/main/tapermonkey_script.js
// @updateURL    https://github.com/mudachyo/Hamster-Kombat/raw/main/hamster-autoclicker.user.js
// @icon         https://www.48hourslogo.com/favicon.ico
// ==/UserScript==

(function () {
    'use strict';

    // Create and style button element
    const dlBtn = document.createElement('div');
    dlBtn.id = 'downloadButton';
    dlBtn.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
            <path fill="white" d="M480-320 280-520l56-58 104 104v-326h80v326l104-104 56 58-200 200ZM240-160q-33 0-56.5-23.5T160-240v-120h80v120h480v-120h80v120q0 33-23.5 56.5T720-160H240Z"/>
        </svg>`;
    Object.assign(dlBtn.style, {
        display: 'flex',
        position: 'fixed',
        right: '20px',
        bottom: '20px',
        zIndex: '10000',
        color: 'white',
        height: '38px',
        minWidth: '38px',
        padding: '5px',
        backgroundColor: 'rgba(0, 0, 0, 0.85)',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: '30px'
    });
    document.body.appendChild(dlBtn);

    dlBtn.addEventListener('click', () => {
        const contestIdMatch = window.location.href.match(/\/contest\/(\d+)/);
        if (contestIdMatch && contestIdMatch[1]) {
            const contestId = contestIdMatch[1];

            fetch(`https://www.48hourslogo.com/api/v1/projects/${contestId}`)
                .then(response => response.json())
                .then(({ data }) => {
                    const { company_name: contestTitle, package: { file: downloadLink } } = data;

                    const link = document.createElement('a');
                    link.href = downloadLink;
                    link.download = `${contestId} - ${contestTitle}.zip`;
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                })
                .catch(error => console.error('Error fetching download link:', error));
        } else {
            console.error('Contest ID not found in the URL');
        }
    });
})();
