function showNotification() {
  const options = {
      type: "basic",
      iconUrl: "icon.png",
      title: "Time to take a break!",
      message: "Get up for a break and drink some water",
      silent: false,
  };

  // Create a notification popup
  chrome.notifications.create(options, function(notificationId) {
      console.log("Notification created:", notificationId);
  });
}

// Listen for alarm events
chrome.alarms.onAlarm.addListener(function(alarm) {
  console.log("Got an alarm!", alarm);
  if (alarm.name == "remindMe") {
       showNotification();
  }
});