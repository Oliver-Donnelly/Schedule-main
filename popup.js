const correctDate = new Date().toISOString().split('T')[0];
document.getElementById("correctDate").textContent = correctDate;

const times = {
    weekday: ['8:05', '9:10', '9:15', '10:20', '10:50', '11:55', '12:50', '2:10', '2:15', '3:20'],
};

chrome.runtime.sendMessage({ action: "getTodaySchedule" }, response => {
    const todayScheduleDiv = document.getElementById("todaySchedule");

   
    
    if (response.status === "success") {
        let output = "";
        for(let c = 0; c < response.colors.length; c++) {
            splitted = response.colors[c].split("/");
            
            output += "<span style='color:"+ splitted[0]+"'>" + splitted[1] + "</span> " + times.weekday[2*c] + "-" + times.weekday[2*c + 1] + "<br>";
        }
        todayScheduleDiv.innerHTML = output;
    } else {
        todayScheduleDiv.textContent = "Error fetching today's schedule: " + response.error;
    }
});