 // Simulated function to fetch user data from API
 function fetchUserData() {
  // Simulating async API call delay using Promise
  return new Promise((resolve) => {
    setTimeout(() => {
      const apiResponse = {
        name: "Tc. Muhammad Hafiz Shahman Bin Mohd Nor Hisham",
        department: "Jabatan Teknologi Maklumat Dan Komunikasi",
        // phone: "+1 234 567 8900",
        icNumber: "990304066435",
        matricNo: "19DDT18F2070"
      };
      resolve(apiResponse);
    }, 800); // Simulated network delay
  });
}

function displayUserData(data) {
  document.getElementById('name').textContent = data.name;
  document.getElementById('department').textContent = data.department;
  // document.getElementById('phone').textContent = data.phone;
  document.getElementById('icNumber').textContent = data.icNumber;
  document.getElementById('matricNo').textContent = data.matricNo;
}

async function refreshData() {
  // Show loading placeholders
  [ 'name', 'department',  'icNumber', 'matricNo' ].forEach(id => {
    document.getElementById(id).textContent = "Loading...";
  });
  try {
    const data = await fetchUserData();
    displayUserData(data);
  } catch (e) {
    [ 'name', 'department', 'icNumber', 'matricNo' ].forEach(id => {
      document.getElementById(id).textContent = "Error loading data";
    });
  }
}

// document.getElementById('refreshButton').addEventListener('click', refreshData);

document.addEventListener('DOMContentLoaded', refreshData);
