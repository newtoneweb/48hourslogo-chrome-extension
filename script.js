
// create button element
const dlBtn = document.createElement('div')
dlBtn.classList.add('dlBtn')
dlBtn.setAttribute("id", "downloadButton");
downloadSvgIcon = '<svg xmlns="http://www.w3.org/2000/svg"  height="24" viewBox="0 -960 960 960" width="24"><path fill="white" d="M480-320 280-520l56-58 104 104v-326h80v326l104-104 56 58-200 200ZM240-160q-33 0-56.5-23.5T160-240v-120h80v120h480v-120h80v120q0 33-23.5 56.5T720-160H240Z"/><deepl-alert xmlns=""/><deepl-alert xmlns=""/><deepl-alert xmlns=""/></svg>'
dlBtn.innerHTML = downloadSvgIcon
document.body.append(dlBtn)


document.getElementById('downloadButton').addEventListener('click', function () {

    // find contest ID
    currentUrl = window.location.href
    const match = currentUrl.match(/\/contest\/(\d+)/);
    if (match && match[1]) {
        const contestId = match[1];

        // Fetch the download link
        fetch(`https://www.48hourslogo.com/api/v1/projects/${contestId}`)
            .then(response => response.json())
            .then(data => {
                const contestTitle = data.data.company_name;
                const downloadLink = data.data.package.file;

                // Create a link element to trigger the download
                const link = document.createElement('a');
                link.href = downloadLink;

                // Set the download attribute to force the browser to download the file
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
