using Quartz;
using System;
using System.Diagnostics;
using System.Globalization;
using System.IO;
using System.Threading.Tasks;
using Universe.CpuUsage;

namespace CMDB.Client.Plugins
{
    public class DiskSize : IJob
	{
		public async Task Execute(IJobExecutionContext context)
		{
            var allDrives = DriveInfo.GetDrives();

            long sum = 0;
            foreach (var drive in allDrives)
            {
                if (drive.IsReady == true)
                    sum += drive.TotalSize;
            }
            var sumGB = (sum / (1024 * 1024)).ToString();
            Console.WriteLine("Total disks size: " + sumGB + " GB");
        }
	}
}
