using Microsoft.EntityFrameworkCore;
using PadronElectoralService.Models;

namespace PadronElectoralService.Data
{
    public class PadronContext : DbContext
    {
        public PadronContext(DbContextOptions<PadronContext> options) : base(options) { }

        public DbSet<Ciudadano> Ciudadanos { get; set; }
        public DbSet<Recinto> Recintos { get; set; }  // ← ✅ ESTA LÍNEA ES CLAVE
    }
}
