function handleForm() {
    const _form = document.querySelector(".contactsForm");
    if(!_form) {
        return false;
    }
    const realForm = _form.querySelector("form");
    const name = document.getElementById("username");
    const email = document.getElementById("email");
    const message = document.getElementById("message");

    const validateName = (el) => {
        if (el.validity.valueMissing) {
            el.setCustomValidity("Будь ласка, введіть ім'я");
        } else {
            el.setCustomValidity("");
        }
    };
    const validateEmail = (el) => {
        if (el.validity.valueMissing) {
            el.setCustomValidity("Будь ласка, введіть email");
        } else if (el.validity.typeMismatch) {
            el.setCustomValidity("Будь ласка, введіть коректний email");
        } else {
            el.setCustomValidity("");
        }
    };
    const validateMessage = (el) => {
        if (el.validity.valueMissing) {
            el.setCustomValidity("Будь ласка, введіть текст повідомлення");
        } else {
            el.setCustomValidity("");
        }
    }

    validateName(name);
    validateEmail(email);
    validateMessage(message);

    name.addEventListener("input", function (event) {
        validateName(event.target);
    });

    email.addEventListener("input", function (event) {
        validateEmail(event.target);
    });

    message.addEventListener("input", function (event) {
        validateMessage(event.target);
    });

    realForm.addEventListener("submit", function (e) {
        e.preventDefault();
        let thanks = document.querySelector(".thankYou");
        thanks.classList.add("visible");
        setTimeout(function () {
            thanks.classList.remove("visible");
            realForm.reset();
        }, 3000);
        return false;
    });
}

handleForm();









