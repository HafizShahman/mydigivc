async function fetchUserData() {
  // const matricNo = "DL6412";
  // Get the matricNo from the URL
  const urlParams = new URLSearchParams(window.location.search);
  let matricNo = urlParams.get("matricNo");
  // Remove leading slashes if they exist
  if (matricNo) {
    matricNo = matricNo.replace('/', ''); // This will remove any leading slashes
  }
  try {
    console.log(`Fetching user data for matricNo: ${matricNo}`);
    const response = await fetch("MOCK_DATA.json"); // Ensure this file is in the correct path
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const apiResponses = await response.json();
    console.log("Fetched user data:", apiResponses); // Log the fetched data
    // Check for user data
    const userData = apiResponses.find(
      (user) => user.matricNo.toLowerCase() === matricNo.toLowerCase()
    );
    console.log("User  data found:", userData); // Log the found user data
    return userData || null;
  } catch (error) {
    console.error("Error fetching user data from local MOCK_DATA.json:", error);
    return null;
  }
}

function displayUserData(data) {
  if (data) {
    document.getElementById("name").textContent = data.name;
    document.getElementById("department").textContent = data.department;
    document.getElementById("phone").textContent = data.phone;
    document.getElementById("icNumber").textContent = data.icNumber;
    document.getElementById("matricNo").textContent = data.matricNo;
  } else {
    // Handle case where no data is found
    ["name", "department", "icNumber", "matricNo", "phone"].forEach((id) => {
      document.getElementById(id).textContent = "No data found";
    });
  }
}

async function refreshData() {
  // Show loading placeholders
  ["name", "department", "icNumber", "matricNo", "phone"].forEach((id) => {
    document.getElementById(id).textContent = "Loading...";
  });

  try {
    const data = await fetchUserData(matricNo);
    displayUserData(data);
    console.log(data);
  } catch (e) {
    console.error("Error during data refresh:", e);
    ["name", "department", "icNumber", "matricNo", "phone"].forEach((id) => {
      document.getElementById(id).textContent = "Error loading data";
    });
  }
}

// Set up event listeners
const refreshButton = document.getElementById("refreshButton");
if (refreshButton) {
  refreshButton.addEventListener("click", refreshData);
}

// Fetch data when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", refreshData);
