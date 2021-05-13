using Quartz;
using Quartz.Impl.Matchers;
using System;
using System.Threading.Tasks;

namespace CMDB.Client
{
    public class TaskProcessor
    {
        public static TaskProcessor Instance;
        private readonly IScheduler schedule;

        public TaskProcessor(IScheduler schedule)
        {
            this.schedule = schedule;
            Instance = this;
        }

        private async Task Init()
        { 
            IJobDetail job = JobBuilder.Create<ReloadJob>()
                .WithIdentity("reload", "main")
                .Build();

            ITrigger trigger = TriggerBuilder.Create()
                .WithIdentity("reloadTrigger", "main")
                .StartNow()
                .WithSimpleSchedule(x => x
                    .WithIntervalInHours(6)
                    .RepeatForever())
                .Build();

            await schedule.ScheduleJob(job, trigger);

        }

        public async Task Clear()
        {
            var jobs = await schedule.GetJobKeys(GroupMatcher<JobKey>.GroupEquals("tasks"));
            foreach (var job in jobs)
                await schedule.DeleteJob(job);
            Console.WriteLine("Clear tasks table.");
        }

        public class Mission
        {
            public string Plugin { get; set; }
            public string Cron { get; set; }
        }

        public async Task AddTask(Mission task)
        {
            var guid = Guid.NewGuid().ToString();

            var type = Type.GetType("CMDB.Client.Plugins." + task.Plugin) ?? Type.GetType("CMDB.Client.Plugins.DefaultJob");
            IJobDetail job = JobBuilder.Create(type)
                .WithIdentity(guid, "tasks")
                .Build();

            try
            {
                ITrigger trigger = TriggerBuilder.Create()
                    .WithIdentity(guid, "tasks")
                    .WithCronSchedule(task.Cron)
                    .Build();

                await schedule.ScheduleJob(job, trigger);
                Console.WriteLine("Add task {0} with plugin {1} and cron {2}", guid, task.Plugin, task.Cron);
            }
            catch (Exception)
            {
                Console.WriteLine("Can't parse cron {0}", task.Cron);
            }
        }

        public async Task Run()
        {
            await schedule.Start();

            await Init();

            // some sleep to show what's happening
            await Task.Delay(TimeSpan.FromSeconds(60));

            // and last shut down the scheduler when you are ready to close your program
            await schedule.Shutdown();
        }
    }
}
