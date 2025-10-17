 // Update current time in milliseconds
        function updateTime() {
            const timeElement = document.getElementById('current-time');
            timeElement.textContent = Date.now();
        }
        
        // Initial update
        updateTime();
        
        // Update time every second for accuracy
        setInterval(updateTime, 1000);