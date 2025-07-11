
using Microsoft.EntityFrameworkCore;
using PadronElectoralService.Models;

namespace PadronElectoralService.Services
{
    public class ApplicationDbContext
    {
        public DbSet<Ciudadano> Ciudadanos { get; set; }
        public DbSet<Recinto> Recintos { get; set; }


    }

}
