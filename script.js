const form = document.querySelector(".form");
form.addEventListener("submit", async(event) => {
  // Предотвращает действие браузера по умолчанию. В данном случае — отправку формы
  // https://learn.javascript.ru/default-browser-action
  event.preventDefault();
  
  const formData = new FormData(form);
  const data = {
    name: formData.get("name"), 
    email: formData.get("email"),
    agree: formData.get("agree") === 'on'
  };

  try {
    const response = await fetch("https://polinashneider.space/user", {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": "Bearer: sveta1707" 
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Ответ сети был не найден');
    }
    showNotification("Данные успешно отправлены!");

    form.reset();
  } catch (error) {
    console.error('Ошибка при отправке данных:', error);
    showNotification("Ошибка при отправке данных");
  }
});

function showNotification(message) {
  const notification = document.createElement("div");
  notification.textContent = message;
  notification.style.position = "fixed";
  notification.style.top = "10px";
  notification.style.right = "10px";
  notification.style.padding = "10px";
  notification.style.backgroundColor = "pink";
  notification.style.border = "1px solid red";

  document.body.appendChild(notification);
  setTimeout(() => {
    notification.remove();
  }, 3000);
}

