using CMDB.Client.Plugins;
using Quartz;
using Quartz.Impl;
using Quartz.Logging;
using System;
using System.Threading.Tasks;

namespace CMDB.Client
{
    partial class Program
    {
        private static async Task Main(string[] args)
        {
            LogProvider.SetCurrentLogProvider(new ConsoleLogProvider());
            ISchedulerFactory factory = new StdSchedulerFactory();

            var processor = new TaskProcessor(await factory.GetScheduler());
            await processor.Run();
        }
    }
}
