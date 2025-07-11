using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PadronElectoralService.Data;
using PadronElectoralService.Models;

namespace PadronElectoralService.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RecintosController : ControllerBase
    {
        private readonly PadronContext _context;

        public RecintosController(PadronContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var recintos = await _context.Recintos.ToListAsync();
            return Ok(recintos);
        }

        [HttpPost]
        public async Task<IActionResult> Crear(Recinto recinto)
        {
            _context.Recintos.Add(recinto);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetAll), new { id = recinto.Id }, recinto);
        }
    }
}
