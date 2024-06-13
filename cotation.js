const form = document.querySelector("form");
const nom = document.getElementById("name");
const raison = document.getElementById("raison");
const numero = document.getElementById("telephone");
const email = document.getElementById("email");

const POL = document.getElementById("POL");
const POD = document.getElementById("POD");
const cond = document.getElementById("c");
const type = document.getElementById("t");

const desc = document.getElementById("message1");
const comment = document.getElementById("message2");

function checkInputs() {
    const requiredItems = document.querySelectorAll(".item.required");
    for (const item of requiredItems) {
        if (item.value === "") {
            item.classList.add("error");
            item.parentElement.classList.add("error");
        }

        if (email.value !== "") {
            checkEmail();
        }

        email.addEventListener("keyup", () => {
            checkEmail();
        });

        item.addEventListener("keyup", () => {
            if (item.value !== "") {
                item.classList.remove("error");
                item.parentElement.classList.remove("error");
            } else {
                item.classList.add("error");
                item.parentElement.classList.add("error");
            }
        });

        item.addEventListener("change", () => {
            if (item.value !== "") {
                item.classList.remove("error");
                item.parentElement.classList.remove("error");
            } else {
                item.classList.add("error");
                item.parentElement.classList.add("error");
            }
        });
    }
}

function checkEmail() {
    const emailRegex = /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,6})(\.[a-z]{2,6})?$/i;
    const errorTxtEmail = document.querySelector(".error-txt.email");

    if (!email.value.match(emailRegex)) {
        email.classList.add("error");
        email.parentElement.classList.add("error");

        if (email.value !== "") {
            errorTxtEmail.innerText = "Votre email n'est pas valide";
        } else {
            errorTxtEmail.innerText = "champ obligatoire";
        }
    } else {
        email.classList.remove("error");
        email.parentElement.classList.remove("error");
    }
}

(function () {
    emailjs.init("ubVYBcVPMz32r9Mw9"); // Initialize EmailJS with your user ID
})();

form.addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent form submission
    checkInputs();

    // Only send email if there are no errors in required fields
    if (document.querySelectorAll('.required.error').length === 0) {
        // Send email using Email.js
        emailjs.send("service_tmym5r4", "template_1teagzk", {
            from_name: nom.value,
            from_email: email.value,
            to_email: "djeghlaf.habiba@gmail.com",
            raison_sociale: raison.value,
            telephone: numero.value,
            POL: POL.value,
            POD: POD.value,
            condition: cond.value,
            type: type.value,
            description: desc.value,
            commentaire: comment.value
        })
        .then(function(response) {
            // Reset form fields
            form.reset();

            // Show success message
            Swal.fire({
                icon: 'success',
                title: 'Email sent successfully',
                text: 'Thank you for your message!',
                confirmButtonText: 'OK'
            });
        }, function(error) {
            // Show error message
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong. Please try again later.',
                confirmButtonText: 'OK'
            });
            console.error('Error sending email:', error);
        });
    }
});
