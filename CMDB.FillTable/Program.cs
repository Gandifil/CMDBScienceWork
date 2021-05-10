using System;
using System.Collections.Generic;
using System.Linq;
using CDMB.Common.Database;
using CDMB.Common.Equipments;
using Attribute = CDMB.Common.Database.Attribute;

namespace CMDB.FillTable
{
    class Program
    {
        static IEnumerable<Attribute> TestAttributes => new List<Attribute>()
        {
            new Attribute
            {
                Name = "Процессор",
                Type = Attribute.ValueType.String,
            },
            new Attribute
            {
                Name = "Стоимость",
                Type = Attribute.ValueType.Integer,
            },
            new Attribute
            {
                Name = "Операционная система",
                Type = Attribute.ValueType.String,
            },
        };
        static IEnumerable<Metric> TestMetrics => new List<Metric>()
        {
            new Metric()
            {
                Name = "Нагрузка на CPU",
                Plugin = "CPU_LOAD",
                Type = Attribute.ValueType.Percent,
                Cron = "* */5 * * ? * *",
                HistoryDays = 3,
            },
            new Metric()
            {
                Name = "Свободное место на ж.д",
                Plugin = "FREE_HARDDISK_SIZE",
                Type = Attribute.ValueType.Float,
                Cron = "* * */2 * ? * *",
                HistoryDays = 12,
            },
            new Metric()
            {
                Name = "Объем ж.д",
                Plugin = "HARDDISK_SIZE",
                Type = Attribute.ValueType.Float,
                Cron = "* * */2 * ? * *",
                HistoryDays = 12,
            },
        };

        static void Main(string[] args)
        {
            using (ApplicationContext db = new ApplicationContext())
            {
                db.Reload();

                db.Metrics.AddRange(TestMetrics);
                db.Attributes.AddRange(TestAttributes);
                db.SaveChanges();

                var builder = new EquipmentBuilder(db);

                for (int i = 0; i < 3; i++)
                {
                    var prefix = i.ToString().PadLeft(4, '0');
                    for (int l = 0; l < i*2; l++)
                    {
                        var postfix = l.ToString().PadLeft(4, '0');
                        var name = prefix + "icmdb" + postfix;
                        var serialNumber = Guid.NewGuid().ToString();
                        builder.CreateAsync(new MachineInfo
                        {
                            HostName = name,
                            SerialNumber = serialNumber,
                        }).Wait();
                    }
                }

                db.SaveChanges();
                Console.WriteLine("Объекты успешно сохранены");
            }
        }
    }
}
