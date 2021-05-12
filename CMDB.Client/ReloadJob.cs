using Newtonsoft.Json;
using Quartz;
using System;
using System.Collections.Generic;
using System.Management;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;

namespace CMDB.Client
{
	class ReloadJob : IJob
    {
        static readonly HttpClientHandler handler = new HttpClientHandler();
        static readonly HttpClient client = new HttpClient(handler);

        static ReloadJob()
        {
            handler.ServerCertificateCustomValidationCallback = HttpClientHandler.DangerousAcceptAnyServerCertificateValidator;
        }

        private string ParseSerialNumber()
        {
            string result = "";

            ManagementObjectSearcher searcher =
                new ManagementObjectSearcher("SELECT  SerialNumber FROM Win32_BaseBoard");

            ManagementObjectCollection information = searcher.Get();
            foreach (ManagementObject obj in information)
            {
                foreach (PropertyData data in obj.Properties)
                    result = data.Value.ToString();
            }

            searcher.Dispose();
            return result;
        }

        private async Task<string> GetToken()
        {
            var hostName = Environment.MachineName;
            var serialNumber = ParseSerialNumber();

            Console.WriteLine($"MachineName: {hostName}");
            Console.WriteLine($"SerialNumber: {serialNumber}");

            var json = JsonConvert.SerializeObject(new { hostName , serialNumber });
            var data = new StringContent(json, Encoding.UTF8, "application/json");
            HttpResponseMessage response = await client.PostAsync("http://localhost:5000/api/client/token", data); 
            response.EnsureSuccessStatusCode();
            return response.Content.ReadAsStringAsync().Result;
        }

        private async Task<string> GetTasks(string token)
        {
            client.DefaultRequestHeaders.Authorization =
                new AuthenticationHeaderValue("Bearer", token);

            HttpResponseMessage response = await client.GetAsync("http://localhost:5000/api/client/tasks");

            response.EnsureSuccessStatusCode();
            return response.Content.ReadAsStringAsync().Result;
        }

        public async Task Execute(IJobExecutionContext context)
        {

            // Call asynchronous network methods in a try/catch block to handle exceptions.
            try
            {
                var token = await GetToken();

                Console.WriteLine($"Tasks: {await GetTasks(token)}");
            }
            catch (HttpRequestException e)
            {
                Console.WriteLine("\nException Caught!");
                Console.WriteLine("Message :{0} ", e.Message);
                //Console.WriteLine("Message :{0} ", e.InnerException.Message);
            }
        }
	}
}