<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Перевіряємо, чи поле існує
    if (!isset($_POST["sub-input"])) {
        echo "Помилка: відсутній email!";
        exit;
    }

    $email = trim($_POST["sub-input"]); // Використовуємо правильне ім'я

    if (filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $file = "subscribers.txt";
        $email = htmlspecialchars($email, ENT_QUOTES, 'UTF-8'); // Захист від XSS
        file_put_contents($file, $email . PHP_EOL, FILE_APPEND | LOCK_EX); // Додаємо, а не перезаписуємо
        echo "Email збережено!";
    } else {
        echo "Некоректний email!";
    }
} else {
    echo "Некоректний запит!";
}
?>