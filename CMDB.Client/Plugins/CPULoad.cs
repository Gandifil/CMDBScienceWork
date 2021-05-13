using Quartz;
using System;
using System.Diagnostics;
using System.Threading.Tasks;
using Universe.CpuUsage;

namespace CMDB.Client.Plugins
{
    public class CPULoad : IJob
	{
		public async Task Execute(IJobExecutionContext context)
		{
            var cpuUsage = new PerformanceCounter("Processor", "% Processor Time", "_Total");
            cpuUsage.NextValue();
            await Task.Delay(500);
            string result = cpuUsage.NextValue().ToString("N2");
            Console.WriteLine(result  + "%");

        }
	}
}
