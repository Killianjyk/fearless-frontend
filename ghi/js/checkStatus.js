function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  }

const payloadCookie = getCookie("jwt_access_payload");// FINISH THIS
if (payloadCookie) {
  // The cookie value is a JSON-formatted string, so parse it
  const encodedPayload = JSON.parse(payloadCookie);

  // Convert the encoded payload from base64 to normal string
  const decodedPayload = atob(encodedPayload);// FINISH THIS

  // The payload is a JSON-formatted string, so parse it
  const payload = JSON.parse(decodedPayload)// FINISH THIS

  // Print the payload
  console.log(payload);

  // Check if "events.add_conference" is in the permissions.
  // If it is, remove 'd-none' from the link
    if (payload.user.perms.includes("events.add_conference")) {
        const newconferencelink = document.getElementById("new-conference-link");
        console.log(newconferencelink);
        console.log(document);
        newconferencelink.classList.remove("d-none");
    }

  // Check if "events.add_location" is in the permissions.
  // If it is, remove 'd-none' from the link
    if (payload.user.perms.includes("events.add_location")) {
        const newlocationlink = document.getElementById("new-location-link");
        newlocationlink.classList.remove("d-none");
    }
}
