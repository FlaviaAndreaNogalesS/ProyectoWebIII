using System.Net.Http;
using System.Text.Json;
using System.Threading.Tasks;
using System.Collections.Generic;

namespace PadronElectoralService.Services
{
    public class RecintoService
    {
        private readonly HttpClient _httpClient;

        public RecintoService(HttpClient httpClient)
        {
            _httpClient = httpClient;
        }

        public async Task<List<RecintoDto>> ObtenerRecintosAsync()
        {
            var response = await _httpClient.GetAsync("http://localhost:8001/api/recintos/");
            response.EnsureSuccessStatusCode();

            var contenido = await response.Content.ReadAsStringAsync();
            return JsonSerializer.Deserialize<List<RecintoDto>>(contenido, new JsonSerializerOptions
            {
                PropertyNameCaseInsensitive = true
            }) ?? new List<RecintoDto>();
        }

        public class RecintoDto
        {
            public int Id { get; set; }
            public string Nombre { get; set; }
        }
    }
}
