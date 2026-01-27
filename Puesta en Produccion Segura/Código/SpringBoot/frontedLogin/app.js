document.getElementById('loginForm').addEventListener('submit', async function(event) {
    event.preventDefault(); // Evita el envío tradicional del formulario

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const messageElement = document.getElementById('message');
    
    // 1. URL de tu endpoint de login en Docker
    const apiUrl = 'http://localhost:8081/api/auth/login'; 

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            // 2. Envía el JSON con las credenciales
            body: JSON.stringify({ username, password })
        });

        const data = await response.json();

        if (response.ok) {
            // LOGIN EXITOSO
            const token = data.token;
            
            // 3. Almacenar el token (en la vida real se usa localStorage o cookies)
            console.log('Login exitoso. Token recibido:', token);
            
            // Muestra mensaje de éxito
            messageElement.className = 'message success';
            messageElement.textContent = `¡Acceso concedido! Token: ${token.substring(0, 20)}...`;

            // Opcional: Redirigir al usuario
            // window.location.href = '/dashboard.html'; 

        } else {
            // LOGIN FALLIDO (401 Unauthorized)
            const errorMsg = data.error || 'Credenciales inválidas.';
            messageElement.className = 'message error';
            messageElement.textContent = `Error de acceso: ${errorMsg}`;
        }
    } catch (error) {
        // Error de red, Docker apagado, o CORS
        console.error('Error al conectar con la API:', error);
        messageElement.className = 'message error';
        messageElement.textContent = 'Error de conexión con el servidor (¿Está Docker corriendo?).';
    }
});