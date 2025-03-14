document.addEventListener('DOMContentLoaded', function() {
    // Current date/time functions
    function getCurrentDateTime() {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');

        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    }

    function setDateTime() {
        const elements = document.querySelectorAll('.datetime');
        const currentDateTime = getCurrentDateTime();

        elements.forEach(function(element) {
            element.textContent = currentDateTime;
        });
    }

    function setCurrentYear() {
        const elements = document.querySelectorAll('.year');
        const currentYear = new Date().getFullYear();

        elements.forEach(function(element) {
            element.textContent = currentYear;
        });
    }

    // Load license content
    async function loadLicenseContent() {
        try {
            const response = await fetch('./owl-license-v2.txt');
            const licenseText = await response.text();
            document.getElementById('license-content').innerHTML = licenseText;
        } catch (error) {
            document.getElementById('license-content').innerHTML = 'Error loading license: ' + error.message;
        }
    }

    // Load v1 license content
    async function loadV1LicenseContent() {
        try {
            const response = await fetch('./owl-license-v1.txt');
            const licenseText = await response.text();
            document.getElementById('v1-license-content').innerHTML = licenseText;
        } catch (error) {
            document.getElementById('v1-license-content').innerHTML = 'Error loading license: ' + error.message;
        }
    }

    // Handle command options
    const commandOptions = document.querySelectorAll('.command-option');
    commandOptions.forEach(option => {
        option.addEventListener('click', function() {
            const command = this.getAttribute('data-command');

            switch(command) {
                case 'download':
                    window.location.href = './owl-license-v2.txt';
                    break;
                case 'copy':
                    copyLicenseToClipboard();
                    break;
                case 'view-v1':
                    showV1Modal();
                    break;
                case 'github':
                    window.open('https://github.com/micr0-dev/owl-license', '_blank');
                    break;
            }
        });
    });

    // Copy license to clipboard
    async function copyLicenseToClipboard() {
        try {
            const response = await fetch('./owl-license-v2.txt');
            const licenseText = await response.text();

            await navigator.clipboard.writeText(licenseText);
            showToast('License copied to clipboard!');
        } catch (error) {
            showToast('Failed to copy: ' + error.message, true);
        }
    }

    // Show toast notification
    function showToast(message, isError = false) {
        const toast = document.getElementById('toast');
        const toastMessage = toast.querySelector('.toast-message');

        toastMessage.textContent = message;
        if (isError) {
            toast.style.backgroundColor = '#ff6347';
        } else {
            toast.style.backgroundColor = '';
        }

        toast.classList.add('show');

        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }

    // Modal functionality
    function showV1Modal() {
        const modal = document.getElementById('v1-modal');
        modal.classList.add('show');
        loadV1LicenseContent();
    }

    const closeModalButtons = document.querySelectorAll('.close-modal');
    closeModalButtons.forEach(button => {
        button.addEventListener('click', function() {
            const modal = document.getElementById('v1-modal');
            modal.classList.remove('show');
        });
    });

    // Terminal effects
    const terminalLines = document.querySelectorAll('.terminal-line');
    terminalLines.forEach((line, index) => {
        if (index < terminalLines.length - 1) {
            line.style.opacity = '0';
            line.style.transform = 'translateY(10px)';

            setTimeout(() => {
                line.style.transition = 'all 0.3s ease';
                line.style.opacity = '1';
                line.style.transform = 'translateY(0)';
            }, 100 + (index * 100));
        }
    });

    const terminalOutputs = document.querySelectorAll('.terminal-output');
    terminalOutputs.forEach((output, index) => {
        output.style.opacity = '0';
        output.style.transform = 'translateY(10px)';

        setTimeout(() => {
            output.style.transition = 'all 0.3s ease';
            output.style.opacity = '1';
            output.style.transform = 'translateY(0)';
        }, 200 + (index * 100));
    });

    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        const modal = document.getElementById('v1-modal');
        if (event.target === modal) {
            modal.classList.remove('show');
        }
    });

    // Initialize
    setDateTime();
    setCurrentYear();
    loadLicenseContent();
});
