namespace backend.Models
{
    public class UserData
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Title { get; set; }

        public string? City { get; set; } // fourth step to add city
                                         // Add other relevant user properties here
        public string? Phone { get; set; } // fourth step to add phone

        public DateTime CreatedAt { get; set; }

        public string PasswordHash { get; set; } = string.Empty;
    }
}