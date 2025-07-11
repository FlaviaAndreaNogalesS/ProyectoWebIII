using Microsoft.AspNetCore.Http;

namespace PadronElectoralService.Models
{
    public class CiudadanoFormDto
    {
        public string CI { get; set; }
        public string NombreCompleto { get; set; }
        public string Direccion { get; set; }

        public IFormFile FotoAnverso { get; set; }
        public IFormFile FotoReverso { get; set; }
        public IFormFile FotoVotante { get; set; }

        public int RecintoId { get; set; }
        //public int SeccionId { get; set; }  // <--- necesario
        // public int EleccionId { get; set; } // <--- necesario
    }
}
