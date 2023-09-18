const saveOptions = () => {
    const greenM1 = document.getElementById('greenM1').value || " ";
    const greenM1User = "Green/" + greenM1;
    const greenM2 = document.getElementById('greenM2').value || " ";
    const greenM2User = "Green/" + greenM2;
    const redM1 = document.getElementById('redM1').value || " ";
    const redM1User = "Red/" + redM1;
    const redM2 = document.getElementById('redM2').value || " ";
    const redM2User = "Red/" + redM2;
    const yellowM1 = document.getElementById('yellowM1').value || " ";
    const yellowM1User = "Yellow/" + yellowM1;
    const yellowM2 = document.getElementById('yellowM2').value || " ";
    const yellowM2User = "Yellow/" + yellowM2;
    const orangeM1 = document.getElementById('orangeM1').value || " ";
    const orangeM1User = "Orange/" + orangeM1;
    const orangeM2 = document.getElementById('orangeM2').value || " ";
    const orangeM2User = "Orange/" + orangeM2;
    const purpleM1 = document.getElementById('purpleM1').value || " ";
    const purpleM1User = "Purple/" + purpleM1;
    const purpleM2 = document.getElementById('purpleM2').value || " ";
    const purpleM2User = "Purple/" + purpleM2;
    const pinkM1 = document.getElementById('pinkM1').value || " ";
    const pinkM1User = "Pink/" + pinkM1;
    const pinkM2 = document.getElementById('pinkM2').value || " ";
    const pinkM2User = "Pink/" + pinkM2;
    const tanM1 = document.getElementById('tanM1').value || " ";
    const tanM1User = "Tan/" + tanM1;
    const tanM2 = document.getElementById('tanM2').value || " ";
    const tanM2User = "Tan/" + tanM2;
    const blueM1 = document.getElementById('blueM1').value || " ";
    const blueM1User = "Blue/" + blueM1;
    const blueM2 = document.getElementById('blueM2').value || " ";
    const blueM2User = "Blue/" + blueM2;
  
    chrome.storage.sync.set(
      { 
        greenM1User, greenM2User,
        redM1User, redM2User,
        yellowM1User, yellowM2User,
        orangeM1User, orangeM2User,
        purpleM1User, purpleM2User,
        pinkM1User, pinkM2User,
        tanM1User, tanM2User,
        blueM1User, blueM2User
      },
      () => {
        // Update status to let user know options were saved.
        const status = document.getElementById('status');
        status.textContent = 'Options saved.';
        setTimeout(() => {
          status.textContent = '';
        }, 750);
      }
    );
  };

  // Restores select box and checkbox state using the preferences
// stored in chrome.storage.
const restoreOptions = () => {
    chrome.storage.sync.get(
      ['greenM1User', 'greenM2User', 'redM1User', 'redM2User', 'yellowM1User', 'yellowM2User', 'orangeM1User', 'orangeM2User', 'purpleM1User', 'purpleM2User', 'pinkM1User', 'pinkM2User', 'tanM1User', 'tanM2User', 'blueM1User', 'blueM2User'],
      (items) => {
        document.getElementById('greenM1').value = items.greenM1User.split('/')[1] || " ";
        document.getElementById('greenM2').value = items.greenM2User.split('/')[1] || " ";
        document.getElementById('redM1').value = items.redM1User.split('/')[1] || " ";
        document.getElementById('redM2').value = items.redM2User.split('/')[1] || " ";
        document.getElementById('yellowM1').value = items.yellowM1User.split('/')[1] || " ";
        document.getElementById('yellowM2').value = items.yellowM2User.split('/')[1] || " ";
        document.getElementById('orangeM1').value = items.orangeM1User.split('/')[1] || " ";
        document.getElementById('orangeM2').value = items.orangeM2User.split('/')[1] || " ";
        document.getElementById('purpleM1').value = items.purpleM1User.split('/')[1] || " ";
        document.getElementById('purpleM2').value = items.purpleM2User.split('/')[1] || " ";
        document.getElementById('pinkM1').value = items.pinkM1User.split('/')[1] || " ";
        document.getElementById('pinkM2').value = items.pinkM2User.split('/')[1] || " ";
        document.getElementById('tanM1').value = items.tanM1User.split('/')[1] || " ";
        document.getElementById('tanM2').value = items.tanM2User.split('/')[1] || " ";
        document.getElementById('blueM1').value = items.blueM1User.split('/')[1] || " ";
        document.getElementById('blueM2').value = items.blueM2User.split('/')[1] || " ";
      }
    );
  };

  document.addEventListener('DOMContentLoaded', restoreOptions);
  document.getElementById('save').addEventListener('click', saveOptions);

