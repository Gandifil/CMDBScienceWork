using Quartz;
using System;
using System.Threading.Tasks;

namespace CMDB.Client.Plugins
{
    public class CPULoad : IJob
	{
		public async Task Execute(IJobExecutionContext context)
		{
			await Console.Out.WriteLineAsync("Greetings from HelloJob!");
		}
	}
}
