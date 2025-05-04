// Simulated function to fetch user data from API
function fetchUserData(matricNo) {
  // Simulating async API call delay using Promise
  return new Promise((resolve) => {
    setTimeout(() => {
      const apiResponses = [
        {
          name: "Tc. Muhammad Hafiz Shahman Bin Mohd Nor Hisham",
          department: "Jabatan Teknologi Maklumat Dan Komunikasi",
          icNumber: "990304066435",
          matricNo: "19DDT18F2070",
        },
        {
          name: "Pn. Siti Aishah Binti Ahmad",
          department: "Jabatan Kejuruteraan Awam",
          icNumber: "950512045678",
          matricNo: "19DDT18F2071",
        },
        {
          name: "En. Ahmad Faizal Bin Mohd Ali",
          department: "Jabatan Perakaunan",
          icNumber: "980101012345",
          matricNo: "19DDT18F2072",
        },
        {
          name: "Cik Nurul Hidayah Binti Mohd Zain",
          department: "Jabatan Pengajian Perniagaan",
          icNumber: "970303098765",
          matricNo: "19DDT18F2073",
        },
      ];

      // Find the user data that matches the matricNo
      const userData = apiResponses.find(user => user.matricNo === matricNo);
      resolve(userData || null); // Resolve with user data or null if not found
    }, 800); // Simulated network delay
  });
}

function displayUserData(data) {
  if (data) {
    document.getElementById("name").textContent = data.name;
    document.getElementById("department").textContent = data.department;
    // document.getElementById('phone').textContent = data.phone; // Uncomment if phone data is available
    document.getElementById("icNumber").textContent = data.icNumber;
    document.getElementById("matricNo").textContent = data.matricNo;
  } else {
    // Handle case where no data is found
    ["name", "department", "icNumber", "matricNo"].forEach((id) => {
      document.getElementById(id).textContent = "No data found";
    });
  }
}

async function refreshData() {
  // Show loading placeholders
  ["name", "department", "icNumber", "matricNo"].forEach((id) => {
    document.getElementById(id).textContent = "Loading...";
  });
  // Get the matricNo from the URL
  const urlParams = new URLSearchParams(window.location.search);
  const matricNo = urlParams.get('matricNo'); // Change 'id' to 'matricNo'
  try {
    const data = await fetchUserData(matricNo);
    displayUserData(data);
  } catch (e) {
    ["name", "department", "icNumber", "matricNo"].forEach((id) => {
      document.getElementById(id).textContent = "Error loading data";
    });
  }
}

// Uncomment if you have a refresh button
// document.getElementById('refreshButton').addEventListener('click', refreshData);

document.addEventListener("DOMContentLoaded", refreshData);
