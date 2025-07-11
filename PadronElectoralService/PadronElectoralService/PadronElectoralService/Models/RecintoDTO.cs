using System.ComponentModel.DataAnnotations;

namespace PadronElectoralService.Models
{
    public class Recinto
    {
        [Key]
        public int Id { get; set; }
        public string Nombre { get; set; }
    }
}
