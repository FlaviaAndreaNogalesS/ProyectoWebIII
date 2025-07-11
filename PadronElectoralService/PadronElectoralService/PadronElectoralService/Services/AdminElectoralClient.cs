using System.Net.Http;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

namespace PadronElectoralService.Services
{
    public class AdminElectoralClient
    {
        private readonly HttpClient _httpClient;

        public AdminElectoralClient(HttpClient httpClient)
        {
            _httpClient = httpClient;
        }

        public async Task<string> GenerarPapeletasAsync(int seccionId, int eleccionId)
        {
            var payload = new
            {
                SeccionId = seccionId,
                EleccionId = eleccionId
            };

            var content = new StringContent(
                JsonSerializer.Serialize(payload),
                Encoding.UTF8,
                "application/json"
            );

            var response = await _httpClient.PostAsync("http://localhost:8001/api/papeletas/generar/", content);
            response.EnsureSuccessStatusCode();

            return await response.Content.ReadAsStringAsync();
        }
    }
}
