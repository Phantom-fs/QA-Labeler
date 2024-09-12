// URL parameters
const urlParams = new URLSearchParams(window.location.search);

const encrypt_name = urlParams.get('name');
const encrypt_id = urlParams.get('reg');
const encrypt_email = urlParams.get('email');
const encrypt_phone = urlParams.get('phone');

// Decrypt the data
const u_name = encrypt_name.split('').reverse().join('');
const u_reg = encrypt_id.split('').reverse().join('');
const u_email = encrypt_email.split('').reverse().join('');
const u_phone = encrypt_phone.split('').reverse().join('');

// Display the data
console.log(u_name, u_reg, u_email, u_phone);

// API URLs
const Event_url = 'https://interview-label-08d53f35a817.herokuapp.com/event';
const OCEAN_url = 'https://interview-label-08d53f35a817.herokuapp.com/enter';
const db_url = 'https://interview-label-08d53f35a817.herokuapp.com/event_database';

// DOM elements
const textElement = document.getElementById('text');
const vid1 = document.getElementById('video1');
const vid2 = document.getElementById('video2');
const submitButton = document.getElementById('sb-look').querySelector('button');
const h3_1 = document.getElementById('vid_text_1');
const h3_2 = document.getElementById('vid_text_2');

// main_id and unique_id
var global_set_q;
var global_main_id;
var global_unique_id;
var global_link_1;
var global_link_2;

// Clear options from the form
function clearForm() {
    document.querySelectorAll('input[type="radio"]').forEach(input => input.checked = false);
    textElement.innerText = '';
    vid1.src = '';
    vid2.src = '';
    h3_1.innerText = 'Loading...';
    h3_2.innerText = 'Loading...';
    global_set_q = undefined;
    global_main_id = undefined;
    global_unique_id = undefined;
    global_link_1 = undefined;
    global_link_2 = undefined;
}

// Fetch text from the API and display it in the first container
function event_API() {
    fetch(Event_url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({"access" : "1"}),
    })
    .then(response => response.json())
    .then(data => {
        if (data.alert) {
            alert("Error! " + data.alert);
            return;
        }

        textElement.innerText = data.set_q;
        vid1.src = data.video_link_1;
        vid2.src = data.video_link_2;
        h3_1.innerText = "Video 1"
        h3_2.innerText = "Video 2"

        global_set_q = data.set_q;
        global_main_id = data.main_id;
        global_unique_id = data.unique_id;
        global_link_1 = data.video_link_1;
        global_link_2 = data.video_link_2;
    })
    .catch(error => {
        console.error('Error fetching text from API:', error);
        alert('Error! ' + error);
    })
    .finally(() => {
        console.log('Video and text fetched');
    });
}

// Handle form submission
function OCEAN_FormSubmission(event) {
    event.preventDefault(); // Prevent default form submission behavior

    // Check if required variables are defined
    if (global_main_id === undefined || global_unique_id === undefined) {
        alert('Please reload to fetch updated data!');
        return;
    }

    console.log(global_main_id, global_unique_id);

    // Get the selected radio buttons from the form
    const O = document.querySelector('input[name="O"]:checked')?.value;
    const C = document.querySelector('input[name="C"]:checked')?.value;
    const E = document.querySelector('input[name="E"]:checked')?.value;
    const A = document.querySelector('input[name="A"]:checked')?.value;
    const N = document.querySelector('input[name="N"]:checked')?.value;

    if (!O || !C || !E || !A || !N) {
        alert('Please fill out all fields!');
        return;
    }

    // Disable the submit button and show a loading message
    submitButton.disabled = true;
    submitButton.innerHTML = 'Submitting...';
    submitButton.style.backgroundColor = "black";

    // Prepare form data for submission
    const formData = {
        "main_id": global_main_id,
        "unique_id": global_unique_id,
        "O": O,
        "C": C,
        "E": E,
        "A": A,
        "N": N
    };

    // Send form data to the OCEAN API
    fetch(OCEAN_url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Form submitted successfully:', data);
    })
    .catch(error => {
        console.error('Error submitting form:', error);
        alert('Error submitting form. ' + error);
    });

    // Send user event data to the Event Database
    if (global_set_q === undefined || global_link_1 === undefined || global_link_2 === undefined) {
        alert('Please reload to fetch updated data!');
        return;
    }

    if (u_name === undefined || u_reg === undefined || u_email === undefined || u_phone === undefined) {
        alert('Please go back to the home page and refill the form!');
        return;
    }

    const user_event_data = {
        "unique_id": global_unique_id,
        "main_id": global_main_id,
        "name": u_name,
        "id_reg": u_reg,
        "email": u_email,
        "phone": u_phone,
        "set_q": global_set_q,
        "video_link_1": global_link_1,
        "video_link_2": global_link_2,
    };

    fetch(db_url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user_event_data)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Event Database Updated successfully:', data);
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Error in updating the Event Database. ' + error);
    })
    .finally(() => {
        // Re-enable the submit button and reset its text
        submitButton.disabled = false;
        submitButton.innerHTML = 'Submit';
        submitButton.style.backgroundColor = "#0c5fb8";

        alert('Form submitted successfully!');
    });

    // Alert the user and clear the form
    console.log('All steps completed successfully!');
    clearForm();
    event_API();
}

// Call the API to fetch the text and videos on page load
event_API();

// Add event listener to the form
document.getElementById('oceanForm').addEventListener('submit', OCEAN_FormSubmission);