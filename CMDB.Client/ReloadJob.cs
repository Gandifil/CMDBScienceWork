using Newtonsoft.Json;
using Quartz;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Management;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;
using static CMDB.Client.TaskProcessor;

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


        public async Task Execute(IJobExecutionContext context)
        {

            // Call asynchronous network methods in a try/catch block to handle exceptions.
            try
            {
                var hostName = Environment.MachineName;
                var serialNumber = ParseSerialNumber();

                Console.WriteLine($"MachineName: {hostName}");
                Console.WriteLine($"SerialNumber: {serialNumber}");

                var token = await APIRequests.GetToken(new { hostName, serialNumber });
                Console.WriteLine($"Token: {token}");

                var tasks = await APIRequests.GetTasks(token);
                await TaskProcessor.Instance.Clear();
                foreach (var task in tasks)
                    await TaskProcessor.Instance.AddTask(task);
                Console.WriteLine($"Tasks count: {tasks.Count()}");
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