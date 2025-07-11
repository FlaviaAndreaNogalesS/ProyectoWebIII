using System.ComponentModel.DataAnnotations;

namespace PadronElectoralService.Models
{
    public class Ciudadano
    {
        [Key]
        public Guid Id { get; set; } = Guid.NewGuid();

        [Required] public string CI { get; set; }
        [Required] public string NombreCompleto { get; set; }
        public string Direccion { get; set; }
        public string FotoAnverso { get; set; }
        public string FotoReverso { get; set; }
        public string FotoVotante { get; set; }
        public int RecintoId { get; set; }
    }
}
