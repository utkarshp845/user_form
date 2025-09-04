using Microsoft.AspNetCore.Mvc;
using backend.Models;
using backend.DTOs;
using backend.Data;
using BCrypt.Net;
using Microsoft.EntityFrameworkCore;
using backend.Helpers;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly AppDbContext _context;

        public AuthController(AppDbContext context)
        {
            _context = context;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterRequest request)
        {
            // Check if user already exists
            var existingUser = await _context.Users.FirstOrDefaultAsync(u => u.Email == request.Email);
            if (existingUser != null)
                return BadRequest("User already exists.");

            // Hash the password
            var hashedPassword = BCrypt.Net.BCrypt.HashPassword(request.Password);

            // Create new user
            var newUser = new UserData
            {
                Email = request.Email,
                Name = request.Name,
                PasswordHash = hashedPassword,
                Title = "Noob", // Default or empty title
                City = null, // Default or empty city
                Phone = null, // Default or empty phone
                CreatedAt = DateTime.UtcNow
            };

            // Save to database
            _context.Users.Add(newUser);
            await _context.SaveChangesAsync();

            return Ok("User registered successfully.");
        }


        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest request, [FromServices] JwtHelper jwtHelper)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == request.Email);
            if (user == null || !BCrypt.Net.BCrypt.Verify(request.Password, user.PasswordHash))
            {
                return Unauthorized("Invalid email or password.");
            }

            // Generate JWT token
            var token = jwtHelper.GenerateToken(user);
            return Ok(new { Token = token });
        }

    }
}