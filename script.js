// Create button element
const dlBtn = document.createElement('div');
dlBtn.id = 'downloadButton';
dlBtn.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
        <path fill="white" d="M480-320 280-520l56-58 104 104v-326h80v326l104-104 56 58-200 200ZM240-160q-33 0-56.5-23.5T160-240v-120h80v120h480v-120h80v120q0 33-23.5 56.5T720-160H240Z"/>
    </svg>`;
dlBtn.style.cssText = `
    display: flex;
    position: fixed;
    right: 20px;
    bottom: 20px;
    z-index: 10000;
    color: white;
    height: 38px;
    min-width: 38px;
    padding: 5px;
    background-color: rgba(0, 0, 0, 0.85);
    justify-content: center;
    align-items: center;
    border-radius: 30px;
`;
document.body.appendChild(dlBtn);

dlBtn.addEventListener('click', () => {
    // Find contest ID
    const match = window.location.href.match(/\/contest\/(\d+)/);
    if (match?.[1]) {
        const contestId = match[1];

        // Fetch the download link
        fetch(`https://www.48hourslogo.com/api/v1/projects/${contestId}`)
            .then(response => response.json())
            .then(({ data }) => {
                const { company_name: contestTitle, package: { file: downloadLink } } = data;

                // Create a link element to trigger the download
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
