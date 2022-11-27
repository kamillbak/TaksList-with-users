namespace TaskList_Users_API
{
    public class Task
    {
        public int TaskId { get; set; }

        public int Priority { get; set; }

        public string Name { get; set; } = string.Empty;

        public string Description { get; set; } = string.Empty;

        public int UserId { get; set; }

        public bool IsDone { get; set; }
    }
}


