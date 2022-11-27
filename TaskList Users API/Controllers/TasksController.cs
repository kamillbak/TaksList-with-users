using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace TaskList_Users_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TasksController : ControllerBase
    {
        private readonly DataContext _context;

        public TasksController(DataContext context)
        {
            _context = context;
        }


        // Method return all taks
        [HttpGet]
        public async Task<ActionResult<List<Task>>> Get()
        {
            return Ok(await _context.Tasks.ToListAsync());
        }


        // Method return tasks, but only for specific user 
        [HttpGet("{userId}")]
        public async Task<ActionResult<List<Task>>> Get(int userId)
        {
            var Usertasks = _context.Tasks.Where(t => t.UserId == userId).ToList();

            if (Usertasks == null)
                return BadRequest("Task not found.");
            return Ok(Usertasks);
        }

        // Method adding new row (task) to table 
        [HttpPost]
        public async Task<ActionResult<List<Task>>> AddTask(Task t)
        {
            _context.Tasks.Add(t);
            await _context.SaveChangesAsync();

            return Ok(t );
        }


        //Method updating value in task 
        [HttpPut]
        public async Task<ActionResult<List<Task>>> UpdateTask(Task taskToUpdate)
        {
            var DBtask = await _context.Tasks.FindAsync(taskToUpdate.TaskId);
            if (DBtask == null)
                return BadRequest("Task not found.");

            DBtask.Name = taskToUpdate.Name;
            DBtask.Priority = taskToUpdate.Priority;
            DBtask.Description = taskToUpdate.Description;
            DBtask.IsDone = taskToUpdate.IsDone;

            await _context.SaveChangesAsync();

            return Ok( DBtask);
        }
        
        // Method deleted task, by taskID 
        [HttpDelete("{id}")]
        public async Task<ActionResult<List<Task>>> Delete(int id)
        {
            var DBtask = await _context.Tasks.FindAsync(id);
            if (DBtask == null)
                return BadRequest("Task not found.");

            _context.Tasks.Remove(DBtask);

            await _context.SaveChangesAsync();

            return Ok("Task deleted");
        }


    }

}
