using CDMBObjects;
using System;
using System.Collections.Generic;
using System.Linq;

namespace FillTable
{
    class Program
    {
        static IEnumerable<ParameterType> CreateTypes()
        {
            var types = new List<ParameterType>();
            types.Add(new ParameterType()
            {
                InternalName = "OS",
                VisibleName = "Операционная система",
                Type = ParameterType.ValueType.String,
                Order = 0,
            });
            types.Add(new ParameterType()
            {
                InternalName = "OS_VERSION",
                VisibleName = "Версия операционной системы",
                Type = ParameterType.ValueType.String,
                Order = 1,
            });
            types.Add(new ParameterType()
            {
                InternalName = "CPU_LOAD",
                VisibleName = "Нагрузка на CPU",
                Type = ParameterType.ValueType.Procent,
                Order = 5,
            });
            types.Add(new ParameterType()
            {
                InternalName = "CPU_LOAD",
                VisibleName = "Нагрузка на CPU",
                Type = ParameterType.ValueType.Procent,
                Order = 5,
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

                for (int i = 0; i < 3; i++)
                {
                    var prefix = i.ToString().PadLeft(4, '0');
                    for (int l = 0; l < i*2; l++)
                    {
                        var postfix = l.ToString().PadLeft(4, '0');
                        var name = prefix + "icmdb" + postfix;
                        var item = new Equipment
                        {
                            Name = name,
                            Cost = 33,
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
