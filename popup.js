document.addEventListener("DOMContentLoaded", function() {
    
    const saveBtn = document.getElementById("saveBtn");
    const cancelBtn = document.getElementById("cancelBtn");

    const alarmName = "remindMe";
  
    saveBtn.addEventListener("click", function() {
        const frequency = parseInt(document.getElementById("frequency").value);
        saveFrequency(frequency);
        setReminder(frequency);
        alert("Reminder set.");
    });

    cancelBtn.addEventListener("click", function() {
        cancelReminder();
        alert("Reminder canceled.");
    });
  
    function saveFrequency(frequency) {
        chrome.storage.sync.set({ reminderFrequency: frequency }, function() {
            console.log("Frequency saved:", frequency);
        });
    }
  
    function setReminder(frequency) {
        chrome.alarms.create(alarmName, { periodInMinutes: frequency });
        const today = new Date();
        const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        console.log("Reminder set for every", frequency, "minutes", "at", date + ' ' + time);
    }

    function cancelReminder() {
        chrome.alarms.clear(alarmName);
        console.log("Reminder", alarmName, "successfully canceled.");
    }

    // Check if the user has already set the frequency
    chrome.storage.sync.get(["reminderFrequency"], function(result) {
        const frequency = result.reminderFrequency;
        if (frequency) {
            document.getElementById("frequency").value = frequency;
            setReminder(frequency);
        }
    });

});
  




