using Quartz;
using System;
using System.Threading.Tasks;

namespace CMDB.Client.Plugins
{
    class DefaultJob : IJob
	{
		public async Task Execute(IJobExecutionContext context)
		{
			await Console.Out.WriteLineAsync("DefaultJob");
		}
	}
}
