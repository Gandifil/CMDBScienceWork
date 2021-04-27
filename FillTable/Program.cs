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

        static IEnumerable<Metric> CreateTypes()
        {
            var types = new List<Metric>();
            types.Add(new Metric()
            {
                Name = "Нагрузка на CPU",
                Plugin = "CPU_LOAD",
                Type = CDMBObjects.Attribute.ValueType.Percent,
                Frequency = 24 * 12,
                HistoryDays = 3,
            }); 
            return types;
        }

        static void Main(string[] args)
        {
            using (ApplicationContext db = new ApplicationContext())
            {
                db.Reload();

                var types = CreateTypes();
                db.ParameterTypes.AddRange(types);
                db.Attributes.AddRange(TestAttributes);

                for (int i = 0; i < 3; i++)
                {
                    var prefix = i.ToString().PadLeft(4, '0');
                    for (int l = 0; l < i*2; l++)
                    {
                        var postfix = l.ToString().PadLeft(4, '0');
                        var name = prefix + "icmdb" + postfix;
                        var item = new Equipment
                        {
                            Hostname = name,
                            Parameters = types.Select(x => new ParameterLink()
                            {
                                Type = x,
                            }).ToList(),
                        };
                        db.Equipments.Add(item);
                    }
                }

                db.SaveChanges();
                Console.WriteLine("Объекты успешно сохранены");
            }
        }
    }
}
