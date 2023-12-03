using System.ComponentModel.DataAnnotations;

namespace ChatAppV2.Models
{
    public class Message
    {
        public int Id { get; set; }
        [Required]

        public string UserName { get; set; }
        [Required]

        public string Text { get; set; }
        public DateTime CreatedOn { get; set; }

        public string UserID { get; set; }
        public virtual AppUser Sender { get; set; }

        public Message()
        {
                CreatedOn=DateTime.Now;
        }
    }
}
