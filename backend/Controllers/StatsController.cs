using Microsoft.AspNetCore.Mvc;
using backend.Data;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class StatsController : ControllerBase
    {
        private readonly AppDbContext _context;
        public StatsController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetStats()
        {
            // Pie chart: distribution by Title (category)
            var categoryDistribution = await _context.Users
                .GroupBy(u => u.Title)
                .Select(g => new { Category = g.Key, Count = g.Count() })
                .ToListAsync();

            // Line chart: submissions over time (by day)
            var submissionsOverTime = await _context.Users
                .GroupBy(u => u.CreatedAt.Date)
                .Select(g => new { Date = g.Key, Count = g.Count() })
                .OrderBy(x => x.Date)
                .ToListAsync();

            // Bar chart: user activity by city
            var userActivity = await _context.Users
                .GroupBy(u => u.City)
                .Select(g => new { City = g.Key, Count = g.Count() })
                .OrderByDescending(x => x.Count)
                .ToListAsync();

            return Ok(new
            {
                categoryDistribution,
                submissionsOverTime,
                userActivity
            });
        }
    }
}
