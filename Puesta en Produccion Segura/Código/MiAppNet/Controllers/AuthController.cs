using Microsoft.AspNetCore.Mvc;
using System.Text;
using System.Security.Claims;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;
// --- CAMBIO 1: Añadir using para [Authorize] ---
using Microsoft.AspNetCore.Authorization; 

namespace MiAppNet.Controllers
{
    // Modelo para recibir el usuario y la contraseña
    public class LoginModel
    {
        public string Username { get; set; }
        public string Password { get; set; } // Corregí el error de "get+;"
    }

    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        // --- CAMBIO 2: Variable para guardar la configuración ---
        private readonly IConfiguration _configuration;

        // --- CAMBIO 3: Constructor para Inyectar la Configuración ---
        public AuthController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginModel model)
        {
            // ** SIMULACIÓN DE AUTENTICACIÓN: user/pass **
            if (model.Username != "user" || model.Password != "pass")
            {
                return Unauthorized(new { message = "Credenciales inválidas" });
            }

            // Generar el Token JWT
            var tokenString = GenerateJwtToken(model.Username);
            
            return Ok(new { token = tokenString });
        }
        
        // --- Endpoint de Prueba (Requiere Token Válido) ---
        [HttpGet("protected")]
        [Authorize] // Protege esta ruta (el using lo pusimos arriba)
        public IActionResult GetProtectedData()
        {
            var username = User.FindFirst(ClaimTypes.Name)?.Value;
            return Ok(new { message = $"Acceso concedido a la API de .NET. Usuario autenticado: {username}" });
        }

        // --- Método de Servicio: Generador de Token JWT ---
        private string GenerateJwtToken(string username)
        {
            var tokenHandler = new JwtSecurityTokenHandler();

            // --- CAMBIO 4: Leer la clave desde la configuración (appsettings.json) ---
            var key = Encoding.ASCII.GetBytes(_configuration["Jwt:Key"]); 

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Name, username)
                }),
                Expires = DateTime.UtcNow.AddHours(1),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha26Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
    }
}