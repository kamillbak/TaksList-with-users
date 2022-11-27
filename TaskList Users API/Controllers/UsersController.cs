using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Data;
using System.Linq;

namespace TaskList_Users_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {

        private readonly DataContext _context;

        public UsersController(DataContext context)
        {
            _context = context;
        }
  
        // Method return all users
        [HttpGet]
        public async Task<ActionResult<List<Task>>> Get()
        {
            return Ok(await _context.Users.ToListAsync());
        }

        // Registration - adding new user to table 
        [HttpPost("register")]
        public async Task<ActionResult<List<Task>>> AddTask(User s)
        {
            _context.Users.Add(s);
            await _context.SaveChangesAsync();

            return Ok(s);
        }

        // Login - confirm username and password, return User object 
        [HttpPost("login")]
        public async Task<ActionResult<string>> Login(LogData ld)
        {
            // find user using userName (us_name)

            var user = _context.Users
                    .Where(u => u.UserName == ld.us_name)
                    .FirstOrDefault<User>();

            // if there is no users with this username
            if(user == null )
            {
                return BadRequest("Username not found. Register yourself first.");
            }

            // check if password correct
            bool isPasswordCorrect = user.Password == ld.pass;

            if (!isPasswordCorrect)// if not correct
            {
                return BadRequest("Password incorrect.");
            }

            // if correct
            return Ok(user);
        }

    }
}
