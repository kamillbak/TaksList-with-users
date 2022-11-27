namespace TaskList_Users_API
{
    public class User
    {
        public int UserId { get; set; }
        public string UserName { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
        public string email { get; set; } = string.Empty;
    }
}
