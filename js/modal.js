(() => {
  const refs = {
    // Додати атрибут data-modal-open на кнопку відкриття
    openModalBtn: document.querySelector('[data-modal-open]'),
    // Додати атрибут data-modal-close на кнопку закриття
    closeModalBtn: document.querySelector('[data-modal-close]'),
    // Додати атрибут data-modal на бекдроп модалки
    modal: document.querySelector('[data-modal]'),
  };

  refs.openModalBtn.addEventListener('click', toggleModal);
  refs.closeModalBtn.addEventListener('click', toggleModal);

  function toggleModal() {
    // is-open це клас який буде додаватися/забиратися на бекдроп при натисканні на кнопки
    refs.modal.classList.toggle('is-open');
  }
})();

// code email save
document
  .querySelector('.subscribe-form')
  .addEventListener('submit', async function (event) {
    event.preventDefault(); // Запобігає перезавантаженню сторінки

    const emailInput = document.querySelector('.subscribe-input');
    const email = emailInput.value;
    const submitButton = document.querySelector('.subscribe-btn');

    if (!email) {
      alert('Введіть ваш email!');
      return;
    }

    submitButton.disabled = true; // Блокуємо кнопку

    try {
      const response = await fetch('save_email.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `sub-input=${encodeURIComponent(email)}`, // ОНОВЛЕНЕ ПОЛЕ
      });

      const result = await response.text();
      alert(result); // Показуємо відповідь сервера

      if (response.ok) {
        emailInput.value = ''; // Очищаємо поле
      }
    } catch (error) {
      console.error('Помилка:', error);
    }

    submitButton.disabled = false; // Розблокуємо кнопку
  });
