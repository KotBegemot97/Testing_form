"use strict";

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("form");
  form.addEventListener("submit", formSend);

  async function formSend(e) {
    e.preventDefault();

    let error = formValidate(form);

    let formData = new FormData(form);
    // formData.append('image', formImage.files[0]); // Полученное изображение (надо менять!)

    if (error === 0) {
      form.classList.add("_sending");
      let response = await fetch(
        "https://kotbegemot97.github.io/Testing_form/sendmail.php",
        {
          method: "POST",
          body: formData,
        }
      );
      if (response.ok) {
        let result = await response.json();
        alert(result.message);
        formPreview.innerHTML = "";
        form.reset();
        form.classList.remove("_sending");
      } else {
        alert("Ошибка!");
        form.classList.remove("_sending");
      }
    } else {
      alert("Заполните обязательные поля");
    }
  }

  function formValidate(form) {
    let error = 0;
    let formReq = document.querySelectorAll(".req");

    for (let index = 0; index < formReq.length; index++) {
      const input = formReq[index];
      formRemoveError(input);

      if (input.classList.contains("email")) {
        if (emailTest(input)) {
          formAddError(input);
          error++;
        }
      } else if (
        input.getAttribute("type") === "checkbox" &&
        input.checked === false
      ) {
        formAddError(input);
        error++;
      } else {
        if (input.value === "") {
          formAddError(input);
          error++;
        }
      }
    }
    return error;
  }
  function formAddError(input) {
    input.parentElement.classList.add("error");
    input.classList.add("error");
  }
  function formRemoveError(input) {
    input.parentElement.classList.remove("error");
    input.classList.remove("error");
  }
  // Фуекция теста email
  function emailTest(input) {
    return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
  }

  // Получаем input file в переменную
  const formImage = document.getElementById("formImage");
  // Получаем див для превью в переменную
  const formPreview = document.getElementById("formPreview");

  // formImage.innerHTML = `
  //     <option value="0" selected="selected">Картина не выбрана</option>
  //     //forEach()...
  //     <option value="${1}">Картина № ${1}</option>
  // `;

  formImage.addEventListener("change", (e) => {
    let json = fetch("https://kotbegemot97.github.io/Testing_form/db/db.json")
      .then((res) => res.json())
      .then((data) => {
        const choice = data[e.target.value - 1];
        localStorage.setItem("choice", JSON.stringify(choice.img));
        const id = choice.id;
      });
    console.log("Changed to: " + e.target.value);
  });
});
