const form = document.getElementById("registrationForm");

const today = new Date().toISOString().split("T")[0];

const dob = document.getElementById("dob");
const appointment = document.getElementById("appointment");
const registrationDate = document.getElementById("registrationDate");

dob.max = today;
registrationDate.max = today;
appointment.min = today;

function showError(id, message) {
    document.getElementById(id).textContent = message;
}

function clearError(id) {
    document.getElementById(id).textContent = "";
}

function markInvalid(id) {
    document.getElementById(id).classList.add("invalid");
    document.getElementById(id).classList.remove("valid");
}

function markValid(id) {
    document.getElementById(id).classList.remove("invalid");
    document.getElementById(id).classList.add("valid");
}

function validateName() {
    const name = document.getElementById("name").value.trim();

    if (name === "") {
        showError("nameError", "Patient name is required.");
        markInvalid("name");
        return false;
    }

    if (!/^[A-Za-z ]+$/.test(name)) {
        showError("nameError", "Name must contain alphabets and spaces only.");
        markInvalid("name");
        return false;
    }

    clearError("nameError");
    markValid("name");
    return true;
}

function validatePatientId() {
    const patientId = document.getElementById("patientId").value.trim();

    if (!/^PAT-[0-9]{4}$/.test(patientId)) {
        showError("patientIdError", "Patient ID must follow the format PAT-1234.");
        markInvalid("patientId");
        return false;
    }

    clearError("patientIdError");
    markValid("patientId");
    return true;
}

function validateAge() {
    const age = document.getElementById("age").value;

    if (age === "") {
        showError("ageError", "Age is required.");
        markInvalid("age");
        return false;
    }

    if (age < 1 || age > 120) {
        showError("ageError", "Age must be between 1 and 120.");
        markInvalid("age");
        return false;
    }

    clearError("ageError");
    markValid("age");
    return true;
}

function validateGender() {
    const gender = document.querySelector('input[name="gender"]:checked');

    if (!gender) {
        showError("genderError", "Please select gender.");
        return false;
    }

    clearError("genderError");
    return true;
}

function validateMobile() {
    const mobile = document.getElementById("mobile").value.trim();

    if (!/^[6-9][0-9]{9}$/.test(mobile)) {
        showError("mobileError", "Enter a valid 10-digit Indian mobile number.");
        markInvalid("mobile");
        return false;
    }

    clearError("mobileError");
    markValid("mobile");
    return true;
}

function validateEmail() {
    const email = document.getElementById("email").value.trim();

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        showError("emailError", "Enter a valid email address.");
        markInvalid("email");
        return false;
    }

    clearError("emailError");
    markValid("email");
    return true;
}

function validateDateOfBirth() {
    const value = dob.value;

    if (value === "") {
        showError("dobError", "Date of birth is required.");
        markInvalid("dob");
        return false;
    }

    if (value > today) {
        showError("dobError", "Date of birth cannot be in the future.");
        markInvalid("dob");
        return false;
    }

    clearError("dobError");
    markValid("dob");
    return true;
}

function validateAddress() {
    const address = document.getElementById("address").value.trim();

    if (address === "") {
        showError("addressError", "Address is required.");
        markInvalid("address");
        return false;
    }

    if (address.length < 10) {
        showError("addressError", "Please enter a complete address.");
        markInvalid("address");
        return false;
    }

    clearError("addressError");
    markValid("address");
    return true;
}

function validateBloodGroup() {
    const value = document.getElementById("bloodGroup").value;

    if (value === "") {
        showError("bloodGroupError", "Please select blood group.");
        markInvalid("bloodGroup");
        return false;
    }

    clearError("bloodGroupError");
    markValid("bloodGroup");
    return true;
}

function validateDepartment() {
    const value = document.getElementById("department").value;

    if (value === "") {
        showError("departmentError", "Please select a department.");
        markInvalid("department");
        return false;
    }

    clearError("departmentError");
    markValid("department");
    return true;
}

function validateTest() {
    const value = document.getElementById("test").value;

    if (value === "") {
        showError("testError", "Please select a test.");
        markInvalid("test");
        return false;
    }

    clearError("testError");
    markValid("test");
    return true;
}

function validateAppointment() {
    const value = appointment.value;

    if (value === "") {
        showError("appointmentError", "Appointment date is required.");
        markInvalid("appointment");
        return false;
    }

    if (value < today) {
        showError("appointmentError", "Appointment date cannot be in the past.");
        markInvalid("appointment");
        return false;
    }

    clearError("appointmentError");
    markValid("appointment");
    return true;
}

function validateCollection() {
    const collection = document.querySelector('input[name="collection"]:checked');

    if (!collection) {
        showError("collectionError", "Please select collection preference.");
        return false;
    }

    clearError("collectionError");
    return true;
}

function validateRegistrationDate() {
    const value = registrationDate.value;

    if (value === "") {
        showError("registrationDateError", "Registration date is required.");
        markInvalid("registrationDate");
        return false;
    }

    if (value > today) {
        showError("registrationDateError", "Registration date cannot be in the future.");
        markInvalid("registrationDate");
        return false;
    }

    clearError("registrationDateError");
    markValid("registrationDate");
    return true;
}

function calculateRegistrationFee() {
    const age = Number(document.getElementById("age").value);

    const consultationFee = 500;
    const registrationFee = 100;

    let discount = 0;

    if (age >= 60) {
        discount = consultationFee * 0.10;
    }

    const totalAmount =
        consultationFee +
        registrationFee -
        discount;

    return {
        consultationFee: consultationFee,
        registrationFee: registrationFee,
        discount: discount,
        totalAmount: totalAmount
    };
}

function checkAppointmentPriority() {
    const age = Number(document.getElementById("age").value);

    const temperatureValue =
        document.getElementById("temperature").value;

    const severity =
        document.getElementById("severity").value;

    const emergency =
        document.querySelector(
            'input[name="emergency"]:checked'
        );

    const priorityResult =
        document.getElementById("priorityResult");

    if (
        emergency === null ||
        severity === "" ||
        temperatureValue === ""
    ) {
        priorityResult.textContent =
            "Please enter all appointment priority details.";

        priorityResult.style.display = "block";

        return;
    }

    const temperature = Number(temperatureValue);

    let recommendation = "";

    if (emergency.value === "Yes") {
        recommendation =
            "Emergency Consultation Required";
    }
    else if (temperature >= 39) {
        recommendation =
            "High Priority Consultation";
    }
    else if (severity === "Severe") {
        recommendation =
            "High Priority Consultation";
    }
    else if (
        age >= 60 &&
        severity === "Moderate"
    ) {
        recommendation =
            "Priority Consultation";
    }
    else {
        recommendation =
            "Regular Consultation";
    }

    priorityResult.textContent =
        "Appointment Recommendation: " +
        recommendation;

    priorityResult.style.display = "block";
}

const patient = {
    patientName: "Rahul Sharma",
    patientId: "PAT-1001",
    age: 45,
    gender: "Male",
    bloodGroup: "B+",
    mobile: "9876543210",
    department: "Cardiology",
    appointmentType: "Consultation",
    registrationStatus: "Confirmed",

    displayPatient: function() {
        console.log(
            "Patient Name: " +
            this.patientName
        );

        console.log(
            "Patient ID: " +
            this.patientId
        );

        console.log(
            "Age: " +
            this.age
        );

        console.log(
            "Gender: " +
            this.gender
        );

        console.log(
            "Blood Group: " +
            this.bloodGroup
        );

        console.log(
            "Mobile: " +
            this.mobile
        );

        console.log(
            "Department: " +
            this.department
        );

        console.log(
            "Registration Status: " +
            this.registrationStatus
        );
    },

    displayAppointment: function() {
        console.log(
            "Department: " +
            this.department
        );

        console.log(
            "Appointment Type: " +
            this.appointmentType
        );
    },

    determineCategory: function() {
        if (this.age >= 60) {
            return "Senior Citizen";
        }

        if (this.age >= 18) {
            return "Adult";
        }

        return "Minor";
    }
};

patient.displayPatient();

patient.displayAppointment();

console.log(
    "Patient Category: " +
    patient.determineCategory()
);

const patientAges = [
    22,
    35,
    67,
    45,
    29,
    72,
    56,
    18,
    64,
    40
];

function analyzePatientAges() {
    const minimumAge =
        Math.min(...patientAges);

    const maximumAge =
        Math.max(...patientAges);

    const totalAge =
        patientAges.reduce(
            function(sum, age) {
                return sum + age;
            },
            0
        );

    const averageAge =
        totalAge / patientAges.length;

    const seniorCitizens =
        patientAges.filter(
            function(age) {
                return age >= 60;
            }
        ).length;

    const belowEighteen =
        patientAges.filter(
            function(age) {
                return age < 18;
            }
        ).length;

    const aboveSixty =
        patientAges.filter(
            function(age) {
                return age > 60;
            }
        );

    console.log(
        "All Patient Ages: " +
        patientAges.join(", ")
    );

    console.log(
        "Minimum Age: " +
        minimumAge
    );

    console.log(
        "Maximum Age: " +
        maximumAge
    );

    console.log(
        "Average Age: " +
        averageAge
    );

    console.log(
        "Senior Citizens: " +
        seniorCitizens
    );

    console.log(
        "Patients Below 18: " +
        belowEighteen
    );

    console.log(
        "Patients Above 60: " +
        aboveSixty.join(", ")
    );
}

analyzePatientAges();

form.addEventListener(
    "submit",
    function(event) {
        event.preventDefault();

        const valid =
            validateName() &&
            validatePatientId() &&
            validateAge() &&
            validateGender() &&
            validateMobile() &&
            validateEmail() &&
            validateDateOfBirth() &&
            validateAddress() &&
            validateBloodGroup() &&
            validateDepartment() &&
            validateTest() &&
            validateAppointment() &&
            validateCollection() &&
            validateRegistrationDate();

        const successMessage =
            document.getElementById(
                "successMessage"
            );

        const registrationSummary =
            document.getElementById(
                "registrationSummary"
            );

        if (valid) {
            const feeDetails =
                calculateRegistrationFee();

            const name =
                document.getElementById(
                    "name"
                ).value;

            const patientId =
                document.getElementById(
                    "patientId"
                ).value;

            const age =
                document.getElementById(
                    "age"
                ).value;

            const department =
                document.getElementById(
                    "department"
                ).value;

            const test =
                document.getElementById(
                    "test"
                ).value;

            successMessage.textContent =
                "Registration successful! Your details have been validated.";

            successMessage.style.display =
                "block";

            registrationSummary.innerHTML = `
                <h3>Registration Summary</h3>

                <p>
                    <strong>Patient Name:</strong>
                    ${name}
                </p>

                <p>
                    <strong>Patient ID:</strong>
                    ${patientId}
                </p>

                <p>
                    <strong>Age:</strong>
                    ${age}
                </p>

                <p>
                    <strong>Department:</strong>
                    ${department}
                </p>

                <p>
                    <strong>Selected Test:</strong>
                    ${test}
                </p>

                <p>
                    <strong>Consultation Fee:</strong>
                    ₹${feeDetails.consultationFee}
                </p>

                <p>
                    <strong>Registration Fee:</strong>
                    ₹${feeDetails.registrationFee}
                </p>

                <p>
                    <strong>Senior Citizen Discount:</strong>
                    ₹${feeDetails.discount}
                </p>

                <p>
                    <strong>Total Amount Payable:</strong>
                    ₹${feeDetails.totalAmount}
                </p>
            `;

            registrationSummary.style.display =
                "block";
        }
        else {
            successMessage.style.display =
                "none";

            registrationSummary.style.display =
                "none";
        }
    }
);

form.addEventListener(
    "reset",
    function() {
        setTimeout(
            function() {
                document
                    .querySelectorAll(".error")
                    .forEach(
                        function(element) {
                            element.textContent = "";
                        }
                    );

                document
                    .querySelectorAll(
                        "input, select, textarea"
                    )
                    .forEach(
                        function(element) {
                            element.classList.remove(
                                "invalid",
                                "valid"
                            );
                        }
                    );

                document.getElementById(
                    "successMessage"
                ).style.display = "none";

                document.getElementById(
                    "registrationSummary"
                ).style.display = "none";

                document.getElementById(
                    "priorityResult"
                ).style.display = "none";
            },
            0
        );
    }
);

document
    .getElementById("priorityButton")
    .addEventListener(
        "click",
        checkAppointmentPriority
    );

document
    .getElementById("name")
    .addEventListener(
        "input",
        validateName
    );

document
    .getElementById("patientId")
    .addEventListener(
        "input",
        validatePatientId
    );

document
    .getElementById("age")
    .addEventListener(
        "input",
        validateAge
    );

document
    .getElementById("mobile")
    .addEventListener(
        "input",
        validateMobile
    );

document
    .getElementById("email")
    .addEventListener(
        "input",
        validateEmail
    );

document
    .getElementById("dob")
    .addEventListener(
        "change",
        validateDateOfBirth
    );

document
    .getElementById("address")
    .addEventListener(
        "input",
        validateAddress
    );

document
    .getElementById("bloodGroup")
    .addEventListener(
        "change",
        validateBloodGroup
    );

document
    .getElementById("department")
    .addEventListener(
        "change",
        validateDepartment
    );

document
    .getElementById("test")
    .addEventListener(
        "change",
        validateTest
    );

document
    .getElementById("appointment")
    .addEventListener(
        "change",
        validateAppointment
    );

document
    .getElementById("registrationDate")
    .addEventListener(
        "change",
        validateRegistrationDate
    );

document
    .querySelectorAll(
        'input[name="gender"]'
    )
    .forEach(
        function(element) {
            element.addEventListener(
                "change",
                validateGender
            );
        }
    );

document
    .querySelectorAll(
        'input[name="collection"]'
    )
    .forEach(
        function(element) {
            element.addEventListener(
                "change",
                validateCollection
            );
        }
    );