using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PadronElectoralService.Data;
using PadronElectoralService.Models;
using PadronElectoralService.Services;
using System.Net.Http;
using System.Text;
using System.Text.Json;

namespace PadronElectoralService.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CiudadanosController : ControllerBase
    {
        private readonly PadronContext _context;
        private readonly IWebHostEnvironment _env;
        private readonly RecintoService _recintoService;
        private readonly AdminElectoralClient _adminClient;

        public CiudadanosController(
            PadronContext context,
            IWebHostEnvironment env,
            RecintoService recintoService,
            AdminElectoralClient adminClient)
        {
            _context = context;
            _env = env;
            _recintoService = recintoService;
            _adminClient = adminClient;
        }

        // ✅ Obtener todos los ciudadanos (útil para pruebas internas)
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Ciudadano>>> GetCiudadanos() =>
            await _context.Ciudadanos.ToListAsync();

        // ✅ Registrar un nuevo ciudadano con fotos y generación de papeleta
        [HttpPost]
        [RequestSizeLimit(10_000_000)]
        public async Task<ActionResult<Ciudadano>> CreateCiudadano([FromForm] CiudadanoFormDto dto)
        {
            // Validación de campos obligatorios
            if (string.IsNullOrWhiteSpace(dto.CI) || string.IsNullOrWhiteSpace(dto.NombreCompleto) ||
                string.IsNullOrWhiteSpace(dto.Direccion) ||
                dto.FotoAnverso == null || dto.FotoReverso == null || dto.FotoVotante == null)
            {
                return BadRequest("Todos los campos son obligatorios.");
            }

            // Validar que el CI no exista previamente
            if (await _context.Ciudadanos.AnyAsync(c => c.CI == dto.CI))
                return BadRequest("Ya existe un ciudadano con ese CI.");

            // Verificar que el recinto sea válido usando el microservicio externo
            var recintos = await _recintoService.ObtenerRecintosAsync();
            if (!recintos.Any(r => r.Id == dto.RecintoId))
                return BadRequest("Recinto inválido.");

            // Crear nuevo ciudadano
            var ciudadano = new Ciudadano
            {
                Id = Guid.NewGuid(),
                CI = dto.CI,
                NombreCompleto = dto.NombreCompleto,
                Direccion = dto.Direccion,
                FotoAnverso = await GuardarArchivo(dto.FotoAnverso),
                FotoReverso = await GuardarArchivo(dto.FotoReverso),
                FotoVotante = await GuardarArchivo(dto.FotoVotante),
                RecintoId = dto.RecintoId
            };

            _context.Ciudadanos.Add(ciudadano);
            await _context.SaveChangesAsync();

            // Generar papeleta automáticamente en el sistema de administración electoral
         //   await _adminClient.GenerarPapeletasAsync(ciudadano.RecintoId.ToString(), "1");

            return CreatedAtAction(nameof(GetCiudadano), new { id = ciudadano.Id }, ciudadano);
        }

        // ✅ Obtener ciudadano por ID (privado, para prueba)
        [HttpGet("{id}")]
        public async Task<ActionResult<Ciudadano>> GetCiudadano(Guid id)
        {
            var ciudadano = await _context.Ciudadanos.FindAsync(id);
            return ciudadano == null ? NotFound() : Ok(ciudadano);
        }

        // ✅ Consulta pública del padrón por CI (solo nombre y recinto, no fotos ni dirección)
        [HttpGet("consultar/{ci}")]
        public async Task<IActionResult> ConsultarPadron(string ci)
        {
            var ciudadano = await _context.Ciudadanos.FirstOrDefaultAsync(c => c.CI == ci);
            return ciudadano == null ? NotFound() : Ok(new
            {
                ciudadano.NombreCompleto,
                ciudadano.RecintoId
            });
        }

        // ✅ Obtener lista de recintos disponibles desde el microservicio externo
        [HttpGet("recintos-disponibles")]
        public async Task<IActionResult> GetRecintosDisponibles() =>
            Ok(await _recintoService.ObtenerRecintosAsync());




        // ✅ Endpoint para generar papeletas manualmente desde Django (uso interno)
        //  [HttpPost("generar-papeletas")]
        //  public async Task<IActionResult> GenerarPapeletasAsync([FromBody] PapeletaRequest request)
        //  {
        //      try
        //       {
        //   var response = await _adminClient.GenerarPapeletasAsync(request.SeccionId, request.EleccionId);
        //          return Ok(new { mensaje = "Papeletas generadas exitosamente", resultado = response });
        //  }
        ////     catch (Exception ex)
        //   {
        //      //       return StatusCode(500, new { error = "Error al generar papeletas", detalles = ex.Message });
        // }
        //}




        // ✅ Guardar imagenes en disco y retornar URL
        private async Task<string> GuardarArchivo(IFormFile archivo)
        {
            if (archivo == null || archivo.Length == 0) return null;

            var uploads = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/uploads");
            if (!Directory.Exists(uploads)) Directory.CreateDirectory(uploads);

            var nombre = Guid.NewGuid() + Path.GetExtension(archivo.FileName);
            var ruta = Path.Combine(uploads, nombre);

            using (var stream = new FileStream(ruta, FileMode.Create))
                await archivo.CopyToAsync(stream);

            return $"/uploads/{nombre}";
        }

        // ✅ DTO auxiliar para generación de papeleta desde Django
        public class PapeletaRequest
        {
            public string SeccionId { get; set; }
            public string EleccionId { get; set; }
        }
    }
}
