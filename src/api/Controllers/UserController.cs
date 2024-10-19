using Microsoft.AspNetCore.Mvc;
using api.Services;
using api.Models;
using System.Security.Claims;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication;

namespace api.Controllers;

[Controller]
[Route("api/[controller]")]
public class UserController : Controller
{

  private readonly MongoDBService _mongoDBService;

  public UserController(MongoDBService mongoDBService)
  {
    _mongoDBService = mongoDBService;
  }

  [HttpGet]
  public async Task<List<User>> Get()
  {
    return await _mongoDBService.GetAsync();
  }

  // GET: api/user/{id}
  [HttpGet("{id}")]
  public async Task<IActionResult> GetById(string id)
  {
    var userItem = await _mongoDBService.GetUserByIdAsync(id);
    if (userItem == null)
    {
      return NotFound("User not found");
    }

    var response = new
    {
      User = userItem,
    };

    return Ok(response);
  }

  [HttpPost("login")]
  public async Task<IActionResult> Login([FromBody] LoginRequest loginRequest)
  {
    // Authenticate user
    var user = await _mongoDBService.AuthenticateAsync(loginRequest.Email, loginRequest.Password);

    // Check if authentication was successful
    if (user == null)
    {
      return Unauthorized(new { message = "Invalid email or password" });
    }

    // Create claims for the user
    var claims = new List<Claim>
    {
        new Claim(ClaimTypes.NameIdentifier, user.Id),
        new Claim(ClaimTypes.Email, user.email),
        new Claim(ClaimTypes.Role, user.Profile.ToString())
    };

    // Create claims identity
    var claimsIdentity = new ClaimsIdentity(claims, CookieAuthenticationDefaults.AuthenticationScheme);

    // Define authentication properties
    var authProperties = new AuthenticationProperties
    {
      IsPersistent = true, // Persistent cookie
      ExpiresUtc = DateTimeOffset.UtcNow.AddDays(7) // Set expiration
    };

    // Sign in the user
    await HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme, new ClaimsPrincipal(claimsIdentity), authProperties);

    return Ok(new { message = "Login successful" });
  }

  [HttpPost("logout")] 
  public async Task<IActionResult> Logout()
  {
    await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme); // Sign out the user
    return Ok(new { message = "Logout successful" }); // Respond with a success message
  }

  public class LoginRequest
  {
    public string Email { get; set; } = null!;
    public string Password { get; set; } = null!;
  }

  [HttpPost]
  public async Task<IActionResult> Post([FromBody] User user)
  {
    // Verificar se o campo Profile é válido (0 para User e 1 para Admin)
    if (!Enum.IsDefined(typeof(Profile), user.Profile))
    {
      // Retornar um erro 400 BadRequest se o valor for inválido
      return BadRequest("Perfil inválido. O valor deve ser 0 (User) ou 1 (Admin).");
    }

    // Se o profile for válido, continuar a criação do usuário
    await _mongoDBService.CreateAsync(user);
    return CreatedAtAction(nameof(Get), new { id = user.Id }, user);
  }


  [HttpPut("{id}")]
  public async Task<IActionResult> AddToUser(string id, [FromBody] User updatedUser)
  {
    await _mongoDBService.AddToUserAsync(id, updatedUser);
    return NoContent();
  }



  [HttpDelete("{id}")]
  public async Task<IActionResult> Delete(string id)
  {
    await _mongoDBService.DeleteAsync(id);
    return NoContent();
  }

}