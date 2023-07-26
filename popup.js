document.addEventListener("DOMContentLoaded", function() {
    
    const saveBtn = document.getElementById("saveBtn");
    const cancelBtn = document.getElementById("cancelBtn");

    const alarmName = "remindMe";
  
    saveBtn.addEventListener("click", function() {
        const frequency = parseInt(document.getElementById("frequency").value);
        saveFrequency(frequency);
        setReminder(frequency);
    });

    cancelBtn.addEventListener("click", function() {
        cancelReminder();
    });
  
    function saveFrequency(frequency) {
        chrome.storage.sync.set({ reminderFrequency: frequency }, function() {
            console.log("Frequency saved:", frequency);
        });
    }
  
    function setReminder(frequency) {
        chrome.alarms.create(alarmName, { periodInMinutes: frequency });
        console.log("Reminder set for every", frequency, "minutes.");
    }

    function cancelReminder() {
        chrome.alarms.clear(alarmName);
        console.log("Reminder successfully canceled.");
    }

    // Check if the user has already set the frequency
    chrome.storage.sync.get(["reminderFrequency"], function(result) {
        const frequency = result.reminderFrequency;
        if (frequency) {
            document.getElementById("frequency").value = frequency;
            setReminder(frequency);
        }
    });

    function showNotification() {
        const options = {
            type: "basic",
            iconUrl: "icon.png",
            title: "Time to take a break!",
            message: "Get up for a break and drink some water",
        };
    
        // Create a notification popup
        chrome.notifications.create(options, function(notificationId) {
            console.log("Notification created:", notificationId);
        });
    }

    // Listen for alarm events
    chrome.alarms.onAlarm.addListener(function(alarm) {
        console.log("Got an alarm!", alarm);
        if (alarm.name == alarmName) {
             showNotification();
        }
    });

});
  




