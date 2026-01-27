using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// --- 1. CONFIGURACIÓN DE SERVICIOS (builder.Services) ---

// Configuración de CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend",
        builder =>
        {
            builder.AllowAnyOrigin() 
                   .AllowAnyMethod()
                   .AllowAnyHeader();
        });
});

// --- CAMBIO AQUÍ ---
// Lee la clave secreta desde appsettings.json
var key = Encoding.ASCII.GetBytes(builder.Configuration["Jwt:Key"]); 
// --- FIN DEL CAMBIO ---

// A. Configuración de Autenticación JWT
builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(key),
        ValidateIssuer = false, 
        ValidateAudience = false 
    };
});


// B. Servicios de API: Habilita los controladores y la autorización
builder.Services.AddControllers();
builder.Services.AddAuthorization(); 


// --- 2. CONFIGURACIÓN DEL PIPELINE (app) ---

var app = builder.Build();

app.UseRouting();
app.UseCors("AllowFrontend"); // Usar CORS ANTES de autenticación

// C. Middlewares de Seguridad
app.UseAuthentication(); 
app.UseAuthorization(); 

// D. Mapeo de Controladores (para que AuthController sea accesible)
app.MapControllers(); 

app.Run();