const TARGET_HOUR = 8;
const TARGET_MINUTE = 0;
const TIMEZONE = 'Asia/Jakarta';

let hasOpenedToday = false;

chrome.runtime.onInstalled.addListener(() => {
  chrome.alarms.create('checkTime', { periodInMinutes: 1 });
});

chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === 'checkTime') {
    checkAndOpenPopup();
  }
});

function checkAndOpenPopup() {
  const now = new Date();
  const wibTime = new Date(now.toLocaleString('en-US', { timeZone: TIMEZONE }));
  const day = wibTime.getDay();
  const hour = wibTime.getHours();
  const minute = wibTime.getMinutes();
  const isWeekday = day >= 1 && day <= 5;
  const isTargetTime = hour === TARGET_HOUR && minute === TARGET_MINUTE;

  if (isWeekday && isTargetTime && !hasOpenedToday) {
    hasOpenedToday = true;
    chrome.action.openPopup();
  }

  if (hour !== TARGET_HOUR) {
    hasOpenedToday = false;
  }
}