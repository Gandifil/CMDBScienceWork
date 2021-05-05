using CDMBObjects;
using System;
using System.Collections.Generic;
using System.Linq;

namespace FillTable
{
    class Program
    {
        static IEnumerable<CDMBObjects.Attribute> TestAttributes => new List<CDMBObjects.Attribute>()
        {
            new CDMBObjects.Attribute
            {
                Name = "Процессор",
                Type = CDMBObjects.Attribute.ValueType.String,
            },
            new CDMBObjects.Attribute
            {
                Name = "Стоимость",
                Type = CDMBObjects.Attribute.ValueType.Integer,
            },
            new CDMBObjects.Attribute
            {
                Name = "Операционная система",
                Type = CDMBObjects.Attribute.ValueType.String,
            },
        };
        static IEnumerable<Metric> TestMetrics => new List<Metric>()
        {
            new Metric()
            {
                Name = "Нагрузка на CPU",
                Plugin = "CPU_LOAD",
                Type = CDMBObjects.Attribute.ValueType.Percent,
                Cron = "* */5 * * ? * *",
                HistoryDays = 3,
            },
            new Metric()
            {
                Name = "Свободное место на ж.д",
                Plugin = "FREE_HARDDISK_SIZE",
                Type = CDMBObjects.Attribute.ValueType.Float,
                Cron = "* * */2 * ? * *",
                HistoryDays = 12,
            },
            new Metric()
            {
                Name = "Объем ж.д",
                Plugin = "HARDDISK_SIZE",
                Type = CDMBObjects.Attribute.ValueType.Float,
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

                for (int i = 0; i < 3; i++)
                {
                    var prefix = i.ToString().PadLeft(4, '0');
                    for (int l = 0; l < i*2; l++)
                    {
                        var postfix = l.ToString().PadLeft(4, '0');
                        var name = prefix + "icmdb" + postfix;
                        var item = new Equipment
                        {
                            HostName = name,
                            Attributes = new List<AttributeValue>(),
                            //Parameters = types.Select(x => new ParameterLink()
                            //{
                            //    Type = x,
                            //}).ToList(),
                        };
                        item.Attributes.Add(new AttributeValue
                        {
                            Attribute = db.Attributes.First(),
                            Value = "x",
                            Equipment = item,
                        });
                        db.Equipments.Add(item);
                    }
                }

                db.SaveChanges();
                Console.WriteLine("Объекты успешно сохранены");
            }
        }
    }
}
