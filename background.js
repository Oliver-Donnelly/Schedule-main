let currentDate;

const schedule = {
    
    NAVY: {
        //Navy + Gold = same
        //No M1 + M2 on schedule
        dayA: ['Purple/Free/m1', 'Pink/Math/m1', 'Red/CSA/m1', 'Yellow/Chemistry/m1', 'Orange/French/m1'],
        dayB: ['LightGreen/Free/m1', 'Blue/English/m1', 'Tan/History/m1', 'Purple/Free/m2', 'Pink/Math/m2'],
        dayC: ['Yellow/Chemistry/m2', 'Red/CSA/m2', 'Orange/French/m2', 'LightGreen/Digital Networking/m2', 'Blue/English/m2'],
        dayD: ['Tan/History/m2', 'Purple/Free/m1', 'Pink/Math/m1', 'Red/CSA/m1', 'Yellow/Chemistry/m1'],
        dayE: ['Orange/French/m1', 'LightGreen/Free/m1', 'Blue/English/m1', 'Tan/History/m1', 'Purple/Free/m2'],
        dayF: ['Pink/Math/m2', 'Red/CSA/m2', 'Yellow/Chemistry/m2', 'Orange/French/m2', 'LightGreen/Digital Networking/m2'],
        dayG: ['Blue/English/m2', 'Tan/History/m2', 'Purple/Free/m1', 'Pink/Math/m1', 'Red/CSA/m1'],
        dayH: ['Yellow/Chemistry/m1', 'Orange/French/m1', 'LightGreen/Free/m1', 'Blue/English/m1', 'Tan/History/m1']
    },
    GOLD: {
        //Navy + Gold = same
        //No M1 + M2 on schedule
        dayA: ['Purple/Free/m2', 'Pink/Math/m2', 'Red/CSA/m2', 'Yellow/Chemistry/m2', 'Orange/French/m2'],
        dayB: ['LightGreen/Digital Networking/m2', 'Blue/English/m2', 'Tan/History/m2', 'Purple/Free/m1', 'Pink/Math/m1'],
        dayC: ['Yellow/Chemistry/m1', 'Red/CSA/m1', 'Orange/French/m1', ' LightGreen/Free/m1', 'Blue/English/m1'],
        dayD: ['Tan/History/m1', 'Purple/Free/m2', 'Pink/Math/m2', 'Red/CSA/m2', 'Yellow/Chemistry/m2'],
        dayE: ['Orange/French/m2', 'LightGreen/Digital Networking/m2', 'Blue/English/m2', 'Tan/History/m2', 'Purple/Free/m1'],
        dayF: ['Pink/Math/m1', 'Red/CSA/m1', 'Yellow/Chemistry/m1', 'Orange/French/m1', 'LightGreen/Free/m1'],
        dayG: ['Blue/English/m1', 'Tan/History/m1', 'Purple/Free/m2', 'Pink/Math/m2', 'Red/CSA/m2'],
        dayH: ['Yellow/Chemistry/m2', 'Orange/French/m1', 'LightGreen/Digital Networking/m2', 'Blue/English/m2', 'Tan/History/m2']
    }
};

function getTomorrow() {
    return new Promise((resolve, reject) => {
        let currentDate = new Date();
        currentDate.setDate(currentDate.getDate() + 1);  // Adjust to the next day
        const tomorrowDate = currentDate.toISOString().split('T')[0];
        const url = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vS3-6MgEPFUcHbLfa7q97_I6BI8CJvLZA0FDPxMwKOEFKYZs1GAw_4CRt6oOIWhMEITpOKzYrW2u7Ef/pub?gid=0&single=true&output=csv';
        const cacheBuster = new Date().getTime();
        const urlWithCacheBuster = `${url}&_=${cacheBuster}`;
        fetch(urlWithCacheBuster, { cache: "no-store" })    
            .then(response => response.text())
            .then(data => {
                const lines = data.split('\n');
                for (let i = 1; i < lines.length; i++) {
                    const [date, scheduleDay, week] = lines[i].split(',');
                    const currentWeek = week.trim();
                    if (date === tomorrowDate) {
                        if(currentWeek == "Gold"){
                            const correctDay = scheduleDay.trim();
                            const colors = schedule.GOLD[correctDay];
                            resolve(colors);
                            return;
                            } else{
                                const correctDay = scheduleDay.trim();
                            const colors = schedule.NAVY[correctDay];
                            resolve(colors);
                            return;
                            }
                    }
                }
                reject(`No School tomorrow boooo!!!`);
            })
            .catch(error => {
                reject(error);
            });
    });
}
function getToday() {
    return new Promise((resolve, reject) => {
        currentDate = new Date().toISOString().split('T')[0];
        const url = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vS3-6MgEPFUcHbLfa7q97_I6BI8CJvLZA0FDPxMwKOEFKYZs1GAw_4CRt6oOIWhMEITpOKzYrW2u7Ef/pub?gid=0&single=true&output=csv';
        const cacheBuster = new Date().getTime();
        const urlWithCacheBuster = `${url}&_=${cacheBuster}`;
        fetch(urlWithCacheBuster, { cache: "no-store" })    
            .then(response => response.text())
            .then(data => {
                const lines = data.split('\n');
                for (let i = 1; i < lines.length; i++) {
                    const [date, scheduleDay, week] = lines[i].split(',');
                    const currentWeek = week.trim();
                    if (date === currentDate) {
                        if(currentWeek == "Gold"){
                        const correctDay = scheduleDay.trim();
                        const colors = schedule.GOLD[correctDay];
                        resolve(colors);
                        return;
                        } else{
                            const correctDay = scheduleDay.trim();
                        const colors = schedule.NAVY[correctDay];
                        resolve(colors);
                        return;
                        }
                    }
                }
                console.log(`No schedule found for ${currentDate}`);
                reject(new Error(`No schedule found for ${currentDate}`));
            })
            .catch(error => {
                console.error('An error occurRed/CSA:', error);
                reject(error);
            });
    });
}


chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "getTodaySchedule") {
        getToday().then(colors => {
            sendResponse({ status: "success", colors: colors });
        }).catch(error => {
            sendResponse({ status: "error", error: error.toString() });
        });
        return true;  // Indicates you wish to send a response asynchronously.
    }

    if (message.action === "getTomorrowSchedule") {
        getTomorrow().then(colors => {
            sendResponse({ status: "success", colors: colors });
        }).catch(error => {
            sendResponse({ status: "error", error: error.toString() });
        });
        return true;  // Indicates you wish to send a response asynchronously.
    }
});