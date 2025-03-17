// main.js

const submitButton = document.getElementById("submit");
const form = document.getElementById("form");
const nameInput = document.getElementById("name");
const phoneInput = document.getElementById("phone");

const emailInput = document.getElementById("email");
const provinceInput = document.getElementById("province");

// const internetProviderRadios = document.querySelectorAll('input[name="internet-provider"]');
// const fiberCompanyInput = document.getElementById("fiber-company");

const informationSourceRadios = document.querySelectorAll('input[name="informationSource"]');
const currentInternetProviderInput = document.getElementById("currentInternetProvider");

const formSuccessMessage = document.getElementById("form-success-message");
const formSection = document.querySelector('.main-container'); 


let sectionIdInput;

function validateName(name) {
    return name.trim() !== "";
}

function validatePhone(phone) {
  const phoneRegex = /^07[0-9]{9}$/;
  return phoneRegex.test(phone);
}

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validateProvince(province) {
    return province !== "";
}

// function validateInternetProvider() {
//     return document.querySelector('input[name="internet-provider"]:checked') !== null;
// }

// function validateFiberCompany(company) {
//     if (document.getElementById('fiber').checked) {
//         return company.trim() !== "";
//     }
//     return true; 
// }

function validateInformationSource() {
    return document.querySelector('input[name="informationSource"]:checked') !== null;
}

function validateCurrentInternetProvider(company) {
    if (document.getElementById('fiber').checked) {
        return company.trim() !== "";
    }
    return true;
}

function updateButtonState() {
    const isNameValid = validateName(nameInput.value);
    const isPhoneValid = validatePhone(phoneInput.value);
    const isEmailValid = validateEmail(emailInput.value);
    const isProvinceValid = validateProvince(provinceInput.value);

    const isInformationSourceValid = validateInformationSource();
    const isCurrentInternetProviderValid = validateCurrentInternetProvider(currentInternetProviderInput.value);

    // const isInternetProviderValid = validateInternetProvider();
    // const isFiberCompanyValid = validateFiberCompany(fiberCompanyInput.value);

    if (isNameValid && isPhoneValid && isEmailValid && isProvinceValid && isInformationSourceValid && isCurrentInternetProviderValid ) {
        submitButton.disabled = false;
        submitButton.style.cursor = "pointer";
    } else {
        submitButton.disabled = true;
        submitButton.style.cursor = "not-allowed";
    }
}

nameInput.addEventListener("input", updateButtonState);
phoneInput.addEventListener("input", updateButtonState);
emailInput.addEventListener("input", updateButtonState);
provinceInput.addEventListener("input", updateButtonState);
informationSourceRadios.forEach(radio => {
    radio.addEventListener('change', updateButtonState); 
});
currentInternetProviderInput.addEventListener("input", updateButtonState);

function showError(inputElement, message) {
    let errorElement = document.createElement("div");
    errorElement.className = "error-message";
    errorElement.style.color = "red";
    errorElement.style.marginBottom = "15px";
    errorElement.style.marginTop = "4px";
    errorElement.style.fontSize = "14px";
    errorElement.style.display = "block";
    errorElement.style.textAlign = "right";
    errorElement.innerText = message;

    if (inputElement.type === "radio") {
        const parent = inputElement.closest(".form-control"); 
        if (parent) {
            let existingError = parent.querySelector(".error-message");
            if (existingError) {
                existingError.remove();
            }
            parent.appendChild(errorElement); 
        }
    } else {
        const existingError = inputElement.nextElementSibling;
        if (existingError && existingError.classList.contains("error-message")) {
            existingError.remove();
        }
        inputElement.insertAdjacentElement("afterend", errorElement);
    }
}

function clearError(inputElement) {
    const errorElement = inputElement.nextElementSibling;
    if (errorElement && errorElement.classList.contains("error-message")) {
        errorElement.remove();
    }
}

nameInput.addEventListener("keyup", (e) => {
    formSuccessMessage.innerText = "";
    if (!validateName(nameInput.value)) {
        showError(nameInput, "الاسم مطلوب*");
    } else {
        clearError(nameInput);
    }
});

phoneInput.addEventListener("keyup", () => {
    formSuccessMessage.innerText = "";
    if (!validatePhone(phoneInput.value)) {
        showError(phoneInput, "يجب ادخال رقم هاتف صحيح*");
    } else {
        clearError(phoneInput);
    }
});

emailInput.addEventListener("keyup", () => {
    formSuccessMessage.innerText = "";
    if (!validateEmail(emailInput.value)) {
        showError(emailInput, "يجب ادخال بريد الكتروني صحيح*");
    } else {
        clearError(emailInput);
    }
});

provinceInput.addEventListener("change", () => {
    formSuccessMessage.innerText = "";
    if (!validateProvince(provinceInput.value)) {
        showError(provinceInput, "يجب اختيار محافظة*");
    } else {
        clearError(provinceInput);
    }
});

informationSourceRadios.forEach(radio => {
    radio.addEventListener('change', () => {
        formSuccessMessage.innerText = "";
        if (!validateInformationSource()) {
            showError(radio, "يجب اختيار مزود الإنترنت*");
        } else {
            clearError(radio);
        }
        updateButtonState();
    });
});

// informationSourceRadios.forEach(radio => {
//     radio.addEventListener('change', () => {
//         formSuccessMessage.innerText = "";
//         if (!validateInternetProvider()) {
//             showError(radio, "يجب اختيار مزود الإنترنت*");
//         } else {
//             clearError(radio);
//         }
//         updateButtonState();
//     });
// });

// fiberCompanyInput.addEventListener("keyup", () => {
//     formSuccessMessage.innerText = "";
//     if (!validateFiberCompany(fiberCompanyInput.value)) {
//         showError(fiberCompanyInput, "يجب إدخال اسم الشركة*");
//     } else {
//         clearError(fiberCompanyInput);
//     }
//     updateButtonState();
// });

currentInternetProviderInput.addEventListener("keyup", () => {
    formSuccessMessage.innerText = "";
    if (!validateCurrentInternetProvider(currentInternetProviderInput.value)) {
        showError(currentInternetProviderInput, "يجب إدخال اسم الشركة*");
    } else {
        clearError(currentInternetProviderInput);
    }
    updateButtonState();
});


document.addEventListener('DOMContentLoaded', (event) => {
    const registerButtons = document.querySelectorAll('button[id^="register-"]');

    sectionIdInput = document.getElementById('section-id');

    //parallax
    const sections = document.querySelectorAll('.parallax');
    window.addEventListener('scroll', function() {
        sections.forEach(function(section, index) {
            const rect = section.getBoundingClientRect();
            if (rect.top < window.innerHeight * 0.75 && rect.bottom > 0) {
                section.classList.add('visible'); 
            } else {
                section.classList.remove('visible'); 
            }
        });
    });


    //Scroll-to-up
    const scrollUpButton = document.getElementById('scroll-up');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) { 
            scrollUpButton.classList.add('show');
        } else {
            scrollUpButton.classList.remove('show');
        }
    });

    scrollUpButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth' 
        });
    });


    //Hide-section
    const contentToHide = document.querySelectorAll('.section-wrapper, .header '); 

    formSection.style.display = 'none';


    registerButtons.forEach(button => {
        button.addEventListener('click', () => {
            const sectionId = button.dataset.section;
            sectionIdInput.value = sectionId;

            

            
            contentToHide.forEach(element => {
                element.style.display = 'none';
            });

           
            formSection.style.visibility = "visible";
            formSection.style.opacity = "1";
            formSection.style.animation = "fadeIn 0.5s ease-in-out";
            formSection.classList.remove("display-none");
            formSection.style.display = "flex";
        });
    });
});

submitButton.addEventListener("click", (e) => {
    e.preventDefault();

    const isNameValid = validateName(nameInput.value);
    const isPhoneValid = validatePhone(phoneInput.value);
    const isEmailValid = validateEmail(emailInput.value);
    const isProvinceValid = validateProvince(provinceInput.value);
    // const isInternetProviderValid = validateInternetProvider();
    // const isFiberCompanyValid = validateFiberCompany(fiberCompanyInput.value);

    const isInformationSourceValid = validateInformationSource();
    const isCurrentInternetProviderValid = validateCurrentInternetProvider(currentInternetProviderInput.value);

    if (!isNameValid) {
        showError(nameInput,  translations[isArabic ? 'ar' : 'en']['error-name-required']);
    }
    if (!isPhoneValid) {
        showError(phoneInput,  translations[isArabic ? 'ar' : 'en']['error-phone-required']);
    }

    if (!isEmailValid) {
        showError(emailInput,  translations[isArabic ? 'ar' : 'en']['error-email-required']);
    }
    if (!isProvinceValid) {
        showError(provinceInput,  translations[isArabic ? 'ar' : 'en']['error-province-required']);
    }
    if (!isInformationSourceValid) {
        showError(internetProviderRadios[0], translations[isArabic ? 'ar' : 'en']['error-provider-required']); 
    }
    if (!isCurrentInternetProviderValid) {
        showError(fiberCompanyInput, translations[isArabic ? 'ar' : 'en']['error-company-required']);
    }

    if (isNameValid && isPhoneValid && isEmailValid && isProvinceValid && isInformationSourceValid && isCurrentInternetProviderValid){
        sendHttpRequest();
    } 
});




function showSuccessMessage() {
    formSuccessMessage.classList.remove("display-none");
    setTimeout(() => {
        formSuccessMessage.innerText = translations[isArabic ? 'ar' : 'en']['success-message'];
        formSuccessMessage.style.color = "#02c597";
        formSuccessMessage.classList.remove("visibility-hidden");
        formSuccessMessage.classList.add("visibility-visible");
        formSuccessMessage.style.animation = "fadeIn 0.5s ease-in-out";

        nameInput.value = "";
        phoneInput.value = "";
        emailInput.value = "";
        provinceInput.value = ""; 

        informationSourceRadios.forEach(radio => {
            radio.checked = false;
        });

        currentInternetProviderInput.value = ""; 



        document.getElementById("form-section").style.display = "none";
        document.getElementById("success-section").style.display = "block";
        document.getElementById("success-section").style.visibility = "visible";
        document.getElementById("success-section").style.opacity = "1";
        document.getElementById("success-section").style.animation = "fadeIn 0.5s ease-in-out";

    }, 100);
}

function showErrorMessage(errorMessage = "حصل خطأ ما، يرجى المحاوله مره اخرى لاحقا" || translations[isArabic ? 'ar' : 'en']['error-message']) {
    formSuccessMessage.classList.remove("display-none");
    setTimeout(() => {
        formSuccessMessage.innerText = errorMessage;
        formSuccessMessage.classList.remove("visibility-hidden");
        formSuccessMessage.classList.add("visibility-visible");
        formSuccessMessage.style.animation = "fadeIn 0.5s ease-in-out";
        formSuccessMessage.style.color = "red";
    }, 100);
}



function sendHttpRequest() {

    const informationSource = document.querySelector('input[name="informationSource"]:checked')?.value || "";

    const payload = {
        fullName: nameInput.value,
        phoneNumber: phoneInput.value,
        informationSource: informationSource,
        email: emailInput.value,
        governance: provinceInput.value,
        currentInternetProvider: currentInternetProviderInput.value };

    formSuccessMessage.innerText = "";
    fetch(`${baseUrl}/requests/service-availability`, {
        method: "POST",
        headers: { "Content-Type": "application/json",
            "Accept-Language": isArabic ? "ar" : "en",
            "X-AccountId": "",
            "X-User-Role": "",
            "X-Client-App": "",
            "X-Client-Version": "",
            "X-Client-Name": ""
        },
        body: JSON.stringify(payload),
    }).then((response) => {
        if (response?.ok) {
            showSuccessMessage();
        } else {
            response.json().then(data => {
                if (data.message) {
                    showErrorMessage(data.message);
                } else {
                    showErrorMessage(translations[isArabic ? 'ar' : 'en']['error-message']);
                }
            }).catch(() => {
                showErrorMessage(translations[isArabic ? 'ar' : 'en']['error-message']);
            });
        }
    });
}

/* ================================== 
            Translation 
   ================================== */


import { translations } from './translations.js';

const langToggle = document.getElementById("lang-toggle");
let isArabic = true;

langToggle.addEventListener("click", () => {
    isArabic = !isArabic;
    updateLanguage();
});

function updateLanguage() {
    const html = document.querySelector("html");
    const elementsToTranslate = document.querySelectorAll("[data-key]");
    const lang = isArabic ? "ar" : "en";

    if (isArabic) {
        html.setAttribute("lang", "ar");
        html.setAttribute("dir", "rtl");
        langToggle.textContent = " ";
    } else {
        html.setAttribute("lang", "en");
        html.setAttribute("dir", "ltr");
        langToggle.textContent = " ";
    }

    elementsToTranslate.forEach((el) => {
        const key = el.dataset.key;
        if (translations[lang] && translations[lang][key]) {
            el.innerHTML = translations[lang][key];
        }
    });
}

updateLanguage();

/* ================================== 
                 theme 
   ================================== */

const themeToggle = document.getElementById("theme-toggle");
const body = document.body;
const themeIcon = document.getElementById("theme-icon");
const darkMode = localStorage.getItem("darkMode");

if (darkMode === "enabled") {
    body.classList.add("dark-mode");
    themeIcon.classList.remove("fa-moon-o");
    themeIcon.classList.add("fa-sun-o");
}

themeToggle.addEventListener("click", () => {
    body.classList.toggle("dark-mode");

    if (body.classList.contains("dark-mode")) {
        localStorage.setItem("darkMode", "enabled");
        themeIcon.classList.remove("fa-moon-o");
        themeIcon.classList.add("fa-sun-o");
    } else {
        localStorage.setItem("darkMode", null);
        themeIcon.classList.remove("fa-sun-o");
        themeIcon.classList.add("fa-moon-o");
    }
});


// Display Company's field name when radio choice checked
document.getElementById('fiber').addEventListener('change', function() {
    const fiberCompanyInput = document.getElementById('fiber-company');
    if (this.checked) {
        currentInternetProviderInput.style.display = 'block';
    } else {
        currentInternetProviderInput.style.display = 'none';
    }
});


document.getElementById('wireless').addEventListener('change', function() {
    if (this.checked) {
        document.getElementById('currentInternetProvider').style.display = 'none';
    }
});