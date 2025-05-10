async function fetchUserData() {
  // const matricNo = "DL6412";
  // Get the matricNo from the URL

  const urlParams = new URLSearchParams(window.location.search);
  let matricNo = urlParams.get("matricNo");
  // Remove leading slashes if they exist
  if (matricNo) {
    matricNo = matricNo.replace("/", ""); // This will remove any leading slashes
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
  const departmentMapping = {
    JTMK: "Jabatan Teknologi Maklumat Dan Komunikasi",
    JPH: "Jabatan Pelancongan Dan Hospitaliti",
    JP: "Jabatan Perdagangan",
    JRKV: "Jabatan Rekabentuk dan Komunikasi Visual",
    JKM: "Jabatan Kejuruteraan Dan Mekanikal",
  };

  if (data) {
    document.getElementById("name").textContent = data.name;
    document.getElementById("icNumber").textContent = data.icNumber;
    document.getElementById("matricNo").textContent = data.matricNo;
    document.getElementById("pa").textContent = data.PA;
    // document.getElementById("department").textContent = data.department;

    const dept = data.department;
    document.getElementById("department").textContent =
      departmentMapping[dept] || "Tiada Jabatan";

    //set color for every department
    document.documentElement.style.backgroundColor = getDepartmentColor(dept);
    const infoElement = document.getElementById("info");
    if (infoElement) {
      infoElement.style.borderColor = getDepartmentColor(dept);
    }
    const sectionElements = document.getElementsByClassName("section");
    if (sectionElements && sectionElements.length > 0) {
      for (let i = 0; i < sectionElements.length; i++) {
        sectionElements[i].style.borderColor = getDepartmentColor(dept);
      }
    }
    const actionBtnElements = document.getElementsByClassName("actionBtn");
    if (actionBtnElements && actionBtnElements.length > 0) {
      for (let i = 0; i < actionBtnElements.length; i++) {
        const anchor = actionBtnElements[i].querySelector("a");
        if (anchor) {
          anchor.style.backgroundColor = getDepartmentColor(dept);
        }
      }
    }


    document.getElementById("class").textContent = data.class;
    // Update phone number display
    const phoneNumber = data.phone;
    document.getElementById("phone").textContent = phoneNumber;
    // Update the mobile link
    const mNumber = phoneNumber.replace(/[\s+,-]/g, "");
    const mobileLink = document.querySelector("a[href^='tel:']");
    if (mobileLink) {
      mobileLink.href = `tel:${mNumber}`;
    }
    // Update the WhatsApp link
    // Remove spaces, "+", and "-"
    const whatsappLink = document.querySelector(
      "a[href^='https://api.whatsapp.com/send/?phone=']"
    );
    if (whatsappLink) {
      whatsappLink.href = `https://api.whatsapp.com/send/?phone=${mNumber}`;
    }

    const profilePhotoElement = document.getElementById("profilePhoto");
    if (profilePhotoElement) {
      profilePhotoElement.src = data.image || "photo_default.jpg";
      profilePhotoElement.alt = "Profile Photo";
    }
  
  } else {
    // Handle case where no data is found
    [
      "name",
      "department",
      "icNumber",
      "matricNo",
      "phone",
      "pa",
      "class",
    ].forEach((id) => {
      document.getElementById(id).textContent = "No data found";
    });
  }
}

function getDepartmentColor(department) {
  const colors = {
      "JTMK": "hsl(280, 89%, 30%)",
      "JPH": "hsl(225, 77.00%, 77.80%)",
      "JP": "hsl(225, 86.90%, 44.90%)",
      "JRKV": "hsl(239, 87.30%, 27.80%)",
      "JKM": "hsl(0, 30.60%, 48.60%)"
  };
  return colors[department] || "hsl(0, 0.60%, 31.20%)";
}

async function refreshData() {
  // Show loading placeholders
  [
    "name",
    "department",
    "icNumber",
    "matricNo",
    "phone",
    "pa",
    "class",
  ].forEach((id) => {
    document.getElementById(id).textContent = "Loading...";
  });

  try {
    const data = await fetchUserData(matricNo);
    displayUserData(data);
    console.log(data);
  } catch (e) {
    console.error("Error during data refresh:", e);
    [
      "name",
      "department",
      "icNumber",
      "matricNo",
      "phone",
      "pa",
      "class",
    ].forEach((id) => {
      document.getElementById(id).textContent = "Error loading data";
    });
  }
}

// Fetch data when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", refreshData);
