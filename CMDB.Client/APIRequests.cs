using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;
using static CMDB.Client.TaskProcessor;

namespace CMDB.Client
{
    public static class APIRequests
    {
        static readonly HttpClientHandler handler = new HttpClientHandler();
        static readonly HttpClient client = new HttpClient(handler);

        const string RESULTS_GATE_ENDPOINT = "";

        static APIRequests()
        {
            handler.ServerCertificateCustomValidationCallback = HttpClientHandler.DangerousAcceptAnyServerCertificateValidator;
        }

        public static async Task<string> GetToken(dynamic info)
        {

            var json = JsonConvert.SerializeObject(info);
            var data = new StringContent(json, Encoding.UTF8, "application/json");
            HttpResponseMessage response = await client.PostAsync("http://localhost:5000/api/client/token", data);

            response.EnsureSuccessStatusCode();
            var result = response.Content.ReadAsStringAsync().Result;
            client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", result);
            return result;
        }

        public static async Task<IEnumerable<Mission>> GetTasks(string token)
        {
            var response = await client.GetAsync("https://localhost:5001/api/client/tasks");
            response.EnsureSuccessStatusCode();
            return JsonConvert.DeserializeObject<Mission[]>(await response.Content.ReadAsStringAsync());
        }

        public static async void Send(string value, string log = "", bool succes = true)
        {
            var json = JsonConvert.SerializeObject(new {value, log, succes});
            var data = new StringContent(json, Encoding.UTF8, "application/json");
            await client.PostAsync(RESULTS_GATE_ENDPOINT + "/api/client/result", data);
        }
    }
}
